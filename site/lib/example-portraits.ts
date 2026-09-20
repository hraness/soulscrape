export type ExamplePortrait =
  | Readonly<{ status: "available"; src: `/portraits/${string}.png` }>
  | Readonly<{ status: "unavailable"; reason: string; reviewedAt: string }>;

// A missing asset is a reviewed editorial decision, never an implicit default.
export const examplePortraits = {
  "patrick-collison": { status: "available", src: "/portraits/patrick-collison.png" },
  bjork: { status: "available", src: "/portraits/bjork.png" },
  "alan-kay": { status: "available", src: "/portraits/alan-kay.png" },
  "eugene-tssui": { status: "available", src: "/portraits/eugene-tssui.png" },
  "michael-levin": { status: "available", src: "/portraits/michael-levin.png" },
  "christopher-alexander": { status: "available", src: "/portraits/christopher-alexander.png" },
  "andrej-karpathy": { status: "available", src: "/portraits/andrej-karpathy.png" },
  "brian-eno": { status: "available", src: "/portraits/brian-eno.png" },
} as const satisfies Readonly<Record<string, ExamplePortrait>>;

export type ExamplePortraitHandle = keyof typeof examplePortraits;
