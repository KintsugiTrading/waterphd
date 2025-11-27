"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { createNoise2D } from "simplex-noise"

export function ProceduralTerrain() {
    const meshRef = useRef<THREE.Mesh>(null)

    // Generate heightmap using simplex noise
    const { geometry, colors } = useMemo(() => {
        const noise2D = createNoise2D()
        const width = 128
        const depth = 128
        const size = 60 // Physical size

        const geometry = new THREE.PlaneGeometry(size, size, width, depth)
        const count = geometry.attributes.position.count
        const colors = new Float32Array(count * 3)

        // Colors
        const colorBottom = new THREE.Color("#1a472a") // Deep green
        const colorTop = new THREE.Color("#5d8a68") // Lighter green

        for (let i = 0; i < count; i++) {
            const x = geometry.attributes.position.getX(i)
            const y = geometry.attributes.position.getY(i) // Actually Z in 3D space before rotation

            // Multi-layered noise for detail
            let noise = 0
            noise += noise2D(x * 0.03, y * 0.03) * 4
            noise += noise2D(x * 0.1, y * 0.1) * 1
            noise += noise2D(x * 0.5, y * 0.5) * 0.2

            // Flatten the center area slightly for a "field" look
            const distFromCenter = Math.sqrt(x * x + y * y)
            const flattenFactor = Math.max(0, 1 - distFromCenter / 20)
            noise *= (1 - flattenFactor * 0.5)

            // Apply height
            geometry.attributes.position.setZ(i, noise)

            // Vertex colors based on height
            const mixedColor = colorBottom.clone().lerp(colorTop, (noise + 2) / 6)
            colors[i * 3] = mixedColor.r
            colors[i * 3 + 1] = mixedColor.g
            colors[i * 3 + 2] = mixedColor.b
        }

        geometry.computeVertexNormals()
        return { geometry, colors }
    }, [])

    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <mesh ref={meshRef} geometry={geometry} receiveShadow>
                <meshStandardMaterial
                    vertexColors
                    roughness={0.8}
                    metalness={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Add a ground plane below to catch shadows/fill gaps */}
            <mesh position={[0, 0, -0.5]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#112211" />
            </mesh>
        </group>
    )
}
