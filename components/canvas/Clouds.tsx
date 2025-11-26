"use client"

import { Clouds, Cloud } from "@react-three/drei"
import * as THREE from "three"

export function CloudsComponent() {
    return (
        <group>
            <Clouds material={THREE.MeshBasicMaterial} texture="/cloud.png">
                <Cloud
                    seed={1}
                    scale={2}
                    volume={5}
                    color="#e2e8f0"
                    fade={100}
                    segments={40}
                    bounds={[10, 2, 10]}
                    position={[0, 15, -10]}
                    opacity={0.5}
                    speed={0.1}
                />
                <Cloud
                    seed={2}
                    scale={3}
                    volume={6}
                    color="#cbd5e1"
                    fade={100}
                    segments={40}
                    bounds={[10, 2, 10]}
                    position={[10, 12, -15]}
                    opacity={0.4}
                    speed={0.15}
                />
                <Cloud
                    seed={3}
                    scale={2.5}
                    volume={4}
                    color="#f1f5f9"
                    fade={100}
                    segments={40}
                    bounds={[10, 2, 10]}
                    position={[-10, 14, -12]}
                    opacity={0.6}
                    speed={0.12}
                />
            </Clouds>
        </group>
    )
}

// Renaming export to match previous usage or updating Scene.tsx
export { CloudsComponent as Clouds }
