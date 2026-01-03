import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden relative'>
      {/* ----------LEFT SIDE----------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] z-10'>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'
        >
          Book Appointment <br /> With Trusted Doctors
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'
        >
          <img className='w-28' src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
        </motion.div>
        <motion.a
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          href="#speciality"
          className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg'
        >
          Book appointment
          <img className='w-3' src={assets.arrow_icon} alt="" />
        </motion.a>
      </div>

      {/* ----------RIGHT SIDE---------- */}
      <div className='md:w-1/2 relative'>
        <motion.img
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='w-full md:absolute bottom-0 h-auto rounded-lg'
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  )
}

export default Header