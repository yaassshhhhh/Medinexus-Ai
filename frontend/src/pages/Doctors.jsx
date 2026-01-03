import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter } from 'lucide-react'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (
    <div className='pb-10 pt-5'>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <h1 className='text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-block'>Find a Specialist</h1>
        <p className='text-gray-600 mt-2'>Browse through our network of trusted medical professionals.</p>
      </motion.div>

      <div className='flex flex-col sm:flex-row items-start gap-8 mt-5'>

        {/* Mobile Filter Button */}
        <button
          className={`py-2 px-4 border rounded-full text-sm font-medium transition-all sm:hidden flex items-center gap-2 ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600'}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          <Filter size={16} /> Filters
        </button>

        {/* Filter Sidebar */}
        <div
          className={`flex-col gap-3 text-sm text-gray-600 w-full sm:w-64 ${showFilter ? 'flex' : 'hidden sm:flex'}`}
        >
          <p className='font-semibold text-gray-800 mb-2'>Specialties</p>
          <div className='flex flex-col gap-2'>
            <div
              onClick={() => navigate('/doctors')}
              className={`w-full pl-4 py-3 border border-gray-200 rounded-lg transition-all cursor-pointer hover:border-primary hover:text-primary font-medium ${!speciality ? "bg-indigo-50 text-primary border-indigo-200" : "bg-white"}`}
            >
              All Doctors
            </div>
            {specialties.map((spec) => (
              <div
                key={spec}
                onClick={() => navigate(spec === speciality ? '/doctors' : `/doctors/${spec}`)}
                className={`w-full pl-4 py-3 border border-gray-200 rounded-lg transition-all cursor-pointer hover:border-primary hover:text-primary ${speciality === spec ? "bg-indigo-50 text-primary border-indigo-200 font-medium" : "bg-white"}`}
              >
                {spec}
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 gap-y-8'>
          <AnimatePresence mode='popLayout'>
            {filterDoc.map((item, index) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='bg-white border border-indigo-50 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-8px] transition-all duration-300 shadow-sm hover:shadow-xl group'
              >
                <div className='relative bg-indigo-50 overflow-hidden'>
                  <img className='w-full h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500' src={item.image} alt="" />
                  {/* Availability Badge */}
                  <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-green-600 flex items-center gap-1 shadow-sm'>
                    <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span> Available
                  </div>
                </div>

                <div className='p-5'>
                  <p className='text-gray-900 text-lg font-bold mb-1 group-hover:text-primary transition-colors'>{item.name}</p>
                  <p className='text-gray-600 text-sm font-medium mb-3'>{item.speciality}</p>

                  <div className='flex items-center gap-2 mt-2 pt-3 border-t border-gray-100'>
                    <span className='px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium'>Highly Rated</span>
                    <span className='px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium'>Video Consult</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filterDoc.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='col-span-full text-center py-20 text-gray-500'
            >
              <p>No doctors found for this specialty.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors