import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios'
import configHeader from '../config/configHeader'
import { toast } from 'sonner';
const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])

  const saveProject = async (project) => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return 
      const { data } = await clienteAxios.post('/projects', project, configHeader(token))
      setProjects([...projects, data])
      toast.success('Proyecto creado correctamente')
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
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const { data } = await clienteAxios(`/projects/${id}`, configHeader(token))
      return data
    } catch (error) {
      console.log(error)
      if(error.response.data.msg) return toast.error(error.response.data.msg)
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
        saveProject,
        deleteProject,
        getOneProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export { ProjectProvider }
export default ProjectContext