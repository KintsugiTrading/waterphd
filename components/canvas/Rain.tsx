"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Rain() {
    const count = 2000
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            temp.push({
                x: (Math.random() - 0.5) * 60,
                y: Math.random() * 40,
                z: (Math.random() - 0.5) * 40,
                speed: 0.5 + Math.random() * 0.5,
            })
        }
        return temp
    }, [])

    useFrame(() => {
        if (!meshRef.current) return

        particles.forEach((particle, i) => {
            particle.y -= particle.speed

            if (particle.y < -20) {
                particle.y = 20
                particle.x = (Math.random() - 0.5) * 60
                particle.z = (Math.random() - 0.5) * 40
            }

            dummy.position.set(particle.x, particle.y, particle.z)

            // Angle the rain slightly
            dummy.rotation.z = 0.1
            dummy.scale.set(0.05, 1.5, 0.05) // Stretch for rain streak look

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
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#a5f3fc" transparent opacity={0.6} />
        </instancedMesh>
    )
}
