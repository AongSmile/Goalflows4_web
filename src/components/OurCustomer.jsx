import React from 'react'
import { motion } from "framer-motion";
import bgImage from "../assets/image/logocus/PAGE04.01.BG.png";
import logo from "../assets/image/logocus/PAGE04.01.1.png";

import a10 from "../assets/image/logocus/10.png";
import a11 from "../assets/image/logocus/11.png";
import a12 from "../assets/image/logocus/12.png";
import a13 from "../assets/image/logocus/13.png";
import a14 from "../assets/image/logocus/14.png";
import a15 from "../assets/image/logocus/15.png";
import a16 from "../assets/image/logocus/16.png";
import a17 from "../assets/image/logocus/17.png";
import a18 from "../assets/image/logocus/18.png";
import a19 from "../assets/image/logocus/19.png";
import a20 from "../assets/image/logocus/20.png";
import a21 from "../assets/image/logocus/21.png";
import a22 from "../assets/image/logocus/22.png";
import a23 from "../assets/image/logocus/23.png";
import a24 from "../assets/image/logocus/24.png";
import a25 from "../assets/image/logocus/25.png";
import a26 from "../assets/image/logocus/26.png";
import a27 from "../assets/image/logocus/27.png";
import a28 from "../assets/image/logocus/28.png";
import a29 from "../assets/image/logocus/29.png";
import a30 from "../assets/image/logocus/30.png";
import a31 from "../assets/image/logocus/31.png";
import a32 from "../assets/image/logocus/32.png";
import a33 from "../assets/image/logocus/33.png";
import a34 from "../assets/image/logocus/34.png";
import a35 from "../assets/image/logocus/35.png";
import a36 from "../assets/image/logocus/36.png";
import a37 from "../assets/image/logocus/37.png";
import a38 from "../assets/image/logocus/38.png";
import a39 from "../assets/image/logocus/39.png";
import a40 from "../assets/image/logocus/40.png";
import a41 from "../assets/image/logocus/41.png";
import a42 from "../assets/image/logocus/42.png";
import a43 from "../assets/image/logocus/43.png";
import a44 from "../assets/image/logocus/44.png";
import a45 from "../assets/image/logocus/45.png";

const OurCustomer = () => {
    const customers = [
        a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,
        a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,
        a31,a32,a33,a34,a35,a36,a37,a38,a39,a40,
        a41,a42,a43,a44,a45,]; // สมมติว่ามีข้อมูลลูกค้าในรูปแบบอาร์เรย์
    return (
        <div
            className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* overlay */}
            <div className="absolute inset-0 opacity-50"></div>

            <div className="absolute top-1 left-1 md:top-2 md:left-1 z-20">
                <img
                    src={logo}
                    alt="Product 1"
                    className="w-[95%] sm:w-[85%] md:w-[40%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
                />
            </div>
            {/* Grid Logo */}
            <div className="
            mx-auto 
            max-w-[1320px] 
            px-6 
            py-18
            mt-12
                  grid 
                  grid-cols-3 
                  sm:grid-cols-3 
                  md:grid-cols-4 
                  lg:grid-cols-8
                  gap-6 md:gap-8
                ">
                {customers.map((logo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="
                        flex items-center justify-center
                        bg-white 
                        rounded-2xl 
                        p-4 md:p-6
                        shadow-sm 
                        hover:shadow-xl 
                        transition-all duration-300
                        hover:-translate-y-2
                " >
                        <img
                            src={logo}
                            alt={`customer-${index}`}
                            className="
                        max-h-[60px] sm:max-h-[70px] md:max-h-[80px]
                      object-contain
                      opacity-70 hover:opacity-100
                      transition duration-300
                "/>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default OurCustomer
