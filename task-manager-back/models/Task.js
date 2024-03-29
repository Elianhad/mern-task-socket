import mongoose from 'mongoose'

const TaskScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: Boolean,
    default: false
  },
  deliveryDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  priority: {
    type: String,
    required: true,
    enum: ['Baja', 'Media', 'Alta']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamp: true
})

const Task = mongoose.model('Task', TaskScheme)

export default Task
