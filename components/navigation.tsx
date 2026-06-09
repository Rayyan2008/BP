"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import ThemeSwitcher from "./theme-switcher"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#occasions", label: "Occasions" },
    { href: "/contact", label: "Enquire" },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Left side: Theme Switcher and Logo */}
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center">
              <ThemeSwitcher />
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center justify-center">
              <span className="font-logo text-2xl text-foreground leading-none">Being Personalised</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-muted-foreground transition-all duration-300 text-sm tracking-wide py-2 px-1 flex items-center"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 flex-shrink-0">
            <a
              href="https://wa.me/916398765432"
              className="hidden md:inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              WhatsApp
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground transition-all duration-300 hover:scale-110 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground hover:text-muted-foreground text-sm tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-border pt-4 space-y-2">
              <a
                href="https://wa.me/916398765432"
                className="block py-2 text-foreground hover:text-muted-foreground text-sm"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
