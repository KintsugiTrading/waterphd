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
    const { camera } = useThree()

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

        // Smooth camera transition
        state.camera.position.lerp(target.pos, delta * 1.5)

        // Smooth lookAt transition
        // We can't directly lerp lookAt, so we lerp a dummy target and look at it
        // For simplicity in this iteration, we'll just use the position lerp and static lookAt or simple interpolation if needed
        // But standard lerp on position + controls update is usually enough. 
        // Since we don't have OrbitControls forcing the lookAt, we can manually interpolate the quaternion or lookAt point.

        const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position)
        const targetLookAt = target.lookAt

        const newLookAt = currentLookAt.lerp(targetLookAt, delta * 1.5)
        state.camera.lookAt(newLookAt)
    })

    // Lighting changes based on stage
    const ambientIntensity = currentStage === 'precipitation' ? 0.2 : 0.5
    const sunIntensity = currentStage === 'precipitation' ? 0.1 : 1

    return (
        <>
            <ambientLight intensity={ambientIntensity} />
            <directionalLight position={[10, 10, 5]} intensity={sunIntensity} castShadow />

            <ProceduralTerrain />
            <VolumetricClouds />
            <RainEffect />

            {/* Fog for atmosphere */}
            <fog attach="fog" args={['#87CEEB', 5, 60]} />
        </>
    )
}
