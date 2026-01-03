import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='text-3xl font-bold text-center'
      >
        Top Doctors to Book
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className='sm:w-1/3 text-center text-sm'
      >
        Simply browse through our extensive list of trusted doctors.
      </motion.p>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='bg-white border border-indigo-100 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 shadow-sm'
          >
            <div className='bg-indigo-50 overflow-hidden relative group'>
              <img className='w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt="" />
              <div className='absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-90'>
                <span className='w-2 h-2 bg-white rounded-full animate-pulse'></span> Available
              </div>
            </div>

            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p>Available</p>
              </div>

              <p className='text-gray-900 text-lg font-bold'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className='bg-indigo-50 cursor-pointer text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-indigo-100 transition-colors font-medium'
      >
        more
      </motion.button>
    </div>
  )
}

export default TopDoctors
