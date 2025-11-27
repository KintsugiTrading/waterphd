"use client"

import { useEffect, useState, useRef } from "react"
import { MousePointer } from "lucide-react"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

const cycleWords = [
  { word: "Evaporation", delay: 0 },
  { word: "Condensation", delay: 0.2 },
  { word: "Precipitation", delay: 0.4 },
  { word: "Collection", delay: 0.6 },
]

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const setStage = useWaterCycleStore((state) => state.setStage)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStage('hero')
        }
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [setStage])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div
        className="relative z-10 text-center px-6"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
          opacity: Math.max(0, 1 - scrollY / 400),
        }}
      >
        {/* Name header */}
        <div className="mb-12">
          <p
            className="text-cyan-400/80 uppercase tracking-[0.4em] text-xs mb-8 font-light"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s ease-out 0.3s",
            }}
          >
            PhD Candidate in Hydrology
          </p>

          <h1 className="mb-8">
            <span
              className="block text-6xl md:text-8xl lg:text-9xl font-extralight text-white tracking-tight"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s ease-out 0.5s",
              }}
            >
              Saeedeh
            </span>
            <span
              className="block text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight mt-2"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(40px)",
                transition: "all 1s ease-out 0.7s",
              }}
            >
              Abedzadeh
            </span>
          </h1>
        </div>

        {/* Water cycle words - Mont-Fort style stacked words */}
        <div className="flex flex-col items-center gap-1 mb-12">
          {cycleWords.map(({ word, delay }, index) => (
            <span
              key={word}
              className="text-lg md:text-xl font-extralight tracking-[0.2em] uppercase"
              style={{
                color: index === 0 ? "rgba(56, 189, 248, 0.9)" : "rgba(148, 163, 184, 0.6)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.8s ease-out ${0.9 + delay}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator - Mont-Fort style */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease-out 1.5s",
        }}
      >
        <div className="flex items-center gap-2 text-slate-400">
          <MousePointer className="w-4 h-4" />
          <span className="text-xs uppercase tracking-[0.3em]">Swipe down</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Scroll down to discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400/50 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 w-full bg-cyan-400 animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
