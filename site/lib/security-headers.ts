const ACCOUNT_ORIGIN = "https://account.hraness.com";
const ANALYTICS_SOURCES = ["https://*.posthog.com", "https://*.posthogusercontent.com"] as const;

/**
 * Content Security Policy matched to what the site loads: its own scripts
 * (Next injects inline bootstrap scripts, so `'unsafe-inline'` stays until a
 * nonce pipeline exists), PostHog for first-party analytics, and its own
 * images, media, and fonts. Nothing is framed and nothing may frame the site.
 */
export function contentSecurityPolicy(
  environment: Readonly<Record<string, string | undefined>> = process.env,
): string {
  const development = environment.NODE_ENV === "development";
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""} ${ANALYTICS_SOURCES.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "media-src 'self'",
    "font-src 'self' data:",
    `connect-src 'self' ${ANALYTICS_SOURCES.join(" ")}${development ? " ws:" : ""}`,
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    `form-action 'self' ${ACCOUNT_ORIGIN}`,
  ].join("; ");
}

export function securityHeaders(
  environment: Readonly<Record<string, string | undefined>> = process.env,
): ReadonlyArray<{ key: string; value: string }> {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(environment) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Frame-Options", value: "DENY" },
  ];
}
