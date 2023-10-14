import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './db.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { Server } from 'socket.io'

dotenv.config()
connectDB()
// config CORS
const whiteList = [process.env.FRONT_URL, 'http://localhost:5173']
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
const serverNode = app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

// socket io
const io = new Server(serverNode, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173'
  }
})
io.on('connection', (socket) => {
  console.log('conectado a socket')
})
