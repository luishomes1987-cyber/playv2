import { FiveMHeader } from "@/components/fivem-header"
import { FiveMFooter } from "@/components/fivem-footer"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedProductsSection } from "@/components/featured-products-section"
import { ServerInfoSection } from "@/components/server-info-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FiveMHeader />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <FeaturedProductsSection />
        <ServerInfoSection />
        <StatsSection />
      </main>

      <FiveMFooter />
    </div>
  )
}
