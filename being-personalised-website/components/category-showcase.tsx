"use client"

import Link from "next/link"

export default function CategoryShowcase() {
  return (
    <div className="bg-background py-16" id="occasions">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-logo mb-4">Our Signature Occasions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From birthdays to weddings, we create personalized keepsakes for every milestone and celebration.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Link
            href="/contact"
            className="group relative h-64 rounded-lg overflow-hidden bg-muted hover:shadow-xl transition"
          >
            <img src="/wedding.png" alt="Wedding keepsakes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-logo text-white mb-2 group-hover:translate-x-2 transition">
                  Weddings
                </h3>
                <p className="text-white/80 text-sm">Custom keepsakes for your special day</p>
              </div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="group relative h-64 rounded-lg overflow-hidden bg-muted hover:shadow-xl transition"
          >
            <img src="/baby-shower.png" alt="Baby shower gifts" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-logo text-white mb-2 group-hover:translate-x-2 transition">
                  Baby Showers
                </h3>
                <p className="text-white/80 text-sm">Adorable personalized gifts for new arrivals</p>
              </div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="group relative h-64 rounded-lg overflow-hidden bg-muted hover:shadow-xl transition"
          >
            <img src="/corporate.png" alt="Corporate gifts" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-logo text-white mb-2 group-hover:translate-x-2 transition">
                  Corporate Gifting
                </h3>
                <p className="text-white/80 text-sm">Elegant gifts that impress</p>
              </div>
            </div>
          </Link>
        </div>

        {/* How It Works Section */}
        <div className="bg-card rounded-lg p-12 md:p-16 mt-20">
          <h2 className="text-3xl font-logo mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                1
              </div>
              <h4 className="font-semibold mb-2">Share Your Idea</h4>
              <p className="text-sm text-muted-foreground">Tell us your occasion and vision</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                2
              </div>
              <h4 className="font-semibold mb-2">Personalise Your Gift</h4>
              <p className="text-sm text-muted-foreground">Choose names, photos, and custom details</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                3
              </div>
              <h4 className="font-semibold mb-2">Approve the Design</h4>
              <p className="text-sm text-muted-foreground">Review your concept before production</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-semibold text-lg">
                4
              </div>
              <h4 className="font-semibold mb-2">Receive With Love</h4>
              <p className="text-sm text-muted-foreground">Your handcrafted gift delivered with care</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-logo mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg hover:bg-card transition">
              <h3 className="font-semibold mb-2">Handmade with Care</h3>
              <p className="text-sm text-muted-foreground">Each gift is crafted with attention to detail and love</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:bg-card transition">
              <h3 className="font-semibold mb-2">Fully Personalised</h3>
              <p className="text-sm text-muted-foreground">Customized to reflect the unique bond you share</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:bg-card transition">
              <h3 className="font-semibold mb-2">Attention to Detail</h3>
              <p className="text-sm text-muted-foreground">Quality materials and meticulous craftsmanship</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:bg-card transition">
              <h3 className="font-semibold mb-2">Reliable Support</h3>
              <p className="text-sm text-muted-foreground">Fast responses and dedicated customer care</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:bg-card transition">
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Products made to celebrate special moments</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:bg-card transition">
              <h3 className="font-semibold mb-2">Timeless Keepsakes</h3>
              <p className="text-sm text-muted-foreground">Gifts that preserve memories forever</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
