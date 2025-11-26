"use client"

import { useRef } from "react"
import * as THREE from "three"

export function Terrain() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -20]}>
            <planeGeometry args={[200, 200, 128, 128]} />
            <meshStandardMaterial
                color="#334155" // Slate-700, muted dark grey/blue/green tone
                roughness={0.8}
                metalness={0.1}
                flatShading={true} // Low poly look
            />
        </mesh>
    )
}
