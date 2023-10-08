import { useLocation, useNavigate } from 'react-router-dom'
import { IconTrash, IconArrowBack } from '@tabler/icons-react'
import FormProject from '../components/FormProject'

const UpdateProject = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  
  return (
    <div className=' max-w-2xl mx-auto'>
      <div className='mt-5 ml-2 flex justify-around items-center p-2 text-violet-900'>
        <button className=' hover:text-orange-500 transition-colors flex justify-center items-center gap-2'
          onClick={() => navigate(-1)}
        >
          <IconArrowBack />
          <span>Volver</span>
        </button>
        <h1 className='text-xl font-bold'>Editar {state.name }</h1>
        <button className='text-red-700 hover:text-red-900 hover:scale-105 transition-all flex justify-center items-center gap-2'>
          <IconTrash />
          <span>Eliminar</span>
        </button>
      </div>
      <FormProject project={state} />
    </div>
  )
}

export default UpdateProject