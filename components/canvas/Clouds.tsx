"use client"

import { Cloud } from "@react-three/drei"

export function Clouds() {
    return (
        <group>
            <Cloud position={[-4, 2, -10]} speed={0.2} opacity={0.5} />
            <Cloud position={[4, 2, -15]} speed={0.2} opacity={0.5} />
            <Cloud position={[0, 10, -20]} speed={0.2} opacity={0.5} />
        </group>
    )
}
