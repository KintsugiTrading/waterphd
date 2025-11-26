"use client"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "rise" | "fall"
}

export function WaterParticles() {
  // Particle effects are now handled within each section's canvas for better performance
  return null
}
