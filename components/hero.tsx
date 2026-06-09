"use client"

export default function Hero() {
  return (
    <section className="bg-background py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight text-balance leading-tight">
            Turning Moments Into Memories
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance font-light">
            Thoughtfully crafted personalised gifts designed to celebrate life&apos;s most meaningful occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href="#occasions"
              className="px-8 py-3 bg-primary text-primary-foreground font-medium tracking-wider hover:opacity-90 transition-opacity"
            >
              View Our Work
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors font-medium tracking-wider"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Item 1 */}
          <div className="group cursor-pointer">
            <div className="bg-card h-64 md:h-80 mb-4 flex items-center justify-center overflow-hidden rounded-lg relative">
              <img src="/custom-frames.png" alt="Custom Photo Frames" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-light text-foreground tracking-wide">Custom Photo Frames</h3>
            <p className="text-sm text-muted-foreground mt-2">Preserve cherished moments beautifully</p>
          </div>

          {/* Featured Item 2 */}
          <div className="group cursor-pointer">
            <div className="bg-card h-64 md:h-80 mb-4 flex items-center justify-center overflow-hidden rounded-lg relative">
              <img src="/gift-boxes.png" alt="Personalized Gift Boxes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-light text-foreground tracking-wide">Personalized Gift Boxes</h3>
            <p className="text-sm text-muted-foreground mt-2">Beautifully presented, carefully curated</p>
          </div>

          {/* Featured Item 3 */}
          <div className="group cursor-pointer">
            <div className="bg-card h-64 md:h-80 mb-4 flex items-center justify-center overflow-hidden rounded-lg relative">
              <img src="/name-plaques.png" alt="Custom Name Plaques" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-light text-foreground tracking-wide">Custom Name Plaques</h3>
            <p className="text-sm text-muted-foreground mt-2">Personalized touches that last forever</p>
          </div>
        </div>
      </div>
    </section>
  )
}
