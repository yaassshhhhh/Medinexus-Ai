import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import chatbotRouter from './routes/chatbotRoute.js';
import videoConsultRouter from './routes/videoConsultRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//  app config //
const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Adjust this for production
        methods: ["GET", "POST"]
    }
})

connectDB()
connectCloudinary()

// middlewares //
app.use(express.json())
app.use(cors())

// api endpoints //
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/chatbot', chatbotRouter)
app.use('/api/video-consult', videoConsultRouter)

import callModel from './models/callModel.js'

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('join-room', async (data) => {
        const { roomId, userId, receiverId } = data
        socket.join(roomId)
        console.log(`User ${socket.id} joined room: ${roomId}`)

        // Track session in DB if it doesn't exist
        try {
            const existingCall = await callModel.findOne({ roomId })
            if (!existingCall && userId && receiverId) {
                await callModel.create({
                    roomId,
                    callerId: userId,
                    receiverId,
                    participants: [userId],
                    status: 'ongoing'
                })
            } else if (existingCall && userId) {
                if (!existingCall.participants.includes(userId)) {
                    existingCall.participants.push(userId)
                    await existingCall.save()
                }
            }
        } catch (error) {
            console.error("DB Error saving call session:", error)
        }

        socket.to(roomId).emit('user-joined', socket.id)
    })

    socket.on('signal', (data) => {
        if (data.to) {
            io.to(data.to).emit('signal', {
                from: socket.id,
                signalData: data.signalData
            })
        } else {
            socket.to(data.roomId).emit('signal', {
                from: socket.id,
                signalData: data.signalData
            })
        }
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})

app.get('/', (req, res) => {
    res.send('API WORKING')
})

httpServer.listen(port, () => console.log("Server Started", port))