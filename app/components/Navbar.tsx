'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useJoinModal } from './SignupModal';

interface DropdownItem {
  href: string;
  label: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { openModal } = useJoinModal();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: NavItem[] = [
    {
      label: 'Programs',
      dropdown: [
        { href: '/analysts', label: 'Analysts', description: 'Learn the fundamentals' },
        { href: '/associates', label: 'Associates', description: 'Work with startups & VCs' },
      ]
    },
    {
      label: 'Events',
      dropdown: [
        { href: '/events', label: 'Speaker Series', description: 'Founder & investor talks' },
        { href: '/treks', label: 'Treks', description: 'NYC & SF visits' },
        { href: '/hackathons', label: 'Hackathons', description: 'Build & compete' },
      ]
    },
    { href: '/members', label: 'Team' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-[#082820]/90 backdrop-blur-md shadow-sm'
      : 'bg-[#082820]/80 backdrop-blur-sm'
      }`}>
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src="/images-rebrand/logo.png"
                alt="TVG"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-lg tracking-tight hidden sm:inline text-[#fcf7f0]">
              Texas Venture Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`text-sm font-medium transition-colors flex items-center gap-1 ${openDropdown === item.label
                        ? 'text-[#01A072]'
                        : 'text-[#fcf7f0]/70 hover:text-[#fcf7f0]'
                        }`}
                    >
                      {item.label}
                      <svg className={`w-3 h-3 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-[#082820] border border-[#fcf7f0]/10 rounded-lg shadow-xl py-2">
                        {item.dropdown.map((dropItem) => (
                          <Link
                            key={dropItem.href}
                            href={dropItem.href}
                            className="block px-4 py-3 hover:bg-[#fcf7f0]/5 transition-colors"
                          >
                            <span className="block text-sm font-medium text-[#fcf7f0]">{dropItem.label}</span>
                            {dropItem.description && (
                              <span className="block text-xs text-[#fcf7f0]/50 mt-0.5">{dropItem.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    className={`text-sm font-medium transition-colors ${pathname === item.href
                      ? 'text-[#01A072]'
                      : 'text-[#fcf7f0]/70 hover:text-[#fcf7f0]'
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Work with Us */}
            <Link
              href="/work-with-us"
              className="text-sm font-medium text-[#fcf7f0]/70 hover:text-[#fcf7f0] transition-colors"
            >
              Work with Us
            </Link>

            <button
              onClick={openModal}
              className="btn-primary text-sm py-2 px-5"
            >
              Apply
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-[#fcf7f0] transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#fcf7f0] transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-[#fcf7f0] transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#082820] max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto py-6">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div className="border-b border-[#fcf7f0]/10">
                    <div className="py-4 text-[#fcf7f0]/50 text-xs uppercase tracking-wider">
                      {item.label}
                    </div>
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        href={dropItem.href}
                        className="block py-3 pl-4 text-[#fcf7f0] text-lg font-medium hover:text-[#01A072] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="block py-4 text-[#fcf7f0] text-lg font-medium border-b border-[#fcf7f0]/10 hover:text-[#01A072] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/work-with-us"
              className="block py-4 text-[#fcf7f0] text-lg font-medium border-b border-[#fcf7f0]/10 hover:text-[#01A072] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Work with Us
            </Link>
            <button
              onClick={() => { openModal(); setIsMenuOpen(false); }}
              className="w-full mt-6 py-4 bg-[#016F4E] text-white font-semibold hover:bg-[#01A072] transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
