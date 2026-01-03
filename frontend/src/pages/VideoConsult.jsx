import React, { useContext, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Phone, Mic, MicOff, VideoOff, PhoneOff, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { io } from 'socket.io-client'
import { AppContext } from '../context/AppContext'

const VideoConsult = () => {
    const { doctors } = useContext(AppContext)
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [isCallActive, setIsCallActive] = useState(false)
    const [loading, setLoading] = useState(false)

    const getInstantSlot = () => {
        const now = new Date();
        const slotDate = new Date(now).setHours(0, 0, 0, 0);
        const slotTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { slotDate, slotTime };
    }

    const handleStartCall = async (doc) => {
        setLoading(true);
        try {
            const guestUserId = "guest_" + Math.floor(Math.random() * 100000);
            const { slotDate, slotTime } = getInstantSlot();

            const { data } = await axios.post('http://localhost:4000/api/video-consult/book', {
                userId: guestUserId,
                docId: doc._id,
                docName: doc.name,
                docImage: doc.image,
                docSpeciality: doc.speciality,
                slotDate,
                slotTime
            });

            if (data.success) {
                toast.success("Consultation Booked! Establishing Secure Connection...");
                setSelectedDoc({ ...doc, roomId: data.roomId });
                setIsCallActive(true);
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

    const handleEndCall = () => {
        setIsCallActive(false)
        setSelectedDoc(null)
    }

    return (
        <div className='pt-10 min-h-screen'>
            {!isCallActive ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='flex flex-col gap-4'
                >
                    <div className='text-center mb-10'>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent inline-block mb-4'>
                            Instant Video Consultation
                        </h1>
                        <p className='text-gray-600'>Connect with top specialists comfortably from your home.</p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 gap-y-8 px-3 sm:px-0'>
                        {doctors.map((doc, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className='border border-indigo-100 rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:shadow-2xl bg-white group shadow-sm'
                            >
                                <div className='relative bg-indigo-50'>
                                    <img className='w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500' src={doc.image} alt="" />
                                    <div className='absolute bottom-3 right-3 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20 backdrop-blur-sm'>
                                        <span className='w-2 h-2 bg-white rounded-full animate-pulse'></span> Available
                                    </div>
                                </div>
                                <div className='p-5'>
                                    <div className='flex items-center gap-2 text-sm font-medium text-green-500 mb-2'>
                                        <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Online Now</p>
                                    </div>
                                    <h3 className='text-gray-900 text-lg font-bold group-hover:text-primary transition-colors'>{doc.name}</h3>
                                    <p className='text-gray-600 text-sm mb-4'>{doc.speciality}</p>
                                    <button
                                        onClick={() => handleStartCall(doc)}
                                        disabled={loading}
                                        className='w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all font-semibold shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-95'
                                    >
                                        {loading && selectedDoc?._id === doc._id ? <Loader2 className="animate-spin" size={18} /> : <Video size={18} />}
                                        Consult Now
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <CallInterface doctor={selectedDoc} onEndCall={handleEndCall} />
            )}
        </div>
    )
}

const CallInterface = ({ doctor, onEndCall }) => {
    const [localStream, setLocalStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [callStatus, setCallStatus] = useState('Connecting...')

    const socketRef = useRef(null)
    const peerRef = useRef(null)
    const localVideoRef = useRef(null)
    const remoteVideoRef = useRef(null)

    const ICE_SERVERS = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    }

    useEffect(() => {
        const initCall = async () => {
            try {
                // 1. Get User Media
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                setLocalStream(stream)
                if (localVideoRef.current) localVideoRef.current.srcObject = stream

                // 2. Init Socket
                socketRef.current = io('http://localhost:4000')
                socketRef.current.emit('join-room', {
                    roomId: doctor.roomId,
                    userId: "guest_" + Math.floor(Math.random() * 1000), // In prod, use real ID
                    receiverId: doctor._id
                })

                // 3. Handle Signaling
                socketRef.current.on('user-joined', (userId) => {
                    setCallStatus('User Joined...')
                    createPeerConnection(userId, stream, true)
                })

                socketRef.current.on('signal', (data) => {
                    handleSignalingData(data, stream)
                })

                socketRef.current.on('disconnect-user', () => {
                    setRemoteStream(null)
                    setCallStatus('Waiting for Doctor...')
                })

            } catch (err) {
                console.error("Camera/Mic Error:", err)
                toast.error("Could not access camera/microphone.")
            }
        }

        initCall()

        return () => {
            if (localStream) localStream.getTracks().forEach(t => t.stop())
            if (socketRef.current) socketRef.current.disconnect()
            if (peerRef.current) peerRef.current.close()
        }
    }, [])

    const createPeerConnection = (userId, stream, isOfferer) => {
        const pc = new RTCPeerConnection(ICE_SERVERS)
        peerRef.current = pc

        stream.getTracks().forEach(track => pc.addTrack(track, stream))

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('signal', {
                    roomId: doctor.roomId,
                    to: userId,
                    signalData: { type: 'candidate', candidate: event.candidate }
                })
            }
        }

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0])
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0]
            setCallStatus('Connected')
        }

        if (isOfferer) {
            pc.createOffer().then(offer => {
                pc.setLocalDescription(offer)
                socketRef.current.emit('signal', {
                    roomId: doctor.roomId,
                    to: userId,
                    signalData: offer
                })
            })
        }

        return pc
    }

    const handleSignalingData = async (data, stream) => {
        const { from, signalData } = data

        if (signalData.type === 'offer') {
            const pc = createPeerConnection(from, stream, false)
            await pc.setRemoteDescription(new RTCSessionDescription(signalData))
            const answer = await pc.createAnswer()
            await pc.setLocalDescription(answer)
            socketRef.current.emit('signal', {
                roomId: doctor.roomId,
                to: from,
                signalData: answer
            })
        } else if (signalData.type === 'answer') {
            await peerRef.current.setRemoteDescription(new RTCSessionDescription(signalData))
        } else if (signalData.type === 'candidate') {
            try {
                await peerRef.current.addIceCandidate(new RTCIceCandidate(signalData.candidate))
            } catch (e) {
                console.error("Error adding ice candidate", e)
            }
        }
    }

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled
            setIsMuted(!isMuted)
        }
    }

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled = !localStream.getVideoTracks()[0].enabled
            setIsVideoOff(!isVideoOff)
        }
    }

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='fixed inset-0 z-50 bg-gray-900 flex items-center justify-center p-4'
        >
            <div className='w-full max-w-5xl bg-gray-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative aspect-video border border-gray-700'>
                {/* Main Video Feed (Remote) */}
                <div className='absolute inset-0 bg-gray-900 flex items-center justify-center'>
                    {remoteStream ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className='flex flex-col items-center gap-6'>
                            <div className='relative'>
                                <div className='w-32 h-32 rounded-full border-4 border-primary/30 p-1 animate-pulse flex items-center justify-center'>
                                    <div className='w-28 h-28 rounded-full border-4 border-primary overflow-hidden'>
                                        <img src={doctor.image} alt="" className='w-full h-full object-cover' />
                                    </div>
                                </div>
                                <div className='absolute -bottom-2 -right-2 bg-primary rounded-full p-2 text-white'>
                                    <Loader2 className='animate-spin' size={20} />
                                </div>
                            </div>
                            <div className='text-center'>
                                <h2 className='text-white text-2xl font-bold mb-2'>{callStatus}</h2>
                                <p className='text-gray-400'>Medical ID: {doctor.roomId}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Self View (Pip) */}
                <motion.div
                    drag
                    dragConstraints={{ left: -800, right: 0, top: 0, bottom: 400 }}
                    className='absolute top-6 right-6 w-56 h-40 bg-gray-900 rounded-2xl border-2 border-gray-700 shadow-2xl overflow-hidden z-20 cursor-move'
                >
                    {localStream && !isVideoOff ? (
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <div className='w-full h-full bg-gray-800 flex items-center justify-center flex-col gap-2'>
                            <div className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-500'>
                                <VideoOff size={24} />
                            </div>
                            <span className='text-[10px] text-gray-500 font-bold uppercase tracking-widest'>Camera Off</span>
                        </div>
                    )}
                    <div className='absolute bottom-2 left-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-medium'>
                        You
                    </div>
                </motion.div>

                {/* Info Overlay */}
                <div className='absolute top-6 left-6 z-20 flex flex-col gap-2'>
                    <div className='bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-white/10'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-ping'></div>
                        <span className='text-white text-sm font-mono'>00:12:45</span>
                    </div>
                    {remoteStream && (
                        <div className='bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/30'>
                            <p className='text-xs text-primary font-bold'>{doctor.name} - {doctor.speciality}</p>
                        </div>
                    )}
                </div>

                {/* Controls Bar */}
                <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-gray-900/90 backdrop-blur-xl px-10 py-5 rounded-[2.5rem] border border-white/10 shadow-2xl z-30'>
                    <button
                        onClick={toggleMute}
                        className={`p-4 rounded-full transition-all duration-300 ${isMuted ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    <button
                        onClick={onEndCall}
                        className='p-5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-xl shadow-red-500/40 hover:scale-110 active:scale-95 px-10'
                    >
                        <PhoneOff size={28} />
                    </button>

                    <button
                        onClick={toggleVideo}
                        className={`p-4 rounded-full transition-all duration-300 ${isVideoOff ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                    >
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                </div>

                {/* Decorative gradients */}
                <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none'></div>
                <div className='absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/80 to-transparent pointer-events-none'></div>
            </div>
        </motion.div>
    )
}

export default VideoConsult

