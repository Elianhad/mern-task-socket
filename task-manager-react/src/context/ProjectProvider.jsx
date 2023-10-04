import { createContext, useState } from 'react';

const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {
  const [ projects, setProjects ] = useState([])

  return (
    <ProjectContext.Provider
      value={{
        projects
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
export { ProjectProvider }
export default ProjectContext