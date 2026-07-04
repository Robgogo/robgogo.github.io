"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="data-theme"
    themes={["dracula", "gruvbox", "solarized"]}
    defaultTheme="dracula"
    enableSystem={false}
    disableTransitionOnChange={false}
  >
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </ThemeProvider>
);
