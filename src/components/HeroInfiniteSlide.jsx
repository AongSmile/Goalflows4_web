import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import mockProducts from "../data/mockProducts";
import productsData from "../data/products.json";

export default function HeroInfiniteSlide() {
  const [products, setProducts] = useState([]);
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  // 🔹 Fetch + random
  useEffect(() => {
    const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
    setProducts(shuffled);
  }, []);
  // useEffect(() => {
  //   fetch("../data/products.json")
  //     .then(res => res.json())
  //     .then(data => {
  //       const shuffled = [...data].sort(() => 0.5 - Math.random());
  //       setProducts(shuffled);
  //     });
  // }, []);

  // 🔹 Start infinite animation
  useEffect(() => {
    if (products.length === 0) return;

    controlsLeft.start({
      y: ["0%", "-50%"],
      transition: {
        duration: 18,
        ease: "linear",
        repeat: Infinity,
      },
    });

    controlsRight.start({
      y: ["-50%", "0%"],
      transition: {
        duration: 18,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [products]);

  if (products.length === 0) return null;

  const loopProducts = [...products, ...products];

  return (
    <section className="h-screen bg-gray-100 flex items-center overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Our Featured Products
          </h1>
          <p className="text-gray-600 mb-6">
            Infinite product showcase with smooth motion
          </p>
        </motion.div>

        {/* SLIDER */}
        <div className="relative h-[420px] flex gap-6">

          {/* LEFT – UP */}
          <div
            className="w-1/2 overflow-hidden"
            onMouseEnter={() => controlsLeft.stop()}
            onMouseLeave={() =>
              controlsLeft.start({
                y: ["0%", "-50%"],
                transition: { duration: 18, ease: "linear", repeat: Infinity },
              })
            }
          >
            <motion.div animate={controlsLeft}>
              {loopProducts.map((item, i) => (
                <div key={i} className="h-[210px] flex items-center justify-center">
                  <img
                    src={item.image}
                    className="max-h-[180px]"
                    alt=""
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT – DOWN */}
          <div
            className="w-1/2 overflow-hidden"
            onMouseEnter={() => controlsRight.stop()}
            onMouseLeave={() =>
              controlsRight.start({
                y: ["-50%", "0%"],
                transition: { duration: 18, ease: "linear", repeat: Infinity },
              })
            }
          >
            <motion.div animate={controlsRight}>
              {loopProducts.map((item, i) => (
                <div key={i} className="h-[210px] flex items-center justify-center">
                  <img
                    src={item.image}
                    className="max-h-[180px]"
                    alt=""
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
