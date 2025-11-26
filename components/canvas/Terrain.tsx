"use client"

import { useRef } from "react"
import * as THREE from "three"

export function Terrain() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -20]}>
            <planeGeometry args={[100, 100, 64, 64]} />
            <meshStandardMaterial color="#4ade80" wireframe={false} />
            {/* Placeholder color, will refine to match mont-fort style */}
        </mesh>
    )
}
