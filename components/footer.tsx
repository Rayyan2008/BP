import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-logo text-3xl text-primary-foreground">Being Personalised</span>
            </Link>
            <p className="text-sm opacity-75">Thoughtfully crafted personalised gifts for life&apos;s most meaningful moments.</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold tracking-wide mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="#occasions" className="hover:opacity-100 transition-opacity">
                  Occasions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-100 transition-opacity">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100 transition-opacity">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a href="https://wa.me/916398765432" className="hover:opacity-100 transition-opacity">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold tracking-wide mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-75">
              <li>
                <Link href="/" className="hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold tracking-wide mb-4">Connect</h4>
            <p className="text-sm opacity-75 mb-4">Follow us for inspiration and special creations</p>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/beingpersonalised"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/916398765432"
                className="hover:opacity-75 transition-opacity"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground border-opacity-20 pt-8">
          <p className="text-sm text-center opacity-75 mb-2">© 2026 Being Personalised. All rights reserved.</p>
          <p className="text-sm text-center opacity-60 mb-3">
            Recreating memories with personalised products for all occasions.
          </p>
          <p className="text-xs text-center opacity-60">
            Website developed by{" "}
            <a
              href="https://www.sapotoinfosys.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity underline"
            >
              Sapoto Infosys
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
