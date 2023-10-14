import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import configHeader from '../config/configHeader'
import { toast } from 'sonner'
const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [actualProject, setActualProject] = useState({})
  const [loading, setLoading] = useState(false)
  const [modalFormTask, setModalFormTask] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalColaborator, setModalColaborator] = useState(false)
  const [modalDeleteColaborator, setModalDeleteColaborator] = useState(false)
  const [actualTask, setActualTask] = useState({})
  const [colaborator, setColaborator] = useState({})
  const [searcherModal, setSearcherModal] = useState(false)
  const navigate = useNavigate()
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
      const { data } = await clienteAxios.post(
        '/projects',
        project,
        configHeader(token)
      )
      setProjects([...projects, data])
      toast.success('Proyecto creado correctamente')
    } catch (error) {
      console.error(error)
      toast.error(error?.response.data.msg)
    }
  }
  const editProject = async (project, token) => {
    try {
      const { data } = await clienteAxios.put(
        `/projects/${project.id}`,
        project,
        configHeader(token)
      )
      const projectsUpdate = projects.filter(
        (projectState) => projectState._id !== data._id
      )
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
      const { data } = await clienteAxios.delete(
        `/projects/${id}`,
        configHeader(token)
      )
      console.log(data)
      toast.success(data.msg)
    } catch (error) {
      console.log(error)
      if (error?.response.data.msg) return toast.error(error?.response.data.msg)
    }
    setProjects(projects.filter((p) => p._id !== id))
  }
  const getOneProject = async (id) => {
    setLoading(true)
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data } = await clienteAxios(
        `/projects/${id}`,
        configHeader(token)
      )
      setActualProject(data.project)
      setLoading(false)
    } catch (error) {
      console.log(error)
      navigate('/dashboard')
      if (error.response.data.msg) return toast.error(error.response.data.msg)
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
      const { data } = await clienteAxios.post(
        '/task',
        task,
        configHeader(token)
      )
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
      const { data } = await clienteAxios.put(
        `/task/${task.id}`,
        task,
        configHeader(token)
      )
      const updateProject = { ...actualProject }
      updateProject.tasks = updateProject.tasks.map((t) =>
        t._id === data._id ? data : t
      )
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
      const { data } = await clienteAxios.delete(
        `/task/${actualTask._id}`,
        configHeader(token)
      )
      const updateProject = { ...actualProject }
      updateProject.tasks = updateProject.tasks.filter(
        (t) => t._id !== actualTask._id
      )
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
  const handleModalColaborator = () => {
    setModalColaborator(!modalColaborator)
  }
  const searchColaborator = async (email) => {
    const token = localStorage.getItem('token')
    try {
      const { data } = await clienteAxios.post(
        '/projects/colaborator',
        { email },
        configHeader(token)
      )
      setColaborator(data)
    } catch (error) {
      console.error(error.response)
      toast.error(error?.response?.data.msg)
    }
  }
  const addColaborator = async (email) => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data } = await clienteAxios.post(
        `/projects/colaborator/add/${actualProject._id}`,
        email,
        configHeader(token)
      )
      const updateProject = { ...actualProject }
      updateProject.collaborators =
        updateProject.collaborators.push(colaborator)
      setActualProject(updateProject)
      toast.success('Colaborador agregado')
      setColaborator({})
      handleModalColaborator()
    } catch (error) {
      console.error(error.response)
      toast.error(error?.response?.data.msg)
    }
  }
  const deleteColaborator = async () => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data } = await clienteAxios.post(
        `/projects/colaborator/del/${actualProject._id}`,
        { email: colaborator.email },
        configHeader(token)
      )
      toast.success(data.msg)
      const projectUpdate = { ...actualProject }
      projectUpdate.collaborators = projectUpdate.collaborators.filter(
        (col) => col._id !== colaborator._id
      )
      setActualProject(projectUpdate)
      setColaborator({})
      handleModalDeleteCol()
    } catch (error) {
      console.error(error.response)
      toast.error(error?.response?.data.msg)
    }
  }
  const handleModalDeleteCol = (colaborator) => {
    if (colaborator) setColaborator(colaborator)
    setModalDeleteColaborator(!modalDeleteColaborator)
  }
  const completeTask = async (id) => {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data } = await clienteAxios.post(
        `/task/status/${id}`,
        actualTask,
        configHeader(token)
      )
      const updateProject = { ...actualProject }
      updateProject.tasks = updateProject.tasks.map((task) =>
        task._id === data._id ? data : task
      )
      setActualProject(updateProject)
      toast.success('Estado cambiado')
    } catch (error) {
      console.log(error?.response)
      if (error?.response?.data.msg) toast.error(error?.response?.data.msg)
    }
  }
  const handleModalSearcher = () => {
    console.log('buscar')
    setSearcherModal(!searcherModal)
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchProjects = async () => {
      try {
        const { data } = await clienteAxios('/projects', configHeader(token))
        setProjects(data)
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
        modalColaborator,
        modalDelete,
        modalDeleteColaborator,
        actualTask,
        colaborator,
        searcherModal,
        handleModalTask,
        handleModalColaborator,
        handleModalDelete,
        handleModalDeleteCol,
        saveProject,
        deleteProject,
        getOneProject,
        saveTask,
        setActualTask,
        deleteTask,
        searchColaborator,
        addColaborator,
        deleteColaborator,
        completeTask,
        handleModalSearcher
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export { ProjectProvider }
export default ProjectContext
