// GalerieAvis.jsx
import { useRef } from 'react';
import '../../css/à_propos_témoignages/galerie_avis.css';
import flag from '../../assets/flag.png';

const avis = [
  {
    titre: "Une vraie artiste des ongles !",
    texte: "Super contente de mes ongles ! Elle est super douce, à l’écoute, et très minutieuse. Le résultat est magnifique et a duré longtemps. Je recommande à 100 % ✨",
    etoiles: 5
  },
  {
    titre: "La meilleure !",
    texte: "Travail incroyable ! Attention aux détails et résultat toujours parfait. Je reçois plein de compliments à chaque fois 💖",
    etoiles: 5
  },
  {
    titre: "Exactement ce que j’ai demandé",
    texte: "Avant mon mariage, elle a su capter exactement ce que je voulais. Ongles élégants, brillants, sensation garantie !",
    etoiles: 5
  },
  {
    titre: "Top service !",
    texte: "Super ambiance, hygiène impeccable et elle est très professionnelle. C'est ma nouvelle adresse préférée 💅",
    etoiles: 4
  },
  {
    titre: "Je reviendrai !",
    texte: "Accueil chaleureux et résultat au top. Je suis repartie avec le sourire et des ongles magnifiques !",
    etoiles: 5
  },
  {
    titre: "Une pépite !",
    texte: "Elle a des mains de fée ! Nail art personnalisé exactement comme sur ma photo. Merci 1000 fois !",
    etoiles: 4
  }
];

function GalerieAvis() {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 400;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="galerie-wrapper">
      <button className="arrow" onClick={() => scroll('left')}>‹</button>

      <div className="galerie-container" ref={containerRef}>
        {avis.map((avis, index) => (
          <div key={index} className="avis-box">
            <div className="flag">
              <img src={flag} alt="flag" />
              <span>{'★'.repeat(avis.etoiles) + '☆'.repeat(5 - avis.etoiles)}</span>
            </div>
            <div className="avis-text">
              <h1>{avis.titre}</h1>
              <p>{avis.texte}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow" onClick={() => scroll('right')}>›</button>
    </div>
  );
}

export default GalerieAvis;
