"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { ProceduralTerrain } from "./ProceduralTerrain"
import * as THREE from "three"
import { useRef } from "react"
import { useScrollCamera } from "@/hooks/use-scroll-camera"

export function BackgroundCycle() {
    const { scene } = useThree()

    // Use shared camera logic
    useScrollCamera()

    // Refs for lights to animate them
    const ambientRef = useRef<THREE.AmbientLight>(null)
    const sunRef = useRef<THREE.DirectionalLight>(null)

    // Lighting and Fog animation
    useFrame((state, delta) => {
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const totalHeight = document.body.scrollHeight - viewportHeight
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1)

        // Smooth Lighting Transition (Precipitation check)
        const isPrecipitation = progress > 0.45 && progress < 0.65
        const targetAmbient = isPrecipitation ? 0.2 : 0.5
        const targetSun = isPrecipitation ? 0.1 : 1.0

        if (ambientRef.current) {
            ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, delta * 2.0)
        }
        if (sunRef.current) {
            sunRef.current.intensity = THREE.MathUtils.lerp(sunRef.current.intensity, targetSun, delta * 2.0)
        }

        // Smooth Fog Transition
        const targetFogColor = isPrecipitation ? new THREE.Color('#475569') : new THREE.Color('#e0f2fe')
        const targetFogDensity = isPrecipitation ? 0.04 : 0.02

        if (scene.fog && scene.fog instanceof THREE.FogExp2) {
            scene.fog.color.lerp(targetFogColor, delta * 2.0)
            scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetFogDensity, delta * 2.0)
        }
    })

    return (
        <>
            <ambientLight ref={ambientRef} intensity={0.5} />
            <directionalLight ref={sunRef} position={[10, 10, 5]} intensity={1} castShadow />

            <ProceduralTerrain />

            {/* Fog for atmosphere - using Exp2 for smoother falloff */}
            <fogExp2 attach="fog" args={['#e0f2fe', 0.02]} />
        </>
    )
}
