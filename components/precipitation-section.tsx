"use client"

import { useEffect, useRef, useState } from "react"

export function PrecipitationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Rain animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    interface Raindrop {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
    }

    const raindrops: Raindrop[] = []
    const numDrops = 150

    for (let i = 0; i < numDrops; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 15 + Math.random() * 25,
        speed: 8 + Math.random() * 12,
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      raindrops.forEach((drop) => {
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x + 1, drop.y + drop.length)

        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length)
        gradient.addColorStop(0, `rgba(186, 230, 253, 0)`)
        gradient.addColorStop(0.5, `rgba(186, 230, 253, ${drop.opacity})`)
        gradient.addColorStop(1, `rgba(56, 189, 248, ${drop.opacity * 0.5})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"
        ctx.stroke()

        // Update position
        drop.y += drop.speed
        drop.x += 0.5 // Slight wind effect

        // Reset when off screen
        if (drop.y > canvas.height) {
          drop.y = -drop.length
          drop.x = Math.random() * canvas.width
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          #f8fafc 0%, 
          #94a3b8 20%,
          #475569 60%,
          #1e293b 100%)`,
      }}
    >
      {/* Rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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

          {/* Right visual */}
          <div
            className="relative transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(60px) scale(0.95)",
            }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Ripple effects */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-cyan-400/20"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${60 + i * 25}%`,
                    height: `${60 + i * 25}%`,
                    transform: "translate(-50%, -50%)",
                    animation: `ripple ${2 + i * 0.3}s ease-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}

              {/* Center raindrop */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-bounce-slow">
                      <defs>
                        <linearGradient id="rainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(186, 230, 253, 0.9)" />
                          <stop offset="100%" stopColor="rgba(56, 189, 248, 0.8)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M50 5 C50 5 15 55 15 70 C15 88 30 98 50 98 C70 98 85 88 85 70 C85 55 50 5 50 5"
                        fill="url(#rainGradient)"
                      />
                      <ellipse cx="32" cy="60" rx="10" ry="15" fill="rgba(255,255,255,0.25)" />
                    </svg>
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">Returning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
