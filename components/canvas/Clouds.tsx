"use client"

import { Cloud } from "@react-three/drei"

export function Clouds() {
    return (
        <group>
            <Cloud
                position={[-4, 2, -10]}
                speed={0.2}
                opacity={0.7}
                segments={40}
                bounds={[10, 2, 2]}
                volume={10}
                color="#e2e8f0"
            />
            <Cloud
                position={[4, 5, -15]}
                speed={0.2}
                opacity={0.6}
                segments={40}
                bounds={[10, 2, 2]}
                volume={10}
                color="#cbd5e1"
            />
            <Cloud
                position={[0, 10, -20]}
                speed={0.2}
                opacity={0.5}
                segments={40}
                bounds={[20, 2, 2]}
                volume={15}
                color="#f1f5f9"
            />
            {/* Lower fog/clouds for atmosphere */}
            <Cloud
                position={[0, -5, -10]}
                speed={0.1}
                opacity={0.3}
                segments={20}
                bounds={[20, 2, 2]}
                volume={5}
                color="#94a3b8"
            />
        </group>
    )
}
