import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const footerLinks = [
  { label: "Contact", href: "#contact" },
  { label: "Research", href: "#research" },
  { label: "Papers", href: "/papers" },
]

export function Footer() {
  return (
    <footer className="relative z-[60] py-8 text-center text-slate-500 text-sm font-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <defs>
                  <linearGradient id="footerDropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
                    <stop offset="100%" stopColor="rgba(14, 116, 144, 0.9)" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 4 C20 4 8 20 8 26 C8 33 13 38 20 38 C27 38 32 33 32 26 C32 20 20 4 20 4"
                  fill="url(#footerDropGradient)"
                />
              </svg>
            </div>
            <span className="text-lg font-extralight text-white tracking-wider">
              Water<span className="font-normal">PhD</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
              >
                {link.label}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600">&copy; {new Date().getFullYear()} Saeedeh Abedzadeh</p>
        </div>
      </div>
    </footer>
  )
}
