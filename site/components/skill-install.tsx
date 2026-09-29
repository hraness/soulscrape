import { PlatformInstall } from "@hraness/design-kit/react";

import publishedRelease from "../published-release.json";

// The skills.sh installer runs under Bun, which ships for macOS, Linux, and
// Windows, so every platform uses the same command.
const note = "Requires Bun 1.3.14+";

export const skillInstallPlatforms = [
  { id: "macos", command: publishedRelease.skillInstall, shell: "Terminal", note },
  { id: "linux", command: publishedRelease.skillInstall, shell: "Terminal", note },
  { id: "windows", command: publishedRelease.skillInstall, shell: "PowerShell", note },
] as const;

export const skillRunsOn = ["macos", "linux", "windows"] as const;

export function SkillInstall() {
  return <PlatformInstall label="Install on" platforms={skillInstallPlatforms} />;
}
