"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Clouds, Cloud } from "@react-three/drei"
import * as THREE from "three"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

export function VolumetricClouds() {
    const groupRef = useRef<THREE.Group>(null)
    const mistRef = useRef<THREE.Group>(null)
    const currentStage = useWaterCycleStore((state) => state.currentStage)

    useFrame((state, delta) => {
        if (!groupRef.current || !mistRef.current) return

        // Calculate scroll progress
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const totalHeight = document.body.scrollHeight - viewportHeight
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1)

        // Gentle rotation for both
        groupRef.current.rotation.y += delta * 0.005
        mistRef.current.rotation.y -= delta * 0.002

        // Main Clouds Animation
        // Evaporation: High up (y=30)
        // Condensation: Lower down (y=15) to surround camera
        const targetCloudY = currentStage === 'evaporation' ? 30 : 15
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetCloudY, delta * 0.8)

        // Mist/Fog Animation
        // Evaporation: Low ground mist (y=0)
        // Condensation: Rises up to become clouds (y=10)
        const targetMistY = currentStage === 'evaporation' ? -2 : 10
        mistRef.current.position.y = THREE.MathUtils.lerp(mistRef.current.position.y, targetMistY, delta * 0.5)

        // Opacity Animation based on scroll
        // Hero (0-0.2): opacity = 0 (completely hidden to show farmland)
        // Evaporation (0.2-0.4): opacity = 0.15 (subtle mist)
        // Condensation (0.4-0.65): opacity = 0.6 (full clouds)
        // Precipitation (0.65-1.0): opacity = 0.8 (storm clouds)
        let targetOpacity = 0
        if (progress < 0.2) {
            targetOpacity = 0
        } else if (progress < 0.4) {
            targetOpacity = THREE.MathUtils.mapLinear(progress, 0.2, 0.4, 0, 0.15)
        } else if (progress < 0.65) {
            targetOpacity = THREE.MathUtils.mapLinear(progress, 0.4, 0.65, 0.15, 0.6)
        } else {
            targetOpacity = THREE.MathUtils.mapLinear(progress, 0.65, 1.0, 0.6, 0.8)
        }

        // Apply opacity to all cloud materials
        groupRef.current.children.forEach(child => {
            if (child.type === 'Mesh' || child.children.length > 0) {
                child.traverse((obj: any) => {
                    if (obj.material) {
                        obj.material.opacity = THREE.MathUtils.lerp(obj.material.opacity || 0, targetOpacity, delta * 2.0)
                        obj.material.transparent = true
                    }
                })
            }
        })
        mistRef.current.children.forEach(child => {
            if (child.type === 'Mesh' || child.children.length > 0) {
                child.traverse((obj: any) => {
                    if (obj.material) {
                        obj.material.opacity = THREE.MathUtils.lerp(obj.material.opacity || 0, targetOpacity * 0.5, delta * 2.0)
                        obj.material.transparent = true
                    }
                })
            }
        })
    })

    return (
        <>
            {/* Main Upper Clouds */}
            <group ref={groupRef}>
                <Clouds material={THREE.MeshBasicMaterial}>
                    <Cloud seed={1} scale={2} volume={10} color="#ffffff" fade={30} speed={0.1} opacity={0.5} />
                    <Cloud seed={2} scale={1} volume={5} color="#e0f2fe" fade={30} position={[5, 2, -5]} speed={0.1} opacity={0.5} />
                    <Cloud seed={3} scale={1} volume={5} color="#e0f2fe" fade={30} position={[-5, 2, -5]} speed={0.1} opacity={0.5} />
                    <Cloud seed={4} scale={1.5} volume={8} color="#ffffff" fade={30} position={[0, 5, 0]} speed={0.1} opacity={0.4} />
                </Clouds>
            </group>

            {/* Rising Mist/Fog Layer */}
            <group ref={mistRef}>
                <Clouds material={THREE.MeshBasicMaterial}>
                    <Cloud seed={10} scale={3} volume={6} color="#e0f2fe" fade={20} speed={0.05} opacity={0.3} position={[0, 0, 0]} />
                    <Cloud seed={11} scale={2} volume={4} color="#ffffff" fade={20} speed={0.05} opacity={0.2} position={[8, 1, 8]} />
                    <Cloud seed={12} scale={2} volume={4} color="#ffffff" fade={20} speed={0.05} opacity={0.2} position={[-8, 1, 8]} />
                </Clouds>
            </group>
        </>
    )
}
