import React, { useState } from 'react'
import Logo from '../assets/img/logo-black.png'
import { FaBars } from 'react-icons/fa'
import logo1 from "../assets/image/GF-1.png";

function Navbar() {

    const [toggle, setToggle] = useState(false);
    const updateToggle = () => {
        setToggle(!toggle);
    }

    return (
        <nav className='backdrop-blur-md bg-[#003b6e]/70 border-b border-[#003b6e]/40 shadow-xl transition-all'>
            <div className='container mx-auto max-w-[1320px] relative h-auto p-10 flex flex-col md:flex-row md:justify-between md:items-center md:h-[80px]'>
                <div>
                    <a href="">
                        <img src={logo1} className='h-20 drop-shadow-md transition-transform hover:scale-105' alt="" />
                    </a>
                </div>

                <ul className={`${!toggle ? 'hidden' : 'flex'} flex flex-col my-5 md:flex md:flex-row`}>
                    <li className='my-2 text-white rounded-md md:mx-4'><a href="#">หน้าแรก</a></li>
                    <li className='my-2 text-white rounded-md md:mx-4'><a href="#">Catalog</a></li>
                    <li className='my-2 text-white rounded-md md:mx-4'><a href="#">บริการ</a></li>
                    <li className='my-2 text-white rounded-md md:mx-4'><a href="#">ติดต่อเรา</a></li>
                </ul>


                <ul className={`${!toggle ? 'hidden' : 'flex'} flex flex-col my-5 md:flex md:flex-row`}>
                    <li className='my-2 md:mx-4'><a className='inline-flex justify-center py-2 px-4 text-white rounded-md' href="#">Login</a></li>
                    <li className='my-2 md:mx-4'><a className='inline-flex justify-center py-2 px-4 bg-[#4CAF4F] text-white rounded-md' href="#">Sign up</a></li>
                </ul>

                {/* Hamburger menu button */}
                <FaBars onClick={updateToggle} className='absolute right-5 cursor-pointer text-xl md:hidden' />
            </div>
        </nav>
    )
}

export default Navbar