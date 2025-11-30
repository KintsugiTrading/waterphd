import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { EvaporationSection } from "@/components/evaporation-section"
import { CondensationSection } from "@/components/condensation-section"
import { PrecipitationSection } from "@/components/precipitation-section"
import { ResearchSection } from "@/components/research-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Scene } from "@/components/canvas/Scene"
import { ForegroundScene } from "@/components/canvas/ForegroundScene"

export default function Home() {
  return (
    <main className="relative">
      <Scene />
      <ForegroundScene />
      <Navigation />
      <HeroSection />
      <EvaporationSection />
      <CondensationSection />
      <PrecipitationSection />
      <ResearchSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
