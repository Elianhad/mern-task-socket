import { Link } from "react-router-dom";
import useProjectContext from '../hooks/useProjectContext';
import { IconTrash } from '@tabler/icons-react';
import useAuthContext from '../hooks/useAuthContext'
const ProjectPreview = ({ project }) => {
  const { deleteProject } = useProjectContext()
  const { name, client, _id, creator } = project
  const { auth } = useAuthContext()

  const styleButton =
    'rounded-md shadow-rose-500 hover:shadow text-sm uppercase font-semibold mt-3 py-2 px-3'

  return (
    <div className='w-full pt-6 pb-2 px-4 bg-rose-100 rounded shadow flex flex-col justify-between sm:items-center sm:flex-row gap-3 relative'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-orange-900 text-xl'>{name}</h3>
        <p className='text-sm text-orange-600'>{client}</p>
        {creator !== auth._id && (
          <p className='absolute top-1 right-1 p-1 bg-orange-400 text-violet-900 font-thin text-sm rounded-md'>
            Colaborador
          </p>
        )}
      </div>
      <div className='flex sm:gap-3 justify-evenly items-center'>
        <Link
          to={`${_id}`}
          state={project}
          className={`${styleButton} text-violet-800`}
        >
          Ver
        </Link>
        <button
          className={`${styleButton} flex gap-1 text-red-500`}
          onClick={() => deleteProject(_id)}
        >
          <IconTrash />
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ProjectPreview
