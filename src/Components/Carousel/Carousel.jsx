import React from 'react'
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css"

import { images } from './img/data';
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {images.map((imageLink, i) => {
          return <img key={i} src={imageLink} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect