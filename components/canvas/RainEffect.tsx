"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"

const RainMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#a5f3fc") },
        uOpacity: { value: 0.25 },
        uHeight: { value: 40.0 }
    },
    vertexShader: `
    uniform float uTime;
    uniform float uHeight;
    
    attribute float aSpeed;
    attribute float aOffset;
    attribute float aLength;
    
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      
      // Animate y position
      float y = pos.y - uTime * aSpeed - aOffset;
      
      // Wrap around
      y = mod(y, uHeight);
      
      // Center vertically
      pos.y = y;
      
      // Stretch based on speed (simulating motion blur/streak)
      // We'll use the instance matrix to scale y if we were using true instancing with geometry,
      // but here we are modifying vertices directly or using a simple line approach.
      // For InstancedMesh, we usually transform the instanceMatrix.
      // However, for rain, a simple approach is to use a long thin box or plane.
      
      vec4 worldPosition = instanceMatrix * vec4(pos, 1.0);
      
      // Apply the animation to the world position y
      // We need to do the wrapping in world space or local space before transform.
      // Let's simplify: We'll animate the instance position in the vertex shader.
      
      // Re-calculate world position with animation
      // Extract original position from instanceMatrix
      vec3 instancePos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      
      // Animate instance Y
      float newY = instancePos.y - uTime * aSpeed;
      newY = mod(newY, uHeight);
      
      // Update world position
      worldPosition.y = newY + pos.y; // pos.y is the vertex offset within the instance
      worldPosition.x = instancePos.x + pos.x;
      worldPosition.z = instancePos.z + pos.z;
      
      // Fade out at top and bottom
      float normalizedY = newY / uHeight;
      vAlpha = smoothstep(0.0, 0.1, normalizedY) * (1.0 - smoothstep(0.9, 1.0, normalizedY));
      
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vAlpha;
    
    void main() {
      gl_FragColor = vec4(uColor, uOpacity * vAlpha);
    }
  `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

export function RainEffect() {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const currentStage = useWaterCycleStore((state) => state.currentStage)

    const count = 5000

    // Create geometry for a single raindrop (thin elongated box)
    const geometry = useMemo(() => new THREE.BoxGeometry(0.01, 0.8, 0.01), [])

    // Initial setup of instances
    const { speeds, offsets } = useMemo(() => {
        const tempObject = new THREE.Object3D()
        const speeds = new Float32Array(count)
        const offsets = new Float32Array(count)

        // We need to set the initial positions in the instance matrix
        // But we can't easily access them in the shader without a custom attribute for the *initial* position 
        // if we want to overwrite them completely.
        // Actually, we can just set the instanceMatrix once and then ignore its Y component in the shader 
        // or use it as the base.

        return { speeds, offsets }
    }, [])

    useEffect(() => {
        if (!meshRef.current) return

        const tempObject = new THREE.Object3D()
        const speedAttr = new Float32Array(count)
        const offsetAttr = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 60
            const y = Math.random() * 40
            const z = (Math.random() - 0.5) * 60

            tempObject.position.set(x, y, z)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)

            speedAttr[i] = 5.0 + Math.random() * 10.0 // Faster rain
            offsetAttr[i] = Math.random() * 40.0 // Random starting offset
        }

        meshRef.current.instanceMatrix.needsUpdate = true

        // Add custom attributes to the geometry
        geometry.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(speedAttr, 1))
        geometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsetAttr, 1))

    }, [geometry])

    useFrame((state, delta) => {
        if (!meshRef.current) return

        const isRaining = currentStage === 'precipitation'
        meshRef.current.visible = isRaining

        if (!isRaining) return

        // Update time uniform
        if (meshRef.current.material instanceof THREE.ShaderMaterial) {
            meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <instancedMesh
            ref={meshRef}
            args={[geometry, RainMaterial, count]}
            frustumCulled={false}
        />
    )
}
