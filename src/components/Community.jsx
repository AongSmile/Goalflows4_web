import React from 'react'
import services from '../assets/image/service-gf.png'
import bgImage from "../assets/image/new/03.1BG.png";

function Community() {
    return (
        <section
            className="
                relative w-full
                min-h-[420px]
                sm:min-h-[480px]
                md:min-h-[540px]
                lg:min-h-[600px]
                flex items-center
                bg-cover bg-center bg-no-repeat
            "
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div
                className="
                    relative
                    container mx-auto
                    max-w-[1320px]
                    px-5
                    sm:px-8
                    md:px-10
                    lg:px-12
                    xl:px-16
                    py-10
                    sm:py-12
                    md:py-16
                    lg:py-20
                "
            >

                {/* LEFT */}
                <div
                    className="
                        flex flex-col
                        items-center
                        md:items-start
                        text-center
                        md:text-left
                        font-Sarabun
                        w-full
                    "
                >

                    {/* TITLE */}
                    <h1
                        className="
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-6xl
                            xl:text-7xl
                            text-white
                            mb-6
                            sm:mb-8
                            md:mb-10
                            leading-tight
                            tracking-wide
                        "
                    >
                        บริการ
                    </h1>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            text-lg
                            sm:text-xl
                            md:text-2xl
                            lg:text-3xl
                            xl:text-4xl
                            text-white
                            leading-relaxed
                            tracking-wide
                            max-w-full
                            lg:max-w-[1100px]
                        "
                    >
                        ● ซ่อม / สอบเทียบ <br />
                        ● อบรมการใช้งาน <br />
                        ● บำรุงรักษาเครื่องมือ เครื่องจักร <br />
                        ด้วยทีมงานผู้เชี่ยวชาญด้านเครื่องมือเฉพาะทางสำหรับอุตสาหกรรม
                    </p>

                </div>
            </div>
        </section>
    )
}

export default Community
