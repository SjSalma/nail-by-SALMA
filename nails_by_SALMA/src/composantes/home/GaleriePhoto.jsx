import { useEffect, useRef } from 'react';
import '../../css/home/galerie_photo.css';

import img1 from '../../assets/home/apercu/nails1.png';
import img2 from '../../assets/home/apercu/nails2.png';
import img3 from '../../assets/home/apercu/nails3.png';
import img4 from '../../assets/home/apercu/nails4.png';

const images = [img1, img2, img3, img4];

function Galerie_home() {
  const sliderRef = useRef(null);
  const firstImageRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const img = firstImageRef.current;

    if (!slider || !img) return;

    const getImageWidth = () => {
      const style = getComputedStyle(img);
      const marginRight = parseFloat(style.marginRight);
      return img.offsetWidth + marginRight;
    };

    let index = 0;

    const scrollToNextImage = () => {
      const imageWidth = getImageWidth();

      index += 1;
      slider.scrollTo({
        left: index * imageWidth,
        behavior: 'smooth',
      });

      if (index >= images.length) {
        setTimeout(() => {
          slider.scrollTo({ left: 0, behavior: 'auto' });
          index = 0;
        }, 500);
      }
    };

    const interval = setInterval(scrollToNextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="infinite-carousel" ref={sliderRef}>
      {[...images, ...images].map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`img-${i}`}
          ref={i === 0 ? firstImageRef : null}
        />
      ))}
    </div>
  );
}

export default Galerie_home;
