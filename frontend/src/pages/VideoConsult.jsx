import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Video, Loader2, ArrowRight } from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const VideoConsult = () => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    return (
        <div className='pt-10 min-h-screen'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'
            >
                <div className='text-center mb-16 max-w-3xl mx-auto'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4 tracking-tight'>
                        Instant Video Consultation
                    </h1>
                    <p className='text-lg text-gray-500 leading-relaxed font-light'>
                        Skip the waiting room. Connect with top certified specialists in minutes for expert medical advice, prescriptions, and peace of mind.
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {doctors.map((doc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => navigate(`/doctor-consult/${doc._id}`)}
                            className='bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 cursor-pointer transition-all duration-300 group flex flex-col'
                        >
                            <div className='relative h-64 bg-slate-50 overflow-hidden'>
                                <img
                                    className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700'
                                    src={doc.image}
                                    alt={doc.name}
                                />
                                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12'>
                                    <div className='flex items-center gap-2 text-white/90 text-sm font-medium'>
                                        <span className='relative flex h-2.5 w-2.5'>
                                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                                            <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500'></span>
                                        </span>
                                        Online Now
                                    </div>
                                </div>
                            </div>

                            <div className='p-5 flex-1 flex flex-col'>
                                <div className='mb-4'>
                                    <h3 className='text-gray-900 text-lg font-bold truncate leading-tight'>{doc.name}</h3>
                                    <p className='text-indigo-600 font-medium text-sm'>{doc.speciality}</p>
                                </div>

                                <div className='space-y-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-500 flex items-center gap-2'>
                                            <Loader2 size={14} className='text-indigo-500' /> Wait time
                                        </span>
                                        <span className='font-semibold text-gray-700'>
                                            {index % 2 === 0 ? '3-5 min' : '8-12 min'}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-500 flex items-center gap-2'>
                                            <div className='w-3.5 h-3.5 rounded-full border border-indigo-500 flex items-center justify-center text-[10px] font-serif'>₹</div>
                                            Consultation
                                        </span>
                                        <span className='font-semibold text-gray-700'>₹{(doc.fees || 50) + 400} / 10 min</span>
                                    </div>
                                    <div className='flex items-center justify-between text-xs'>
                                        <span className='text-gray-400'>Queue</span>
                                        <span className='text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium'>
                                            {Math.floor(Math.random() * 4) + 1} patients
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className='mt-auto w-full bg-indigo-50 text-indigo-700 py-3.5 rounded-xl flex items-center justify-center gap-2.5 hover:bg-indigo-100 transition-all font-semibold active:scale-[0.98]'
                                >
                                    <Video size={18} />
                                    View Profile
                                    <ArrowRight size={16} className='opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300' />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default VideoConsult
