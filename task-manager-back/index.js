import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './db.js'
import { Server, Socket } from 'socket.io'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()
connectDB()
// config CORS
const whiteList = [process.env.FRONT_URL]
const optionCors = {
  origin: whiteList,
  credential: true
}

const app = express()
app.use(cors(optionCors))
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/task', taskRoutes)
const nodeServer = app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

// socket io
const io = new Server(nodeServer, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONT_URL
  }
})
io.on('connection', (socket) => {
  console.log('conectado con socketio')
  // definir eventos de socket io
})
