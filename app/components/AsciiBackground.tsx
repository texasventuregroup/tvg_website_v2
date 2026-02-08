"use client"

import dynamic from "next/dynamic"

// Dynamically import EffectScene to avoid SSR issues with Three.js
const EffectScene = dynamic(
    () => import("./effect-scene").then((mod) => mod.EffectScene),
    {
        ssr: false,
        loading: () => <div className="w-full h-full" />,
    }
)

export default function AsciiBackground() {
    return (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[60%] z-0 hidden lg:block pointer-events-none">
            <EffectScene />
        </div>
    )
}
