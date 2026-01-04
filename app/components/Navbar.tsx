'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useJoinModal } from './SignupModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { openModal } = useJoinModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const handleToggleClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <nav className={`nav ${isScrolled || isMenuOpen ? 'nav--scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="nav__logo">
          <Image
            src="/images/logo/logo-small.png"
            alt="TVG Logo"
            width={32}
            height={32}
            className="nav__logo-image"
            priority
          />
        </Link>

        <button
          className={`nav__toggle ${isMenuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation"
          onClick={handleToggleClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
          <div
            className={`nav__dropdown ${isDropdownOpen ? 'active' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setIsDropdownOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setIsDropdownOpen(false)}
          >
            <button
              className="nav__link"
              onClick={(e) => {
                e.preventDefault();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              Programs
            </button>
            <div className="nav__dropdown-content">
              <Link href="/analysts" className="nav__dropdown-link">Analysts</Link>
              <Link href="/associates" className="nav__dropdown-link">Associates</Link>
              <Link href="/bevsanddevs" className="nav__dropdown-link">Bevs & Devs</Link>
            </div>
          </div>
          <Link href="/events" className="nav__link">Events</Link>
          <Link href="/partnerships" className="nav__link">Partners</Link>
          <a href="https://venturabytvg.substack.com/" target="_blank" rel="noopener noreferrer" className="nav__link">
            Research
          </a>
          <Link href="/members" className="nav__link">Team</Link>
          <button className="nav__link" onClick={() => { openModal(); setIsMenuOpen(false); }}>Join</button>
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            <div className="theme-toggle__circle"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}
