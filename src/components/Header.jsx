import { use, useEffect, useState } from 'react';
import React from 'react';
import HeaderImg from '../assets/img/header-img.png'
import { motion, useAnimation } from 'framer-motion';
import mockProducts from "../data/mockProducts";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../assets/img/clients/client-01.png";
import BrandSlider from './BrandSlider';
import bgImage from "../assets/image/new/01bg.png";
import branner from "../assets/image/new/brand-gf.png"
import bgImage1 from "../assets/image/new/01BG.png";
import branner1 from "../assets/image/new/01.png";


const images = [
    slide1,
]


function Header() {

    return (
        // // <div className="bg-[#F5F7FA] h-auto md:h-[37.5rem] flex items-center">
        // <div
        //     className="h-auto md:h-[37.5rem] flex items-center bg-cover bg-center"
        //     style={{ backgroundImage: `url(${bgImage})` }}
        // >
        //     <div className="relative container mx-auto max-w-[1320px] p-10 flex flex-col md:flex-row md:justify-between md:items-center md:p-0">
        //         <div>
        //             {/* <h1 className="justify-center mt-40 text-[4rem] leading-[1] font-semibold text-[#003b6e]">GOAL FLOW <br />
        //                 <span className="text-[#003b6e]">INSTRUMENT CO.,LTD</span>
        //             </h1> */}
        //             <img src={branner} alt="GOAL FLOW INSTRUMENT" className='mt-40 w-[400px] md:w-[500px] object-contain' />
        //             {/* <p className="text-[#717171] mt-5">Where to grow your business</p> */}
        //             {/* <a href="#" className="inline-flex justify-center items-center py-3 px-8 bg-[#4CAF4F] text-white rounded-md mt-10">Get Started</a> */}
        //             <h1 className='inline-flex justify-center items-center mt-50 py-3 px-4 font-semibold text-[1.4rem] text-[#003b6e]'>จำหน่ายเครื่องมือวัดละเอียดด้านมิติ จำหน่ายเครื่องชั่งน้ำหนักทุกชนิดบริการซ่อม สอบเทียบ อบรมการใช้งาน</h1>
        //         </div>
        //         <div>
        //             <BrandSlider />
        //         </div>

        //     </div>
        // </div>


        <div
            className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage1})` }}
        >
            {/* overlay */}
           {/* <div className="absolute inset-0 bg-black/35 opacity-50"></div> */}

            <div className="relative container mx-auto max-w-[1320px] px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                {/* LEFT */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">

                    {/* LOGO */}
                    <img
                        src={branner1}
                        alt="GOAL FLOW INSTRUMENT"
                        className="w-[220px] sm:w-[300px] md:w-[420px] lg:w-[500px] object-contain"
                    />

                    {/* DESCRIPTION */}
                    <p className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white leading-relaxed max-w-[600px]">
                        จำหน่ายเครื่องมือวัดละเอียดด้านมิติ <br/>
                        จำหน่ายเครื่องชั่งน้ำหนักทุกชนิด <br/>
                        จำหน่ายเครื่องมือทดสอบชิ้นงานผลิต<br/>
                        พร้อมบริการซ่อม สอบเทียบ อบรมการใช้งาน<br/>
                    </p>
                    <button className="mt-6 px-6 py-3 bg-[#003b6e] text-white rounded-lg hover:bg-[#002a4d] transition">
                        <a href="/contact" className="text-gray-300 hover:text-white text-xl transition">ติดต่อโกลโฟลฯ</a>
                    </button>
                </div>

                {/* RIGHT (SLIDER) */}
                <div className="w-full md:w-[50%] flex justify-center">
                    <div className="w-[80%] sm:w-[70%] md:w-full">
                        <BrandSlider />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Header
