import Navbar from '../composantes/Navbar';
import Footer from '../composantes/Footer';
import OnglesNaturels from '../composantes/services_tarifs/OnglesNaturels';
import SemiPermanent from '../composantes/services_tarifs/SemiPermanent';
import Gel from '../composantes/services_tarifs/Gel';
import NailArt from '../composantes/services_tarifs/NailArt';
import Pieds from '../composantes/services_tarifs/Pieds';
import ÀlaCarte from '../composantes/services_tarifs/ÀlaCarte';

import '../css/pages.css';
import '../css/fonts.css';

function AproposTemoignages() {
  return (
    <div className="page">
      <Navbar />

      <section className="section-droite">
        <h2>Soins des ongles naturels</h2>
        <div className="underline-wrapper">
          <div className="underline-dark4"></div>
          <div className="underline-light"></div>
        </div>
        <OnglesNaturels />
      </section>

      <section className="section-gauche">
        <h2>Semi-permanent</h2>
        <div className="underline-wrapper">
          <div className="underline-dark5"></div>
          <div className="underline-light"></div>
        </div>
        <SemiPermanent />
      </section>

      <section className="section-droite">
        <h2>Gel / Acrygel / Extensions</h2>
        <div className="underline-wrapper">
          <div className="underline-dark6"></div>
          <div className="underline-light"></div>
        </div>
        <Gel />
      </section>

      <section className="section-gauche">
        <h2>Nail Art</h2>
        <div className="underline-wrapper">
          <div className="underline-dark7"></div>
          <div className="underline-light"></div>
        </div>
        <NailArt />
      </section>

      <section className="section-droite">
        <h2>Beauté des pieds</h2>
        <div className="underline-wrapper">
          <div className="underline-dark8"></div>
          <div className="underline-light"></div>
        </div>
        <Pieds />
      </section>
      
      <section className="section-gauche">
        <h2>Services à la carte</h2>
        <div className="underline-wrapper">
          <div className="underline-dark9"></div>
          <div className="underline-light"></div>
        </div>
        <ÀlaCarte />
      </section>
      
      <Footer />
    </div>
  );
}

export default AproposTemoignages;
