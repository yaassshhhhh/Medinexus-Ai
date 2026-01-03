import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { motion } from 'framer-motion'

const DoctorsList = () => {

    const { aToken } = useContext(AdminContext)

    // Using dummy data for demonstration
    const doctors = [
        { name: 'Dr. Richard James', speciality: 'General physician', image: 'https://via.placeholder.com/150', available: true },
        { name: 'Dr. Emily Larson', speciality: 'Gynecologist', image: 'https://via.placeholder.com/150', available: true },
        { name: 'Dr. Sarah Patel', speciality: 'Dermatologist', image: 'https://via.placeholder.com/150', available: false },
        { name: 'Dr. Christopher Lee', speciality: 'Pediatricians', image: 'https://via.placeholder.com/150', available: true }
    ]

    return (
        <div className='m-5 h-full overflow-y-scroll'>
            <h1 className='text-2xl font-bold text-gray-800 mb-6'>All Doctors</h1>
            <div className='flex flex-wrap gap-6 pt-5'>
                {doctors.map((item, index) => (
                    <motion.div
                        whileHover={{ y: -10 }}
                        key={index}
                        className='bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 w-full sm:w-64'
                    >
                        <div className='bg-[#F2F3FF] overflow-hidden'>
                            <img className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-5'>
                            <p className='text-gray-900 text-lg font-bold group-hover:text-primary transition-colors'>{item.name}</p>
                            <p className='text-gray-500 text-sm font-medium mb-3'>{item.speciality}</p>
                            <div className='flex items-center gap-2 mt-2'>
                                <input className='w-4 h-4 accent-primary' type="checkbox" checked={item.available} readOnly />
                                <p className='text-sm font-bold text-gray-600'>Available</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default DoctorsList
