import { useRef } from 'react';
import '../../css/à_propos_témoignages/galerie_réalisations.css';

import img1 from '../../assets/home/apercu/nails1.png';
import img2 from '../../assets/home/apercu/nails2.png';
import img3 from '../../assets/home/apercu/nails3.png';
import img4 from '../../assets/home/apercu/nails4.png';
import img5 from '../../assets/home/apercu/nails5.png';
import img6 from '../../assets/home/apercu/nails6.png';
import img7 from '../../assets/home/apercu/nails7.png';
import img8 from '../../assets/home/apercu/nails8.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

function Galerie() {
  const containerRef = useRef(null);
  const firstImageRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const image = firstImageRef.current;

    if (!container || !image) return;

    const scrollAmount = image.offsetWidth + parseFloat(getComputedStyle(container).gap || 0);

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="galerie-wrapper">
      <button className="arrow" onClick={() => scroll('left')}>‹</button>
      <div className="galerie-container" ref={containerRef}>
        {images.map((img, index) => (
          <img
            key={index}
            ref={index === 0 ? firstImageRef : null}
            src={img}
            alt={`nail-${index}`}
            className="galerie-img"
          />
        ))}
      </div>
      <button className="arrow" onClick={() => scroll('right')}>›</button>
    </div>
  );
}

export default Galerie;
