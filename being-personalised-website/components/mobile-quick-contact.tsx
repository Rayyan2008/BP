"use client"

import { MessageCircle, Phone, Mail, Instagram } from "lucide-react"
import { CONTACT_INFO, trackContactAction, generateWhatsAppLink, generateEmailLink } from "@/lib/contact-utils"

export default function MobileQuickContact() {
  const handleWhatsAppClick = () => {
    trackContactAction("whatsapp_click", "mobile-quick-contact")
    const link = generateWhatsAppLink(CONTACT_INFO.whatsapp.number, CONTACT_INFO.whatsapp.message)
    window.open(link, "_blank")
  }

  const handlePhoneClick = () => {
    trackContactAction("phone_click", "mobile-quick-contact")
    window.location.href = `tel:${CONTACT_INFO.phone.number}`
  }

  const handleEmailClick = () => {
    trackContactAction("email_click", "mobile-quick-contact")
    const link = generateEmailLink(CONTACT_INFO.email.address, "Enquiry from Being Personalised")
    window.location.href = link
  }

  const handleInstagramClick = () => {
    trackContactAction("instagram_click", "mobile-quick-contact")
    window.open(CONTACT_INFO.instagram.url, "_blank")
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-background/80 border-t border-border p-3 z-30">
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleWhatsAppClick}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          title="WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden xs:inline">Chat</span>
        </button>

        <button
          onClick={handlePhoneClick}
          className="flex-1 bg-primary hover:opacity-90 text-primary-foreground py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          title="Call"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden xs:inline">Call</span>
        </button>

        <button
          onClick={handleEmailClick}
          className="flex-1 bg-primary hover:opacity-90 text-primary-foreground py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          title="Email"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden xs:inline">Email</span>
        </button>

        <button
          onClick={handleInstagramClick}
          className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          title="Instagram"
        >
          <Instagram className="w-4 h-4" />
          <span className="hidden xs:inline">Follow</span>
        </button>
      </div>
    </div>
  )
}
