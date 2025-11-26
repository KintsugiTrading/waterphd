"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { Water } from "./Water"
import { Terrain } from "./Terrain"
import { Clouds } from "./Clouds"
import { WheatField } from "./WheatField"
import { Vapor } from "./Vapor"
import { Rain } from "./Rain"
import { Environment } from "@react-three/drei"

function ScrollManager({ setSection }: { setSection: (s: number) => void }) {
  useFrame(() => {
    const scrollY = window.scrollY
    const height = window.innerHeight
    // Rough estimate of sections based on 100vh height
    // 0: Hero, 1: Evaporation, 2: Condensation, 3: Precipitation
    const section = Math.floor((scrollY + height * 0.5) / height)
    setSection(section)
  })
  return null
}

export function Scene() {
  const [section, setSection] = useState(0)

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <ScrollManager setSection={setSection} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          {/* Global elements */}
          <Water />
          <Terrain />

          {/* Section specific elements */}
          <group visible={section === 1}>
            <WheatField />
            <Vapor />
          </group>

          <group visible={section === 2}>
            <Clouds />
          </group>

          <group visible={section === 3}>
            <Rain />
            {/* Darker atmosphere for rain */}
            {section === 3 && <color attach="background" args={["#1e293b"]} />}
          </group>

          <Environment preset={section === 3 ? "night" : "sunset"} />
        </Suspense>
      </Canvas>
    </div>
  )
}
