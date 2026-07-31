import React from 'react'
import articleImg01 from '../assets/img/article-01.png'
import articleImg02 from '../assets/img/article-02.png'
import articleImg03 from '../assets/img/article-03.png'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

function Article() {
  return (
    <div className='pt-10 pb-20 text-center'>
        <div className='container mx-auto max-w-[1320px]'>
            <h3 className='text-[2.2rem] font-semibold text-[#1E3A8A]'>บริการของเรา</h3>
            <p className='text-[#717171]'>Our Service</p>

            <div className='my-10'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    <div className='relative m-5 md:m-0'>
                        <img className='rounded-xl' src={articleImg01} alt="" />
                        <div className='absolute bg-[#F5F7FA] bottom-[-50px] left-[50%] translate-x-[-50%] w-full max-w-[350px] p-5 shadow-lg rounded-xl'>
                            <h3 className='font-bold text-[1.25rem] text-[#717171] mb-5'>เครื่องมือวัด</h3>
                            <p className='text-[0.75rem]'>บริษัท โกลโฟล อินสตรูเมนท์ จำกัด เป็นตัวแทนจำหน่ายเครื่องมือวัดละเอียดทางด้านอุตสาหกรรม เช่น Video Measuring Machine(VMM), Profile Projector, CMM, ARM,, Contour, Roundness, Surftestm Stereo Microscope, และ Handness</p>
                            <a className='flex justify-center items-center text-[#4CAF4F] font-bold' href="">Readmore <HiOutlineArrowNarrowRight className='ml-5' /></a>
                        </div>
                    </div>
                    <div className='relative m-5 md:m-0'>
                        <img className='rounded-xl' src={articleImg02} alt="" />
                        <div className='absolute bg-[#F5F7FA] bottom-[-50px] left-[50%] translate-x-[-50%] w-full max-w-[350px] p-5 shadow-lg rounded-xl'>
                            <h3 className='font-bold text-[1.25rem] text-[#717171] mb-5'>บริการสอบเทียบ</h3>
                            <p className='text-[0.75rem]'>บริษัท โกลโฟล อินสตรูเมนท์ จำกัด จำกัด มีการบริการสอบเทียบเครื่องมือวัดทางด้านอุตสาหกรรม และ เครื่องชั่งทั้งในและนอกสถานที่ด้วยมาตรฐานการรับรองห้องปฏิบัติการสอบเทียบ มอก. 17025-2548 ตามขอบข่าย</p>
                            <a className='flex justify-center items-center text-[#4CAF4F] font-bold' href="">Readmore <HiOutlineArrowNarrowRight className='ml-5' /></a>
                        </div>
                    </div>
                    <div className='relative m-5 md:m-0'>
                        <img className='rounded-xl' src={articleImg03} alt="" />
                        <div className='absolute bg-[#F5F7FA] bottom-[-50px] left-[50%] translate-x-[-50%] w-full max-w-[350px] p-5 shadow-lg rounded-xl'>
                            <h3 className='font-bold text-[1.25rem] text-[#717171] mb-5'>บริการซ่อมเครื่องมือวัด/อุปกรณ์ต่างๆ</h3>
                            <p className='text-[0.75rem]'>ให้บริการซ่อมเครื่องมือวัดต่างๆ -PROFILE PROJECTOR -VIDEO MEASURING -เครื่องชั่งน้ำหนัก -Vernier Caliper,Micrometer และอื่นๆ</p>
                            <a className='flex justify-center items-center text-[#4CAF4F] font-bold' href="">Readmore <HiOutlineArrowNarrowRight className='ml-5' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Article