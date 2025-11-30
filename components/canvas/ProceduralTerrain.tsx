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
        const size = 100 // Physical size

        const geometry = new THREE.PlaneGeometry(size, size, width, depth)
        const count = geometry.attributes.position.count
        const colors = new Float32Array(count * 3)

        // Colors - ULTRA HIGH CONTRAST Farm Palette
        const cropColors = [
            new THREE.Color("#1b5e20"), // Deep Emerald Green (Corn/Soy)
            new THREE.Color("#ffeb3b"), // Bright Yellow (Wheat/Hay) - Maximum visibility
            new THREE.Color("#43a047"), // Vibrant Green (Alfalfa)
            new THREE.Color("#5d4037"), // Rich Brown (Tilled Soil)
            new THREE.Color("#8bc34a"), // Lime Green (Young crops)
        ]
        const roadColor = new THREE.Color("#3e2723") // Dark Brown/Black road

        for (let i = 0; i < count; i++) {
            const x = geometry.attributes.position.getX(i)
            const y = geometry.attributes.position.getY(i) // Actually Z in 3D space before rotation

            // 1. Terrain Height Generation (Flatter for Plains)
            let noise = 0
            noise += noise2D(x * 0.015, y * 0.015) * 1.5 // Very gentle rolling hills
            noise += noise2D(x * 0.05, y * 0.05) * 0.3 // Subtle variations
            noise += noise2D(x * 0.2, y * 0.2) * 0.05 // Micro details

            // Flatten the center area slightly for a "field" look
            const distFromCenter = Math.sqrt(x * x + y * y)
            const flattenFactor = Math.max(0, 1 - distFromCenter / 40) // Wider flat area
            noise *= (1 - flattenFactor * 0.6)

            // Apply height
            geometry.attributes.position.setZ(i, noise)

            // 2. Geometric Field Generation (The Jeffersonian Grid)
            const fieldSize = 22 // Size of each crop field (LARGER for visibility)
            const roadWidth = 2.5 // Width of dirt roads (WIDER for visibility)

            // Add some distortion to grid lines so they aren't perfectly straight (organic realism)
            const distortionX = noise2D(x * 0.05, y * 0.05) * 2
            const distortionY = noise2D(x * 0.05 + 100, y * 0.05 + 100) * 2

            const distortedX = x + distortionX
            const distortedY = y + distortionY

            const gridX = Math.floor(distortedX / fieldSize)
            const gridY = Math.floor(distortedY / fieldSize)

            // Check for roads (boundaries between fields)
            const distToGridX = Math.abs(distortedX % fieldSize)
            const distToGridY = Math.abs(distortedY % fieldSize)
            // Handle negative modulo correctly
            const modX = ((distortedX % fieldSize) + fieldSize) % fieldSize
            const modY = ((distortedY % fieldSize) + fieldSize) % fieldSize

            // Simple road logic: if close to grid line
            const isRoad = modX < roadWidth || modY < roadWidth

            let finalColor

            if (isRoad) {
                // Road texture
                const roadNoise = noise2D(x * 0.5, y * 0.5) * 0.1
                finalColor = roadColor.clone().offsetHSL(0, 0, roadNoise)
            } else {
                // Pseudo-random hash for field identity
                const fieldHash = Math.abs(Math.sin(gridX * 12.9898 + gridY * 78.233) * 43758.5453)
                const fieldIndex = Math.floor((fieldHash % 1) * cropColors.length)
                const baseColor = cropColors[fieldIndex]

                // 3. Field Texture (Rows/Furrows)
                // Determine row direction for this specific field
                const rowAngle = (fieldHash % 1) * Math.PI
                const rowCos = Math.cos(rowAngle)
                const rowSin = Math.sin(rowAngle)
                const rowU = x * rowCos + y * rowSin

                // Create row pattern - Stronger for visibility
                const rowPattern = Math.sin(rowU * 3.0) // Higher frequency rows
                const rowIntensity = 0.08 // Stronger effect (was 0.03)

                // Add noise for soil variation within the field
                const soilNoise = noise2D(x * 0.2, y * 0.2) * 0.05

                finalColor = baseColor.clone()
                    .offsetHSL(0, 0, rowPattern * rowIntensity + soilNoise) // Add rows and soil texture
            }

            // 4. Color Blending with Height
            // Mix with height for natural shading (valleys darker, peaks lighter)
            const heightFactor = (noise + 1) / 4 // Normalized height roughly 0-1
            finalColor.lerp(new THREE.Color("#dcedc8"), heightFactor * 0.15) // Lighten tops slightly

            colors[i * 3] = finalColor.r
            colors[i * 3 + 1] = finalColor.g
            colors[i * 3 + 2] = finalColor.b
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
                    emissive={new THREE.Color("#2d4a1e")}
                    emissiveIntensity={0.15}
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
