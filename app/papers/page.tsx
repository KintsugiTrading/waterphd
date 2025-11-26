import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, ExternalLink, FileText } from "lucide-react"
import Link from "next/link"

const publications = [
  {
    category: "Flood Control",
    id: "flood-control",
    papers: [
      {
        title: "Innovative Flood Control Through Regenerative Agricultural Practices",
        journal: "Journal of Hydrology",
        year: "2024",
        description: "Exploring sustainable flood mitigation strategies in the Southern Great Plains",
        link: "#",
      },
      {
        title: "Hydrological Intensification and Agricultural Watershed Management",
        journal: "Water Resources Research",
        year: "2023",
        description: "Analysis of changing precipitation patterns and their impact on agricultural systems",
        link: "#",
      },
    ],
  },
  {
    category: "Climate Change",
    id: "climate",
    papers: [
      {
        title: "Climate Change Impacts on Water Resources in Semi-Arid Regions",
        journal: "Climate Dynamics",
        year: "2024",
        description: "Long-term projections of water availability under various climate scenarios",
        link: "#",
      },
    ],
  },
  {
    category: "Hydraulic Modeling",
    id: "modeling",
    papers: [
      {
        title: "Advanced Hydraulic Modeling for Irrigation System Design",
        journal: "Agricultural Water Management",
        year: "2023",
        description: "Optimization techniques for efficient water distribution systems",
        link: "#",
      },
      {
        title: "Surface Runoff Prediction Using Coupled Hydrologic-Hydraulic Models",
        journal: "Journal of Hydrologic Engineering",
        year: "2022",
        description: "Integration of multiple modeling approaches for improved accuracy",
        link: "#",
      },
    ],
  },
  {
    category: "Machine Learning",
    id: "ml",
    papers: [
      {
        title: "Remote Sensing and Machine Learning for Groundwater Mapping",
        journal: "Remote Sensing of Environment",
        year: "2024",
        description: "Novel approaches to identify subsurface water resources",
        link: "#",
      },
      {
        title: "AI-Driven Decision Support for Water Resource Management",
        journal: "Environmental Modelling & Software",
        year: "2023",
        description: "Uncertainty quantification in water management decisions",
        link: "#",
      },
    ],
  },
]

export default function PapersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-16">
            <span className="text-primary text-sm uppercase tracking-[0.3em] mb-4 block font-light">Publications</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground mb-6">Research Papers</h1>
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              A collection of my published research in water resources management, hydrology, and environmental science.
            </p>
          </div>

          {publications.map((category) => (
            <div key={category.id} id={category.id} className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-light text-foreground mb-8 pb-4 border-b border-border/30">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.papers.map((paper, index) => (
                  <a
                    key={index}
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-6 bg-card border border-border/30 rounded-lg hover:border-primary/30 hover:bg-card/80 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {paper.journal} &middot; {paper.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-light text-foreground group-hover:text-primary transition-colors mb-2">
                          {paper.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{paper.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
