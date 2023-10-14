import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import useProjectContext from '../hooks/useProjectContext'
import useAdmin from '../hooks/useAdmin'
import { IconPencilMinus, IconPlus, IconUsers } from '@tabler/icons-react'
import Skeleton from '../components/Skeleton'
import FormModalTask from '../components/FormModalTask'
import Task from '../components/Task'
import ModalDelete from '../components/ModalDelete'
import ModalColaborator from '../components/ModalColaborator'
import Colaborators from '../components/Colaborators'
import ModalDeleteColabor from '../components/ModalDeleteColabor'

let socket
const Project = () => {
  const params = useParams()
  const {
    getOneProject,
    actualProject,
    loading,
    handleModalTask,
    handleModalColaborator,
    handleTaskSaver,
    handleDeletedTask,
    handleUpdateTask,
    handleChangeStateOfTask
  } = useProjectContext()
  const { id } = params
  const admin = useAdmin()

  useEffect(() => {
    const getProject = async () => {
      await getOneProject(id)
    }
    getProject()
  }, [id])
  // conectar con socket io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BASE_URL_BACKEND)
    socket.emit('connect to proyect', id)
  }, [])
  useEffect(() => {
    socket.on('added task', (task) => {
      if (task.project === actualProject._id) {
        handleTaskSaver(task)
      }
    })
    socket.on('deleted task', (task) => {
      if (task.project === actualProject?._id) {
        handleDeletedTask(task)
      }
    })
    socket.on('updated task', (task) => {
      if (task.project._id === actualProject._id) {
        handleUpdateTask(task)
      }
    })
    socket.on('changed state', (task) => {
      if (task.project._id === actualProject._id) {
        handleChangeStateOfTask(task)
      }
    })
  })
  if (loading)
    return (
      <div className='mt-10'>
        <Skeleton />
      </div>
    )

  return (
    <div>
      <div className='mt-10 p-1 mx-auto max-w-2xl flex justify-between items-center text-violet-900 border-b-2 pb-2'>
        <h1 className='text-2xl font-bold'>{actualProject.name}</h1>
        {admin && (
          <button
            type='button'
            className=' hover:text-orange-500 hover:scale-105 transition-all'
          >
            <Link
              className='flex justify-center items-center gap-2'
              to={`/dashboard/editar/${id}`}
              state={actualProject}
            >
              <IconPencilMinus />
              <span>Editar</span>
            </Link>
          </button>
        )}
      </div>
      {admin && (
        <div className='flex justify-between gap-1 max-w-2xl mx-auto'>
          <button
            type='button'
            className='border border-violet-700 p-2 flex gap-1 justify-center items-center text-violet-700 rounded mt-5 text-sm hover:scale-105'
            onClick={handleModalTask}
          >
            <IconPlus />
            <span>Agregar tarea</span>
          </button>
          <button
            type='button'
            className='border border-violet-700 p-2 flex gap-1 justify-center items-center text-violet-700 rounded mt-5 text-sm hover:scale-105'
            onClick={handleModalColaborator}
          >
            <IconUsers />
            <span>Agregar Colaborador</span>
          </button>
        </div>
      )}

      <FormModalTask />
      <ModalDelete />
      <ModalColaborator />
      <ModalDeleteColabor />
      <div className='mt-5 flex flex-col gap-1 max-w-2xl mx-auto'>
        {!actualProject.tasks?.length ? (
          <p className='text-lg text-violet-700 text-center bg-rose-200 rounded p-2 shadow-sm'>
            Aquí no hay nada 🐈‍⬛
          </p>
        ) : (
          actualProject.tasks.map((task) => {
            return <Task task={task} key={task._id} />
          })
        )}
      </div>
      {admin && (
        <div className='max-w-2xl mx-auto my-10'>
          <h3 className='text-xl font-bold text-violet-900 mt-2'>
            Colaboradores
          </h3>
          {actualProject?.collaborators ? (
            actualProject.collaborators?.map((col) => {
              return <Colaborators colaborator={col} key={col._id} />
            })
          ) : (
            <span className='text-lg font-semibold text-violet-500'>
              No tiene ningun colaborador en el proyecto
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default Project
