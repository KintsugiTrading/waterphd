"use client"

import { useEffect, useRef, useState } from "react"

export function CondensationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Cloud animation
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

    let animationId: number
    let time = 0

    const drawCloud = (x: number, y: number, size: number, alpha: number) => {
      ctx.beginPath()
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`)
      gradient.addColorStop(0.5, `rgba(226, 232, 240, ${alpha * 0.2})`)
      gradient.addColorStop(1, `rgba(226, 232, 240, 0)`)
      ctx.fillStyle = gradient
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw multiple cloud layers
      const clouds = [
        { x: 0.1, y: 0.2, size: 200, speed: 0.3, alpha: 0.6 },
        { x: 0.3, y: 0.35, size: 180, speed: 0.2, alpha: 0.5 },
        { x: 0.5, y: 0.15, size: 220, speed: 0.25, alpha: 0.7 },
        { x: 0.7, y: 0.4, size: 160, speed: 0.35, alpha: 0.4 },
        { x: 0.85, y: 0.25, size: 190, speed: 0.15, alpha: 0.55 },
        { x: 0.2, y: 0.5, size: 150, speed: 0.28, alpha: 0.45 },
        { x: 0.6, y: 0.55, size: 170, speed: 0.22, alpha: 0.5 },
        { x: 0.9, y: 0.6, size: 140, speed: 0.3, alpha: 0.4 },
      ]

      clouds.forEach((cloud) => {
        const x = ((cloud.x * canvas.width + time * 50 * cloud.speed) % (canvas.width + 400)) - 200
        const y = cloud.y * canvas.height + Math.sin(time + cloud.x * 10) * 20

        // Draw cluster of circles for fluffy cloud effect
        drawCloud(x, y, cloud.size, cloud.alpha)
        drawCloud(x - cloud.size * 0.5, y + cloud.size * 0.2, cloud.size * 0.7, cloud.alpha * 0.8)
        drawCloud(x + cloud.size * 0.6, y + cloud.size * 0.1, cloud.size * 0.6, cloud.alpha * 0.7)
        drawCloud(x - cloud.size * 0.2, y - cloud.size * 0.3, cloud.size * 0.5, cloud.alpha * 0.6)
        drawCloud(x + cloud.size * 0.3, y - cloud.size * 0.2, cloud.size * 0.55, cloud.alpha * 0.65)
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
          #0891b2 0%, 
          #7dd3fc 30%,
          #e0f2fe 60%,
          #f8fafc 100%)`,
      }}
    >
      {/* Animated clouds canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left visual */}
          <div
            className="relative order-2 lg:order-1 transition-all duration-1000 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0) scale(1)" : "translateX(-60px) scale(0.95)",
            }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Cloud formation visual */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${120 - i * 15}%`,
                    height: `${120 - i * 15}%`,
                    left: `${-10 + i * 7.5}%`,
                    top: `${-10 + i * 7.5}%`,
                    background: `radial-gradient(circle, rgba(148, 163, 184, ${0.15 - i * 0.02}) 0%, transparent 70%)`,
                    animation: `cloud-pulse ${4 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(100, 116, 139, 0.8)" />
                          <stop offset="100%" stopColor="rgba(71, 85, 105, 0.6)" />
                        </linearGradient>
                      </defs>
                      <ellipse cx="50" cy="55" rx="35" ry="20" fill="url(#cloudGradient)" />
                      <circle cx="35" cy="45" r="18" fill="url(#cloudGradient)" />
                      <circle cx="55" cy="40" r="22" fill="url(#cloudGradient)" />
                      <circle cx="70" cy="50" r="15" fill="url(#cloudGradient)" />
                    </svg>
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Gathering</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div
            className="order-1 lg:order-2 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(60px)",
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-l from-slate-400/50 to-transparent" />
              <span className="text-7xl md:text-8xl font-extralight text-slate-400/40">02</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-slate-700 mb-8 leading-tight">
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

      {/* Decorative gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.4) 50%, transparent)`,
        }}
      />
    </section>
  )
}
