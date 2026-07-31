import React from 'react'
import header1 from "../assets/image/goalflows/PAGE02.01.png"
import bg1 from "../assets/image/goalflows/PAGE02.BG.png"

const Layoutgoalflows1 = () => {
    return (
        <section className="w-full ">

            {/* 🔷 HEADER */}
            <div className="flex justify-center px-4 py-4 md:py-0">
                <img
                    src={header1}
                    alt="header"
                    className="
                        w-[320px]
                        sm:w-[240px]
                        md:w-[320px]
                        lg:w-[800px]
                        object-contain
                    "
                />
            </div>

            {/* 🔷 BG IMAGE FULL WIDTH */}
            <div className="w-full aspect-[16/9] md:aspect-[21/9]">
                <img
                    src={bg1}
                    alt="background"
                    className="
                        w-full 
                        h-[220px]
                        sm:h-[300px]
                        md:h-[420px]
                        lg:h-[550px]
                        xl:h-[800px]
                        object-cover
                        object-center
                    "
                />
            </div>

        </section>
    )
}

export default Layoutgoalflows1
