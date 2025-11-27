"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

export function RainEffect() {
    const pointsRef = useRef<THREE.Points>(null)
    const currentStage = useWaterCycleStore((state) => state.currentStage)

    const count = 2000

    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const velocities = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50 // x
            positions[i * 3 + 1] = Math.random() * 40 // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50 // z

            velocities[i] = 0.5 + Math.random() * 0.5 // speed
        }

        return { positions, velocities }
    }, [])

    useFrame((state, delta) => {
        if (!pointsRef.current) return

        // Only show rain during precipitation
        const isRaining = currentStage === 'precipitation'
        pointsRef.current.visible = isRaining

        if (!isRaining) return

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            // Move down
            positions[i * 3 + 1] -= velocities[i]

            // Reset if below ground
            if (positions[i * 3 + 1] < 0) {
                positions[i * 3 + 1] = 40
                positions[i * 3] = (Math.random() - 0.5) * 50
                positions[i * 3 + 2] = (Math.random() - 0.5) * 50
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#a5f3fc"
                size={0.1}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    )
}
