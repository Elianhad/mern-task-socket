import mongoose from 'mongoose';

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
    enum: ['Low', 'Middle', 'High']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }

}, {
  timestamp: true
})

const Task = mongoose.model('Task', TaskScheme)

export default Task
