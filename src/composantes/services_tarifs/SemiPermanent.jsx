import { useEffect, useRef, useState } from 'react';
import flag from '../../assets/flag.png';
import image from '../../assets/services_tarifs/semi_permanent.png';

import '../../css/services_tarifs/menu.css';

function ServicesManucure() {
  const services = [
    { time: '45 min', title: 'Vernis semi-permanent mains', price: '44$' },
    { time: '40 min', title: 'Vernis semi-permanent pieds', price: '37$' },
    { time: '20 min', title: 'Dépose semi-permanent', price: '15$' },
    { time: '1 h', title: 'Renforcement de l’ongle', price: '59$' },
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
    const timeout = setTimeout(updateImageHeight, 300); // recalcule post chargement

    return () => {
      window.removeEventListener('resize', updateImageHeight);
      clearTimeout(timeout);
    };
  }, [services]);

  return (
    <div className="table-img">
      <div className="service-images" style={{ height: imageHeight }}>
        <img src={image} alt="Résultat semi-permanent" />
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
