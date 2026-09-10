import React from "react";
import company1 from "../assets/image/productsoffered/BG.01.03.png";
import product1 from "../assets/image/productsoffered/BG.01.02.2.png";
import product2 from "../assets/image/productsoffered/BG.01.02.3.png";
import bgSection from "../assets/image/productsoffered/BG.01.02.png";

const Productsoffered = () => {
    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                bg-cover
                bg-center
                bg-no-repeat
            "
            style={{
                backgroundImage: `url(${bgSection})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none" />

            {/* Container */}
            <div
                className="
                    relative
                    w-full
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    md:px-8
                    lg:px-10
                    xl:px-12
                    
                "
            >
                {/* Company Image */}
                <div className="w-full flex justify-center">
                    <img
                        src={company1}
                        alt="Company"
                        className="
                            w-full
                            max-w-[500px]
                            sm:max-w-[670px]
                            md:max-w-[700px]
                            lg:max-w-[800px]
                            h-auto
                            object-contain
                        "
                    />
                </div>

                {/* PRODUCTS */}
                <div
                    className="
        mt-0
        sm:mt-1
        md:mt-z
        -translate-y-4
        md:-translate-y-6
        grid
        grid-cols-1
        md:grid-cols-2
        gap-0
        md:gap-0
        items-center
        justify-items-center
    "
                >
                    {/* PRODUCT 1 */}
                    <div className="w-full flex justify-center md:justify-end">
                        <img
                            src={product1}
                            alt="Product 1"
                            className="
                w-full
                max-w-[520px]
                sm:max-w-[550px]
                md:max-w-[520px]
                lg:max-w-[560px]
                h-auto
                object-contain
                transition-transform
                duration-500
                hover:scale-[1.02]
            "
                        />
                    </div>

                    {/* PRODUCT 2 */}
                    <div className="w-full flex justify-center md:justify-start">
                        <img
                            src={product2}
                            alt="Product 2"
                            className="
                w-full
                max-w-[520px]
                sm:max-w-[550px]
                md:max-w-[520px]
                lg:max-w-[560px]
                h-auto
                object-contain
                transition-transform
                duration-500
                hover:scale-[1.02]
            "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Productsoffered;
