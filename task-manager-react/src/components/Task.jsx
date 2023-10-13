import { Switch } from '@headlessui/react'
import dateFormat from '../helpers/dateFormat'
import {
  IconCheck,
  IconCheckbox,
  IconCircle0Filled,
  IconCircleCheckFilled,
  IconEdit,
  IconRefreshAlert,
  IconTrash
} from '@tabler/icons-react'
import useProjectContext from '../hooks/useProjectContext'
import useAdmin from '../hooks/useAdmin'
import { useEffect, useState } from 'react'
const PRIORITY_COLORS = {
  Alta: 'red',
  Media: 'orange',
  Baja: 'green'
}

const Task = ({ task }) => {
  const [statusTask, setStatusTask] = useState(false)
  const { name, description, priority, deliveryDate, state, _id, completedBy } =
    task
  const { setActualTask, handleModalTask, handleModalDelete, completeTask } =
    useProjectContext()
  const admin = useAdmin()
  const handleOnClickEdit = (taskToEdit) => {
    handleModalTask()
    setActualTask(taskToEdit)
  }
  const handleOnCLickDelete = (taskToDel) => {
    setActualTask(taskToDel)
    handleModalDelete()
  }
  const handleOnClickChangeStatus = () => {
    setStatusTask(!statusTask)
    completeTask(_id)
  }
  return (
    <div className='bg-rose-200 text-violet-800 relative flex flex-col sm:flex-row gap-6 shadow-md p-4 rounded-md justify-between max-w-full'>
      <div className='flex flex-col gap-1 flex-1'>
        <h2 className='font-bold text-lg'>{name}</h2>
        <p className='text-sm font-thin'>{description}</p>
        <p>
          Prioridad:
          <span className={` text-${PRIORITY_COLORS[priority]}-600 ml-2`}>
            {priority}
          </span>
        </p>

        <p>{dateFormat(deliveryDate)}</p>
        {state && (
          <p className='text-green-700 '>Completado por: {completedBy.name}</p>
        )}
      </div>
      <div className='flex gap-3 items-end'>
        {admin && (
          <div className='flex gap-6'>
            <button
              type='button'
              className='hover:text-orange-500 hover:scale-105 transition-all flex gap-1'
              onClick={() => handleOnCLickDelete(task)}
            >
              <IconTrash />
              Eliminar
            </button>
            <button
              type='button'
              className='hover:text-orange-500 hover:scale-105 transition-all flex gap-1'
              onClick={() => handleOnClickEdit(task)}
            >
              <IconEdit />
              Editar
            </button>
          </div>
        )}
        {!state ? (
          <button
            type='button'
            onClick={handleOnClickChangeStatus}
            className='hover:text-green-700 hover:scale-105 transition-all flex gap-1'
          >
            <IconCheck />
            Completar
          </button>
        ) : (
          <button
            type='button'
            onClick={handleOnClickChangeStatus}
            className='hover:text-green-700 hover:scale-105 transition-all flex gap-1'
          >
            <IconRefreshAlert />
            Deshacer completado
          </button>
        )}
      </div>
      {state && (
        <>
          <div className='absolute top-2 right-1 md:bottom-2 md:right-10 text-green-700'>
            <IconCircleCheckFilled width={80} height={80} />
          </div>
        </>
      )}
    </div>
  )
}

export default Task
