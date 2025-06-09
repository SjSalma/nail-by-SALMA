import { useEffect, useRef, useState } from 'react';
import flag from '../../assets/flag.png';
import image from '../../assets/services_tarifs/gel_acrygel_extensions.png';

import '../../css/services_tarifs/menu.css';

function ServicesGelAcrygel() {
  const services = [
    { time: '1 h 15 min', title: 'Pose de gel sur ongle naturel', price: '66$' },
    { time: '1 h 30 min', title: 'Pose complète avec capsules', price: '88$' },
    { time: '1 h 30 min', title: 'Pose en polygel / acrygel', price: '88$' },
    { time: '1 h 15 min', title: 'Remplissage gel ou polygel', price: '66$' },
    { time: '30 min', title: 'Dépose de gel / polygel', price: '22$' },
  ];

  const textColumnRef = useRef(null);
  const [imageHeight, setImageHeight] = useState('auto');

  const updateImageHeight = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      setImageHeight('auto');
    } else if (textColumnRef.current) {
      setImageHeight(`${textColumnRef.current.offsetHeight}px`);
    }
  };

  useEffect(() => {
    updateImageHeight();
    window.addEventListener('resize', updateImageHeight);
    const timeout = setTimeout(updateImageHeight, 300); // Pour chargement images

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
        <img src={image} alt="Résultat gel, acrygel ou extensions" />
      </div>
    </div>
  );
}

export default ServicesGelAcrygel;
