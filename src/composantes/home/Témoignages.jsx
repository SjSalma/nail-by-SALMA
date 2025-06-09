import { useNavigate } from 'react-router-dom';
import '../../css/home/témoignages.css';

import img1 from '../../assets/flag.png';

function Témoignages() {
  const navigate = useNavigate(); // ← Ajout ici

  return (
    <div className="testimonial">

      <div className="testimonial-box">
        <div className="flag">
          <img src={img1} alt="flag" />
          <span>★★★★★</span>
        </div>
        <div className="testimonial-text">
          <h1>Une vraie artiste des ongles !</h1>
          <p>Super contente de mes ongles ! Elle est super douce, à l’écoute, et très minutieuse. Le résultat est magnifique et a duré longtemps. Je recommande à 100 % ✨</p>
        </div>
      </div>

      <div className="testimonial-box">
        <div className="flag">
          <img src={img1} alt="flag" />
          <span>★★★★★</span>
        </div>
        <div className="testimonial-text">
          <h1>La meilleure !</h1>
          <p>Travail incroyable ! Elle fait vraiment attention aux détails et le résultat est toujours parfait. Je reçois plein de compliments à chaque fois. Merci encore 💖</p>
        </div>
      </div>

      <div className="testimonial-box">
        <div className="flag">
          <img src={img1} alt="flag" />
          <span>★★★★★</span>
        </div>
        <div className="testimonial-text">
          <h1>Exactement ce que j’ai demandé</h1>
          <p>Je l’ai choisie pour faire mes ongles avant mon mariage et je ne regrette pas du tout ! Elle a su capter exactement ce que je voulais. Résultat, des ongles élégants, brillants, et qui ont fait sensation ! Merci encore !!</p>
        </div>
      </div>

      <div className="btn-center">
        <button
          className="btn-rose"
          onClick={() => navigate('/a-propos')} // ← Redirection ici
        >
          En savoir plus
        </button>
      </div>
    </div>
  );
}

export default Témoignages;
