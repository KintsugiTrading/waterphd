"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"
import { ProceduralTerrain } from "./ProceduralTerrain"
import { VolumetricClouds } from "./VolumetricClouds"
import { RainEffect } from "./RainEffect"
import * as THREE from "three"
import { useEffect, useRef } from "react"

export function AtmosphericCycle() {
    const { camera, scene } = useThree()
    const setStage = useWaterCycleStore((state) => state.setStage)

    // Refs for lights to animate them
    const ambientRef = useRef<THREE.AmbientLight>(null)
    const sunRef = useRef<THREE.DirectionalLight>(null)

    // Scroll-based animation
    useFrame((state, delta) => {
        // Calculate scroll progress (0 to ~5 based on sections)
        // Assuming each section is roughly 100vh. 
        // We can use document.body.scrollHeight to get total height.
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const totalHeight = document.body.scrollHeight - viewportHeight

        // Normalized scroll progress (0.0 to 1.0)
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1)

        // Map progress to "stages" (0=Hero, 1=Evaporation, 2=Condensation, 3=Precipitation, 4=Research, 5=Contact)
        // Adjust these multipliers based on actual section positions if needed.
        // For now, we'll assume roughly equal spacing or map to specific scroll points.
        // A better way is to map 0-1 progress to keyframes.

        const keyframes = [
            { t: 0.0, pos: new THREE.Vector3(0, 5, 10), lookAt: new THREE.Vector3(0, 0, 0), stage: 'hero' },
            { t: 0.15, pos: new THREE.Vector3(0, 2, 5), lookAt: new THREE.Vector3(0, 2, 0), stage: 'evaporation' },
            { t: 0.35, pos: new THREE.Vector3(0, 15, 10), lookAt: new THREE.Vector3(0, 10, 0), stage: 'condensation' },
            { t: 0.55, pos: new THREE.Vector3(0, 3, 8), lookAt: new THREE.Vector3(0, 2, 0), stage: 'precipitation' },
            { t: 0.75, pos: new THREE.Vector3(0, 8, 15), lookAt: new THREE.Vector3(0, 0, 0), stage: 'research' },
            { t: 1.0, pos: new THREE.Vector3(0, 20, 20), lookAt: new THREE.Vector3(0, 0, 0), stage: 'contact' }
        ]

        // Find current keyframe segment
        let startFrame = keyframes[0]
        let endFrame = keyframes[keyframes.length - 1]

        for (let i = 0; i < keyframes.length - 1; i++) {
            if (progress >= keyframes[i].t && progress <= keyframes[i + 1].t) {
                startFrame = keyframes[i]
                endFrame = keyframes[i + 1]
                break
            }
        }

        // Interpolate between frames
        const segmentProgress = (progress - startFrame.t) / (endFrame.t - startFrame.t)
        const easedProgress = THREE.MathUtils.smoothstep(segmentProgress, 0, 1) // Smooth ease

        // Camera Position
        state.camera.position.lerpVectors(startFrame.pos, endFrame.pos, easedProgress)

        // Camera LookAt
        const currentLookAt = new THREE.Vector3().lerpVectors(startFrame.lookAt, endFrame.lookAt, easedProgress)
        state.camera.lookAt(currentLookAt)

        // Update global stage state for other components (clouds, rain)
        // We can trigger this based on which keyframe we are closest to
        if (segmentProgress < 0.5 && startFrame.stage) setStage(startFrame.stage as any)
        else if (segmentProgress >= 0.5 && endFrame.stage) setStage(endFrame.stage as any)


        // 2. Smooth Lighting Transition (Precipitation check)
        // Check if we are in or near precipitation (t ~ 0.55)
        const isPrecipitation = progress > 0.45 && progress < 0.65
        const targetAmbient = isPrecipitation ? 0.2 : 0.5
        const targetSun = isPrecipitation ? 0.1 : 1.0

        if (ambientRef.current) {
            ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, delta * 2.0)
        }
        if (sunRef.current) {
            sunRef.current.intensity = THREE.MathUtils.lerp(sunRef.current.intensity, targetSun, delta * 2.0)
        }

        // 3. Smooth Fog Transition
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
            <VolumetricClouds />
            <RainEffect />

            {/* Fog for atmosphere - using Exp2 for smoother falloff */}
            <fogExp2 attach="fog" args={['#e0f2fe', 0.02]} />
        </>
    )
}
