import Navbar from '../composantes/Navbar';
import Footer from '../composantes/Footer';
import Form from '../composantes/prendre_rendez_vous/Form';
import Bande from '../composantes/prendre_rendez_vous/Bande';

import '../css/pages.css';
import '../css/fonts.css';

function PrendreRendezVous() {
  return (
    <div className="page">
      <Navbar />

      <section className="section-droite">
        <h2>Prendre rendez-vous</h2>
        <div className="underline-wrapper">
          <div className="underline-dark13"></div>
          <div className="underline-light"></div>
        </div>
        <Form />
      </section>

      <section className="bande">
        <Bande />
      </section>

      <Footer />
    </div>
  );
}

export default PrendreRendezVous;
