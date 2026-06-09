import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <section className="bg-background py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-8 text-balance">
              About Being Personalised
            </h1>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                We believe every celebration deserves something meaningful. Being Personalised specializes in creating thoughtful, customised gifts that capture emotions and preserve meaningful memories. The brand focuses on handcrafted, personalised products designed for birthdays, anniversaries, weddings, baby showers, festive occasions, and corporate gifting.
              </p>
              <p>
                Each gift is meticulously crafted with care and attention to detail. We understand that the best gifts aren&apos;t just objects—they&apos;re tokens of love and connection. From custom photo frames to personalized gift boxes and name plaques, every creation is designed to be treasured and remembered.
              </p>
              <p>
                Our mission is to help you celebrate life&apos;s most precious moments by creating personalised keepsakes that bring smiles that last forever. Whether you&apos;re marking an anniversary, celebrating a birthday, or commemorating a special milestone, we&apos;re here to turn your ideas into beautiful, lasting memories.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-card py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-12 text-balance">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-light text-foreground mb-3 tracking-wide">Handmade with Care</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each gift is crafted with attention to detail and genuine love for what we create.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-light text-foreground mb-3 tracking-wide">Fully Personalised</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Customized to reflect the unique bond and story shared between giver and receiver.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-light text-foreground mb-3 tracking-wide">Quality & Durability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Premium materials and meticulous craftsmanship ensure your gifts last forever.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
