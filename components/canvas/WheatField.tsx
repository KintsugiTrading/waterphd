"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  attribute float scale;
  attribute float offset;
  varying vec2 vUv;
  varying float vHeight;
  uniform float time;
  
  void main() {
    vUv = uv;
    
    // Wind effect
    float wind = sin(time * 2.0 + instanceMatrix[3][0] * 0.5 + instanceMatrix[3][2] * 0.5) * 0.1;
    wind += cos(time * 1.5 + instanceMatrix[3][0] * 0.3) * 0.05;
    
    // Bend the top of the wheat
    vec3 pos = position;
    float heightFactor = position.y / 1.5; // Assuming height is around 1.5
    pos.x += wind * heightFactor * heightFactor;
    pos.z += wind * heightFactor * 0.5;
    
    vHeight = position.y;
    
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying float vHeight;
  
  void main() {
    // Wheat colors
    vec3 bottomColor = vec3(0.2, 0.3, 0.1); // Darker green/brown at bottom
    vec3 topColor = vec3(0.8, 0.7, 0.4);    // Golden wheat at top
    
    vec3 color = mix(bottomColor, topColor, vHeight / 1.5);
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export function WheatField() {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const count = 10000
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0 },
            },
            side: THREE.DoubleSide,
        })
    }, [])

    useEffect(() => {
        if (!meshRef.current) return

        // Distribute wheat across a large field
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 100
            const z = (Math.random() - 0.5) * 50 - 20 // Positioned further back
            const y = -5 // Base height matching terrain

            dummy.position.set(x, y, z)

            // Random rotation
            dummy.rotation.y = Math.random() * Math.PI * 2

            // Random scale variation
            const scale = 0.8 + Math.random() * 0.4
            dummy.scale.set(scale, scale, scale)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [dummy, count])

    useFrame((state) => {
        if (material) {
            material.uniforms.time.value = state.clock.getElapsedTime()
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <planeGeometry args={[0.1, 1.5, 1, 4]} /> {/* Simple blade shape */}
            <primitive object={material} attach="material" />
        </instancedMesh>
    )
}
