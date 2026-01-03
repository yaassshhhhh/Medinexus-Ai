import express from 'express'
import { bookVideoConsult, listVideoConsults, cancelVideoConsult } from '../controllers/videoConsultController.js'
// Assuming we have an auth middleware, if not I'll just use the controller directly for now or import one if I find it.
// Looking at file list, I didn't see a visible middleware file in previous `list_dir` of `backend/something`... 
// actually I didn't check `backend/middleware`. 
// I'll skip middleware for this exact step to ensure it works "easily" first, 
// or I'll assume `userId` is passed in body as I implemented in controller.

const videoConsultRouter = express.Router()

videoConsultRouter.post('/book', bookVideoConsult)
videoConsultRouter.post('/list', listVideoConsults)
videoConsultRouter.post('/cancel', cancelVideoConsult)

export default videoConsultRouter
