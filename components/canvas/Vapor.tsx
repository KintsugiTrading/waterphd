"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Vapor() {
    const count = 200
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Store initial positions and speeds
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 80,
                y: Math.random() * 10 - 5,
                z: (Math.random() - 0.5) * 40 - 20,
                speed: 0.02 + Math.random() * 0.03,
                offset: Math.random() * Math.PI * 2
            })
        }
        return temp
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.getElapsedTime()

        particles.forEach((particle, i) => {
            // Rise up
            particle.y += particle.speed

            // Reset if too high
            if (particle.y > 15) {
                particle.y = -5
            }

            // Gentle sway
            const x = particle.x + Math.sin(time * 0.5 + particle.offset) * 2

            dummy.position.set(x, particle.y, particle.z)

            // Scale based on height (fade in/out effect simulation via scale)
            const scale = Math.sin((particle.y + 5) / 20 * Math.PI) * 2
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, dummy.matrix)
            }
        })

        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial
                color="#bae6fd"
                transparent
                opacity={0.15}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    )
}
