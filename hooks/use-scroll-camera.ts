"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useWaterCycleStore } from "@/store/use-water-cycle-store"
import * as THREE from "three"

export function useScrollCamera() {
    const { size } = useThree()
    const setStage = useWaterCycleStore((state) => state.setStage)

    useFrame((state, delta) => {
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const totalHeight = document.body.scrollHeight - viewportHeight
        const progress = Math.min(Math.max(scrollY / totalHeight, 0), 1)

        const isMobile = size.width < 768

        const desktopKeyframes = [
            { t: 0.0, pos: new THREE.Vector3(0, 5, 10), lookAt: new THREE.Vector3(0, 0, 0), stage: 'hero' },
            { t: 0.15, pos: new THREE.Vector3(0, 2, 5), lookAt: new THREE.Vector3(0, 2, 0), stage: 'evaporation' },
            { t: 0.35, pos: new THREE.Vector3(0, 15, 10), lookAt: new THREE.Vector3(0, 10, 0), stage: 'condensation' },
            { t: 0.55, pos: new THREE.Vector3(0, 3, 8), lookAt: new THREE.Vector3(0, 2, 0), stage: 'precipitation' },
            { t: 0.75, pos: new THREE.Vector3(0, 8, 15), lookAt: new THREE.Vector3(0, 0, 0), stage: 'research' },
            { t: 1.0, pos: new THREE.Vector3(0, 20, 20), lookAt: new THREE.Vector3(0, 0, 0), stage: 'contact' }
        ]

        const mobileKeyframes = [
            { t: 0.0, pos: new THREE.Vector3(0, 4, 14), lookAt: new THREE.Vector3(0, 2, 0), stage: 'hero' },
            { t: 0.15, pos: new THREE.Vector3(0, 3, 8), lookAt: new THREE.Vector3(0, 3, 0), stage: 'evaporation' },
            { t: 0.35, pos: new THREE.Vector3(0, 15, 10), lookAt: new THREE.Vector3(0, 10, 0), stage: 'condensation' },
            { t: 0.55, pos: new THREE.Vector3(0, 4, 10), lookAt: new THREE.Vector3(0, 2, 0), stage: 'precipitation' },
            { t: 0.75, pos: new THREE.Vector3(0, 8, 18), lookAt: new THREE.Vector3(0, 0, 0), stage: 'research' },
            { t: 1.0, pos: new THREE.Vector3(0, 20, 25), lookAt: new THREE.Vector3(0, 0, 0), stage: 'contact' }
        ]

        const keyframes = isMobile ? mobileKeyframes : desktopKeyframes

        let startFrame = keyframes[0]
        let endFrame = keyframes[keyframes.length - 1]

        for (let i = 0; i < keyframes.length - 1; i++) {
            if (progress >= keyframes[i].t && progress <= keyframes[i + 1].t) {
                startFrame = keyframes[i]
                endFrame = keyframes[i + 1]
                break
            }
        }

        const segmentProgress = (progress - startFrame.t) / (endFrame.t - startFrame.t)
        const easedProgress = THREE.MathUtils.smoothstep(segmentProgress, 0, 1)

        // Camera Position
        state.camera.position.lerpVectors(startFrame.pos, endFrame.pos, easedProgress)

        // Camera LookAt
        const currentLookAt = new THREE.Vector3().lerpVectors(startFrame.lookAt, endFrame.lookAt, easedProgress)
        state.camera.lookAt(currentLookAt)

        // Update global stage state
        if (segmentProgress < 0.5 && startFrame.stage) setStage(startFrame.stage as any)
        else if (segmentProgress >= 0.5 && endFrame.stage) setStage(endFrame.stage as any)
    })
}
