"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Linkedin, GraduationCap, BookOpen, ArrowUpRight } from "lucide-react"

const links = [
  {
    icon: GraduationCap,
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=R-3ENZoAAAAJ&hl=en&oi=ao",
  },
  {
    icon: BookOpen,
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Saeedeh-Abedzadeh",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:saeedeh.abedzadeh@okstate.edu",
  },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Flowing water animation at bottom
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = 200
    }
    resize()
    window.addEventListener("resize", resize)

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw flowing water waves
      for (let layer = 0; layer < 4; layer++) {
        const layerOffset = layer * 0.5
        const alpha = 0.08 + layer * 0.03

        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x <= canvas.width; x += 5) {
          const y =
            50 +
            Math.sin(x * 0.005 + time + layerOffset) * 15 +
            Math.sin(x * 0.01 + time * 1.3 + layerOffset) * 10 +
            layer * 25
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(56, 189, 248, ${alpha})`)
        gradient.addColorStop(1, `rgba(14, 116, 144, ${alpha + 0.05})`)
        ctx.fillStyle = gradient
        ctx.fill()
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
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: `linear-gradient(180deg, 
          #0f172a 0%, 
          #0a1628 50%,
          #071318 100%)`,
      }}
    >
      {/* Background glow effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 60%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(14, 116, 144, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        {/* Section header */}
        <div
          className="mb-16 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <p className="text-cyan-400/80 text-sm uppercase tracking-[0.4em] mb-8 font-light">Let&apos;s Connect</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-tight">
            Collaborate
            <br />
            With Me
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            I thrive in collaborative environments and am always eager to explore new frontiers in water resource
            management.
          </p>
        </div>

        {/* Contact links - Mont-Fort style cards */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 transition-all duration-1000 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 border border-slate-700/50 rounded-lg bg-slate-900/30 hover:bg-slate-800/50 hover:border-cyan-400/30 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/5 to-transparent" />

              <div className="relative flex flex-col items-center gap-4">
                <link.icon className="w-7 h-7 text-slate-500 group-hover:text-cyan-400 transition-colors duration-300" />
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">
                  {link.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 absolute top-0 right-0 transition-all duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* University affiliation */}
        <div
          className="transition-all duration-1000 delay-400"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="inline-block px-8 py-6 border border-slate-700/30 rounded-lg bg-slate-900/20">
            <p className="text-slate-500 text-sm uppercase tracking-[0.2em] mb-2">
              Biosystems and Agricultural Engineering
            </p>
            <p className="text-2xl font-extralight text-white">Oklahoma State University</p>
          </div>
        </div>
      </div>

      {/* Animated water at bottom */}
      <canvas ref={canvasRef} className="absolute bottom-0 left-0 right-0 h-[200px]" />
    </section>
  )
}
