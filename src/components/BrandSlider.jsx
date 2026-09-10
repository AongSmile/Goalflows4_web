import React from "react";
import { motion } from "framer-motion";

// Start Import Images
import p1 from "../assets/image/product/1.png"
import p2 from "../assets/image/product/2.png"
import p3 from "../assets/image/product/3.png"
import p4 from "../assets/image/product/4.png"
import p5 from "../assets/image/product/5.png"
import p6 from "../assets/image/product/6.png"
import p7 from "../assets/image/product/7.png"
import p8 from "../assets/image/product/8.png"
import p9 from "../assets/image/product/9.png"
import p10 from "../assets/image/product/10.png"
import p11 from "../assets/image/product/11.png"
import p12 from "../assets/image/product/12.png"
import p13 from "../assets/image/product/13.png"
import p14 from "../assets/image/product/14.png"
import p15 from "../assets/image/product/15.png"
import p16 from "../assets/image/product/16.png"
import p17 from "../assets/image/product/17.png"
import p18 from "../assets/image/product/18.png"
import p19 from "../assets/image/product/19.png"
import p20 from "../assets/image/product/20.png"
import p21 from "../assets/image/product/21.png"
import p22 from "../assets/image/product/22.png"
import p23 from "../assets/image/product/23.png"
import p24 from "../assets/image/product/24.png"
import p25 from "../assets/image/product/25.png"
import p26 from "../assets/image/product/26.png"
import p27 from "../assets/image/product/27.png"
import p28 from "../assets/image/product/28.png"
import p29 from "../assets/image/product/29.png"
import p30 from "../assets/image/product/30.png"
import p31 from "../assets/image/product/31.png"
import p32 from "../assets/image/product/32.png"
import p33 from "../assets/image/product/33.png"
import p34 from "../assets/image/product/34.png"
import p35 from "../assets/image/product/35.png"
import p36 from "../assets/image/product/36.png"
import p37 from "../assets/image/product/37.png"
import p38 from "../assets/image/product/38.png"
import p39 from "../assets/image/product/39.png"
import p40 from "../assets/image/product/40.png"
import p41 from "../assets/image/product/41.png"
import p42 from "../assets/image/product/42.png"
import p43 from "../assets/image/product/43.png"
import p44 from "../assets/image/product/44.png"
import p45 from "../assets/image/product/45.png"
import p46 from "../assets/image/product/46.png"
import p47 from "../assets/image/product/47.png"
import p48 from "../assets/image/product/48.png"
import p49 from "../assets/image/product/49.png"
import p50 from "../assets/image/product/50.png"
import p51 from "../assets/image/product/51.png"
import p52 from "../assets/image/product/52.png"
import p53 from "../assets/image/product/53.png"
import p54 from "../assets/image/product/54.png"
import p55 from "../assets/image/product/55.png"
import p56 from "../assets/image/product/56.png"
import p57 from "../assets/image/product/57.png"
import p58 from "../assets/image/product/58.png"
import p59 from "../assets/image/product/59.png"
import p60 from "../assets/image/product/60.png"
import p61 from "../assets/image/product/61.png"
import p62 from "../assets/image/product/62.png"
import p63 from "../assets/image/product/63.png"
import p64 from "../assets/image/product/64.png"
import p65 from "../assets/image/product/65.png"
import p66 from "../assets/image/product/66.png"
import p67 from "../assets/image/product/67.png"
import p68 from "../assets/image/product/68.png"
import p69 from "../assets/image/product/69.png"
import p70 from "../assets/image/product/70.png"
import p71 from "../assets/image/product/71.png"
import p72 from "../assets/image/product/72.png"
import p73 from "../assets/image/product/73.png"
import p74 from "../assets/image/product/74.png"
import p75 from "../assets/image/product/75.png"
import p76 from "../assets/image/product/76.png"
import p77 from "../assets/image/product/77.png"
import p78 from "../assets/image/product/78.png"
import p79 from "../assets/image/product/79.png"
import p80 from "../assets/image/product/80.png"
import p81 from "../assets/image/product/81.png"
import p82 from "../assets/image/product/82.png"
import p83 from "../assets/image/product/83.png"
import p84 from "../assets/image/product/84.png"
import p85 from "../assets/image/product/85.png"
import p86 from "../assets/image/product/86.png"
import p87 from "../assets/image/product/87.png"
import p88 from "../assets/image/product/88.png"
import p89 from "../assets/image/product/89.png"
import p90 from "../assets/image/product/90.png"
import p91 from "../assets/image/product/91.png"
import p92 from "../assets/image/product/92.png"
import p93 from "../assets/image/product/93.png"
import p94 from "../assets/image/product/94.png"
import p95 from "../assets/image/product/95.png"
import p96 from "../assets/image/product/96.png"
import p97 from "../assets/image/product/97.png"
import p98 from "../assets/image/product/98.png"
import p99 from "../assets/image/product/99.png"
import p100 from "../assets/image/product/100.png"
// End Import Images

const leftBrands = [
p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25,p26, p27, p28, p29, p30, p31, p32, p33, p34, p35, p36, p37, p38, p39, p40, p41, p42, p43, p44, p45, p46, p47, p48, p49, p50
];
const rightBrands = [
p51, p52, p53, p54, p55, p56, p57, p58, p59, p60, p61, p62, p63, p64, p65, p66, p67, p68, p69, p70, p71, p72, p73, p74, p75,p76, p77, p78, p79, p80, p81, p82, p83, p84, p85, p86, p87, p88, p89, p90, p91, p92, p93, p94, p95, p96, p97,p98,p99,p100
];

const DURATION = 400; // ความเร็วในการเลื่อน (หน่วย: วินาที)

function BrandColumn({ brands, direction }) {
  const yAnimate =
    direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="relative h-full overflow-hidden">
      {/* Hero Gradient Fade */}
      {/* <div className="pointer-events-none absolute top-0 inset-x-0
                      h-[15vh]
                      bg-gradient-to-b from-white to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0
                      h-[15vh]
                      bg-gradient-to-t from-white to-transparent z-10" /> */}

      <motion.div
        className="
          flex flex-col items-center
          gap-[clamp(2rem,6vh,5rem)]
        "
        animate={{ y: yAnimate }}
        transition={{
          duration: DURATION,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...brands, ...brands].map((logo, index) => (
          <div
            key={index}
            className="
              flex items-center justify-center
              h-[clamp(12rem,35vh,28rem)]
            "
          >
            <img
              src={logo}
              alt={`Product ${index + 1}`}
              className="
                bg-white
                w-auto
                max-h-full
                h-[clamp(10rem,30vh,24rem)]
                object-contain
                transition-all duration-500
                drop-shadow-[0_0_60px_rgba(255,255,255,0.35)]
                rounded-[3rem]
                hover:scale-105
                shadow-xl
              "
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}


// export default function BrandSlider() {
//   return (
//     <section className="py-10">
//       <div className="h-[32rem] grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* ซ้ายเลื่อนขึ้น */}
//         <BrandColumn brands={leftBrands} direction="up" />

//         {/* ขวาเลื่อนลง */}
//         <BrandColumn brands={rightBrands} direction="down" />
//       </div>
//     </section>
//   );
// }

export default function BrandSlider() {
    return (
        <section className="w-full h-[500px] md:h-[600px] lg:h-[700px] m-0 p-0">
            <div
                className="
                    w-full
                    h-full
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                    m-0
                    p-0
                "
            >
                <BrandColumn
                    brands={leftBrands}
                    direction="up"
                />

                <BrandColumn
                    brands={rightBrands}
                    direction="down"
                />
            </div>
        </section>
    );
}
