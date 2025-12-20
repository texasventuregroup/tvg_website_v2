import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

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
        <Link to="/" className="nav__logo">
          <img
            src="/images/logo/logo-small.png"
            alt="TVG Logo"
            style={{ width: '32px', height: '32px' }}
            className="nav__logo-image"
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
              <Link to="/analysts" className="nav__dropdown-link">Analysts</Link>
              <Link to="/associates" className="nav__dropdown-link">Associates</Link>
              <Link to="/bevsanddevs" className="nav__dropdown-link">Bevs & Devs</Link>
            </div>
          </div>
          <Link to="/events" className="nav__link">Events</Link>
          <Link to="/partnerships" className="nav__link">Partners</Link>
          <a href="https://venturabytvg.substack.com/" target="_blank" rel="noopener noreferrer" className="nav__link">
            Research
          </a>
          <Link to="/members" className="nav__link">Team</Link>
          <Link to="/join" className="nav__link">Join</Link>
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            <div className="theme-toggle__circle"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}
