import '../../css/prendre_rendez_vous/bande.css';
import iconQualite from '../../assets/prenez-rendez-vous/logo_qualité_supérieur.png';
import iconDesign from '../../assets/prenez-rendez-vous/logo_nail_art_unique.png';
import iconHygiene from '../../assets/prenez-rendez-vous/logo_hygiène_pro.png';

function Bande() {
  return (
    <div className="bande-container">
      <div className="bande-item">
        <img src={iconQualite} alt="Qualité" />
        <div>
          <h3>Qualité supérieur</h3>
          <p>Produits de qualité supérieure et tech certifiée</p>
        </div>
      </div>

      <div className="bande-item">
        <img src={iconDesign} alt="Nail Art" />
        <div>
          <h3>Nail Art Unique</h3>
          <p>Designs personnalisés</p>
        </div>
      </div>

      <div className="bande-item">
        <img src={iconHygiene} alt="Hygiène" />
        <div>
          <h3>Hygiène Pro</h3>
          <p>Matériel stérilisé</p>
        </div>
      </div>
    </div>
  );
}

export default Bande;
