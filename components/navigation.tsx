"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#research", label: "Research" },
  { href: "/papers", label: "Papers" },
  { href: "/stream-trailer", label: "Stream Trailer" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        scrolled ? "bg-[#0a1628]/20 backdrop-blur-lg border-b border-white/10" : "bg-[#0a1628]/5 backdrop-blur-sm border-b border-white/5",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative transition-transform group-hover:scale-110 duration-300">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="navDropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
                    <stop offset="100%" stopColor="rgba(14, 116, 144, 0.9)" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 4 C20 4 8 20 8 26 C8 33 13 38 20 38 C27 38 32 33 32 26 C32 20 20 4 20 4"
                  fill="url(#navDropGradient)"
                />
                <ellipse cx="14" cy="22" rx="4" ry="6" fill="rgba(255,255,255,0.2)" />
              </svg>
            </div>
            <span className="text-lg font-extralight text-white tracking-wider">
              Water<span className="font-normal">PhD</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500",
            isOpen ? "max-h-64 opacity-100 mt-6" : "max-h-0 opacity-0",
          )}
        >
          <div className="flex flex-col gap-1 py-4 border-t border-slate-700/30">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
