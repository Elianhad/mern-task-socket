import { Link } from "react-router-dom";
import useProjectContext from '../hooks/useProjectContext';
import { IconTrash } from '@tabler/icons-react';
const ProjectPreview = ({ project }) => {
  const { deleteProject } = useProjectContext()
  const { name, client, _id } = project
  const styleButton = 'rounded-md shadow-rose-500 hover:shadow text-sm uppercase font-semibold mt-3 py-2 px-3'

  return (
    <div className='w-full p-3 bg-rose-100 rounded shadow flex flex-col justify-between sm:items-center sm:flex-row gap-3'>
      <div>
        <h3 className='text-orange-900'>{name}</h3>
        <p className='text-xs text-orange-600'>{ client }</p>
      </div>
      <div className='flex sm:gap-3 justify-evenly items-center'>
        <Link to={`${_id}`} state={project}  className={`${styleButton} text-violet-800`}>Ver</Link>
        <button className={`${styleButton} flex gap-1 text-red-500`}
          onClick={() => deleteProject(_id)}
          ><IconTrash />Eliminar</button>
      </div>
    </div>
  )
}

export default ProjectPreview
