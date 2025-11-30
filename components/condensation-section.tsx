"use client"

import { useEffect, useRef, useState } from "react"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

export function CondensationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const setStage = useWaterCycleStore((state) => state.setStage)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setStage('condensation')
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
      <div className="relative w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left visual - Simplified */}
          <div
            className="relative order-2 lg:order-1 transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(-60px) scale(0.95)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Gathering</p>
              </div>
            </div>
          </div>

          {/* Right content - Glassmorphic card */}
          <div
            className="relative order-1 lg:order-2 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(60px)",
            }}
          >
            {/* Glass panel background */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-bl from-slate-900/5 via-slate-800/3 to-slate-900/5 backdrop-blur-sm rounded-3xl border border-white/3 shadow-2xl" />

            <div className="relative p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-l from-slate-400/60 via-slate-500/40 to-transparent" />
                <span className="text-7xl md:text-8xl font-extralight bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(148,163,184,0.3)]">02</span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-slate-800 mb-8 leading-tight" style={{ textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 20px rgba(148,163,184,0.1)' }}>
                Condensation
              </h2>

              <p className="text-slate-600 text-xl leading-relaxed mb-6 max-w-lg">
                Like water vapor gathering to form clouds, knowledge accumulates through dedicated research and
                collaboration.
              </p>

              <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                My work encompasses hydraulic modeling, remote sensing, machine learning, and the critical
                Water-Food-Energy Nexus that shapes our sustainable future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
