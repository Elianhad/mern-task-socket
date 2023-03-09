import Task from '../models/Task.js'
import Project from '../models/Project.js'

const getOneTasks = async (req, res) => {
  const { id } = req.params
  try {
    const isTask = await Task.findById(id).populate('project')
    const isTaskOwner = isTask.project.creator.toString() === req.user._id.toString()
    if (!isTaskOwner) {
      const error = new Error('Accion no valida')
      return res.status(403).json({ msg: error.message })
    }
    res.json(isTask)
  } catch (error) {
    const err = new Error('No se encuentra la tarea')
    res.status(404).json({ msg: err.message })
  }
}
const createTask = async (req, res) => {
  const { project } = req.body
  try {
    try {
      const thereProject = await Project.findById(project)

      if (thereProject.creator._id.toString() !== req.user._id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(401).json({ msg: error.message })
      }
    } catch (error) {
      const err = new Error('El proyecto no existe')
      return res.status(404).json({ msg: err.message })
    }
    const saveTask = await Task.create(req.body)
    res.json(saveTask)
  } catch (err) {
    const error = new Error('Hubo un error')
    res.json({ msg: error.message })
  }
}

const modifyTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findById(id).populate('project')
    const isTaskOwner = task.project.creator.toString() === req.user._id.toString()
    if (!isTaskOwner) {
      const error = new Error('Accion no valida')
      return res.status(403).json({ msg: error.message })
    }
    task.name = req.body.name || task.name
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.deliveryDate = req.body.deliveryDate || task.deliveryDate
    const saveTask = await task.save()
    res.json(saveTask)
  } catch (error) {
    const err = new Error('No se encuentra la tarea')
    res.status(404).json({ msg: err.message })
  }
}
const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const isTask = await Task.findById(id).populate('project')
    const isTaskOwner = isTask.project.creator.toString() === req.user._id.toString()
    if (!isTaskOwner) {
      const error = new Error('Accion no valida')
      return res.status(403).json({ msg: error.message })
    }
    await isTask.deleteOne()
    res.json({ msg: 'Tarea eliminada' })
  } catch (error) {
    const err = new Error('No se encuentra la tarea')
    res.status(404).json({ msg: err.message })
  }
}
const changeState = async (req, res) => {

}

export {
  getOneTasks,
  createTask,
  modifyTask,
  deleteTask,
  changeState
}
