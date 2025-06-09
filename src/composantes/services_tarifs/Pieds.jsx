import { useEffect, useRef, useState } from 'react';
import flag from '../../assets/flag.png';
import image from '../../assets/services_tarifs/beauté_pieds.png';

import '../../css/services_tarifs/menu.css';

function ServicesManucure() {
  const services = [
    { time: '45 min', title: 'Beauté des pieds (soin + vernis)', price: '44$' },
    { time: '1 h', title: 'Spa des pieds complet', price: '89$' },
    { time: '20 min', title: 'Dépose vernis semi permanent', price: '15$' },
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

      <div className="service-images" style={{ height: imageHeight }}>
        <img src={image} alt="Illustration soin beauté des pieds" />
      </div>
    </div>
  );
}

export default ServicesManucure;
