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
const serverNode = app.listen(3000, () => {
})

// socket io
const io = new Server(serverNode, {
  pingTimeout: 60000,
  cors: optionCors
})
io.on('connection', (socket) => {
  socket.on('connect to proyect', (project) => {
    socket.join(project)
  })
  socket.on('Add task', (task) => {
    socket.to(task.project).emit('added task', task)
  })
  socket.on('delete task', (task) => {
    socket.to(task.project).emit('deleted task', task)
  })
  socket.on('update task', task => {
    socket.to(task.project._id).emit('updated task', task)
  })
  socket.on('change state', task => {
    socket.to(task.project._id).emit('changed state', task)
  })
})
