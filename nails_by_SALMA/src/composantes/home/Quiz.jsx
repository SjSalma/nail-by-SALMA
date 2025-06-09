import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/home/quiz.css';

function Quiz() {
  const [answers, setAnswers] = useState({
    budget: '',
    style: '',
    occasion: '',
    tenue: '',
    faux: '',
    deco: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const allAnswered = Object.values(answers).every(val => val !== '');

function getSuggestion(answers) {
  const { budget, style, occasion, tenue, faux, deco } = answers;

  const budgetToMax = {
    "Moins de 40$": 40,
    "Entre 40$ et 60$": 60,
    "Entre 60$ et 100$": 100,
    "Plus de 100$": 999
  };

  const fitsBudget = (priceString) => {
    const parts = priceString.split('+').map(p => parseFloat(p.trim()));
    const total = parts.reduce((a, b) => a + b, 0);
    return total <= budgetToMax[budget];
  };

  const suggestions = [
    {
      condition: faux === "C’est une habituée" && style === "Artistique et audacieux" && deco === "Oui, elle adore le nail art",
      result: {
        nom: "Pose gel avec rallongement + Nail art complet personnalise",
        prix: "88 + 30",
        temps: "90 min + 30 min",
        servicesBdd: ["Pose gel avec rallongement", "Nail art complet personnalise"]
      }
    },
    {
      condition: occasion === "Mariage / événement spécial" && tenue === "Sur 2-3 semaines",
      result: {
        nom: "Pose gel avec rallongement + French manucure",
        prix: "88 + 15",
        temps: "90 min + 15 min",
        servicesBdd: ["Pose gel avec rallongement", "French manucure"]
      }
    },
    {
      condition: occasion === "Moment detente" && style === "Naturel et discret",
      result: {
        nom: "Manucure simple + Massage mains",
        prix: "29 + 20",
        temps: "30 min + 15 min",
        servicesBdd: ["Manucure simple", "Massage mains 15min"]
      }
    },
    {
      condition: occasion === "Anniversaire" && style === "Coloré et tendance" && deco === "Oui, mais légères (paillettes, fleur…)",
      result: {
        nom: "Vernis semi-permanent mains + Nail art simple (1-2 ongles)",
        prix: "44 + 7",
        temps: "45 min + 15 min",
        servicesBdd: ["Vernis semi-permanent mains", "Nail art simple (1-2 ongles)"]
      }
    },
    {
      condition: style === "Élégant et classique" && tenue === "Sur 2-3 semaines",
      result: {
        nom: "Vernis semi-permanent mains + French manucure",
        prix: "44 + 15",
        temps: "45 min + 15 min",
        servicesBdd: ["Vernis semi-permanent mains", "French manucure"]
      }
    },
    {
      condition: budget === "Moins de 40$" && style === "Naturel et discret",
      result: {
        nom: "Manucure express (limage + vernis)",
        prix: "18",
        temps: "15 min",
        servicesBdd: ["Manucure express (limage + vernis)"]
      }
    },
    {
      condition: occasion === "Fête entre amies" && style === "Coloré et tendance" && deco === "Oui, elle adore le nail art",
      result: {
        nom: "Vernis semi-permanent mains + Effets spéciaux (chrome, marbre...)",
        prix: "44 + 22",
        temps: "45 min + 30 min",
        servicesBdd: ["Vernis semi-permanent mains", "Effets speciaux (chrome, marbre…)"]
      }
    },
    {
      condition: occasion === "Premier rendez-vous" && style === "Naturel et discret",
      result: {
        nom: "Manucure simple + Babyboomer",
        prix: "29 + 15",
        temps: "30 min + 20 min",
        servicesBdd: ["Manucure simple", "Babyboomer"]
      }
    },
    {
      condition: occasion === "Cadeau pour une proche" && deco === "Non, elle préfère quelque chose de simple",
      result: {
        nom: "Manucure spa (avec massage)",
        prix: "51",
        temps: "45 min",
        servicesBdd: ["Manucure spa (avec massage)"]
      }
    },
    {
      condition: deco === "Oui, mais légères (paillettes, fleur…)" && style === "Élégant et classique",
      result: {
        nom: "Renforcement de l’ongle (base renforcée) + French manucure",
        prix: "59 + 15",
        temps: "60 min + 15 min",
        servicesBdd: ["Base renforcee", "French manucure"]
      }
    },
    {
      condition: budget === "Entre 60$ et 100$" && occasion === "Moment détente",
      result: {
        nom: "Manucure spa (avec massage)",
        prix: "51",
        temps: "45 min + 20 min",
        servicesBdd: ["Manucure spa (avec massage)"]
      }
    },
    {
      condition: faux === "Non" && style === "Coloré et tendance",
      result: {
        nom: "Pose de vernis classique + Nail art simple",
        prix: "22 + 7",
        temps: "20 min + 15 min",
        servicesBdd: ["Pose de vernis classique", "Nail art simple (1-2 ongles)"]
      }
    },
    {
      condition: occasion === "Mariage / événement spécial" && deco === "Oui, elle adore le nail art",
      result: {
        nom: "Pose complète avec rallongement capsules + Encapsulation",
        prix: "88 + 22",
        temps: "90 min + 30 min",
        servicesBdd: ["Pose complete avec rallongement capsules", "Encapsulation"]
      }
    },
    {
      condition: occasion === "Juste pour faire plaisir" && budget === "Entre 40$ et 60$",
      result: {
        nom: "Vernis semi-permanent mains + Dépose semi-permanent",
        prix: "44 + 15",
        temps: "45 min + 20 min",
        servicesBdd: ["Vernis semi-permanent mains", "Depose semi-permanent"]
      }
    },
    {
      condition: occasion === "Anniversaire" && style === "Artistique et audacieux",
      result: {
        nom: "Pose gel avec rallongement + Encapsulation",
        prix: "66 + 22",
        temps: "75 min + 30 min",
        servicesBdd: ["Pose gel avec rallongement", "Encapsulation"]
      }
    },
    {
      condition: occasion === "Premier rendez-vous" && deco === "Oui, mais légères (paillettes, fleur…)" && style === "Coloré et tendance",
      result: {
        nom: "Manucure simple + Nail art simple",
        prix: "29 + 7",
        temps: "30 min + 15 min",
        servicesBdd: ["Manucure simple", "Nail art simple (1-2 ongles)"]
      }
    },
    {
      condition: budget === "Plus de 100$" && style === "Artistique et audacieux",
      result: {
        nom: "Pose en polygel / acrygel + Nail art complet personnalisé + Effets spéciaux",
        prix: "88 + 30 + 22",
        temps: "90 min + 30 min + 30 min",
        servicesBdd: ["Pose en polygel / acrygel", "Nail art complet personnalise", "Effets speciaux (chrome, marbre...)"]
      }
    },
    {
      condition: style === "Élégant et classique" && tenue === "Au moins une semaine" && deco === "Oui, elle adore le nail art",
      result: {
        nom: "Renforcement de l’ongle (base renforcée) + Nail art simple (1-2 ongles)",
        prix: "59 + 7",
        temps: "60 min + 15 min",
        servicesBdd: ["Base renforcee", "Nail art simple (1-2 ongles)"]
      }
    },
    {
      condition: deco === "Oui, elle adore le nail art" && style === "Coloré et tendance" && budget === "Entre 60$ et 100$",
      result: {
        nom: "Vernis semi-permanent mains + Effets spéciaux + Encapsulation",
        prix: "44 + 22 + 22",
        temps: "45 min + 30 min + 30 min",
        servicesBdd: ["Vernis semi-permanent mains", "Effets speciaux (chrome, marbre...)", "Encapsulation"]
      }
    },
    {
      condition: occasion === "Fête entre amies" && deco === "Oui, mais légères (paillettes, fleur…)" && budget === "Entre 40$ et 60$",
      result: {
        nom: "Vernis semi-permanent mains + Nail art simple (1-2 ongles)",
        prix: "44 + 7",
        temps: "45 min + 15 min",
        servicesBdd: ["Vernis semi-permanent mains", "Nail art simple (1-2 ongles)"]
      }
    },
    {
      condition: occasion === "Cadeau pour une proche" && deco === "Oui, elle adore le nail art",
      result: {
        nom: "Manucure spa (avec massage) + Nail art simple",
        prix: "51 + 7",
        temps: "45 min + 15 min",
        servicesBdd: ["Manucure spa (avec massage)", "Nail art simple (1-2 ongles)"]
      }
    },
    {
      condition: occasion === "Anniversaire" && tenue === "Sur 2-3 semaines",
      result: {
        nom: "Renforcement de l’ongle (base renforcée) + French manucure",
        prix: "59 + 15",
        temps: "60 min + 15 min",
        servicesBdd: ["Base renforcee", "French manucure"]
      }
    },
    {
      condition: occasion === "Juste pour faire plaisir" && style === "Naturel et discret" && budget === "Moins de 40$",
      result: {
        nom: "Pose de vernis classique",
        prix: "22",
        temps: "20 min",
        servicesBdd: ["Pose de vernis classique"]
      }
    }
  ];

  for (let s of suggestions) {
    if (s.condition && fitsBudget(s.result.prix)) {
      const total = s.result.prix
        .split('+')
        .map(p => parseFloat(p.trim()))
        .reduce((a, b) => a + b, 0);

      return {
        ...s.result,
        prix: total + " $"
      };
    }
  }

  if (budget === "Moins de 40$") {
    return {
      nom: "Manucure express (limage + vernis)",
      prix: "18 $",
      temps: "15 min",
      servicesBdd: ["Manucure express (limage + vernis)"]
    };
  } else if (budget === "Entre 40$ et 60$") {
    return {
      nom: "Vernis semi-permanent mains",
      prix: "44 $",
      temps: "45 min",
      servicesBdd: ["Vernis semi-permanent mains"]
    };
  } else {
    return {
      nom: "Manucure personnalisée avec décoration simple",
      prix: "59 $ (estimé)",
      temps: "1h",
      servicesBdd: ["Manucure simple"]
    };
  }
}

  const suggestion = allAnswered ? getSuggestion(answers) : null;

  const handleReservationClick = () => {
    if (!suggestion) return;
    localStorage.setItem('quizNomAffichage', suggestion.nom);
    localStorage.setItem('quizSuggestionPrix', suggestion.prix);
    localStorage.setItem('quizSuggestionTemps', suggestion.temps);
    localStorage.setItem("quizServicesBdd", suggestion.servicesBdd.join("+"));
    localStorage.setItem('quizCommentaire', answers.occasion);
    navigate('/rendez-vous');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReservationClick();
  };

  return (
    <div className="quiz-form">
      <div className="quiz-titre">
        <h1>Offrez un soin parfait en 5 étapes</h1>
        <p>Pas besoin d'être un expert en ongles – on vous aide à choisir le bon service à offrir 🎁 !</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Toutes les questions */}
        <div className="questions">
          <h1>1. Quel est votre budget ?</h1>
          <div className="reponses">
            <label><input type="radio" name="budget" value="Moins de 40$" onChange={handleChange} /> Moins de 40$</label>
            <label><input type="radio" name="budget" value="Entre 40$ et 60$" onChange={handleChange} /> Entre 40$ et 60$</label>
            <label><input type="radio" name="budget" value="Entre 60$ et 100$" onChange={handleChange} /> Entre 60$ et 100$</label>
            <label><input type="radio" name="budget" value="Plus de 100$" onChange={handleChange} /> Plus de 100$</label>
          </div>
        </div>

        <div className="questions">
          <h1>2. Quel style lui correspond le plus ?</h1>
          <div className="reponses">
            <label><input type="radio" name="style" value="Naturel et discret" onChange={handleChange} /> Naturel et discret</label>
            <label><input type="radio" name="style" value="Élégant et classique" onChange={handleChange} /> Élégant et classique</label>
            <label><input type="radio" name="style" value="Coloré et tendance" onChange={handleChange} /> Coloré et tendance</label>
            <label><input type="radio" name="style" value="Artistique et audacieux" onChange={handleChange} /> Artistique et audacieux</label>
          </div>
        </div>

        <div className="questions">
          <h1>3. À quelle occasion offrez-vous ce soin ?</h1>
          <div className="reponses">
            <label><input type="radio" name="occasion" value="Juste pour faire plaisir" onChange={handleChange} /> Juste pour faire plaisir</label>
            <label><input type="radio" name="occasion" value="Anniversaire" onChange={handleChange} /> Anniversaire</label>
            <label><input type="radio" name="occasion" value="Mariage / événement spécial" onChange={handleChange} /> Mariage / événement spécial</label>
            <label><input type="radio" name="occasion" value="Moment détente" onChange={handleChange} /> Moment détente</label>
          </div>
        </div>

        <div className="questions">
          <h1>4. Quelle importance accorde-t-elle à la tenue dans le temps ?</h1>
          <div className="reponses">
            <label><input type="radio" name="tenue" value="Peu importe, juste pour une fois" onChange={handleChange} /> Peu importe, juste pour une fois</label>
            <label><input type="radio" name="tenue" value="Au moins une semaine" onChange={handleChange} /> Au moins une semaine</label>
            <label><input type="radio" name="tenue" value="Sur 2-3 semaines" onChange={handleChange} /> Sur 2-3 semaines</label>
          </div>
        </div>

        <div className="questions">
          <h1>5. A-t-elle déjà fait des faux ongles ?</h1>
          <div className="reponses">
            <label><input type="radio" name="faux" value="C’est une habituée" onChange={handleChange} /> C’est une habituée</label>
            <label><input type="radio" name="faux" value="Ça lui est déjà arrivé" onChange={handleChange} /> Ça lui est déjà arrivé</label>
            <label><input type="radio" name="faux" value="C’est plus trop le cas" onChange={handleChange} /> C’est plus trop le cas</label>
            <label><input type="radio" name="faux" value="Non" onChange={handleChange} /> Non</label>
          </div>
        </div>

        <div className="questions">
          <h1>6. Est-ce qu’elle aime les décorations sur les ongles ?</h1>
          <div className="reponses">
            <label><input type="radio" name="deco" value="Non, elle préfère un rendu uni et sobre" onChange={handleChange} /> Non, elle préfère un rendu uni et sobre</label>
            <label><input type="radio" name="deco" value="Oui, mais légères (paillettes, fleur…)" onChange={handleChange} /> Oui, mais légères (paillettes, fleur…)</label>
            <label><input type="radio" name="deco" value="Oui, elle adore le nail art" onChange={handleChange} /> Oui, elle adore le nail art</label>
          </div>
        </div>
      </form>

      {allAnswered && suggestion && (
        <>
          <div className="suggestion-box">
            <p>{suggestion.nom} ({suggestion.temps} et {suggestion.prix})</p>
          </div>

          <button type="button" className="btn-rose" onClick={handleReservationClick}>
            Réserver avec cette idée
          </button>
        </>
      )}
    </div>
  );
}

export default Quiz;
