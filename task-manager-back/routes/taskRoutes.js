import express from 'express'
import auth from '../middleware/Auth.js'
import {
  getOneTasks,
  createTask,
  modifyTask,
  deleteTask
} from '../controllers/TaskController.js'

const router = express.Router()

router.post('/', auth, createTask)
router.route('/:id').get(auth, getOneTasks).put(auth, modifyTask).delete(auth, deleteTask)

export default router
