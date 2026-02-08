"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Vector2, VideoTexture, LinearFilter, Mesh } from "three"
import { AsciiEffect } from "./ascii-effect"

// Video plane component that displays a video with the ASCII effect
function VideoPlane() {
    const meshRef = useRef<Mesh>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [videoTexture, setVideoTexture] = useState<VideoTexture | null>(null)

    useEffect(() => {
        // Create video element
        const video = document.createElement("video")
        video.src = "/videos/professor_lecture.mp4"
        video.crossOrigin = "anonymous"
        video.loop = true
        video.muted = true
        video.playsInline = true
        video.autoplay = true

        video.play().catch((e) => console.log("Video autoplay prevented:", e))

        videoRef.current = video

        // Create texture from video
        const texture = new VideoTexture(video)
        texture.minFilter = LinearFilter
        texture.magFilter = LinearFilter
        setVideoTexture(texture)

        return () => {
            video.pause()
            video.src = ""
            texture.dispose()
        }
    }, [])

    // Update texture each frame
    useFrame(() => {
        if (videoTexture && videoRef.current && !videoRef.current.paused) {
            videoTexture.needsUpdate = true
        }
    })

    if (!videoTexture) return null

    return (
        <mesh ref={meshRef} scale={[3.5, 2, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={videoTexture} transparent={false} />
        </mesh>
    )
}

export function EffectScene() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState(new Vector2(0, 0))
    const [resolution, setResolution] = useState(new Vector2(1920, 1080))

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = rect.height - (e.clientY - rect.top)
                setMousePos(new Vector2(x, y))
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener("mousemove", handleMouseMove)

            const rect = container.getBoundingClientRect()
            setResolution(new Vector2(rect.width, rect.height))

            const handleResize = () => {
                const rect = container.getBoundingClientRect()
                setResolution(new Vector2(rect.width, rect.height))
            }
            window.addEventListener("resize", handleResize)

            return () => {
                container.removeEventListener("mousemove", handleMouseMove)
                window.removeEventListener("resize", handleResize)
            }
        }
    }, [])

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                {/* Video plane */}
                <VideoPlane />

                {/* ASCII Effect with PostFX */}
                <EffectComposer>
                    <AsciiEffect
                        style="standard"
                        cellSize={9}
                        invert={false}
                        color={false}
                        resolution={resolution}
                        mousePos={mousePos}
                        postfx={{
                            scanlineIntensity: 0,
                            scanlineCount: 200,
                            targetFPS: 0,
                            jitterIntensity: 0,
                            jitterSpeed: 1,
                            mouseGlowEnabled: false,
                            mouseGlowRadius: 200,
                            mouseGlowIntensity: 1.5,
                            vignetteIntensity: 0,
                            vignetteRadius: 0.8,
                            colorPalette: 0,
                            curvature: 0,
                            aberrationStrength: 0,
                            noiseIntensity: 0,
                            noiseScale: 1,
                            noiseSpeed: 1,
                            waveAmplitude: 0,
                            waveFrequency: 10,
                            waveSpeed: 1,
                            glitchIntensity: 0,
                            glitchFrequency: 0,
                            brightnessAdjust: 0,
                            contrastAdjust: 1,
                        }}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
