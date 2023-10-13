import Project from '../models/Project.js'
import User from '../models/User.js'

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
  const projects = await Project.find({
    $or: [
      { collaborators: { $in: req.user } },
      { creator: { $in: req.user } }
    ]
  })
  res.json(projects)
}
const getOneProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await Project.findById(id).populate({ path: 'tasks', populate: { path: 'completedBy', select: 'name' } }).populate('collaborators', 'name email')
    if (!project) {
      const error = new Error('El proyecto no existe')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator._id.toString() !== req.user._id.toString() && !project.collaborators.some(col => col._id.toString() === req.user._id.toString())) {
      const error = new Error('Accion no valida')
      return res.status(401).json({ msg: error.message })
    }
    res.json({
      project
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
const searchColaboratorWithEmail = async (req, res) => {
  const { email } = req.body
  const userColaborator = await User.findOne({ email }).select('-confirmed -createdAt -password -token -updatedAt -__v')
  if (!userColaborator) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({ msg: error.message })
  }
  res.json(userColaborator)
}
const addColaborator = async (req, res) => {
  const idProject = req.params.id
  const { email } = req.body
  const projectToAdd = await Project.findById(idProject)
  if (projectToAdd.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida')
    return res.status(403).json({ msg: error.message })
  }
  if (!projectToAdd) {
    const error = new Error('Proyecto no encontrado')
    return res.status(404).json({ msg: error.message })
  }
  const userColaborator = await User.findOne({ email })
  if (projectToAdd.creator.toString() === userColaborator._id.toString()) {
    const error = new Error('El creador del proyecto no puede ser colaborador')
    return res.status(403).json({ msg: error.message })
  }
  if (projectToAdd.collaborators.includes(userColaborator._id)) {
    const error = new Error('El usuario ya es colaborador')
    return res.status(403).json({ msg: error.message })
  }
  try {
    projectToAdd.collaborators.push(userColaborator._id)
    await projectToAdd.save()
    res.json({ msg: 'Colaborador agregado correctamente' })
  } catch (error) {
    console.error(error)
    return res.json({ msg: 'Hubo un error al agregar el colaborador' })
  }
}
const deleteColaborator = async (req, res) => {
  const project = await Project.findById(req.params.id)
  const { email } = req.body
  console.log(project)
  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Acción no válida')
    return res.status(403).json({ msg: error.message })
  }
  if (!project) {
    const error = new Error('Proyecto no encontrado')
    return res.status(404).json({ msg: error.message })
  }
  const userColaborator = await User.findOne({ email })
  project.collaborators.pull(userColaborator._id)
  try {
    await project.save()
    res.json({ msg: 'Colaborador eliminado correctamente' })
  } catch (error) {
    console.log(error)
    return res.json({ msg: 'Hubo un error al tratar de eliminar el colaborador' })
  }
}

export {
  createProject,
  getAllProjects,
  getOneProject,
  editProject,
  deleteProject,
  addColaborator,
  deleteColaborator,
  searchColaboratorWithEmail
}
