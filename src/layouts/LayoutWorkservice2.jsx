import React from 'react'
import company1 from "../assets/image/workservice/PAGE04.02.1.png";
import company2 from "../assets/image/workservice/PAGE04.02.2.png";
import product1 from "../assets/image/workservice/PAGE04.02.3.png";
import bgSection from "../assets/image/workservice/PAGE04.02BG.png"; // ✅ พื้นหลังใหม่

const LayoutWorkservice2 = () => {
    return (
    <section
      className="
        relative
        pt-2
        pb-12 md:pb-16
      "
    >
            {/* Overlay */}
            <div className="absolute inset-0"></div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT SIDE */}
                <div className="relative flex justify-center">

                    {/* Glow */}
                    <div className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-blue-400/20 blur-3xl rounded-full"></div>

                    {/* Main Circle */}
                    <div className="relative 
                   w-[360px] h-[360px] 
                   sm:w-[460px] sm:h-[460px] 
                   md:w-[550px] md:h-[550px] 
                   lg:w-[600px] lg:h-[600px]">

                        {/* รูปหลัก */}
                        <img
                            src={company1}
                            alt="company"
                            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition duration-500 drop-shadow-2xl"
                        />

                        {/* 🔥 รูปซ้าย (company2) */}
                        <img
                            src={company2}
                            alt="company"
                            className="
                absolute 
                left-[-340px]   /* ดันออกซ้าย */
                bottom-[-150px]  /* ปรับตำแหน่งแนวตั้ง */
                w-[70%] 
                hover:scale-105 
                transition duration-500
            "
                        />
                    </div>
                </div>

                {/* RIGHT SIDE */}
                {/* <div>
                    <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-[#003b6e] text-center md:text-center leading-tight tracking-wide">
                        <span>ซ่อมบำรุงเครื่องมือ</span> <br />
                        <span className="text-right">บำรุงรักษาเครื่องมือ</span> <br />
                        <span>อบรมการใช้งาน</span>

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
                </div> */}
                <div className="flex flex-col   items-center md:items-end   /* ✅ Mobile กลาง / Desktop ขวา */
  text-center md:text-right   /* ✅ Mobile กลาง / Desktop ขวา */">

                    <h1 className="
        mt-2 
        text-4xl sm:text-4xl md:text-5xl lg:text-6xl
        font-bold 
        text-[#003b6e] 
        leading-tight 
        tracking-wide
        space-y-1 md:space-y-2
        bg-white/90 backdrop-blur-sm   /* ✅ ดู premium */
    rounded-lg md:rounded-xl 
    shadow-lg
    ">
                        <div>ซ่อมบำรุงเครื่องมือ</div>
                        <div>บำรุงรักษาเครื่องมือ</div>
                        <div>อบรมการใช้งาน</div>
                    </h1>

                    {/* รูปด้านขวา */}
                    <div className="relative 
                   mt-6
                   w-[360px] h-[360px] 
                   sm:w-[460px] sm:h-[460px] 
                   md:w-[550px] md:h-[550px] 
                   lg:w-[600px] lg:h-[600px]">

                        <img
                            src={product1}
                            alt="product1"
                            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition duration-500 drop-shadow-2xl"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default LayoutWorkservice2
