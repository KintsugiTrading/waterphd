"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"
import { ProceduralTerrain } from "./ProceduralTerrain"
import { VolumetricClouds } from "./VolumetricClouds"
import { RainEffect } from "./RainEffect"
import * as THREE from "three"
import { useEffect, useRef } from "react"

export function AtmosphericCycle() {
    const currentStage = useWaterCycleStore((state) => state.currentStage)
    const { camera, scene } = useThree()

    // Refs for lights to animate them
    const ambientRef = useRef<THREE.AmbientLight>(null)
    const sunRef = useRef<THREE.DirectionalLight>(null)

    // Target camera positions for each stage
    const cameraTargets = {
        hero: { pos: new THREE.Vector3(0, 5, 10), lookAt: new THREE.Vector3(0, 0, 0) },
        evaporation: { pos: new THREE.Vector3(0, 2, 5), lookAt: new THREE.Vector3(0, 1, 0) }, // Close to ground/field
        condensation: { pos: new THREE.Vector3(0, 15, 10), lookAt: new THREE.Vector3(0, 10, 0) }, // Up in sky
        precipitation: { pos: new THREE.Vector3(0, 12, 12), lookAt: new THREE.Vector3(0, 5, 0) }, // Looking down at rain
        research: { pos: new THREE.Vector3(0, 8, 15), lookAt: new THREE.Vector3(0, 0, 0) },
        contact: { pos: new THREE.Vector3(0, 20, 20), lookAt: new THREE.Vector3(0, 0, 0) },
    }

    useFrame((state, delta) => {
        const target = cameraTargets[currentStage] || cameraTargets.hero

        // 1. Smooth Camera Transition
        state.camera.position.lerp(target.pos, delta * 1.5)

        const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position)
        const targetLookAt = target.lookAt
        const newLookAt = currentLookAt.lerp(targetLookAt, delta * 1.5)
        state.camera.lookAt(newLookAt)

        // 2. Smooth Lighting Transition
        const isPrecipitation = currentStage === 'precipitation'
        const targetAmbient = isPrecipitation ? 0.2 : 0.5
        const targetSun = isPrecipitation ? 0.1 : 1.0

        if (ambientRef.current) {
            ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, delta * 1.0)
        }
        if (sunRef.current) {
            sunRef.current.intensity = THREE.MathUtils.lerp(sunRef.current.intensity, targetSun, delta * 1.0)
        }

        // 3. Smooth Fog Transition
        // Darken fog during rain to match the mood
        const targetFogColor = isPrecipitation ? new THREE.Color('#475569') : new THREE.Color('#e0f2fe') // Slate-600 vs Sky-100
        const targetFogDensity = isPrecipitation ? 0.04 : 0.02

        if (scene.fog && scene.fog instanceof THREE.FogExp2) {
            scene.fog.color.lerp(targetFogColor, delta * 1.0)
            scene.fog.density = THREE.MathUtils.lerp(scene.fog.density, targetFogDensity, delta * 1.0)
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
