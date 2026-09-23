"use client";

import { attachFoil } from "@hraness/design-kit/browser";
import {
  DesignPaletteProvider,
  StickyOffsetSync,
  ThemeColorSync,
} from "@hraness/design-kit/react";
import { useEffect, type ReactNode } from "react";

/** Pointer-tracked metallic foil on the brand lockup and primary actions. */
function FoilSync() {
  useEffect(() => attachFoil(document.documentElement), []);
  return null;
}

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
      <StickyOffsetSync />
      <FoilSync />
      {children}
    </DesignPaletteProvider>
  );
}
