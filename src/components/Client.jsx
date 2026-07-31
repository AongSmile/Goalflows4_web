import React from 'react'
import BrandSlider from './BrandSlider'

const Client = () => {
  return (
    <div className="container mx-auto max-w-[1320px] py-10 text-center">
          <h2 className="text-[2.25rem] font-semibold text-blue-900">
            {/* แบรนด์ที่จัดจำหน่าย */}
          </h2>
          <ul className="flex flex-col items-center my-10 md:flex-row md:justify-between">
            {/* {clientsTmgLogo.map((client,index)=>(
                <li key={index}>
                    <img src={client} alt="" />
                </li>
            ))} */}
            {/* <HomeCarouselBrand /> */}
            <BrandSlider/>
          </ul>
        </div>
  )
}

export default Client