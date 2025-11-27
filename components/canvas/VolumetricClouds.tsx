"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Clouds, Cloud } from "@react-three/drei"
import * as THREE from "three"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

export function VolumetricClouds() {
    const groupRef = useRef<THREE.Group>(null)
    const currentStage = useWaterCycleStore((state) => state.currentStage)

    // Animate clouds based on stage
    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Gentle rotation
        groupRef.current.rotation.y += delta * 0.01

        // Adjust opacity/visibility based on stage
        // This is a simple visual transition logic
        const targetY = currentStage === 'evaporation' ? 20 : 10
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 0.5)
    })

    return (
        <group ref={groupRef}>
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud seed={1} scale={2} volume={10} color="#ffffff" fade={30} speed={0.1} opacity={0.5} />
                <Cloud seed={2} scale={1} volume={5} color="#e0f2fe" fade={30} position={[5, 2, -5]} speed={0.1} opacity={0.5} />
                <Cloud seed={3} scale={1} volume={5} color="#e0f2fe" fade={30} position={[-5, 2, -5]} speed={0.1} opacity={0.5} />
                <Cloud seed={4} scale={1.5} volume={8} color="#ffffff" fade={30} position={[0, 5, 0]} speed={0.1} opacity={0.4} />
            </Clouds>
        </group>
    )
}
