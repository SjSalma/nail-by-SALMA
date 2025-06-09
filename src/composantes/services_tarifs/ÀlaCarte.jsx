import flag from '../../assets/flag.png';

import '../../css/services_tarifs/menu.css';

function ServicesManucure() {
  const services = [
    { time: '+5 min', title: 'Réparation d’un ongle cassé', price: '+7$' },
    { time: '20 min', title: 'Soin des cuticules', price: '15$' },
    { time: '30 min', title: 'Traitement ongles abîmés', price: '29$' },
  ];

  return (
    <div className="table-img">
      <div className="service-rows">
        {services.map((service, index) => (
          <div key={index} className="service-row">
            <div className="flag-time">
              <img src={flag} alt="flag" />
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
