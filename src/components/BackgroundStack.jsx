import React from "react";
import bgMobile from "../assets/image/workservice/PAGE04.02BG.png";   // 📱 ใช้ภาพเดียว
import bg1 from "../assets/image/workservice/BG04.01BG.png";       // 🖥 บน
import bg2 from "../assets/image/workservice/PAGE04.02BG.png";     // 🖥 ล่าง

const BackgroundStack = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* 📱 MOBILE BACKGROUND */}
      <div className="block md:hidden w-full h-full">
        <img
          src={bgMobile}
          alt=""
          className="
            w-full 
            h-full 
            object-cover   /* ✅ เต็มจอ */
            object-center
          "
        />
      </div>

      {/* 🖥 DESKTOP BACKGROUND */}
      <div className="hidden md:block w-full">

        {/* ภาพบน */}
        <img
          src={bg1}
          alt=""
          className="w-full h-auto block"
        />

        {/* ภาพล่าง */}
        <img
          src={bg2}
          alt=""
          className="
            w-full 
            h-auto 
            block
            -mt-[0px]

            translate-x-[20px]
            lg:translate-x-[2px]
          "
        />

      </div>

    </div>
  );
};

export default BackgroundStack;
