import Image from 'next/image';

interface TrekHeroProps {
    city: string;
    semester: string;
    year: string;
    description: string;
    images: string[];
    video?: string;
    firmCount?: number;
}

export default function TrekHero({ city, semester, year, description, images, video, firmCount = 15 }: TrekHeroProps) {
    return (
        <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#fcf7f0] text-[#082820] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                    {/* LEFT: Typography */}
                    <div className="lg:w-1/2 flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6 border-b border-[#082820]/20 pb-2">
                                <span className="font-mono text-sm uppercase tracking-widest text-[#016F4E]">Trek Dispatch</span>
                                <span className="font-mono text-sm text-[#082820]/40">///</span>
                                <span className="font-mono text-sm uppercase tracking-widest">{semester} {year}</span>
                            </div>
                            <h1 className="text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] font-bold tracking-tighter mb-8 text-[#082820]">
                                {city.toUpperCase()}
                            </h1>
                            <p className="text-lg lg:text-xl opacity-80 max-w-md leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="mt-12 lg:mt-0 flex gap-8">
                            <div>
                                <span className="block font-mono text-xs opacity-50 mb-1">STATUS</span>
                                <span className="text-xl font-semibold text-[#016F4E]">Complete</span>
                            </div>
                            <div>
                                <span className="block font-mono text-xs opacity-50 mb-1">FIRMS VISITED</span>
                                <span className="text-xl font-semibold">{firmCount}+</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Media Grid */}
                    <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-3 h-[500px] lg:h-auto">
                        {/* Main large image */}
                        <div className="relative row-span-2 col-span-1 rounded-xl overflow-hidden group">
                            <Image
                                src={images[0]}
                                alt={`${city} highlight 1`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#082820]/10" />
                        </div>

                        {/* Top right - Video if available, otherwise image */}
                        {video ? (
                            <div className="relative col-span-1 rounded-xl overflow-hidden group">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                >
                                    <source src={video} type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#082820]/40 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-3">
                                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#01A072] bg-[#082820]/60 px-2 py-1 rounded backdrop-blur-sm">Live Reel</span>
                                </div>
                            </div>
                        ) : (
                            <div className="relative col-span-1 rounded-xl overflow-hidden group">
                                <Image
                                    src={images[1]}
                                    alt={`${city} highlight 2`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Bottom right */}
                        <div className="relative col-span-1 rounded-xl overflow-hidden group">
                            <Image
                                src={images[video ? 1 : 2]}
                                alt={`${city} highlight ${video ? 2 : 3}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
