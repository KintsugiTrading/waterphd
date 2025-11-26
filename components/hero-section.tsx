"use client"

import { useEffect, useState, useRef } from "react"
import { MousePointer } from "lucide-react"

const cycleWords = [
  { word: "Evaporation", delay: 0 },
  { word: "Condensation", delay: 0.2 },
  { word: "Precipitation", delay: 0.4 },
  { word: "Collection", delay: 0.6 },
]

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animated water surface with WebGL-like effect
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

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated wave layers
      for (let layer = 0; layer < 5; layer++) {
        const layerOffset = layer * 0.3
        const alpha = 0.03 + layer * 0.015

        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height * 0.7 +
            Math.sin(x * 0.003 + time + layerOffset) * 30 +
            Math.sin(x * 0.007 + time * 1.5 + layerOffset) * 20 +
            Math.cos(x * 0.005 + time * 0.8 + layerOffset) * 15 +
            layer * 20
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height)
        gradient.addColorStop(0, `rgba(56, 189, 248, ${alpha})`)
        gradient.addColorStop(1, `rgba(14, 116, 144, ${alpha + 0.05})`)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Draw floating particles rising up (evaporation effect)
      for (let i = 0; i < 50; i++) {
        const x = (i * 37 + time * 30) % canvas.width
        const baseY = canvas.height * 0.75
        const y = baseY - ((time * 50 + i * 20) % (canvas.height * 0.5))
        const size = 2 + Math.sin(i + time) * 1
        const alpha = 0.3 - ((baseY - y) / (canvas.height * 0.5)) * 0.3

        if (alpha > 0) {
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`
          ctx.fill()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(14, 116, 144, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% -20%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)
          `,
        }}
      />

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
