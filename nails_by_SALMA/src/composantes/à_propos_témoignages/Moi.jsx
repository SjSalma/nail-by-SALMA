import { useNavigate } from 'react-router-dom';
import '../../css/à_propos_témoignages/moi.css';

function Moi() {
  const navigate = useNavigate(); // ← Ajout du hook

  return (
    <div className="moi-container">
      <div className="section">
        <h1>Bienvenue chez <em>nails by SALMA</em> 💅</h1>
        <p>
          Je m’appelle Salma et je suis passionnée par l’esthétique et spécialisée dans les soins des ongles depuis plus de 4 ans.
        </p>
        <p>
          Je crois qu’une belle manucure est bien plus qu’un détail : c’est un moment de détente, de confiance, et de style.<br />
          Mon objectif est de vous offrir un service professionnel, personnalisé et à l’écoute, dans un environnement propre, calme et chaleureux.
        </p>
      </div>

      <div className="section">
        <h1>🎓 Mon parcours</h1>
        <ul>
          <li>Formation certifiée en stylisme ongulaire (2020)</li>
          <li>Spécialisée en pose de gel, vernis semi-permanent, nail art personnalisé</li>
          <li>En apprentissage constant des dernières tendances et techniques</li>
        </ul>
      </div>

      <div className="section">
        <h1>💖 Mon engagement</h1>
        <ul>
          <li>Hygiène rigoureuse</li>
          <li>Conseils adaptés à vos ongles</li>
          <li>Qualité et durabilité avant tout</li>
          <li>Toujours à l’écoute de vos envies</li>
        </ul>
      </div>

      <div className="section">
        <h1>📍 Où me trouver ?</h1>
        <p>
          Je vous accueille sur rendez-vous à Montréal, dans un espace cosy pensé pour vous offrir un vrai moment rien qu’à vous ✨
        </p>
      </div>
    </div>
  );
}

export default Moi;
