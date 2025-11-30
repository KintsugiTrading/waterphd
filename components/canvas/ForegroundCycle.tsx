"use client"

import { VolumetricClouds } from "./VolumetricClouds"
import { RainEffect } from "./RainEffect"
import { useScrollCamera } from "@/hooks/use-scroll-camera"

export function ForegroundCycle() {
    // Use shared camera logic to sync with background
    useScrollCamera()

    return (
        <>
            <VolumetricClouds />
            <RainEffect />
        </>
    )
}
