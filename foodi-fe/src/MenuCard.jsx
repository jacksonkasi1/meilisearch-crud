/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MenuCard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Carousel
        showArrows={true}
        showIndicators={true}
        showThumbs={true}
        thumbWidth={80} // Customize the thumbnail width
        dynamicHeight={true} // Make the carousel adjust to image heights
      >
        {data.image.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`${data.name} - Image ${index + 1}`}
              loading="lazy"
              className="w-full h-auto max-w-[200px] rounded-md object-contain"
            />
          </div>
        ))}
      </Carousel>
      <h3 className="text-xl font-semibold mb-2">{data.name}</h3>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Price: {data.price}</p>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
