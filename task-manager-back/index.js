import express from 'express'
import dotenv from 'dotenv'

import { connectDB } from './db.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/task', taskRoutes)
app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
