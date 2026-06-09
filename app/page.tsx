import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import CategoryShowcase from "@/components/category-showcase"
import FeaturedCollections from "@/components/featured-collections"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <FeaturedCollections />
        <CategoryShowcase />
      </main>
      <Footer />
    </>
  )
}
