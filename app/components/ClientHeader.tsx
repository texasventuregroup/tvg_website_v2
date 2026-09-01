'use client';

import Link from 'next/link';
import { useJoinModal } from './SignupModal';

export default function ClientHeader() {
    const { openModal } = useJoinModal();

    return (
        <header className="sticky top-0 z-50 bg-[#E4E3E0] border-b border-[#141414]">
            <div className="grid grid-cols-4 divide-x divide-[#141414]">
                <Link href="/" className="p-4 hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors">
                    <strong>TVG</strong> <span className="opacity-50 ml-2 text-sm">v2.0</span>
                </Link>
                <div className="p-4 flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="opacity-60">Online</span>
                </div>
                <div className="p-4 hidden md:flex items-center gap-6 text-sm">
                    <Link href="/analysts" className="opacity-60 hover:opacity-100 transition-opacity">Analysts</Link>
                    <Link href="/associates" className="opacity-60 hover:opacity-100 transition-opacity">Associates</Link>
                    <Link href="/events" className="opacity-60 hover:opacity-100 transition-opacity">Events</Link>
                </div>
                <button
                    onClick={openModal}
                    className="p-4 text-right hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors cursor-pointer"
                >
                    Apply ↗
                </button>
            </div>
        </header>
    );
}
