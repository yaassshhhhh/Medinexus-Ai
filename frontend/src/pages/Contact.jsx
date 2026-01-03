import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Briefcase, ArrowRight } from 'lucide-react'

const Contact = () => {
  return (
    <div className='pb-20'>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center text-3xl pt-10 text-gray-800'
      >
        <p>CONTACT <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 font-bold'>US</span></p>
        <p className='text-sm text-gray-500 mt-2'>We'd love to hear from you</p>
      </motion.div>

      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 max-w-6xl mx-auto px-4'>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='w-full md:w-1/2 overflow-hidden rounded-2xl shadow-2xl relative group'
        >
          <img
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
            src={assets.contact_image}
            alt="Contact Us"
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8'>
            <div className='text-white'>
              <h3 className='text-2xl font-bold mb-2'>Visit Our Office</h3>
              <p className='opacity-90'>Experience world-class healthcare coordination.</p>
            </div>
          </div>
        </motion.div>

        <div className='flex flex-col justify-center md:w-1/2 gap-8'>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg border border-indigo-50'
          >
            <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
              <span className='p-2 bg-indigo-50 rounded-lg text-indigo-600'><MapPin size={20} /></span>
              OUR OFFICE
            </h3>
            <div className='text-gray-600 pl-11 space-y-1'>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>

            <div className='text-gray-600 pl-11 space-y-3'>
              <p className='flex items-center gap-3 group cursor-pointer hover:text-primary transition-colors'>
                <Phone size={16} className='text-gray-400 group-hover:text-primary' /> (000) 000-0000
              </p>
              <p className='flex items-center gap-3 group cursor-pointer hover:text-primary transition-colors'>
                <Mail size={16} className='text-gray-400 group-hover:text-primary' /> contact@medinexus.ai
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='flex flex-col gap-6 bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl shadow-lg border border-indigo-100'
          >
            <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
              <span className='p-2 bg-indigo-100 rounded-lg text-indigo-700'><Briefcase size={20} /></span>
              CAREERS AT MEDINEXUS
            </h3>
            <div className='pl-11'>
              <p className='text-gray-600 mb-6'>Join our mission to revolutionize healthcare accessibility through AI.</p>
              <button className='bg-white border border-gray-300 px-6 py-3 text-sm font-semibold rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center gap-2 group shadow-sm'>
                Explore Openings <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
              </button>
            </div>
          </motion.div>

        </div>

      </div>

    </div>
  )
}

export default Contact