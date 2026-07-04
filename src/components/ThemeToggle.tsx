"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEMES = ["dracula", "gruvbox", "solarized"] as const;

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted && theme ? theme : "dracula";
  const next = THEMES[(THEMES.indexOf(current as any) + 1) % THEMES.length];

  return (
    <button
      onClick={() => setTheme(next)}
      title={`Switch theme to ${next}`}
      className="text-xs border border-term-border rounded px-2 py-1 text-term-muted hover:text-term-fg hover:border-term-accent transition-colors"
    >
      <span className="text-term-accent">--theme=</span>
      {mounted ? current : "…"}
    </button>
  );
};
