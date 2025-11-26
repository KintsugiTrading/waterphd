"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const researchAreas = [
  {
    number: "01",
    title: "Flood Control",
    subtitle: "Regenerative Agricultural Practices",
    description: "Innovative approaches through regenerative agricultural practices in the Southern Great Plains",
    link: "/papers#flood-control",
  },
  {
    number: "02",
    title: "Climate Change",
    subtitle: "Hydrological Intensification",
    description: "Impacts and hydrological intensification studies under changing climate scenarios",
    link: "/papers#climate",
  },
  {
    number: "03",
    title: "Hydraulic Modeling",
    subtitle: "Advanced Simulation",
    description: "Advanced hydrologic and hydraulic simulation techniques for water systems",
    link: "/papers#modeling",
  },
  {
    number: "04",
    title: "Machine Learning",
    subtitle: "AI & Remote Sensing",
    description: "Remote sensing and AI for innovative water resource management solutions",
    link: "/papers#ml",
  },
]

export function ResearchSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="research"
      className="relative min-h-screen py-32"
      style={{
        background: `linear-gradient(180deg, 
          #1e293b 0%, 
          #0f172a 100%)`,
      }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className="mb-20 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <p className="text-cyan-400/80 text-sm uppercase tracking-[0.4em] mb-6 font-light">Research Areas</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 max-w-3xl leading-tight">
            Exploring the frontiers of water science
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            My interdisciplinary research connects hydrology, sustainability, and technology to address the world&apos;s
            most pressing water challenges.
          </p>
        </div>

        {/* Research cards - Mont-Fort style numbered grid */}
        <div className="grid md:grid-cols-2 gap-px bg-slate-700/30 rounded-lg overflow-hidden">
          {researchAreas.map((area, index) => (
            <Link
              key={area.number}
              href={area.link}
              className="group relative bg-slate-900/80 p-10 md:p-14 transition-all duration-500 hover:bg-slate-800/90"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover gradient effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(600px circle at ${hoveredCard === index ? "50% 50%" : "100% 100%"}, rgba(56, 189, 248, 0.06), transparent 40%)`,
                }}
              />

              <div className="relative">
                {/* Number and arrow row */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-5xl md:text-6xl font-extralight text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors">
                    {area.number}
                  </span>
                  <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-light text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {area.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-400/60 mb-4">{area.subtitle}</p>

                {/* Description */}
                <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                  {area.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div
          className="mt-16 flex justify-center transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "500ms",
          }}
        >
          <Link
            href="/papers"
            className="group inline-flex items-center gap-4 text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-sm uppercase tracking-[0.3em]">View All Publications</span>
            <div className="w-12 h-px bg-slate-600 group-hover:bg-cyan-400 group-hover:w-20 transition-all duration-300" />
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
