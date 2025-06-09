import { useEffect, useRef, useState } from 'react';
import flag from '../../assets/flag.png';
import image from '../../assets/services_tarifs/nail_art.png';

import '../../css/services_tarifs/menu.css';

function ServicesManucure() {
  const services = [
    { time: '+15 min', title: 'Nail art simple (1 à 2 ongles)', price: '+7$' },
    { time: '+30 min', title: 'Nail art complet personnalisé', price: '+30$' },
    { time: '+20 min', title: 'Babyboomer', price: '+15$' },
    { time: '+15 min', title: 'French manucure', price: '+15$' },
    { time: '+30 min', title: 'Effets spéciaux (chrome, marbré…)', price: '+22$' },
    { time: '+30 min', title: 'Encapsulation', price: '+22$' },
  ];

  const textColumnRef = useRef(null);
  const [imageHeight, setImageHeight] = useState('auto');

  const updateImageHeight = () => {
    if (textColumnRef.current) {
      setImageHeight(`${textColumnRef.current.offsetHeight}px`);
    }
  };

  useEffect(() => {
    updateImageHeight();
    window.addEventListener('resize', updateImageHeight);
    const timeout = setTimeout(updateImageHeight, 300);

    return () => {
      window.removeEventListener('resize', updateImageHeight);
      clearTimeout(timeout);
    };
  }, [services]);

  return (
    <div className="table-img">
      <div className="service-images" style={{ height: imageHeight }}>
        <img src={image} alt="Illustration Nail Art" />
      </div>

      <div className="service-rows" ref={textColumnRef}>
        {services.map((service, index) => (
          <div key={index} className="service-row">
            <div className="flag-time">
              <img src={flag} alt="Durée" />
              <span>{service.time}</span>
            </div>
            <div className="service-title">{service.title}</div>
            <div className="service-price">{service.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesManucure;
