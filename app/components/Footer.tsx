'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/work-with-us') return null;

  return (
    <footer className="bg-[#082820] text-[#fcf7f0]">
      <div className="container mx-auto px-6 pt-32 pb-12 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 pt-8 md:pt-0">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8">
                <Image
                  src="/images-rebrand/logo.png"
                  alt="TVG"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-semibold text-lg">TVG</span>
            </Link>
            <p className="text-sm opacity-60 leading-relaxed max-w-xs">
              A community for students genuinely curious about startups at UT Austin. Est. 2021.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="label text-[#01A072] mb-6">Programs</h4>
            <div className="space-y-4">
              <Link href="/analysts" className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all">
                Analysts
              </Link>
              <Link href="/associates" className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all">
                Associates
              </Link>
              <Link href="/hackathons" className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all">
                Hackathons
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="label text-[#01A072] mb-6">Connect</h4>
            <div className="space-y-4">
              <Link href="/events" className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all">
                Events
              </Link>
              <Link href="/partnerships" className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all">
                Partners
              </Link>
              <Link href="/members" className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all">
                Team
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="label text-[#01A072] mb-6">Follow</h4>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/company/texas-venture-group/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/txventuregroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all"
              >
                Instagram
              </a>
              <a
                href="mailto:contact.txventuregroup@gmail.com"
                className="block text-sm opacity-70 hover:opacity-100 hover:text-[#01A072] transition-all"
              >
                contact.txventuregroup@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#fcf7f0]/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40 font-mono">
            © 2026 Texas Venture Group. All rights reserved.
          </p>
          <p className="text-xs opacity-40 font-mono">
            Austin, TX • University of Texas
          </p>
        </div>
      </div>
    </footer>
  );
}
