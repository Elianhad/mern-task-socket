import express from 'express'
import auth from '../middleware/Auth.js'
import {
  getOneTasks,
  createTask,
  modifyTask,
  deleteTask,
  changeState
} from '../controllers/TaskController.js'

const router = express.Router()

router.post('/', auth, createTask)
router.route('/:id').get(auth, getOneTasks).put(auth, modifyTask).delete(auth, deleteTask)
router.post('/status/:id', auth, changeState)
export default router
