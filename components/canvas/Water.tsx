"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Water() {
    const meshRef = useRef<THREE.Mesh>(null)

    const geometry = useMemo(() => new THREE.PlaneGeometry(100, 100, 128, 128), [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()

        // Gentle wave movement
        if (meshRef.current.position) {
            meshRef.current.position.y = -2 + Math.sin(time * 0.2) * 0.2
        }
    })

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <primitive object={geometry} />
            <meshPhysicalMaterial
                color="#0f172a" // Dark slate blue (slate-900)
                transmission={0.6}
                opacity={0.9}
                roughness={0.1} // Very smooth for reflections
                metalness={0.2}
                reflectivity={0.8}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transparent
            />
        </mesh>
    )
}
