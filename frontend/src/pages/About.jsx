import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { CheckCircle2, Star, Users } from 'lucide-react'

const About = () => {
  return (
    <div className='pb-20'>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='text-center text-3xl pt-10 text-gray-800'
      >
        <p>ABOUT <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 font-bold'>US</span></p>
      </motion.div>

      <div className='my-10 flex flex-col md:flex-row gap-12 max-w-6xl mx-auto px-4 items-center'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='w-full md:w-1/3'
        >
          <img className='w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500' src={assets.about_image} alt="" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className='flex flex-col justify-center gap-6 md:w-2/3 text-sm text-gray-600'
        >
          <p className='text-base leading-7'>Welcome to <span className='font-bold text-primary'>MediNexus Ai</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At MediNexus Ai, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='text-base leading-7'>MediNexus Ai is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediNexus Ai is here to support you every step of the way.</p>

          <div className='bg-indigo-50 p-6 rounded-xl border border-indigo-100 mt-4'>
            <b className='text-gray-800 text-lg mb-2 block'>Our Vision</b>
            <p className='text-gray-600'>Our vision at MediNexus Ai is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </motion.div>
      </div>

      <div className='text-xl my-16 max-w-6xl mx-auto px-4'>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='text-gray-800 font-bold mb-8 flex items-center gap-2'
        >
          WHY <span className='text-primary'>CHOOSE US</span>
        </motion.p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            { title: 'Efficiency:', text: 'Streamlined appointment scheduling that fits into your busy lifestyle.', icon: <CheckCircle2 size={32} className='text-white' /> },
            { title: 'Convenience:', text: 'Access to a network of trusted healthcare professionals in your area.', icon: <Users size={32} className='text-white' /> },
            { title: 'Personalization:', text: 'Tailored recommendations and reminders to help you stay on top of your health.', icon: <Star size={32} className='text-white' /> }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className='border border-gray-200 rounded-2xl p-8 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-2'
            >
              <div className='w-12 h-12 bg-primary rounded-lg flex items-center justify-center group-hover:bg-white transition-colors duration-300'>
                {React.cloneElement(item.icon, { className: 'text-white group-hover:text-primary transition-colors duration-300' })}
              </div>
              <div>
                <b className='text-lg uppercase mb-2 block'>{item.title}</b>
                <p className='text-gray-500 group-hover:text-indigo-100 leading-relaxed'>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default About