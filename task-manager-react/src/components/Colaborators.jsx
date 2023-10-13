import { IconTrash } from '@tabler/icons-react'
import useProjectContext from '../hooks/useProjectContext'

const Colaborators = ({ colaborator }) => {
  const { handleModalDeleteCol } = useProjectContext()
  const { name } = colaborator
  const handleOnClickDeleteColaborator = () => {
    handleModalDeleteCol(colaborator)
  }
  return (
    <li className='text-violet-700 flex bg-rose-200 p-4 rounded mt-4'>
      <p className='flex-1 uppercase'>{name}</p>
      <button
        type='button'
        className='text-red-500 hover:text-red-800 hover:scale-105 transition-all flex gap-1'
        onClick={() => handleOnClickDeleteColaborator()}
      >
        <IconTrash />
        Eliminar
      </button>
    </li>
  )
}

export default Colaborators
