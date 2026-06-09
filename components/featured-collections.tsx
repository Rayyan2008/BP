"use client"

import Link from "next/link"
import Image from "next/image"
import { useAdmin } from "@/lib/admin-context"

interface Collection {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  link: string
}

export default function FeaturedCollections() {
  const occasions = [
    {
      id: "1",
      name: "Anniversaries",
      tagline: "Celebrate Your Love Story",
      description: "Personalized gifts that commemorate years of love and cherished moments together.",
      image: "/anniversary.png",
      link: "/contact",
    },
    {
      id: "2",
      name: "Birthdays",
      tagline: "Make Their Day Special",
      description: "Custom creations designed to make every birthday unforgettable and deeply personal.",
      image: "/birthday.png",
      link: "/contact",
    },
  ]

  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-logo mb-4">Perfect For Every Occasion</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our personalized gifts designed to celebrate life&apos;s most meaningful moments with elegance and thoughtfulness.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {occasions.map((occasion) => (
            <Link
              key={occasion.id}
              href={occasion.link}
              className="group relative overflow-hidden rounded-lg h-96 bg-muted hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={occasion.image || "/placeholder.svg"}
                alt={occasion.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">Occasion</p>
                  <h3 className="text-3xl font-logo text-white mb-2 group-hover:translate-y-[-4px] transition">
                    {occasion.name}
                  </h3>
                  <p className="text-white/90 mb-4">{occasion.tagline}</p>
                  <p className="text-white/75 text-sm leading-relaxed">{occasion.description}</p>
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
