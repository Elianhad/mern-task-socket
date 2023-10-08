import { useState } from 'react'
import { Switch } from '@headlessui/react'
import dateFormat from '../helpers/dateFormat'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import useProjectContext from '../hooks/useProjectContext'
const PRIORITY_COLORS = {
  "Alta": "red",
  "Media": "orange",
  "Baja": "green"
}

const Task = ({ task }) => {
  const [enabled, setEnabled] = useState(false)
  const { name, description, priority, deliveryDate } = task
  const { setActualTask, handleModalTask, handleModalDelete } = useProjectContext()
  const handleOnClickEdit = (taskToEdit) => {
    handleModalTask()
    setActualTask(taskToEdit)
  }
  const handleOnCLickDelete = (taskToDel) => {
    setActualTask(taskToDel)
    handleModalDelete()
  }
  return (
    <div className={`${enabled ? 'bg-green-600/70 text-rose-50' : 'bg-rose-200 text-violet-800'} relative flex flex-col sm:flex-row gap-6 shadow-md py-6 px-4 rounded-md justify-between}`}>
      <div className='flex flex-col mt-6 gap-1 flex-1'>
        <h2 className='font-bold text-lg'>{name}</h2>
        <p className='text-sm font-thin'>{description}</p>
        <p>Prioridad:
          <span className={` text-${PRIORITY_COLORS[priority]}-600 ml-2`} >{priority}</span>
        </p>

        <p>{dateFormat(deliveryDate)}</p>
      </div>
      <div className='flex gap-6'>
        <button type="button"
          className='hover:text-orange-500 hover:scale-105 transition-all flex gap-1'
          onClick={() => handleOnCLickDelete(task)}
        >
          <IconTrash />
          Eliminar</button>
        <button type="button"
          className='hover:text-orange-500 hover:scale-105 transition-all flex gap-1'
          onClick={() => handleOnClickEdit(task)}
        >
          <IconEdit />
          Editar
        </button>
        <div className='absolute top-5 left-5 flex gap-2 justify-center items-center'>
          <span className='font-semibold'>¿Está completa?</span>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-green-600' : 'bg-red-600'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Tarea completada</span>
            <span
              className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-violet-200 transition`}
            />
          </Switch>
        </div>

      </div>
    </div>
  )
}

export default Task