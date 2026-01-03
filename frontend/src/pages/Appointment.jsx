import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from './../context/AppContext';
import { assets } from './../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Clock, Calendar } from 'lucide-react';

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WEd', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //setting end time of the date with index
      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        //add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))

    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className='pb-20'>
      {/* -----------------Doctor Details-------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col sm:flex-row gap-4'
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='w-full sm:max-w-72'
        >
          <img className='bg-primary w-full rounded-2xl shadow-lg' src={docInfo.image} alt="" />
        </motion.div>

        <div className='flex-1 border border-indigo-100 rounded-2xl p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-sm relative z-10'>
          {/* ------------- Doc Info : name, degree, experience ---------- */}
          <p className='flex items-center gap-2 text-2xl font-bold text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 font-medium'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className='py-0.5 px-3 border border-gray-200 text-xs rounded-full bg-gray-50 uppercase tracking-wide'>{docInfo.experience}</span>
          </div>

          {/*--------------- Doctor About --------------- */}
          <div className='mt-6'>
            <p className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
              About <Info size={16} className="text-primary" />
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-2 leading-relaxed tracking-wide'>{docInfo.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-6'>
            Appointment fee : <span className='text-gray-900 font-bold text-lg'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </motion.div>

      {/* ------------Booking slots------------ */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700'>
        <p className='flex items-center gap-2 text-xl font-bold text-gray-800'>
          <Calendar className="text-primary" size={24} /> Available Slots
        </p>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-6 pb-2 scrollbar-hide'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-2xl cursor-pointer transition-colors duration-300 ${slotIndex === index ? 'bg-primary text-white shadow-lg shadow-indigo-200' : 'border border-gray-200 hover:border-primary/50'}`}
                key={index}
              >
                <p className='text-xs font-semibold uppercase'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className='text-xl font-bold'>{item[0] && item[0].datetime.getDate()}</p>
              </motion.div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-6 pb-4 scrollbar-hide flex-wrap'>
          <AnimatePresence mode='wait'>
            {docSlots.length && docSlots[slotIndex].map((item, index) => (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-medium flex-shrink-0 px-5 py-2.5 rounded-full cursor-pointer transition-all ${item.time === slotTime ? 'bg-primary text-white shadow-md' : 'text-gray-600 border border-gray-200 hover:border-primary'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <div className='mt-8 flex items-center gap-4'>
          <button className='bg-primary text-white text-sm font-bold px-14 py-4 rounded-full shadow-lg shadow-indigo-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2'>
            Book Appointment <Clock size={18} />
          </button>
          {slotTime && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className='text-green-600 text-sm font-medium flex items-center gap-1'
            >
              <Check size={16} /> Selected: {docSlots[slotIndex][0].datetime.toDateString()} at {slotTime}
            </motion.p>
          )}
        </div>
      </div>

      {/*----------Listing Related Doctors----------- */}
      <div className='mt-20'>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment