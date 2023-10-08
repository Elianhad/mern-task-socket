import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useProjectContext from '../hooks/useProjectContext'
import { IconPencilMinus, IconPlus } from '@tabler/icons-react';
import Skeleton from '../components/Skeleton'
import FormModalTask from '../components/FormModalTask';
import Task from '../components/Task';
import ModalDelete from '../components/ModalDelete';

const Project = () => {
  const params = useParams()
  const { getOneProject, actualProject, loading, handleModalTask } = useProjectContext()
  const { id } = params
  useEffect(() => {
    const getProject = async () => {
      await getOneProject(id)
    }
    getProject()
  }, [])
  if (loading) return (<div className='mt-10'><Skeleton /></div>) 
  
  return (
    <div>
      <div className='mt-5 ml-2 flex justify-around items-center p-2 text-violet-900'>
        <h1 className='text-xl font-bold'>{actualProject.name}</h1>
        <button type='button' className=' hover:text-orange-500 hover:scale-105 transition-all'>
          <Link className='flex justify-center items-center gap-2'
            to={`/dashboard/editar/${id}`}
            state={actualProject}
          >
            <IconPencilMinus />
            <span>Editar</span>
          </Link>
        </button>
      </div>
      <button type='button' className='flex gap-2 justify-center items-center text-violet-700 rounded mt-5 text-sm hover:scale-105'
        onClick={handleModalTask}
      >
        <IconPlus />
        <span>Agregar tarea</span>
      </button>
      <FormModalTask />
      <ModalDelete />
      <div className='mt-10 p-4 flex flex-col gap-2 md:w-3/4 lg:w-full mx-auto lg:grid lg:grid-cols-2'>
        {
          !actualProject.tasks?.length ? <p>Aquí no hay nada 🐈‍⬛</p> : (
            actualProject.tasks.map(task => {
              return (
                <Task task={task} key={task._id} />
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default Project