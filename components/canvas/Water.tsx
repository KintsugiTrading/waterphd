"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Water() {
    const meshRef = useRef<THREE.Mesh>(null)

    const geometry = useMemo(() => new THREE.PlaneGeometry(100, 100, 50, 50), [])

    // Custom shader or material setup could go here. 
    // For now, using a standard material with some transparency and movement.

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()

        // Simple wave animation by modifying vertices (if we were using a custom shader or modifying geometry)
        // For a simple effect, we can just animate the texture offset or similar if we had one.
        // Here we'll just let it sit as a calm surface for now, maybe add some gentle rotation or movement.

        // To make it more like the reference, we need a shader.
        // Let's stick to a simple blue transparent plane for the initial setup.
    })

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <primitive object={geometry} />
            <meshPhysicalMaterial
                color="#0e7490" // Cyan-800/900
                transmission={0.9}
                opacity={0.8}
                roughness={0.2}
                metalness={0.1}
                transparent
            />
        </mesh>
    )
}
