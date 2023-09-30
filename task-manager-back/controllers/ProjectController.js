import Project from '../models/Project.js'
import Task from '../models/Task.js'

const createProject = async (req, res) => {
  const project = new Project(req.body)
  project.creator = req.user._id
  try {
    const saveProject = await project.save()
    res.json(saveProject)
  } catch (er) {
    console.log(er)
    const error = new Error('Hubo un error')
    res.json({ msg: error.message })
  }
}
const getAllProjects = async (req, res) => {
  const projects = await Project.find().where('creator').equals(req.user)
  res.json(projects)
}
const getOneProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.findById(id)
    if (!project) {
      const error = new Error('El proyecto no existe')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator._id.toString() !== req.user._id.toString()) {
      const error = new Error('Accion no valida')
      return res.status(401).json({ msg: error.message })
    }
    const task = await Task.find().where('project').equals(project._id)
    console.log(task)
    res.json({
      project,
      task
    })
  } catch (error) {
    console.log(error)
    res.json({ msg: 'Hubo un error' })
  }
}
const editProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.findById(id)
    if (!project) {
      const error = new Error('El proyecto no existe')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator._id.toString() !== req.user._id.toString()) {
      const error = new Error('Accion no valida')
      return res.status(401).json({ msg: error.message })
    }
    project.name = req.body.name || project.name
    project.client = req.body.client || project.client
    project.description = req.body.description || project.description
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate

    const saveProject = await project.save()
    res.json(saveProject)
  } catch (error) {
    console.log(error)
    res.json({ msg: 'Hubo un error' })
  }
}
const deleteProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.findById(id)
    if (!project) {
      const error = new Error('El proyecto no existe')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator._id.toString() !== req.user._id.toString()) {
      const error = new Error('Accion no valida')
      return res.status(401).json({ msg: error.message })
    }
    await project.deleteOne()
    res.json({ msg: 'Proyecto eliminado' })
  } catch (error) {
    console.log(error)
    res.json({ msg: 'Hubo un error' })
  }
}
const getTasks = async (req, res) => {}
const addColaborator = async (req, res) => {}
const deleteColaborator = async (req, res) => {}

export {
  createProject,
  getAllProjects,
  getOneProject,
  editProject,
  deleteProject,
  getTasks,
  addColaborator,
  deleteColaborator
}
