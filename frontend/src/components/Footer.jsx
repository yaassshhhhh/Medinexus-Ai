import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <div className='md:mx-10 pt-10'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'
            >

                {/* Left section */}
                <div>
                    <h1 className='mb-5 text-3xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-block'>MediNexus Ai</h1>
                    <p className='w-full md:w-2/3 text-gray-600 leading-7 text-[15px]'>
                        MediNexus Ai is revolutionizing healthcare accessibility. Experience the future of medical consultation with our advanced AI-powered tools and seamless appointment scheduling. We are dedicated to providing technology that cares.
                    </p>
                </div>

                {/* Center section */}
                <div>
                    <p className='text-xl font-bold mb-5 text-gray-800'>COMPANY</p>
                    <ul className='flex flex-col gap-3 text-gray-600'>
                        {['Home', 'About us', 'Contact us', 'Privacy Policy'].map((item, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ x: 5, color: '#5f6FFF' }}
                                className='cursor-pointer transition-colors'
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Right section */}
                <div>
                    <p className='text-xl font-bold mb-5 text-gray-800'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-3 text-gray-600'>
                        <motion.li whileHover={{ x: 5 }} className='flex items-center gap-2'>
                            <span className="font-medium">Phone:</span> +1-212-456-7890
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }} className='flex items-center gap-2'>
                            <span className="font-medium">Email:</span> support@medinexus.ai
                        </motion.li>
                    </ul>
                </div>

            </motion.div>

            {/* -------CopyRight Text--------- */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
            >
                <hr className='border-gray-200' />
                <p className='py-8 text-sm text-center text-gray-500'>
                    Copyright © 2025 <span className="font-semibold text-primary">MediNexus Ai</span> - All Rights Reserved.
                </p>
            </motion.div>
        </div>
    )
}

export default Footer