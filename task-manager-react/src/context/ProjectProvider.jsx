import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios'
import configHeader from '../config/configHeader'
import { toast } from 'sonner';
const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [actualProject, setActualProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [modalFormTask, setModalFormTask] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [actualTask, setActualTask] = useState({})
  const saveProject = async (project) => {
    const token = localStorage.getItem('token')
    if (!token) return toast.error('No se encuentra autenticado')
    if (project.id) {
      console.log('editando ')
      editProject(project, token)
    } else {
      saveOnePoject(project, token)
    }
  }
  const saveOnePoject = async (project, token) => {
    try {
      const { data } = await clienteAxios.post('/projects', project, configHeader(token))
      setProjects([...projects, data])
      toast.success('Proyecto creado correctamente')
    } catch (error) {
      console.error(error)
      toast.error(error?.response.data.msg)
    }
  }
  const editProject = async (project, token) => {
    try {
      const { data } = await clienteAxios.put(`/projects/${project.id}`, project, configHeader(token))
      const projectsUpdate = projects.filter(projectState => projectState._id !== data._id)
      setProjects([...projectsUpdate, data])
      toast.success('Proyecto editado correctamente')
    } catch (error) {
      console.error(error)
      toast.error(error?.response.data.msg)
    }
  }
  const deleteProject = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return 
    try {
      const { data } = await clienteAxios.delete(`/projects/${id}`, configHeader(token))
      console.log(data)
      toast.success(data.msg)
    } catch (error) {
      console.log(error)
      if (error?.response.data.msg) return toast.error(error?.response.data.msg)
    }
    setProjects(projects.filter( p => p._id !== id))
  }
  const getOneProject = async id => {
    setLoading(true)
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data } = await clienteAxios(`/projects/${id}`, configHeader(token))
      setActualProject(data.project)

      setLoading(false)
    } catch (error) {
      console.log(error)
      if(error.response.data.msg) return toast.error(error.response.data.msg)
    }
  }
  const handleModalTask = () => {
    setActualTask({})
    setModalFormTask(!modalFormTask)
  }
  const saveTask = async (task) => {
    const token = localStorage.getItem('token')
    if (task?.id) {
      return await updateTask(task, token)
    }
    await saveNewTask(task, token)

  }
  const saveNewTask = async (task, token) => {
    try {
      const { data } = await clienteAxios.post('/task', task, configHeader(token))
      const updateProject = { ...actualProject }
      updateProject.tasks = [...updateProject.tasks, data]
      setActualProject(updateProject)
      toast.success('Tarea creada')
    } catch (error) {
      console.log(error)
      if (error?.response.data.msg) toast.error(error.response.data.msg)
    }
  }
  const updateTask = async (task, token) => {
    try {
      const { data } = await clienteAxios.put(`/task/${task.id}`, task, configHeader(token))
      const updateProject = { ...actualProject }
      updateProject.tasks = updateProject.tasks.map(t => t._id === data._id ? data : t)
      setActualProject(updateProject)
      toast.success('Tarea editada')
    } catch (error) {
      console.log(error)
      if (error?.response.data.msg) toast.error(error?.response.data.msg)
    }
  }
  const handleModalDelete = () => {
    setModalDelete(!modalDelete)
  }
  const deleteTask = async () => {
    const token = localStorage.getItem('token')
    try {
      const { data } = await clienteAxios.delete(`/task/${actualTask._id}`, configHeader(token))
      const updateProject = { ...actualProject }
      updateProject.tasks = updateProject.tasks.filter(t => t._id !== actualTask._id)
      setActualProject(updateProject)
      handleModalDelete()
      setActualTask({})
      toast.success(data.msg)
    } catch (error) {
      console.log(error)
      if (error?.response.data.msg) {
        toast.error(error?.response.data.msg)
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchProjects = async () => {
      try {
        const { data } = await clienteAxios('/projects', configHeader(token))
        setProjects(data);
      } catch (error) {
        console.error(error)
        toast.error(error.response.data.msg)
      }
    }
    fetchProjects()
  }, [])

  return (
    <ProjectContext.Provider
      value={{
        projects,
        actualProject,
        loading,
        modalFormTask,
        actualTask,
        modalDelete,
        handleModalTask,
        handleModalDelete,
        saveProject,
        deleteProject,
        getOneProject,
        saveTask,
        setActualTask,
        setActualTask,
        deleteTask
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export { ProjectProvider }
export default ProjectContext