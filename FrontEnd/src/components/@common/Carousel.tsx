import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarouselProps {
  settings: Settings;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ settings, images }) => {
    return (
        <div className="w-full">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div className="flex items-center justify-center" key={index}>
                <img src={image} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      );
    };

export default Carousel;
