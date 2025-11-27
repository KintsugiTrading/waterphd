"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

export function EvaporationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const setStage = useWaterCycleStore((state) => state.setStage)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          setStage('evaporation')
        }
      },
      { threshold: 0.5 }, // Trigger when 50% visible
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
              <span className="text-7xl md:text-8xl font-extralight text-cyan-400/30">01</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-tight">
              Evaporation
            </h2>

            <p className="text-slate-300/90 text-xl leading-relaxed mb-6 max-w-lg">
              Just as water rises from oceans and lakes, my research journey began with a deep curiosity about
              sustainable water resource management.
            </p>

            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              At Oklahoma State University, I study innovative approaches to flood control through regenerative
              agricultural practices in the Southern Great Plains, USA.
            </p>

            <Link
              href="#research"
              className="group inline-flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span className="text-sm uppercase tracking-[0.2em]">Learn more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Right visual - Simplified or removed since we have 3D bg now */}
          {/* We can keep a subtle indicator or remove it entirely to let the 3D shine. 
              I'll keep a minimal version of the text indicator but remove the heavy 2D graphics. */}
          <div
            className="relative transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(60px) scale(0.95)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">Rising Up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
