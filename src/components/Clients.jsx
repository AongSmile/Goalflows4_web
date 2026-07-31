import React, { useEffect, useState } from "react";
import bgImage from "../assets/image/logocus/PAGE01.05BG.png";
import logo from "../assets/image/logocus/PAGE01.05.1.png";
import { getStorefrontBrands } from "../api/productApi";

// Was ~70 hardcoded <img> imports (one per brand logo file) - now pulls the
// list from GET /api/brands/storefront (spec section 4: "หน้าเว็บไซต์ต้องดึง
// ข้อมูลแบรนด์จากฐานข้อมูลทั้งหมด ไม่ใช้ข้อมูลแบบ Hardcode"). Adding/removing/
// reordering a brand via the admin panel shows up here automatically.
// Rendered twice in a row (LOOP 1 + LOOP 2) purely for the seamless
// marquee-scroll CSS animation, same as before.
function Clients() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getStorefrontBrands()
      .then(setBrands)
      .catch(() => setBrands([]));
  }, []);

  const renderLoop = (loopIndex) =>
    brands.map((brand) => (
      <a
        key={`${loopIndex}-${brand.id}`}
        href={brand.url || undefined}
        target={brand.url ? "_blank" : undefined}
        rel={brand.url ? "noopener noreferrer" : undefined}
        className="flex items-center justify-center min-w-[100px] sm:min-w-[120px]"
      >
        <img
          src={brand.logoUrl}
          alt={brand.name}
          className="h-[60px] sm:h-[75px] md:h-[90px] lg:h-[110px] object-contain opacity-80 hover:opacity-100 transition duration-300"
        />
      </a>
    ));

  return (
    <div
      className="relative w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-start bg-cover bg-center bg-no-repeat md:bg-[length:50%_auto]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 opacity-50"></div>

      <div className="absolute top-1 left-1 md:top-2 md:left-1 z-20 ">
        <img
          src={logo}
          alt="Product 1"
          className="w-[95%] sm:w-[85%] md:w-[40%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
        />
      </div>

      {brands.length === 0 ? (
        <p className="relative w-full text-center text-gray-500 mt-20 md:mt-24 lg:mt-28">
          ยังไม่มีแบรนด์
        </p>
      ) : (
        <div className="relative w-full overflow-hidden mt-20 md:mt-24 lg:mt-28">
          <div className="flex w-max animate-scroll gap-10 md:gap-14">
            {renderLoop(1)}
            {renderLoop(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
