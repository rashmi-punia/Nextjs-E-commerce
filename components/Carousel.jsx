"use client"

import AliceCarousel from "react-alice-carousel"
import { faker } from "@faker-js/faker"

const Carousel = () => {
      const items = ItemsData();

  return (
    <div className="mt-8 z-10 w-full bg-pink-200 overfow-hidden h-[45vh]">
      <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={7000}
      infinite />
    </div>
  )
}

export default Carousel


export const ItemsData = () => {
  const randomImage = (name) => {
    const query = encodeURIComponent(name);
    return `https://source.unsplash.com/featured/?${query}`;
  };

const mainCarouselData = [
  {
    id: "1",
    image: "https://images.meesho.com/images/products/191005346/mocgn_512.webp",
  },
  {
    id: "2",
    image: "https://images.meesho.com/images/products/85630166/cisnh_512.webp",
  },
  {
    id: "3",
    image: "https://images.meesho.com/images/products/110760066/mfqkw_512.webp",
  },
  {
    id: "4",
    image: "https://images.meesho.com/images/products/336728238/2xh96_512.webp",
  },
  {
    id: "5",
    image: "https://images.meesho.com/images/products/415828474/7jn8o_512.webp",
  },
  {
    id: "6",
    image: "https://images.meesho.com/images/products/223629773/y0dv1_512.webp",
  },
];

  const data = Array.from({ length: 6 }, () => ({
    image: randomImage(faker.commerce.productName()),
  }));

  const items = mainCarouselData.map((item, i) => (
    <img
      key={i}
      src={item.image}
      className="bg-green-100"
      alt={`Carousel Item ${i}`}
    />
  ));

  return items;
};