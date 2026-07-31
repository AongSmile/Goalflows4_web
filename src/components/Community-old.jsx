import React from 'react'
import icon01 from '../assets/img/icon-01.png'
import icon02 from '../assets/img/icon-02.png'
import icon03 from '../assets/img/icon-03.png'

function Community() {
    return (
        <div className='container mx-auto max-w-[1320px] text-center'>
            <h2 className='text-[2.25rem] font-semibold text-[#1E3A8A]'>บริการของเรา</h2>
            <p className='text-[#717171] mb-5'>Our Service</p>

            <div className='grid grid-cols-1 gap-[100px] m-10 md:m-0 md:grid-cols-3'>
                <div className='shadow-lg p-10 rounded-lg'>
                    <img className='mx-auto' src={icon01} alt="" />
                    <h3 className='text-[1.75rem] font-bold text-[#4D4D4D] my-3'>เครื่องมือวัด</h3>
                    <p>บริษัท โกลโฟล อินสตรูเมนท์ จำกัด เป็นตัวแทนจำหน่ายเครื่องมือวัดละเอียดทางด้านอุตสาหกรรม เช่น Video Measuring Machine(VMM), Profile Projector, CMM, ARM,, Contour, Roundness, Surftestm Stereo Microscope, และ Handness</p>
                </div>
                <div className='shadow-lg p-10 rounded-lg'>
                    <img className='mx-auto' src={icon02} alt="" />
                    <h3 className='text-[1.75rem] font-bold text-[#4D4D4D] my-3'>บริการสอบเทียบ</h3>
                    <p>บริษัท โกลโฟล อินสตรูเมนท์ จำกัด จำกัด มีการบริการสอบเทียบเครื่องมือวัดทางด้านอุตสาหกรรม และ เครื่องชั่งทั้งในและนอกสถานที่ด้วยมาตรฐานการรับรองห้องปฏิบัติการสอบเทียบ มอก. 17025-2548 ตามขอบข่าย</p>
                </div>
                <div className='shadow-lg p-10 rounded-lg'>
                    <img className='mx-auto' src={icon03} alt="" />
                    <h3 className='text-[1.75rem] font-bold text-[#4D4D4D] my-3'>บริการซ่อมเครื่องมือวัด/อุปกรณ์ต่างๆ</h3>
                    <p>ให้บริการซ่อมเครื่องมือวัดต่างๆ -PROFILE PROJECTOR -VIDEO MEASURING -เครื่องชั่งน้ำหนัก -Vernier Caliper,Micrometer และอื่นๆ</p>
                </div>
            </div>
        </div>
    )
}

export default Community