import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Loader2, Video, Clock, DollarSign, Star, ShieldCheck } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorConsultDetails = () => {
    const { docId } = useParams()
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()
    const [doc, setDoc] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (doctors.length > 0) {
            const foundDoc = doctors.find(d => d._id === docId)
            if (foundDoc) {
                setDoc(foundDoc)
            } else {
                toast.error("Doctor not found")
                navigate('/video-consult')
            }
        }
    }, [doctors, docId, navigate])

    const handleStartCall = async () => {
        setLoading(true);
        try {
            const guestUserId = "guest_" + Math.floor(Math.random() * 100000);

            // Get Instant Slot
            const now = new Date();
            const slotDate = new Date(now).setHours(0, 0, 0, 0);
            const slotTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
            const { data } = await axios.post(`${backendUrl}/api/video-consult/book`, {
                userId: guestUserId,
                docId: doc._id,
                docName: doc.name,
                docImage: doc.image,
                docSpeciality: doc.speciality,
                slotDate,
                slotTime
            });

            if (data.success) {
                toast.success("Consultation Booked! Joining Room...");
                // Navigate to the video call room with the roomId
                navigate(`/video-call/${data.roomId}`, { state: { doctor: doc } })
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || "Failed to connect.");
        } finally {
            setLoading(false);
        }
    }

    if (!doc) return <div className='min-h-screen flex items-center justify-center'><Loader2 className='animate-spin' /></div>

    return (
        <div className='max-w-4xl mx-auto pt-10 px-4 min-h-screen'>
            <button onClick={() => navigate(-1)} className='text-gray-500 mb-6 hover:text-primary transition-colors'>&larr; Back to list</button>

            <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row'>
                {/* Doctor Image Section */}
                <div className='md:w-2/5 relative bg-indigo-50'>
                    <img src={doc.image} alt={doc.name} className='w-full h-full object-cover object-top' />
                    <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent'>
                        <div className='flex items-center gap-2 text-white font-medium'>
                            <span className='relative flex h-3 w-3'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                                <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                            </span>
                            Online Now
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className='md:w-3/5 p-8 flex flex-col'>
                    <div className='mb-6'>
                        <span className='bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide'>{doc.speciality}</span>
                        <h1 className='text-3xl font-bold text-gray-900 mt-2'>{doc.name}</h1>
                        <div className='flex items-center gap-2 mt-2 text-yellow-500'>
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <span className='text-gray-400 text-sm ml-1'>(128 Reviews)</span>
                        </div>
                    </div>

                    <div className='space-y-4 mb-8'>
                        <div className='flex items-center gap-3 text-gray-600'>
                            <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500'>
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-semibold'>Wait Time</p>
                                <p className='font-medium text-gray-900'>Less than 5 minutes</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 text-gray-600'>
                            <div className='w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500'>
                                <DollarSign size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-semibold'>Consultation Fee</p>
                                <p className='font-medium text-gray-900'>₹{(doc.fees || 50) + 400} / 10 min</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 text-gray-600'>
                            <div className='w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500'>
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-semibold'>Verified</p>
                                <p className='font-medium text-gray-900'>Certified Specialist</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-auto'>
                        <button
                            onClick={handleStartCall}
                            disabled={loading}
                            className='w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed'
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Video size={24} />}
                            Start Instant Video Call
                        </button>
                        <p className='text-center text-gray-400 text-xs mt-3'>Secure, HD video consultation. 100% private.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorConsultDetails
