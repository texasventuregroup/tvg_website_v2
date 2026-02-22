"use client"

export default function HeroVideo() {
    return (
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[38%] h-auto z-0 hidden lg:block pointer-events-none">
            {/* Subtle gradient mask for gentle blending */}
            <div className="relative">
                {/* Left fade gradient - subtle */}
                <div
                    className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to right, #fcf7f0 0%, transparent 100%)'
                    }}
                />
                {/* Top fade gradient - subtle */}
                <div
                    className="absolute inset-x-0 top-0 h-10 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, #fcf7f0 0%, transparent 100%)'
                    }}
                />
                {/* Bottom fade gradient - subtle */}
                <div
                    className="absolute inset-x-0 bottom-0 h-10 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to top, #fcf7f0 0%, transparent 100%)'
                    }}
                />
                {/* Right fade gradient - subtle */}
                <div
                    className="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to left, #fcf7f0 0%, transparent 100%)'
                    }}
                />

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                >
                    <source src="/videos/speedway.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
