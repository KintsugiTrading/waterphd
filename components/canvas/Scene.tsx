"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Water } from "./Water"
import { Terrain } from "./Terrain"
import { Clouds } from "./Clouds"
import { Environment } from "@react-three/drei"

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Water />
          <Terrain />
          <Clouds />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
