import React from 'react'
import bgImage from "../assets/image/logocus/PAGE01.05BG.png";
import logo from "../assets/image/logocus/PAGE01.05.1.png";

// import รูปจาก assets
import a1 from "../assets/image/brandsale/1.png";
import a2 from "../assets/image/brandsale/2.png";
import a3 from "../assets/image/brandsale/3.png";
import a4 from "../assets/image/brandsale/4.png";
import a5 from "../assets/image/brandsale/5.png";
import a6 from "../assets/image/brandsale/6.png";
import a7 from "../assets/image/brandsale/7.png";
import a8 from "../assets/image/brandsale/8.png";
import a9 from "../assets/image/brandsale/9.png";
import a10 from "../assets/image/brandsale/10.png";
import a11 from "../assets/image/brandsale/11.png";
import a12 from "../assets/image/brandsale/12.png";
import a13 from "../assets/image/brandsale/13.png";
import a14 from "../assets/image/brandsale/14.png";
import a15 from "../assets/image/brandsale/15.png";
import a16 from "../assets/image/brandsale/16.png";
import a17 from "../assets/image/brandsale/17.png";
import a18 from "../assets/image/brandsale/18.png";
import a19 from "../assets/image/brandsale/19.png";
import a20 from "../assets/image/brandsale/20.png";
import a21 from "../assets/image/brandsale/21.png";
import a22 from "../assets/image/brandsale/22.png";
import a23 from "../assets/image/brandsale/23.png";
import a24 from "../assets/image/brandsale/24.png";
import a25 from "../assets/image/brandsale/25.png";
import a26 from "../assets/image/brandsale/26.png";
import a27 from "../assets/image/brandsale/27.png";
import a28 from "../assets/image/brandsale/28.png";
import a29 from "../assets/image/brandsale/29.png";
import a30 from "../assets/image/brandsale/30.png";
import a31 from "../assets/image/brandsale/31.png";
import a32 from "../assets/image/brandsale/32.png";
import a33 from "../assets/image/brandsale/33.png";
import a34 from "../assets/image/brandsale/34.png";
import a35 from "../assets/image/brandsale/35.png";
import a36 from "../assets/image/brandsale/36.png";
import a37 from "../assets/image/brandsale/37.png";
import a38 from "../assets/image/brandsale/38.png";
import a39 from "../assets/image/brandsale/39.png";
import a40 from "../assets/image/brandsale/40.png";
import a41 from "../assets/image/brandsale/41.png";
import a42 from "../assets/image/brandsale/42.png";
import a43 from "../assets/image/brandsale/43.png";
import a44 from "../assets/image/brandsale/44.png";
import a45 from "../assets/image/brandsale/45.png";
import a46 from "../assets/image/brandsale/46.png";
import a47 from "../assets/image/brandsale/47.png";
import a48 from "../assets/image/brandsale/48.png";
import a49 from "../assets/image/brandsale/49.png";
import a50 from "../assets/image/brandsale/50.png";
import a51 from "../assets/image/brandsale/51.png";
import a52 from "../assets/image/brandsale/52.png";
import a53 from "../assets/image/brandsale/53.png";
import a54 from "../assets/image/brandsale/54.png";
import a55 from "../assets/image/brandsale/55.png";
import a56 from "../assets/image/brandsale/56.png";
import a57 from "../assets/image/brandsale/57.png";
import a58 from "../assets/image/brandsale/58.png";
import a59 from "../assets/image/brandsale/59.png";
import a60 from "../assets/image/brandsale/60.png";
import a61 from "../assets/image/brandsale/61.png";
import a62 from "../assets/image/brandsale/62.png";
import a63 from "../assets/image/brandsale/63.png";
import a64 from "../assets/image/brandsale/64.png";
import a65 from "../assets/image/brandsale/65.png";
import a66 from "../assets/image/brandsale/66.png";
import a67 from "../assets/image/brandsale/67.png";
import a68 from "../assets/image/brandsale/68.png";
import a69 from "../assets/image/brandsale/69.png";


const clientsImgLogo = [
    a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31,a32,a33,a34,a35,a36,a37,a38,a39,
    a40,a41,a42,a43,a44,a45,a46,a47,a48,a49,a50,a51,a52,a53,a54,a55,a56,a57,a58,a59,a60,a61,a62,a63,a64,a65,a66,a67,a68,a69
]


function Clients() {
    return (
        <div
            className="relative w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-start bg-cover bg-center bg-no-repeat md:bg-[length:50%_auto]"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* overlay */}
            <div className="absolute inset-0 opacity-50"></div>

            <div className="absolute top-1 left-1 md:top-2 md:left-1 z-20 ">
                <img
                    src={logo}
                    alt="Product 1"
                    className="w-[95%] sm:w-[85%] md:w-[40%] object-contain transition duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
                />
            </div>
            {/* Slider */}
            {/* Slider */}
            <div className="relative w-full overflow-hidden mt-20 md:mt-24 lg:mt-28">
                <div className="flex w-max animate-scroll gap-10 md:gap-14">

                    {/* LOOP 1 */}
                    {clientsImgLogo.map((client, index) => (
                        <div key={`1-${index}`} className="flex items-center justify-center min-w-[100px] sm:min-w-[120px]">
                            <img
                                src={client}
                                alt="brand"
                                //className="h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300"
                                //className="h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] object-contain hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300"
                                className="h-[60px] sm:h-[75px] md:h-[90px] lg:h-[110px] object-contain opacity-80 hover:opacity-100 transition duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Clients
