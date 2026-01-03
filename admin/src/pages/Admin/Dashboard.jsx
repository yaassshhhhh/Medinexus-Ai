import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const Dashboard = () => {

    const { aToken, backendUrl } = useContext(AdminContext)

    // In a real app, we would fetch data here. 
    // For the "vibe", let's use some placeholder data if backend is empty.
    const stats = [
        { icon: assets.doctor_icon, label: 'Doctors', count: 15, bg: 'bg-[#F2F3FF]' },
        { icon: assets.appointments_icon, label: 'Appointments', count: 48, bg: 'bg-[#E3FFFA]' },
        { icon: assets.patients_icon, label: 'Patients', count: 124, bg: 'bg-[#FFF5F5]' }
    ]

    return aToken && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='m-5'
        >
            <div className='flex flex-wrap gap-5'>
                {stats.map((item, index) => (
                    <div key={index} className={`flex items-center gap-4 ${item.bg} p-6 min-w-72 rounded-xl cursor-pointer hover:scale-105 transition-all shadow-sm border border-black/5`}>
                        <img className='w-14' src={item.icon} alt="" />
                        <div>
                            <p className='text-3xl font-bold text-gray-800'>{item.count}</p>
                            <p className='text-gray-500 font-medium'>{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='bg-white mt-10 rounded-xl border border-gray-100 shadow-sm'>
                <div className='flex items-center gap-3 px-6 py-4 border-b border-gray-50'>
                    <img src={assets.list_icon} alt="" />
                    <p className='font-bold text-lg text-gray-800'>Latest Appointments</p>
                </div>

                <div className='pt-2'>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors' key={index}>
                            <img className='w-12 h-12 rounded-full border border-gray-100' src={assets.doctor_icon} alt="" />
                            <div className='flex-1'>
                                <p className='text-gray-800 font-bold'>Dr. Richard James</p>
                                <p className='text-gray-500 text-sm font-medium'>Booking on 24 Feb, 2024</p>
                            </div>
                            <img className='w-10 cursor-pointer hover:scale-110 transition-transform' src={assets.cancel_icon} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Dashboard
