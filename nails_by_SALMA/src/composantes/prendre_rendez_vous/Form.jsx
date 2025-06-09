import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { fr } from 'date-fns/locale';
import React from "react";

import iconAdresse from '../../assets/prenez-rendez-vous/logo_localisation_rose.png';
import iconContact from '../../assets/prenez-rendez-vous/logo_phone_rose.png';
import iconHoraire from '../../assets/prenez-rendez-vous/logo_horraire_rose.png';

import '../../css/prendre_rendez_vous/form.css';

const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <input
    type="text"
    onClick={onClick}
    ref={ref}
    value={value}
    readOnly
    placeholder={placeholder}
    className="custom-datepicker-input"
  />
));

function Form() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [horairesOccupes, setHorairesOccupes] = useState([]);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    service: '',
    horaire: '',
    commentaire: '',
    services: []
  });

  const horairesDisponibles = (() => {
    const horaires = [];
    for (let h = 8; h <= 17; h++) {
      for (let m of [0, 30]) {
        const heure = `${h.toString().padStart(2, '0')}:${m === 0 ? '00' : '30'}`;
        if (!(h === 8 && m === 0)) {
          horaires.push(heure);
        }
      }
    }
    return horaires;
  })();

  const horairesSamedi = [
    "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"
  ];

  const loadHorairesOccupes = async (dateObj) => {
    if (!dateObj) return;
    const d = dateObj.toISOString().split("T")[0];
    const res = await fetch(`https://nail-by-salma.onrender.com/api/horaires-occupes/${d}`);
    const data = await res.json();
    setHorairesOccupes(data);
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0;
  };

  const getHorairesPourDate = () => {
    if (!selectedDate) return [];
    return selectedDate.getDay() === 6 ? horairesSamedi : horairesDisponibles;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.prenom.trim() === '' ||
      formData.nom.trim() === '' ||
      formData.telephone.trim() === '' ||
      formData.services.length === 0 ||
      !selectedDate ||
      formData.horaire === ''
    ) {
      setShowErrorModal(true);
      return;
    }

    const body = {
      ...formData,
      date: selectedDate.toISOString().split("T")[0],
      service: formData.services.join(", ")
    };

    fetch("https://nail-by-salma.onrender.com/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(async res => {
        const data = await res.json();
        if (res.status === 409) {
          alert("Ce créneau est déjà réservé.");
        } else if (data.success) {
          setShowModal(true);
          setFormData({
            prenom: '',
            nom: '',
            telephone: '',
            email: '',
            service: '',
            horaire: '',
            commentaire: '',
            services: []
          });
          setSelectedDate(null);
          setHorairesOccupes([]);
          localStorage.removeItem('quizCommentaire');
          localStorage.removeItem('quizSuggestionNom');
        } else {
          alert("❌ Une erreur est survenue.");
        }
      })
      .catch(() => alert("❌ Erreur de connexion au serveur."));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const selectedService = services.find(s => s.nom_service === value);
    const catId = selectedService?.categorie_id;
    const sameCatServices = services.filter(s => s.categorie_id === catId);
    const isMultiple = sameCatServices[0]?.multiple_selection === 1;

    setFormData(prev => {
      let updated = [...prev.services];

      if (checked) {
        if (!isMultiple) {
          const sameCategory = sameCatServices.map(s => s.nom_service);
          updated = updated.filter(s => !sameCategory.includes(s));
        }
        updated.push(value);
      } else {
        updated = updated.filter(s => s !== value);
      }

      return { ...prev, services: updated };
    });
  };

  const categorizeServices = () => {
    const categories = {};
    services.forEach((service) => {
      if (!categories[service.categorie]) {
        categories[service.categorie] = [];
      }
      categories[service.categorie].push(service);
    });
    return categories;
  };

  const isServiceDisabled = (service, selected) => {
    if (service.categorie === "Nail Art") {
      const prerequisite = selected.some(sel => {
        const full = services.find(s => s.nom_service === sel);
        return full && (full.categorie === "Manucure" || full.categorie === "Beauté des pieds");
      });
      return !prerequisite;
    }
    if (["Manucure", "Beauté des pieds"].includes(service.categorie)) {
      return selected.some(sel => {
        const full = services.find(s => s.nom_service === sel);
        return full && full.categorie === service.categorie && sel !== service.nom_service;
      });
    }
    return false;
  };

  useEffect(() => {
    if (selectedDate) loadHorairesOccupes(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const servicesEnDur = [
      { id: 1, nom_service: "Manucure simple", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Soins des ongles naturels" },
      { id: 2, nom_service: "Manucure spa (avec massage)", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Soins des ongles naturels" },
      { id: 3, nom_service: "Pose de vernis classique", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Soins des ongles naturels" },
      { id: 4, nom_service: "Manucure express (limage + vernis)", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Soins des ongles naturels" },

      { id: 5, nom_service: "Vernis semi-permanent mains", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Semi-permanent" },
      { id: 6, nom_service: "Depose semi-permanent", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Semi-permanent" },
      { id: 7, nom_service: "Base renforcee", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Semi-permanent" },

      { id: 8, nom_service: "Pose gel avec rallongement", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Gel/Acrygel/Extensions" },
      { id: 9, nom_service: "Pose complete avec rallongement capsules", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Gel/Acrygel/Extensions" },
      { id: 10, nom_service: "Pose en polygel / acrygel", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Gel/Acrygel/Extensions" },
      { id: 11, nom_service: "Remplissage gel ou polygel", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Gel/Acrygel/Extensions" },
      { id: 12, nom_service: "Depose de gel / polygel", categorie: "Manucure", categorie_id: 1, multiple_selection: 0, sous_categorie: "Gel/Acrygel/Extensions" },

      { id: 13, nom_service: "Nail art simple (1-2 ongles)", categorie: "Nail Art", categorie_id: 2, multiple_selection: 1, sous_categorie: null },
      { id: 14, nom_service: "Nail art complet personnalise", categorie: "Nail Art", categorie_id: 2, multiple_selection: 1, sous_categorie: null },
      { id: 15, nom_service: "Babyboomer", categorie: "Nail Art", categorie_id: 2, multiple_selection: 1, sous_categorie: null },
      { id: 16, nom_service: "French manucure", categorie: "Nail Art", categorie_id: 2, multiple_selection: 1, sous_categorie: null },
      { id: 17, nom_service: "Effets speciaux (chrome, marbre...)", categorie: "Nail Art", categorie_id: 2, multiple_selection: 1, sous_categorie: null },
      { id: 18, nom_service: "Encapsulation", categorie: "Nail Art", categorie_id: 2, multiple_selection: 1, sous_categorie: null },

      { id: 19, nom_service: "Beaute des pieds (soin + vernis)", categorie: "Beaute des pieds", categorie_id: 3, multiple_selection: 0, sous_categorie: null },
      { id: 20, nom_service: "Spa des pieds complet", categorie: "Beaute des pieds", categorie_id: 3, multiple_selection: 0, sous_categorie: null },
      { id: 21, nom_service: "Depose vernis semi permanent", categorie: "Beaute des pieds", categorie_id: 3, multiple_selection: 0, sous_categorie: null },

      { id: 22, nom_service: "Retrait vernis semi-permanent", categorie: "Services a la carte", categorie_id: 4, multiple_selection: 1, sous_categorie: null },
      { id: 23, nom_service: "Massage mains 15min", categorie: "Services a la carte", categorie_id: 4, multiple_selection: 1, sous_categorie: null },
      { id: 24, nom_service: "Massage mains 30min", categorie: "Services a la carte", categorie_id: 4, multiple_selection: 1, sous_categorie: null },
    ];

    setServices(servicesEnDur);
  }, []);


  useEffect(() => {
    const raw = localStorage.getItem('quizServicesBdd');
    const commentaireQuiz = localStorage.getItem('quizCommentaire');

    if (services.length > 0 && (raw || commentaireQuiz)) {
      if (raw) {
        const noms = raw.split('+').map(n => n.trim().toLowerCase());
        const matches = services
          .filter(s => noms.includes(s.nom?.toLowerCase?.()) || noms.includes(s.nom_service?.toLowerCase?.()))
          .map(s => s.nom_service);

        setFormData(prev => ({
          ...prev,
          services: [...new Set([...prev.services, ...matches])]
        }));
      }

      if (commentaireQuiz) {
        setFormData(prev => ({ ...prev, commentaire: commentaireQuiz }));
      }

      localStorage.removeItem('quizServicesBdd');
      localStorage.removeItem('quizCommentaire');
      localStorage.removeItem('quizNomAffichage');
      localStorage.removeItem('quizSuggestionPrix');
      localStorage.removeItem('quizSuggestionTemps');
    }
  }, [services]);

  return (
    <div className="form-container">
      <div className="form-infos">
        <div className="form-info-block">
          <img src={iconAdresse} alt="Adresse" />
          <div>
            <h3>Adresse</h3>
            <p>123 rue Belle-image<br />OTT0000<br />Montréal, QC</p>
          </div>
        </div>

        <div className="form-info-block">
          <img src={iconContact} alt="Contact" />
          <div>
            <h3>Contacts</h3>
            <p>Mobile : +1 (123) 456-7890<br />Mail : contact@nailsbysalma.ca</p>
          </div>
        </div>

        <div className="form-info-block">
          <img src={iconHoraire} alt="Horaire" />
          <div>
            <h3>Horaire</h3>
            <p>Lundi au vendredi : 8h30 - 17h30<br />Samedi : 8h30 - 12h00</p>
          </div>
        </div>
      </div>

      <form className="form-fields" onSubmit={handleSubmit}>
        <label>
          <span>Prénom :</span>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="ex: Salma" required />
        </label>

        <label>
          <span>Nom :</span>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="ex: Sajid" required />
        </label>

        <label>
          <span>Numéro de téléphone :</span>
          <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="ex: 123-456-7890" required />
        </label>

        <label>
          <span>Choisissez les services souhaités :</span>
          <div className="service-selector">
            console.log("💅 Catégories générées :", categorizeServices());
            {Object.entries(categorizeServices()).map(([categorie, items]) => (
              <div key={categorie}>
                <strong style={{ pointerEvents: 'none' }}>{categorie}</strong>
                <ul>
                  {items.map((service) => (
                    <li key={service.id}>
                      <div
                        className={`service-item-wrapper ${isServiceDisabled(service, formData.services) ? "disabled" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <label>
                          <input
                            type="checkbox"
                            value={service.nom_service}
                            checked={formData.services.includes(service.nom_service)}
                            onChange={handleServiceChange}
                            disabled={isServiceDisabled(service, formData.services)}
                          />
                          <span>{service.nom_service}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </label>

        <label>
          <span>Choisissez une date disponible :</span>
          <DatePicker
            locale={fr}
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setFormData(prev => ({ ...prev, horaire: '' }));
              loadHorairesOccupes(date);
            }}
            filterDate={isDateAvailable}
            placeholderText="-- Sélectionnez une date --"
            dateFormat="yyyy-MM-dd"
            customInput={<CustomDateInput />}
            calendarClassName="calendrier-salma"
            required
          />
        </label>

        <label>
          <span>Choisissez un créneau disponible :</span>
          <div className="horaire-select-wrapper">
            <select
              name="horaire"
              value={formData.horaire}
              onChange={handleChange}
              required
              disabled={!selectedDate}
              className={formData.horaire === '' ? 'select-placeholder' : ''}
            >
              <option value="">-- Sélectionnez un horaire --</option>
              {getHorairesPourDate()
                .filter(h => !horairesOccupes.includes(h))
                .map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
            </select>
          </div>
        </label>

        <label>
          <span>Commentaires : <em>(optionnel)</em></span>
          <input
            type="text"
            name="commentaire"
            value={formData.commentaire}
            onChange={handleChange}
            placeholder="ex: J'aime discuter pendant ma séance"
          />
        </label>

        <div className="form-button-wrapper">
          <button type="submit" className="btn-rose">Réserver</button>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>✅ Réservation enregistrée</h2>
            <p>Merci pour votre confiance 💅</p>
            <button onClick={() => setShowModal(false)} className="btn-rose">Fermer</button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>❗Champs manquants</h2>
            <p>Veuillez remplir tous les champs obligatoires avant de réserver.</p>
            <button onClick={() => setShowErrorModal(false)} className="btn-rose">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
