"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { Vector2, TextureLoader } from "three"
import { AsciiEffect } from "./ascii-effect"

function ImagePlane({ src }: { src: string }) {
    const texture = useLoader(TextureLoader, src)

    // Calculate aspect ratio from image
    const aspect = texture.image ? texture.image.width / texture.image.height : 16 / 9

    return (
        <mesh scale={[aspect * 2, 2, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    )
}

interface AsciiImageProps {
    src: string
    className?: string
    cellSize?: number
    color?: boolean
    invert?: boolean
    colorPalette?: number
}

export default function AsciiImage({
    src,
    className = "",
    cellSize = 8,
    color = false,
    invert = false,
    colorPalette = 0,
}: AsciiImageProps) {
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
                    camera={{ position: [0, 0, 2.5], fov: 50 }}
                    style={{ background: "transparent" }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <ImagePlane src={src} />
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
                                contrastAdjust: 1.2,
                                brightnessAdjust: 0.05,
                            }}
                        />
                    </EffectComposer>
                </Canvas>
            )}
        </div>
    )
}
