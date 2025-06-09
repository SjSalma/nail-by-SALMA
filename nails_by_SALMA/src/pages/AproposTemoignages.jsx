import Navbar from '../composantes/Navbar';
import Footer from '../composantes/Footer';
import Moi from '../composantes/à_propos_témoignages/Moi';
import GalerieRéalisations from '../composantes/à_propos_témoignages/GalerieRéalisations';
import GalerieAvis from '../composantes/à_propos_témoignages/GalerieAvis';

import '../css/pages.css';
import '../css/fonts.css';

function AproposTemoignages() {
  return (
    <div className="page">
      <Navbar />

      <section className="section-droite">
        <h2>À propos de moi</h2>
        <div className="underline-wrapper">
          <div className="underline-dark10"></div>
          <div className="underline-light"></div>
        </div>
      <Moi />
      </section>

      <section className="section-gauche">
        <h2>Mes réalisations</h2>
        <div className="underline-wrapper">
          <div className="underline-dark11"></div>
          <div className="underline-light"></div>
        </div>
      <GalerieRéalisations />
      </section>

      <section className="section-droite">
        <h2>Avis des clientes</h2>
        <div className="underline-wrapper">
          <div className="underline-dark12"></div>
          <div className="underline-light"></div>
        </div>
      <GalerieAvis />
      </section>

      <Footer />
    </div>
  );
}

export default AproposTemoignages;
