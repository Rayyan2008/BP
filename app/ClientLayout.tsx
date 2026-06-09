"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"
import { ThemeContext } from "@/app/theme-context"
import { AdminProvider } from "@/lib/admin-context"
import FloatingWhatsAppButton from "@/components/floating-whatsapp-button"
import MobileQuickContact from "@/components/mobile-quick-contact"

let lenis: any = null

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme")
    const isDarkMode = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    }

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    initLenis()
  }, [])

  useEffect(() => {
    let previousTitle = document.title

    const observer = new MutationObserver(() => {
      const currentTitle = document.title
      if (currentTitle !== previousTitle) {
        setIsLoading(false)
        previousTitle = currentTitle
      }
    })

    observer.observe(document.querySelector("head") || document.body, {
      subtree: true,
      childList: true,
    })

    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      if (link && !link.target && !link.hasAttribute("download")) {
        const href = link.getAttribute("href")
        if (href && !href.startsWith("#") && !href.startsWith("http")) {
          setIsLoading(true)
        }
      }
    }

    document.addEventListener("click", handleLinkClick, true)

    return () => {
      observer.disconnect()
      document.removeEventListener("click", handleLinkClick, true)
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) {
    return (
      <AdminProvider>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <div className="flex flex-col min-h-screen">{children}</div>
        </ThemeContext.Provider>
      </AdminProvider>
    )
  }

  return (
    <AdminProvider>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {isLoading && <div className="loading-bar" />}
        <div
          className={`flex flex-col min-h-screen animate-page-load transition-opacity duration-300 ${isLoading ? "opacity-75" : "opacity-100"}`}
        >
          {children}
        </div>
        <FloatingWhatsAppButton />
        <MobileQuickContact />
        <Analytics />
      </ThemeContext.Provider>
    </AdminProvider>
  )
}
