'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LOGO_DEV_TOKEN } from '../config/logos';

interface FirmLogoProps {
    name: string;
    domain?: string;
    logo?: string | null; // Local path
    size?: number;
    className?: string;
}

export default function FirmLogo({ name, domain, logo, size = 48, className = '' }: FirmLogoProps) {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (logo) {
            setImgSrc(logo);
            return;
        }

        // Try logo.dev first if domain exists
        if (domain) {
            const params = new URLSearchParams({
                token: LOGO_DEV_TOKEN,
                size: String(size * 2), // 2x for retina
                format: 'png',
            });
            setImgSrc(`https://img.logo.dev/${domain}?${params.toString()}`);
        } else {
            setImgSrc(null);
        }
    }, [logo, domain, size]);

    if (!imgSrc || hasError) {
        return (
            <div
                className={`bg-[#fcf7f0]/10 flex items-center justify-center shrink-0 border border-[#082820]/10 rounded-full ${className}`}
                style={{ width: size, height: size }}
            >
                <span className="text-xs font-bold opacity-50">{name[0]}</span>
            </div>
        );
    }

    // If local image, use Next Image
    if (imgSrc.startsWith('/') || imgSrc.startsWith('http') === false) { // Local path check
        return (
            <div
                className={`relative overflow-hidden shrink-0 rounded-full bg-white border border-[#082820]/5 ${className}`}
                style={{ width: size, height: size }}
            >
                <Image src={imgSrc} alt={name} fill className="object-cover" />
            </div>
        );
    }

    // Remote image (logo.dev/clearbit) - use img for error handling
    return (
        <div
            className={`relative overflow-hidden shrink-0 rounded-full bg-white border border-[#082820]/5 ${className}`}
            style={{ width: size, height: size }}
        >
            <img
                src={imgSrc}
                alt={name}
                className="w-full h-full object-contain p-1.5"
                onError={() => {
                    // If logo.dev fails, try Clearbit as backup before giving up
                    if (imgSrc.includes('logo.dev') && domain) {
                        setImgSrc(`https://logo.clearbit.com/${domain}?size=${size * 2}`);
                    } else {
                        setHasError(true);
                    }
                }}
            />
        </div>
    );
}
