import React from 'react'
import company1 from "../assets/image/new/02.1.png";
import logogf1 from "../assets/image/new/2.02.png";
import product1 from "../assets/image/new/12.png";
import product2 from "../assets/image/new/13.png";
import product3 from "../assets/image/new/14.png";
import product4 from "../assets/image/new/15.png";
import bgSection from "../assets/image/new/02BG.png"; // ✅ พื้นหลังใหม่

const Productforsale = () => {
    return (
        <section
            className="relative py-2 md:py-2 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgSection})` }}
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
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0d3f66] mb-10 text-center md:text-left leading-tight tracking-wide">
                        สินค้าที่จำหน่าย
                    </h1>

                    <div className="space-y-6">

                        {/* ITEM 1 */}
                        <div className="flex justify-start group">
                            <img
                                src={product1}
                                alt="Product 1"
                                className="w-[95%] sm:w-[85%] md:w-[75%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
                            />
                        </div>

                        {/* ITEM 2 */}
                        <div className="flex justify-end group">
                            <img
                                src={product2}
                                alt="Product 2"
                                className="w-[95%] sm:w-[85%] md:w-[75%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
                            />
                        </div>

                        {/* ITEM 3 */}
                        <div className="flex justify-start group">
                            <img
                                src={product3}
                                alt="Product 3"
                                className="w-[95%] sm:w-[85%] md:w-[75%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
                            />
                        </div>

                        {/* ITEM 4 */}
                        <div className="flex justify-end group">
                            <img
                                src={product4}
                                alt="Product 4"
                                className="w-[95%] sm:w-[85%] md:w-[75%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
                            />
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Productforsale
