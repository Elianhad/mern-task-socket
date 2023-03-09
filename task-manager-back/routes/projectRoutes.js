import express from 'express'
import auth from '../middleware/Auth.js'
import { createProject, getAllProjects, getOneProject, editProject, deleteProject, getTasks, addColaborator, deleteColaborator } from '../controllers/ProjectController.js'
const router = express.Router()

router.route('/').get(auth, getAllProjects).post(auth, createProject)
router.route('/:id').get(auth, getOneProject).put(auth, editProject).delete(auth, deleteProject)
router.get('/tasks/:id', auth, getTasks)
router.post('/addcol/:id', auth, addColaborator)
router.post('/addcol/:id', auth, deleteColaborator)

export default router
