import React from 'react'
import company1 from "../assets/image/workservice/PAGE04.01.1.png";
import product1 from "../assets/image/workservice/PAGE04.01.2.png";
import bgSection from "../assets/image/workservice/BG04.01BG.png"; // ✅ พื้นหลังใหม่

const LayoutWorkservice1 = () => {
    return (
  <section
      className="
        relative
        pt-24 md:pt-32 lg:pt-40
        pb-12 md:pb-16
      "
    >
            {/* Overlay */}
            <div className="absolute inset-0"></div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT SIDE */}
                <div className="relative flex justify-center">

                    {/* Glow effect */}
                    <div className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-blue-400/20 blur-3xl rounded-full"></div>
                    {/* Circle Image */}
                    <div className="relative 
                                   w-[360px] h-[360px] 
                                   sm:w-[460px] sm:h-[460px] 
                                   md:w-[550px] md:h-[550px] 
                                   lg:w-[600px] lg:h-[600px]">
                        <h1
                            className="
    absolute 
    left-2 sm:left-4 md:left-6 lg:left-10   /* ✅ ขยับตามจอ */
    -top-4 sm:-top-4 md:-top-6 lg:-top-8  /* ✅ ระยะบน responsive */

    px-3 sm:px-4 md:px-6 
    py-1.5 sm:py-2 md:py-3   /* ✅ padding ตามจอ */

    text-xl sm:text-2xl md:text-3xl lg:text-4xl  /* ✅ font scale */
    font-bold text-[#003b6e]

    bg-white/90 backdrop-blur-sm   /* ✅ ดู premium */
    rounded-lg md:rounded-xl 
    shadow-lg

    z-40
  "
                        >
                            สอบเทียบ
                        </h1>
                        <img
                            src={company1}
                            alt="company"
                            className="w-full h-full object-cover hover:scale-105 transition duration-500 drop-shadow-2xl"
                        />
                    </div>

                    {/* Company Label */}
                    {/* <img
                                className="absolute bottom-4 left-6 w-[160px] sm:w-[200px] md:w-[300px] drop-shadow-lg"
                                src={logogf1}
                                alt="GF Instrument"
                            /> */}
                </div>

                {/* RIGHT SIDE */}
                <div>
                    <h1
                            className="
    absolute 
    left-20 sm:left-4 md:left-6 lg:left-180   /* ✅ ขยับตามจอ */
    -top-[-380px] sm:-top-60 md:-top-6 lg:-top-8  /* ✅ ระยะบน responsive */

    px-3 sm:px-4 md:px-6 
    py-1.5 sm:py-2 md:py-3   /* ✅ padding ตามจอ */

    text-5xl sm:text-xl md:text-3xl lg:text-4xl  /* ✅ font scale */
    font-bold text-[#003b6e]

    bg-white/90 backdrop-blur-sm   /* ✅ ดู premium */
    rounded-lg md:rounded-xl 
    shadow-lg

    z-40
  "
                        >
                            งานบริการ
                        </h1>
                    <div className="relative 
                                   w-[360px] h-[360px] 
                                   sm:w-[460px] sm:h-[460px] 
                                   md:w-[550px] md:h-[550px] 
                                   lg:w-[600px] lg:h-[600px]">

                        <img
                            src={product1}
                            alt="product1"
                            className="w-full h-full object-cover hover:scale-105 transition duration-500 drop-shadow-2xl"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default LayoutWorkservice1
