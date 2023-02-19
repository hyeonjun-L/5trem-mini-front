import React, { useState } from "react";

function useCarousel(friendList) {
  const carouselMaxIndex = Math.floor((friendList.length - 1) / 5);
  const [carouselIndex, setCarouselIndex] = useState(0);

  let carouselArr = [0];
  for (let i = 0; i < carouselMaxIndex; i++) {
    carouselArr.push(carouselArr[i] - 450);
  }

  const addCarouselIndex = () =>
    setCarouselIndex((carouselIndex) => {
      if (carouselIndex + 1 > carouselArr.length - 1) {
        return 0;
      } else {
        return carouselIndex + 1;
      }
    });

  const subCarouselIndex = () =>
    setCarouselIndex((carouselIndex) => {
      if (carouselIndex - 1 < 0) {
        return carouselArr.length - 1;
      } else {
        return carouselIndex - 1;
      }
    });

  return { carouselArr, carouselIndex, addCarouselIndex, subCarouselIndex };
}

export default useCarousel;
