"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function EvaporationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight))
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          #0a1628 0%, 
          #0c4a6e 40%, 
          #0891b2 100%)`,
      }}
    >
      {/* Rising vapor particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 2.5) % 100}%`,
              bottom: `${-10 + (i % 3) * 5}%`,
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              background: `radial-gradient(circle, rgba(186, 230, 253, ${0.4 - (i % 4) * 0.08}) 0%, transparent 70%)`,
              animation: `float-up ${12 + (i % 8) * 2}s ease-out infinite`,
              animationDelay: `${(i % 12) * 0.8}s`,
            }}
          />
        ))}
      </div>

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

          {/* Right visual */}
          <div
            className="relative transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(60px) scale(0.95)",
            }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated rings */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: `rgba(56, 189, 248, ${0.3 - i * 0.06})`,
                    transform: `scale(${0.6 + i * 0.15})`,
                    animation: `pulse-ring ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {/* Animated water drop */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="dropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
                          <stop offset="100%" stopColor="rgba(14, 116, 144, 0.9)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M50 10 C50 10 20 50 20 65 C20 82 33 95 50 95 C67 95 80 82 80 65 C80 50 50 10 50 10"
                        fill="url(#dropGradient)"
                        className="animate-drop-morph"
                      />
                      <ellipse cx="35" cy="55" rx="8" ry="12" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">Rising Up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3) 50%, transparent)`,
        }}
      />
    </section>
  )
}
