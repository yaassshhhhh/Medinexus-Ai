import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const AllAppointments = () => {

    const { aToken } = useContext(AdminContext)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='w-full max-w-6xl m-5'
        >
            <p className='mb-6 font-bold text-2xl text-gray-800'>All Appointments</p>

            <div className='bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm'>
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 border-b border-gray-50 bg-gray-50 text-gray-600 font-bold'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                <div className='divide-y divide-gray-50'>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <div className='flex flex-wrap sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-4 px-6 hover:bg-gray-50 transition-colors' key={index}>
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2'>
                                <img src={assets.patient_icon} className='w-10 h-10 rounded-full border border-gray-100' alt="" />
                                <p className='text-gray-800 font-bold'>Richard James</p>
                            </div>
                            <p className='max-sm:hidden'>28</p>
                            <p className='text-sm'>24 Feb, 2024, 10:30 AM</p>
                            <div className='flex items-center gap-2'>
                                <img src={assets.doctor_icon} className='w-10 h-10 rounded-full border border-gray-100' alt="" />
                                <p className='text-gray-800 font-bold'>Dr. Richard James</p>
                            </div>
                            <p className='font-bold text-gray-800'>$50</p>
                            <img className='w-10 cursor-pointer hover:scale-110 transition-transform active:scale-90' src={assets.cancel_icon} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default AllAppointments
