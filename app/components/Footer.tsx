export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">&copy; 2025 Texas Venture Group. All rights reserved.</p>
        <div className="footer__credit">
          <p className="footer__text footer__text--front">
            Made with <i className="fas fa-heart" style={{ color: '#ff4d4d' }}></i> in Austin
          </p>
          <p className="footer__text footer__text--back">
            Made with <i className="fas fa-heart" style={{ color: '#ff4d4d' }}></i> by{' '}
            <a href="https://khosraw.com" target="_blank" rel="noopener noreferrer">
              Khosraw Azizi
            </a>
          </p>
        </div>
        <div className="footer__social-media">
          <a
            href="https://www.linkedin.com/company/texas-venture-group/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://www.instagram.com/txventuregroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a href="mailto:contact.txventuregroup@gmail.com" className="footer__link">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
