import React from 'react'
import services from '../assets/image/service-gf.png'
import bgImage from "../assets/image/new/03.1BG.png";

function Community() {
    return (
      <div
  className="relative w-full h-[400px] sm:h-[450px] md:h-[520px] lg:h-[600px] flex items-center bg-cover bg-center"
  style={{ backgroundImage: `url(${bgImage})` }}
>
            <div className="relative container mx-auto max-w-[1320px] px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                {/* LEFT */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-10 text-center md:text-left leading-tight tracking-wide">
                        บริการ
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-3xl sm:text-3xl md:text-4xl font-bold text-white mb-10 text-center md:text-left leading-tight tracking-wide">
                        ● ซ่อม / สอบเทียบ <br/>
                        ● อบรมการใช้งาน <br/>
                        ● บำรุงรักษาเครื่องมือ เครื่องจักร<br/>
                        ด้วยทีมงานผู้เชี่ยวชาญด้านเครื่องมือเฉพาะทางสำหรับอุตสาหกรรม<br/>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Community
