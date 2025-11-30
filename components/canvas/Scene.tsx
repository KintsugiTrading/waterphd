"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { BackgroundCycle } from "./BackgroundCycle"
import { Environment } from "@react-three/drei"

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }} shadows>
        <Suspense fallback={null}>
          <BackgroundCycle />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  )
}
