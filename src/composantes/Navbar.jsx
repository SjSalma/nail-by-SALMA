import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../css/navbar.css';
import img1 from '../assets/navbar/logo_storyboard1.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  return (
    <>
      <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
        <div className="logo-navbar desktop-only">
          <Link to="/" onClick={() => setIsMobile(false)}>
            <img src={img1} alt="Ongles nude rose" />
          </Link>
        </div>

        <div
          className="menu-toggle"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? (
            <div className="close-icon">✕</div>
          ) : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </div>

        <ul className={`nav-links ${isMobile ? 'mobile-menu' : ''}`}>
          {isMobile && (
            <li className="mobile-logo">
              <Link to="/" onClick={() => setIsMobile(false)}>
                <img src={img1} alt="Ongles nude rose" />
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setIsMobile(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={location.pathname === '/services' ? 'active' : ''}
              onClick={() => setIsMobile(false)}
            >
              Services et tarifs
            </Link>
          </li>
          <li>
            <Link
              to="/a-propos"
              className={location.pathname === '/a-propos' ? 'active' : ''}
              onClick={() => setIsMobile(false)}
            >
              À propos et témoignages
            </Link>
          </li>
          <li>
            <button
              className="btn-reserve"
              onClick={() => {
                setIsMobile(false);
                navigate('/rendez-vous');
              }}
            >
              Prendre rendez-vous
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
