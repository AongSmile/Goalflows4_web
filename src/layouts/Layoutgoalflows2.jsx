import React from 'react'
import bg1 from "../assets/image/goalflows/PAGE02.03BG.png"
import left1 from "../assets/image/goalflows/PAGE02.03.1.png"
import right1 from "../assets/image/goalflows/PAGE02.03.2.png"
import hardness from "../assets/image/goalflows/hardness.png"
import balance from "../assets/image/goalflows/BALANCE.png"

const Layoutgoalflows2 = () => {
    return (
<section
  className="
    relative 
    pt-[40px] md:pt-[60px]

    min-h-[400px] md:min-h-[600px]

    bg-no-repeat

    /* 📱 Mobile (คงเดิม) */
    bg-right-top
    bg-contain

    /* 💻 Desktop */
    md:bg-left-top
    md:bg-cover

    bg-[#f3f4f6]
  "
  style={{ backgroundImage: `url(${bg1})` }}
>

  {/* 🔷 Fill Layer */}
  <div className="absolute inset-0 bg-[#f3f4f6] -z-10" />
            <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 px-4 md:px-6 py-8 md:py-12">

                {/* 🔷 LEFT */}
                <div className="group relative overflow-hidden rounded-2xl bg-white md:bg-transparent shadow-md md:shadow-none">

                    {/* 🔷 IMAGE (แสดงเฉพาะ Desktop) */}
                    <img
                        src={left1}
                        alt="left"
                        className="
      hidden md:block
      w-full 
      md:aspect-[5/4] lg:aspect-[16/10]
      object-cover
    "
                    />

                    {/* 🔷 OVERLAY (เฉพาะ Desktop) */}
                    <div className="hidden md:block absolute inset-0" />

                    {/* 🔷 CONTENT */}
                    <div className="
    relative md:absolute md:inset-0
    flex flex-col md:grid md:grid-cols-2
    items-center md:items-start
    justify-center
    gap-3 md:gap-4
    p-4 md:p-6
    text-center md:text-left
  ">

                        {/* ICON */}
                        <img
                            src={hardness}
                            alt="hardness"
                            className="
        w-[110px] sm:w-[130px] md:w-full
        shadow-lg rounded-lg
        object-contain
        mx-auto md:mx-0
    mb-2
      "
                        />

                        {/* TEXT */}
                        <div className="max-w-[95%] md:max-w-full">
                            <h1 className="
        text-lg sm:text-xl md:text-2xl lg:text-3xl
        font-bold text-[#003b6e] md:text-#003b6e
      ">
                                เครื่องวัดความแข็ง
                            </h1>

                            <p className="
        text-xs sm:text-sm md:text-base
        text-[#003b6e] md:text-#003b6e
        mt-2 leading-relaxed
      ">
                                เครื่องวัดความแข็งของเหล็ก(Hardness Tester) จำเป็นต่ออุตสาหกรรมการผลิตเพื่อควบคุมคุณภาพ(QC)ตรวจสอบความแข็งแรงทนทานต่อการสึกหรอและเสียรูปของชิ้นงานช่วยยืนยันว่าวัตถุดิบและผลิตภัณฑ์เป็นไปตามมาตรฐานที่กำหนดก่อนนำไปใช้งานจริงและช่วยพัฒนาปรับปรุงกระบวนการผลิตให้ได้มาตรฐานสูงสุด
                            </p>
                        </div>

                    </div>
                </div>

                {/* 🔷 RIGHT */}
                <div className="group relative overflow-hidden rounded-2xl bg-white md:bg-transparent shadow-md md:shadow-none">

                    {/* 🔷 IMAGE (เฉพาะ Desktop) */}
                    <img
                        src={right1}
                        alt="right"
                        className="
      hidden md:block
      w-full 
      md:aspect-[5/4] lg:aspect-[16/10]
      object-cover
      mx-auto md:mx-0
      mb-2
    "
                    />

                    {/* 🔷 OVERLAY (เฉพาะ Desktop) */}
                    <div className="hidden md:block absolute inset-0" />

                    {/* 🔷 CONTENT */}
                    <div className="
    relative md:absolute md:inset-0
    flex flex-col md:grid md:grid-cols-2
    items-center md:items-start
    justify-center
    gap-3 md:gap-4
    p-4 md:p-6
    text-center md:text-left
  ">

                        {/* 🔷 ICON */}
                        <img
                            src={balance}
                            alt="balance"
                            className="
        w-[110px] sm:w-[130px] md:w-full
        shadow-lg rounded-lg
        object-contain
      "
                        />

                        {/* 🔷 TEXT */}
                        <div className="max-w-[95%] md:max-w-full">
                            <h1 className="
        text-lg sm:text-xl md:text-2xl lg:text-3xl
        font-bold text-[#003b6e] md:text-[#003b6e]
      ">
                                เครื่องชั่งน้ำหนัก
                            </h1>

                            <p className="
        text-xs sm:text-sm md:text-base
        text-[#003b6e] md:text-[#003b6e]
        mt-2 leading-relaxed
      ">
                                โรงงานต้องใช้เครื่องชั่งน้ำหนักเพื่อควบคุมคุณภาพการผลิต ลดของเสีย(Waste) ควบคุมต้นทุนวัตถุดิบและตรวจสอบความถูกต้องของสินค้าก่อนจัดส่ง
                                การชั่งที่แม่นยำช่วยป้องกันการปนเปื้อนในอุตสาหกรรมยา/อาหาร และทำให้อุตสาหกรรมเคมีมีความปลอดภัย รวมถึงใช้ตรวจสอบสต๊อกและปฏิบัติตามมาตรฐานอุตสาหกรรม
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default Layoutgoalflows2
