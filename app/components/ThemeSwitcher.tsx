"use client";
import { useEffect, useState } from "react";

const themes = [
  {
    name: "Solarized Dark",
    key: "solarized-dark",
    className: "theme-solarized-dark",
  },
  {
    name: "Lunar Dark",
    key: "dark",
    className: "theme-dark",
  },
  {
    name: "Solarized Light",
    key: "solarized-light",
    className: "theme-solarized-light",
  },
  {
    name: "Lunar Light",
    key: "light",
    className: "theme-light",
  },
  {
    name: "Particles (Animated)",
    key: "particles",
    className: "theme-particles",
  },
];

export default function ThemeSwitcher() {
  // Hydration-safe theme state
  const [theme, setTheme] = useState<number | null>(null);

  // On mount, set theme from localStorage or default
  useEffect(() => {
    const stored = window.localStorage.getItem("theme-index");
    const initial = stored ? parseInt(stored, 10) : 0;
    setTheme(initial);
  }, []);

  // Update <body> class and persist theme
  useEffect(() => {
    if (theme === null) return;
    const body = document.body;
    themes.forEach((t) => body.classList.remove(t.className));
    body.classList.add(themes[theme].className);
    window.localStorage.setItem("theme-index", String(theme));
  }, [theme]);

  if (theme === null) return null;

  return (
    <div className="flex gap-2 items-center">
      <select
        id="theme-select"
        className="px-3 py-1 rounded border text-xs font-medium focus:outline-none transition-colors"
        style={{
          background: "var(--background)",
          color: "var(--accent)",
          borderColor: "var(--accent)",
        }}
        value={theme}
        onChange={e => setTheme(Number(e.target.value))}
        aria-label="Select theme"
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-strong)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onBlur={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-strong, transparent)'}
      >
        {themes.map((t, i) => (
          <option key={t.key} value={i} style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}>{t.name}</option>
        ))}
      </select>
    </div>
  );
}
