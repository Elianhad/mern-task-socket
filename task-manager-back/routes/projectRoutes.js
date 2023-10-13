import express from 'express'
import auth from '../middleware/Auth.js'
import { createProject, getAllProjects, getOneProject, editProject, deleteProject, addColaborator, deleteColaborator, searchColaboratorWithEmail } from '../controllers/ProjectController.js'
const router = express.Router()
// '/projects'
router.route('/').get(auth, getAllProjects).post(auth, createProject)
router.route('/:id').get(auth, getOneProject).put(auth, editProject).delete(auth, deleteProject)
router.post('/colaborator', auth, searchColaboratorWithEmail)
router.post('/colaborator/add/:id', auth, addColaborator)
router.post('/colaborator/del/:id', auth, deleteColaborator)

export default router
