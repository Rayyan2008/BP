"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { CONTACT_INFO, generateWhatsAppLink, trackContactAction } from "@/lib/contact-utils"

export default function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    trackContactAction("whatsapp_click", "floating-button")
    const whatsappLink = generateWhatsAppLink(CONTACT_INFO.whatsapp.number, CONTACT_INFO.whatsapp.message)
    window.open(whatsappLink, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Main floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="WhatsApp Chat"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Expanded menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-white dark:bg-card border border-border rounded-lg shadow-xl p-4 min-w-max space-y-3 animate-fade-up">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-sm">Quick Contact</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleWhatsAppClick}
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>

          <p className="text-xs text-muted-foreground p-2 bg-muted rounded">
            We typically respond within 2 hours during business hours.
          </p>
        </div>
      )}
    </div>
  )
}
