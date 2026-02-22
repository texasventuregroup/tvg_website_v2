'use client';

import { useState, useRef, useEffect } from 'react';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    animation?: 'up'; // Optional prop to match usage in other files if needed, though current implementation ignores it or can be extended
}

export default function Reveal({
    children,
    className = '',
    delay = 0,
}: RevealProps) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
