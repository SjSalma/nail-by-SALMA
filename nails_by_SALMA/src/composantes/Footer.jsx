import { useNavigate } from 'react-router-dom';
import '../css/footer.css';

import logo from '../assets/footer/logo_footer.png';
import img1 from '../assets/footer/logo_localisation_blanc.png';
import img2 from '../assets/footer/logo_phone_blanc.png';
import img3 from '../assets/footer/logo_mail_blanc.png';

function Footer() {
  const navigate = useNavigate(); // ← Ajout ici

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="logo-footer">
            <img src={logo} alt="logo" />
          </div>
          <p className="subtitle">Salon d’ongle professionnels</p>

          <p><img src={img1} alt="adresse" className="icon-inline" /> 123 rue Belle-image, Montréal, QC</p>
          <p><img src={img2} alt="téléphone" className="icon-inline" /> (123) 456-7890</p>
          <p><img src={img3} alt="email" className="icon-inline" /> contact@nailsbysalma.ca</p>
        </div>
        <div className="footer-right">
          <button
            className="btn-rendezvous"
            onClick={() => navigate('/rendez-vous')} // ← Ajout ici
          >
            Prendre rendez-vous
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-signature">
          <span>SAJID SALMA</span>
          <span>© 2025. All rights reserved.</span>
        </div>
        <div className="footer-nav">
          <a href="/">Home</a>
          <a href="/services">Services et tarifs</a>
          <a href="/a-propos">À propos et témoignages</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
