import { useParams } from 'react-router-dom'


const Project = () => {
  const params = useParams()
  const { id } = params
  
  return (
    <div>Project</div>
  )
}

export default Project