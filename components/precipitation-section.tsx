"use client"

import { useEffect, useRef, useState } from "react"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

export function PrecipitationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const setStage = useWaterCycleStore((state) => state.setStage)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setStage('precipitation')
        }
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [setStage])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-60px)",
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-7xl md:text-8xl font-extralight text-cyan-400/30">03</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-tight">
              Precipitation
            </h2>

            <p className="text-slate-300 text-xl leading-relaxed mb-6 max-w-lg">
              The culmination of the cycle returns water to the earth, nourishing life and completing the eternal
              journey.
            </p>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              My focus on flood control and sustainable water management aims to create real-world impact, helping
              communities adapt to changing climate patterns.
            </p>
          </div>

          {/* Right visual - Simplified */}
          <div
            className="relative transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(60px) scale(0.95)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">Returning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
