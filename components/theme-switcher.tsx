"use client"

import { useContext } from "react"
import { ThemeContext } from "@/app/theme-context"

interface ThemeSwitcherProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeSwitcher({ isDark, onToggle }: ThemeSwitcherProps) {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input type="checkbox" checked={isDark} onChange={onToggle} className="sr-only" />
        <div
          className={`box block h-8 w-14 rounded-full transition-colors ${isDark ? "bg-foreground" : "bg-muted"}`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background transition-transform ${
            isDark ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </label>
  )
}

export default function ThemeSwitcherButton() {
  const context = useContext(ThemeContext)
  if (!context) return null
  return <ThemeSwitcher isDark={context.isDark} onToggle={context.toggleTheme} />
}
