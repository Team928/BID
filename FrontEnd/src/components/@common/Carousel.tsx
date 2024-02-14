import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

interface CarouselProps {
  settings: Settings;
  images: string[];
  height?: string;
}

const Carousel: React.FC<CarouselProps> = ({ settings, images, height }) => {
  return (
    <StyledSlider {...settings}>
      {images.map((image, index) => (
        <div className={`w-full ${height}`} key={index}>
          <img src={image} className="w-full h-full object-cover" />
        </div>
      ))}
    </StyledSlider>
  );
};

export default Carousel;

const StyledSlider = styled(Slider)`
  .slick-dots {
    left: 50%;
    bottom: 12px;
    width: auto;
    padding: 0px 12px;
    background-color: #fff;
    border-radius: 10.5px;
    z-index: 10;
    transform: translate(-50%, 0);

    li {
      width: 8px;
      height: 8px;
      margin: 0;

      &:last-of-type {
        margin-left: 6px;
      }

      button {
        width: 100%;
        height: 100%;
        padding: 0;

        &::before {
          width: 8px;
          height: 8px;
          position: static;
          top: auto;
          left: auto;
          right: auto;
        }
      }
    }
  }
`;
