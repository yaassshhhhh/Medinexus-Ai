import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Video, Mic, MicOff, VideoOff, PhoneOff, Loader2, Share2 } from 'lucide-react'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'

const VideoCallRoom = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    // Doctor details might be passed via state, or we fetch/show placeholder
    const doctor = location.state?.doctor || { name: 'Doctor', speciality: 'Specialist', image: '' }

    const [localStream, setLocalStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)
    const [callStatus, setCallStatus] = useState('Connecting...')
    const [isDemoMode, setIsDemoMode] = useState(false)

    const socketRef = useRef(null)
    const peerRef = useRef(null)
    const localVideoRef = useRef(null)
    const remoteVideoRef = useRef(null)

    const ICE_SERVERS = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    }

    // Reliable public CDN video for demo
    const DOCTOR_DEMO_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"

    useEffect(() => {
        if (!roomId) {
            toast.error("Invalid Room ID")
            navigate('/video-consult')
            return
        }

        const initCall = async () => {
            try {
                // 1. Get User Media
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                setLocalStream(stream)
                if (localVideoRef.current) localVideoRef.current.srcObject = stream

                // 2. Init Socket
                const socketUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
                socketRef.current = io(socketUrl)

                socketRef.current.emit('join-room', {
                    roomId: roomId,
                    userId: "guest_" + Math.floor(Math.random() * 1000),
                    receiverId: doctor._id || 'unknown_doc'
                })

                console.log(`Joined room: ${roomId} on ${socketUrl}`)

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

                // DEMO MODE CHECK
                // If specific fake room or timeout (optional, currently strictly using socket logic)
                // We keep the timeout for testing "no one joined" scenario
                setTimeout(() => {
                    if (!remoteStream && socketRef.current.connected) {
                        toast.info("Demo Mode: Doctor Connected (Simulated)")
                        setCallStatus('Connected (Dr. ' + doctor.name + ')')
                        setIsDemoMode(true)
                        setRemoteStream(new MediaStream()) // Dummy stream
                    }
                }, 5000);

            } catch (err) {
                console.error("Camera/Mic Error:", err)
                toast.error("Could not access camera/microphone.")
                setCallStatus('Connection Failed')
            }
        }

        initCall()

        return () => {
            if (localStream) localStream.getTracks().forEach(t => t.stop())
            if (socketRef.current) socketRef.current.disconnect()
            if (peerRef.current) peerRef.current.close()
        }
    }, [roomId, navigate])

    const createPeerConnection = (userId, stream, isOfferer) => {
        const pc = new RTCPeerConnection(ICE_SERVERS)
        peerRef.current = pc
        stream.getTracks().forEach(track => pc.addTrack(track, stream))

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('signal', {
                    roomId: roomId,
                    to: userId,
                    signalData: { type: 'candidate', candidate: event.candidate }
                })
            }
        }

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0])
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0]
            setCallStatus('Connected')
            setIsDemoMode(false) // Real user joined
        }

        if (isOfferer) {
            pc.createOffer().then(offer => {
                pc.setLocalDescription(offer)
                socketRef.current.emit('signal', {
                    roomId: roomId,
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
                roomId: roomId,
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

    const handleEndCall = () => {
        if (window.confirm("End consultation?")) {
            navigate('/video-consult')
        }
    }

    const copyJoiningLink = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link);
        toast.success("Meeting link copied to clipboard! Share it to invite others.");
    }

    return (
        <div className='fixed inset-0 z-50 bg-gray-900 overflow-hidden'>
            <div className='relative w-full h-full'>
                {/* Top Left Info & Copy Link */}
                <div className='absolute top-6 left-6 z-30 flex items-center gap-4'>
                    <div className='bg-black/40 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 border border-white/10'>
                        <div className='w-2 h-2 bg-green-500 rounded-full animate-ping'></div>
                        <span className='text-white text-sm font-mono'>00:12:45</span>
                    </div>

                    <button
                        onClick={copyJoiningLink}
                        className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all shadow-lg active:scale-95'
                    >
                        <Share2 size={16} />
                        Invite / Copy Link
                    </button>
                    <span className='text-white/50 text-xs hidden sm:inline'>{roomId}</span>
                </div>

                {/* Main Video Feed (Remote) */}
                <div className='absolute inset-0 flex items-center justify-center bg-black'>
                    {remoteStream ? (
                        <video
                            ref={(el) => {
                                remoteVideoRef.current = el
                                if (el && isDemoMode) el.srcObject = null
                            }}
                            key={isDemoMode ? "demo-video" : "real-video"}
                            autoPlay
                            playsInline
                            loop
                            muted={isDemoMode}
                            src={isDemoMode ? DOCTOR_DEMO_VIDEO : undefined}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className='flex flex-col items-center gap-6 animate-pulse'>
                            <div className='w-32 h-32 rounded-full border-4 border-gray-700 bg-gray-800 flex items-center justify-center overflow-hidden'>
                                {doctor.image ? <img src={doctor.image} className='w-full h-full object-cover' /> : <Loader2 className='animate-spin text-gray-500' size={40} />}
                            </div>
                            <div className='text-center'>
                                <h2 className='text-white text-2xl font-bold mb-2'>{callStatus}</h2>
                                <p className='text-gray-400'>Room ID: {roomId}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Self View (Pip) */}
                <motion.div
                    drag
                    dragConstraints={{ left: -window.innerWidth + 240, right: 0, top: 0, bottom: window.innerHeight - 180 }}
                    className='absolute top-6 right-6 w-40 h-56 sm:w-56 sm:h-40 bg-gray-900 rounded-2xl border-2 border-gray-700 shadow-2xl overflow-hidden z-20 cursor-move'
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
                            <VideoOff size={24} className="text-gray-500" />
                            <span className='text-[10px] text-gray-500 font-bold uppercase tracking-widest'>Off</span>
                        </div>
                    )}
                    <div className='absolute bottom-2 left-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white font-medium'>You</div>
                </motion.div>

                {/* Controls Bar */}
                <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-gray-900/80 backdrop-blur-md px-8 py-4 rounded-full border border-white/10 shadow-2xl z-30'>
                    <button onClick={toggleMute} className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button onClick={handleEndCall} className='p-5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-transform hover:scale-105 shadow-lg shadow-red-600/30'>
                        <PhoneOff size={32} />
                    </button>
                    <button onClick={toggleVideo} className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VideoCallRoom
