import { useRef } from 'react';
import Navbar from '../composantes/Navbar';
import Footer from '../composantes/Footer';
import GaleriePhoto from '../composantes/home/GaleriePhoto';
import Témoignages from '../composantes/home/Témoignages';
import Quiz from '../composantes/home/Quiz';

import '../css/pages.css';
import '../css/fonts.css';

import img1 from '../assets/home/nouveauté.png';
import img2 from '../assets/home/icon1.png';
import img3 from '../assets/home/icon2.png';

function Home() {
  const quizRef = useRef(null);

  const scrollToQuiz = () => {
    if (quizRef.current) {
      quizRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page">
      <Navbar />

      <section className="section-droite">
        <h2>Aperçu…</h2>
        <div className="underline-wrapper">
          <div className="underline-dark1"></div>
          <div className="underline-light"></div>
        </div>
        <GaleriePhoto />
      </section>

      <section className="section-gauche">
        <h2>Témoignages récents</h2>
        <div className="underline-wrapper">
          <div className="underline-dark2"></div>
          <div className="underline-light"></div>
        </div>
        <Témoignages />
      </section>

      <section ref={quizRef} id="section-quiz" className="section-droite">
        <div className="nouveaute-rose">
          <img src={img1} alt="nouveauté" />
          <h2> : pour offrir ?</h2>
        </div>
        <div className="underline-wrapper">
          <div className="underline-dark3"></div>
          <div className="underline-light"></div>
        </div>
        <Quiz />
      </section>

      <Footer />

      <div className="floating-icon" onClick={scrollToQuiz}>
        <div className="icon-wrapper">
          <img src={img2} alt="Quiz" className="icon-default" />
          <img src={img3} alt="Quiz hover" className="icon-hover" />
        </div>
      </div>
    </div>
  );
}

export default Home;
