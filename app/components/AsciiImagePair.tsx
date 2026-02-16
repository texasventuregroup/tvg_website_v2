'use client';

import dynamic from 'next/dynamic';

const AsciiImage = dynamic(() => import('./AsciiImage'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#082820]/5 animate-pulse rounded-xl" />,
});

interface AsciiImagePairProps {
    src1: string;
    src2: string;
    cellSize?: number;
}

export default function AsciiImagePair({ src1, src2, cellSize = 6 }: AsciiImagePairProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <AsciiImage
                src={src1}
                className="w-full lg:w-1/2 h-[250px] lg:h-[350px] rounded-xl overflow-hidden"
                cellSize={cellSize}
                colorPalette={1}
            />
            <AsciiImage
                src={src2}
                className="w-full lg:w-1/2 h-[250px] lg:h-[350px] rounded-xl overflow-hidden"
                cellSize={cellSize}
                color
                colorPalette={0}
            />
        </div>
    );
}
