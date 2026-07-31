import { useEffect, useState } from "react";
import clientImgLogo01 from '../assets/img/tim-smith.png'
import clientImgLogo02 from '../assets/img/tim-smith.png'
import clientImgLogo03 from '../assets/img/tim-smith.png'
import clientImgLogo04 from '../assets/img/tim-smith.png'
import clientImgLogo05 from '../assets/img/tim-smith.png'
import clientImgLogo06 from '../assets/img/tim-smith.png'
import clientImgLogo07 from '../assets/img/tim-smith.png'

const productsLeft = [
  clientImgLogo01,
  clientImgLogo02,
  clientImgLogo03,
  clientImgLogo04,
];

const productsRight = [
  clientImgLogo05,
  clientImgLogo06,
  clientImgLogo07,
];

export default function HeroSlide() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % productsLeft.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen bg-gray-100 overflow-hidden">
      <div className="container mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
        
        {/* TEXT */}
        <div className="z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our Featured Products
          </h1>
          <p className="text-gray-600 mb-6">
            Discover high quality industrial products with modern design
          </p>
          <button className="px-6 py-3 bg-black text-white rounded-xl">
            View Products
          </button>
        </div>

        {/* SLIDES */}
        <div className="relative h-[420px] flex gap-6">
          
          {/* LEFT (slide up) */}
          <div className="w-1/2 overflow-hidden">
            <div
              className="transition-transform duration-700"
              style={{
                transform: `translateY(-${index * 100}%)`,
              }}
            >
              {productsLeft.map((img, i) => (
                <div key={i} className="h-[420px] flex items-center justify-center">
                  <img
                    src={img}
                    className="max-h-full object-contain"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT (slide down) */}
          <div className="w-1/2 overflow-hidden">
            <div
              className="transition-transform duration-700"
              style={{
                transform: `translateY(${index * 100}%)`,
              }}
            >
              {productsRight.map((img, i) => (
                <div key={i} className="h-[420px] flex items-center justify-center">
                  <img
                    src={img}
                    className="max-h-full object-contain"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
