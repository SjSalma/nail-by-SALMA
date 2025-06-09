import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './composantes/ScrollToTop';

// Pages
import Home from './pages/Home';
import ServicesTarifs from './pages/ServicesTarifs';
import AproposTemoignages from './pages/AproposTemoignages';
import PrendreRendezVous from './pages/PrendreRendezVous';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesTarifs />} />
        <Route path="/a-propos" element={<AproposTemoignages />} />
        <Route path="/rendez-vous" element={<PrendreRendezVous />} />
      </Routes>
    </Router>
  );
}

export default App;
