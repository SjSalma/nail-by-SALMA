import { useEffect, useRef, useState } from 'react';
import flag from '../../assets/flag.png';
import image from '../../assets/services_tarifs/ongles_naturels.png';
import '../../css/services_tarifs/menu.css';

function ServicesManucure() {
  const services = [
    { time: '30 min', title: 'Manucure simple', price: '29$' },
    { time: '45 min', title: 'Manucure spa (avec massage)', price: '51$' },
    { time: '20 min', title: 'Pose de vernis classique', price: '22$' },
    { time: '15 min', title: 'Manucure express (limage + vernis)', price: '18$' },
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

    // Optionnel : recalcul après chargement complet (polices, images, etc.)
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
        <img src={image} alt="Résultat avant et après manucure" />
      </div>
    </div>
  );
}

export default ServicesManucure;
