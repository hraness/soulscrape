"use client";

import {
  DesignPaletteProvider,
  ThemeColorSync,
} from "@hraness/design-kit/react";
import type { ReactNode } from "react";

/**
 * Shared appearance boundary: Paper palette by default, persisted reader
 * overrides through the header's icon-menu control.
 */
export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <DesignPaletteProvider
      defaultPreference={{ palette: "paper", mode: "system" }}
      legacyStorageKey="hraness-design-theme-v1"
    >
      <ThemeColorSync />
      {children}
    </DesignPaletteProvider>
  );
}
