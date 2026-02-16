"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Vector2, VideoTexture, LinearFilter, Mesh } from "three"
import { AsciiEffect } from "./ascii-effect"

function VideoPlane({ src }: { src: string }) {
    const meshRef = useRef<Mesh>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [videoTexture, setVideoTexture] = useState<VideoTexture | null>(null)

    useEffect(() => {
        const video = document.createElement("video")
        video.src = src
        video.crossOrigin = "anonymous"
        video.loop = true
        video.muted = true
        video.playsInline = true
        video.autoplay = true
        video.play().catch(() => {})
        videoRef.current = video

        const texture = new VideoTexture(video)
        texture.minFilter = LinearFilter
        texture.magFilter = LinearFilter
        setVideoTexture(texture)

        return () => {
            video.pause()
            video.src = ""
            texture.dispose()
        }
    }, [src])

    useFrame(() => {
        if (videoTexture && videoRef.current && !videoRef.current.paused) {
            videoTexture.needsUpdate = true
        }
    })

    if (!videoTexture) return null

    return (
        <mesh ref={meshRef} scale={[3.5, 2, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={videoTexture} />
        </mesh>
    )
}

interface AsciiVideoProps {
    src: string
    className?: string
    cellSize?: number
    color?: boolean
    invert?: boolean
    colorPalette?: number
}

export default function AsciiVideo({
    src,
    className = "",
    cellSize = 9,
    color = false,
    invert = false,
    colorPalette = 0,
}: AsciiVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [resolution, setResolution] = useState(new Vector2(800, 600))
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setResolution(new Vector2(rect.width, rect.height))

            const handleResize = () => {
                if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect()
                    setResolution(new Vector2(rect.width, rect.height))
                }
            }
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div ref={containerRef} className={className}>
            {mounted && (
                <Canvas
                    camera={{ position: [0, 0, 3], fov: 50 }}
                    style={{ background: "transparent" }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <VideoPlane src={src} />
                    <EffectComposer>
                        <AsciiEffect
                            style="standard"
                            cellSize={cellSize}
                            invert={invert}
                            color={color}
                            resolution={resolution}
                            postfx={{
                                colorPalette,
                                scanlineIntensity: 0,
                                vignetteIntensity: 0.3,
                                vignetteRadius: 1.2,
                                contrastAdjust: 1.1,
                                brightnessAdjust: 0,
                            }}
                        />
                    </EffectComposer>
                </Canvas>
            )}
        </div>
    )
}
