"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { MessageCircle, Instagram, Mail, CheckCircle } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import { CONTACT_METHODS, BUDGET_RANGES, DELIVERY_TIMEFRAMES, trackContactAction } from "@/lib/contact-utils"

export default function ContactPage() {
  const { addEnquiry } = useAdmin()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    trackContactAction("form_submit", "contact-page")

    const formData = new FormData(e.currentTarget)
    const enquiry = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      occasion: formData.get("occasion") as string,
      deliveryDate: formData.get("delivery-date") as string,
      message: formData.get("message") as string,
    }

    addEnquiry(enquiry)
    setSubmitted(true)
    setLoading(false)

    setTimeout(() => {
      setSubmitted(false)
      e.currentTarget.reset()
    }, 3000)
  }

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-background py-12 md:py-16 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4 text-balance">
              Let&apos;s Create Something Special
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Tell us about your occasion and vision. We&apos;re here to bring your personalised gift ideas to life with care and creativity.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-card py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight text-center mb-12 text-balance">
              Inquiry Form
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">Thank you for your enquiry!</p>
                  <p className="text-sm">We&apos;ll review it and get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label htmlFor="occasion" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Occasion
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select an occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="wedding">Wedding</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="festive">Festive Celebrations</option>
                  <option value="corporate">Corporate Gifting</option>
                  <option value="farewell">Farewell Gift</option>
                  <option value="milestone">Special Milestone</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Preferred Delivery Date */}
              <div>
                <label htmlFor="delivery-date" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  id="delivery-date"
                  name="delivery-date"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label htmlFor="contact-method" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Preferred Contact Method (Optional)
                </label>
                <select
                  id="contact-method"
                  name="contact-method"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">No Preference</option>
                  {Object.entries(CONTACT_METHODS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Budget Range (Optional)
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a range</option>
                  {Object.entries(BUDGET_RANGES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Timeframe */}
              <div>
                <label htmlFor="timeframe" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Preferred Timeframe (Optional)
                </label>
                <select
                  id="timeframe"
                  name="timeframe"
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a timeframe</option>
                  {Object.entries(DELIVERY_TIMEFRAMES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-light text-foreground mb-2 tracking-wide">
                  Your Vision & Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about your vision... What makes this occasion special? Any specific details, photos, or preferences you&apos;d like to include?"
                  required
                />
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium tracking-wide disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
            </form>

            {/* Note */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              We&apos;ll review your inquiry and get back to you within 24 hours. For fastest responses, reach out via WhatsApp.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="bg-background py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* WhatsApp */}
              <div className="bg-card p-8 flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground p-4 rounded-full mb-4">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 tracking-wide">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Instant support for quick responses about your personalised gift inquiries
                </p>
                <a
                  href="https://wa.me/916398765432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm tracking-wide"
                >
                  Chat Now
                </a>
              </div>

              {/* Instagram */}
              <div className="bg-card p-8 flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground p-4 rounded-full mb-4">
                  <Instagram size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 tracking-wide">Instagram</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Follow @beingpersonalised for inspiration and showcases of our beautiful creations
                </p>
                <a
                  href="https://www.instagram.com/beingpersonalised"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm tracking-wide"
                >
                  Follow Now
                </a>
              </div>

              {/* Email */}
              <div className="bg-card p-8 flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground p-4 rounded-full mb-4">
                  <Mail size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 tracking-wide">Email</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  For detailed inquiries and bulk custom order requests
                </p>
                <a
                  href="mailto:hello@beingpersonalised.com"
                  className="inline-block px-6 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium text-sm tracking-wide"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
