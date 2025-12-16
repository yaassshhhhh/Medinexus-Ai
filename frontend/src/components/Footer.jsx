import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* Left section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum vitae suscipit laboriosam ab eveniet provident voluptate alias, quis aperiam laudantium.</p>
            </div>
            {/* Center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            {/* Right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+212-2234-3332-232</li>
                    <li>doctor@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* -------CopyRight Text--------- */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ Medinexus Ai - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer