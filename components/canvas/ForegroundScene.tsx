"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { ForegroundCycle } from "./ForegroundCycle"

export function ForegroundScene() {
    return (
        <div className="fixed inset-0 -z-[5] pointer-events-none">
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }} gl={{ alpha: true }}>
                <Suspense fallback={null}>
                    <ForegroundCycle />
                </Suspense>
            </Canvas>
        </div>
    )
}
