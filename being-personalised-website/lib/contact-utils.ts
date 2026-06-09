// Contact information and utilities for Being Personalised

export const CONTACT_INFO = {
  whatsapp: {
    number: "+916398765432",
    message: "Hi! I would love to know more about your personalised gifts.",
    label: "WhatsApp Chat",
  },
  phone: {
    number: "+44 XXXXX XXXXX", // Placeholder
    label: "Call Us",
  },
  email: {
    address: "hello@beingpersonalised.com",
    label: "Email Us",
  },
  instagram: {
    handle: "@beingpersonalised",
    url: "https://www.instagram.com/beingpersonalised",
    label: "Follow on Instagram",
  },
  social: {
    instagram: "https://www.instagram.com/beingpersonalised",
  },
}

// Analytics tracking helper
export const trackContactAction = (
  action: "whatsapp_click" | "phone_click" | "email_click" | "instagram_click" | "form_submit",
  source: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: "contact",
      event_label: source,
      timestamp: new Date().toISOString(),
    })
  }
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${action} from ${source}`)
  }
}

// Contact source tracking
export const getContactSource = (pathname: string): string => {
  if (pathname.includes("/contact")) return "contact-page"
  if (pathname === "/") return "homepage"
  if (pathname.includes("/about")) return "about-page"
  if (pathname.includes("/admin")) return "admin-panel"
  return "navigation"
}

// WhatsApp link generator
export const generateWhatsAppLink = (phone: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message)
  const cleanPhone = phone.replace(/\D/g, "")
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

// Email link generator
export const generateEmailLink = (email: string, subject?: string, body?: string): string => {
  const params = new URLSearchParams()
  if (subject) params.append("subject", subject)
  if (body) params.append("body", body)
  const queryString = params.toString()
  return `mailto:${email}${queryString ? "?" + queryString : ""}`
}

// Contact method types for forms
export type ContactMethod = "whatsapp" | "phone" | "email" | "instagram" | "no-preference"

export const CONTACT_METHODS = {
  whatsapp: "WhatsApp",
  phone: "Phone Call",
  email: "Email",
  instagram: "Instagram DM",
  "no-preference": "No Preference",
} as const

// Budget range options
export const BUDGET_RANGES = {
  "under-50": "Under £50",
  "50-100": "£50 - £100",
  "100-250": "£100 - £250",
  "250-500": "£250 - £500",
  "500-1000": "£500 - £1000",
  "over-1000": "Over £1000",
  "not-sure": "Not Sure Yet",
} as const

// Delivery timeframe options
export const DELIVERY_TIMEFRAMES = {
  "urgent": "ASAP (within 7 days)",
  "soon": "1-2 weeks",
  "flexible": "Flexible (2-4 weeks)",
  "plenty-of-time": "Plenty of time (1+ month)",
} as const
