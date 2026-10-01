// Public-page browser check, following the hraness/.github site browser
// template: every public route at each (width, theme) context, with contexts
// run through a small pool instead of one after another. Every failure is
// collected and reported together, results.json is sorted, and each response
// with status 400 or above is logged as `status url`.
//
// Options (flags or environment):
//   --production                                check https://soulscrape.com instead of `next start`
//   --concurrency=N  SITE_BROWSER_CONCURRENCY    contexts at once (default 3 on 4+ CPUs, else 2)
//   SITE_BROWSER_ARTIFACTS                      artifact directory (default: a fresh mkdtemp dir)
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { availableParallelism, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { browserOwner, ownedChromiumLaunchOptions, pinnedBrowserExecutable, pinnedChromiumDefinition, verifyOwnedChromium } from "./owned-browser.mjs";

export const ROUTES = ["/", "/docs", "/examples", "/use-cases", "/connect", "/compare", "/blog"];
const WIDTHS = [360, 390, 1440];
const THEMES = ["light", "dark"];
const HEIGHTS = { 360: 740, 390: 844 };

export function option(argv, name) {
  const prefix = `--${name}=`;
  const found = argv.find(argument => argument.startsWith(prefix));
  return found === undefined ? undefined : found.slice(prefix.length);
}

export function positiveInteger(value, label) {
  if (value === undefined || value === "") return undefined;
  const parsed = Number(value);
  assert.ok(Number.isInteger(parsed) && parsed > 0, `${label} must be a positive integer, got ${JSON.stringify(value)}`);
  return parsed;
}

// Public GitHub-hosted runners have 4 vCPUs, private ones 2. One Chromium
// context per spare core keeps `next start` responsive.
export function defaultConcurrency(cpus = availableParallelism()) {
  return cpus >= 4 ? 3 : 2;
}

// Runs task(item, index) for every item with at most `limit` in flight.
// Never rejects: returns one { item, value } or { item, error } per input, in input order.
export async function pool(items, limit, task) {
  const settled = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next++;
      try { settled[index] = { item: items[index], value: await task(items[index], index) }; }
      catch (error) { settled[index] = { item: items[index], error }; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(Math.max(1, limit), items.length) }, worker));
  return settled;
}

export function sortResults(results) {
  return [...results].sort((a, b) => a.route.localeCompare(b.route) || a.width - b.width || a.theme.localeCompare(b.theme));
}

export function sortFailures(failures) {
  return [...failures].sort((a, b) => a.context.localeCompare(b.context) || String(a.route).localeCompare(String(b.route)));
}

export function formatFailures(failures, limit = 50) {
  const lines = failures.slice(0, limit).map(failure => `- ${failure.context}: ${failure.message}`);
  if (failures.length > limit) lines.push(`- ... ${failures.length - limit} more in results.json`);
  return `${failures.length} public-site browser check(s) failed:\n${lines.join("\n")}`;
}

async function checkRoute(page, errors, { origin, route, width, theme, name, artifacts }) {
  const response = await page.goto(origin + route);
  assert.equal(response?.status(), 200, route);
  await page.locator("main").waitFor();
  await page.evaluate(() => document.fonts.ready);
  // Full-page captures include portraits below the lazy-loading threshold.
  // Load their real assets before capturing, rather than recording blanks.
  await page.locator("img").evaluateAll(images => images.forEach(image => { image.loading = "eager"; }));
  await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth > 0), null, { timeout: 10_000 });
  await page.locator("img").evaluateAll(images => Promise.all(images.map(image => image.decode())));
  const state = await page.evaluate(() => {
    const footer = document.querySelector("#hraness-site-footer");
    return {
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth,
      heading: document.querySelector("h1")?.textContent?.trim(),
      theme: document.documentElement.dataset.theme,
      footerPositions: [footer, footer?.querySelector(".hraness-site-footer__inner")].map(element => element ? getComputedStyle(element).position : null),
      smallHeaderTargets: innerWidth > 600 ? [] : [...document.querySelectorAll("header a, header button, header summary")].filter(element => { const box = element.getBoundingClientRect(); return box.width > 0 && box.height > 0 && (box.width < 43.5 || box.height < 43.5); }).map(element => ({ label: element.textContent?.trim() || element.getAttribute("aria-label"), width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height })),
    };
  });
  const file = `${name}-${route === "/" ? "home" : route.slice(1).replaceAll("/", "_")}`;
  const screenshot = await page.screenshot({ path: resolve(artifacts, `${file}.png`), fullPage: true, animations: "disabled" });
  state.screenshotWidth = screenshot.readUInt32BE(16);
  await writeFile(resolve(artifacts, `${file}.json`), JSON.stringify({ route, state, errors }, null, 2));
  assert.ok(!state.overflow, `${route}: horizontal overflow at ${width}`);
  assert.equal(state.screenshotWidth, width, `${route}: full-page capture exceeds viewport`);
  assert.ok(state.heading, `${route}: missing heading`);
  assert.equal(state.theme, theme, `${route}: system appearance`);
  assert.ok(state.footerPositions.every(position => position === "static" || position === "relative"), `${route}: footer not in normal flow`);
  assert.deepEqual(state.smallHeaderTargets, [], `${route}: phone targets below 44px`);
  assert.deepEqual(errors, [], `${route}: browser errors`);
}

// The appearance choice persists across a reload and a header navigation.
async function checkAppearance(page, errors, { origin, theme }) {
  await page.goto(origin);
  const themeMenu = page.locator(".hraness-design-palette-menu");
  await page.waitForFunction(() => document.querySelector(".hraness-design-palette-menu")?.dataset.ready === "true");
  await themeMenu.locator(":scope > summary").click();
  const targetTheme = theme === "light" ? "dark" : "light";
  await page.getByRole("radio", { name: new RegExp(`^${targetTheme}$`, "iu") }).check();
  await page.waitForFunction(expected => document.documentElement.dataset.theme === expected, targetTheme);
  await page.reload();
  await page.waitForFunction(expected => document.documentElement.dataset.theme === expected, targetTheme);
  await page.locator("header").getByRole("link", { name: "Docs", exact: true }).click();
  await page.waitForURL(url => url.pathname === "/docs");
  assert.deepEqual(errors, [], "Browser errors after appearance and navigation");
}

async function main(argv) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const production = argv.includes("--production");
  assert.ok(argv.every(argument => argument === "--production" || /^--concurrency=/u.test(argument)), `Unknown argument in ${argv.join(" ")}`);
  const concurrency = positiveInteger(option(argv, "concurrency") ?? process.env.SITE_BROWSER_CONCURRENCY, "concurrency") ?? defaultConcurrency();
  const artifacts = process.env.SITE_BROWSER_ARTIFACTS ? resolve(process.env.SITE_BROWSER_ARTIFACTS) : await mkdtemp(join(tmpdir(), "soulscrape-site-browser-"));
  await mkdir(artifacts, { recursive: true });

  const contexts = WIDTHS.flatMap(width => THEMES.map(theme => ({ width, theme, name: `${width}-${theme}` })));
  let origin = "https://soulscrape.com";
  const results = [];
  const failures = [];
  let server;
  let exited;
  let output = "";
  let browser;
  let fatal;
  let launchOptions;
  let chromium;
  let browserIdentity;
  let interruption;
  const owner = browserOwner({
    launch: () => chromium.launch(launchOptions),
    close: acquired => acquired.close(),
    stopServer: async () => {
      if (!server) return;
      if (server.exitCode === null && server.signalCode === null) server.kill("SIGTERM");
      const timer = setTimeout(() => { if (server.exitCode === null && server.signalCode === null) server.kill("SIGKILL"); }, 5_000);
      try { await exited; } finally { clearTimeout(timer); }
    },
  });
  const interrupted = signal => {
    interruption ??= new Error(`Browser verification interrupted by ${signal}.`);
    process.exitCode = signal === "SIGINT" ? 130 : signal === "SIGHUP" ? 129 : 143;
    void owner.stop().catch(error => { console.error(error); process.exitCode = 1; });
  };
  const onSIGINT = () => interrupted("SIGINT");
  const onSIGTERM = () => interrupted("SIGTERM");
  const onSIGHUP = () => interrupted("SIGHUP");
  process.once("SIGINT", onSIGINT);
  process.once("SIGTERM", onSIGTERM);
  process.once("SIGHUP", onSIGHUP);
  try {
    ({ chromium } = await import("playwright-core"));
    const definition = pinnedChromiumDefinition();
    const executablePath = await pinnedBrowserExecutable(chromium.executablePath(), process.env.SOULSCRAPE_BROWSER_EXECUTABLE);
    launchOptions = { ...ownedChromiumLaunchOptions(executablePath, definition.defaultArgs), timeout: 15_000,
      handleSIGHUP: false, handleSIGINT: false, handleSIGTERM: false };
    if (interruption) throw interruption;
    if (!production) {
      const reservation = createServer();
      reservation.listen(0, "127.0.0.1");
      await once(reservation, "listening");
      const port = reservation.address().port;
      await new Promise((done, reject) => reservation.close(error => error ? reject(error) : done()));
      if (interruption) throw interruption;
      origin = `http://127.0.0.1:${port}`;
      server = spawn(process.execPath, [resolve(root, "node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
      exited = new Promise((done, reject) => { server.once("exit", done); server.once("error", reject); });
      void exited.catch(() => undefined);
      // Keep diagnostics bounded while draining both pipes.
      for (const stream of [server.stdout, server.stderr]) stream.on("data", chunk => { output = (output + chunk).slice(-32_768); });
      const deadline = Date.now() + 45_000;
      let ready = false;
      while (Date.now() < deadline) {
        if (interruption) throw interruption;
        if (server.exitCode !== null || server.signalCode !== null) throw new Error(`Next exited: ${output}`);
        try { if ((await fetch(origin, { signal: AbortSignal.timeout(2_000) })).ok) { ready = true; break; } } catch { /* Wait for our server to bind. */ }
        await new Promise(done => setTimeout(done, 100));
      }
      assert.ok(ready, `Next did not become ready: ${output}`);
    }

    browser = await owner.start();
    browserIdentity = await verifyOwnedChromium(browser, executablePath, definition.expectedVersion);
    console.log(`Verification browser: ${browserIdentity.browserVersion}; executable: ${browserIdentity.executable}; source: pinned Playwright`);
    const settled = await pool(contexts, concurrency, async ({ width, theme, name }) => {
      const context = await browser.newContext({ viewport: { width, height: HEIGHTS[width] ?? 900 }, colorScheme: theme, isMobile: width < 600, hasTouch: width < 600 });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
        page.on("response", response => { if (response.status() >= 400) console.log(`${response.status()} ${response.url()}`); });
        // A route that passed left `errors` empty, so anything still here arrived late; report it.
        let previous = null;
        const reset = () => {
          if (previous && errors.length) failures.push({ context: name, route: previous, message: `late browser errors: ${errors.join(" | ")}` });
          errors.length = 0;
          previous = null;
        };
        for (const route of ROUTES) {
          reset();
          try {
            await checkRoute(page, errors, { origin, route, width, theme, name, artifacts });
            results.push({ route, width, theme });
            previous = route;
          } catch (error) {
            failures.push({ context: name, route, message: error.message.split("\n")[0] });
          }
        }
        reset();
        try { await checkAppearance(page, errors, { origin, theme }); }
        catch (error) { failures.push({ context: name, route: "(appearance)", message: error.message.split("\n")[0] }); }
      } finally { await context.close(); }
    });
    for (const entry of settled) if (entry.error) failures.push({ context: entry.item.name, route: null, message: entry.error.message.split("\n")[0] });
  } catch (error) {
    fatal = error;
  } finally {
    try { await owner.stop(); }
    finally {
      process.removeListener("SIGINT", onSIGINT);
     process.removeListener("SIGTERM", onSIGTERM);
      process.removeListener("SIGHUP", onSIGHUP);
    }
  }

  if (interruption) fatal ??= interruption;
  const sortedFailures = sortFailures(failures);
  const passed = !fatal && sortedFailures.length === 0;
  await writeFile(resolve(artifacts, "results.json"), JSON.stringify({ passed, fatal: fatal?.message ?? null, failures: sortedFailures, origin, production, concurrency, browserIdentity, source: process.env.GITHUB_SHA ?? null, capturedAt: new Date().toISOString(), cleanup: "browser and owned server closed", results: sortResults(results) }, null, 2) + "\n");
  console.log(`Artifacts: ${artifacts}`);
  if (fatal) throw fatal;
  if (sortedFailures.length > 0) throw new Error(formatFailures(sortedFailures));
  console.log(`Verified ${results.length} route/viewport/theme combinations at ${origin} (${concurrency} contexts at once).`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main(process.argv.slice(2));
