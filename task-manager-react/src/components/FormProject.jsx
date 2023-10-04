import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProjectContext from '../hooks/useProjectContext'
import { toast } from 'sonner'

const FormProject = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [client, setClient] = useState('')
  const [date, setDate] = useState(new Date())
  const { saveProject } = useProjectContext()
  const navigate = useNavigate()
  const handleSubmitProject = async (e) => {
    e.preventDefault()
    if ([name, description, client, date].includes('')) {
      return toast.error('Todos los campos son obligatorios')
    }
    await saveProject({ name, description, client, deliveryDate: date })
    setName('')
    setDescription('')
    setClient('')
    setDate('')
    navigate('/dashboard')
  }
  return (
    <form
      onSubmit={handleSubmitProject}
      className='p-2 flex flex-col gap-2'
    >
      <div className='flex flex-col mt-2'>
        <label htmlFor='name' className='font-semibold text-violet-800'>Nombre del proyecto</label>
        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)}
          placeholder='Ej. Crear landing page'
          className='placeholder-rose-200 rounded w-full p-1'
        />
      </div>
      <div className='flex flex-col mt-2'>
        <label htmlFor='description' className='font-semibold text-violet-800' >Descripcion</label>
        <input type='description' name='description' id='description' value={description} onChange={e => setDescription(e.target.value)}
          className='placeholder-rose-200 rounded w-full p-1'
          placeholder='Esta es una breve descripcion'
        />
      </div>
      <div className='flex flex-col mt-2'>
        <label htmlFor='client' className='font-semibold text-violet-800'>Cliente</label>
        <input type='client' name='client' id='client' value={client} onChange={e => setClient(e.target.value)}
          className='placeholder-rose-200 rounded w-full p-1'
          placeholder='Ej: Microsoft 🤑'
        />
      </div>
      <div className='flex flex-col mt-2'>
        <label htmlFor='delivery-date' className='font-semibold text-violet-800'>Fecha de entrega</label>
        <input type='date' name='delivery-date' id='delivery-date' value={date} onChange={e => setDate(e.target.value)}
          className='placeholder-rose-200 rounded w-full p-1'
        />
      </div>
      <button type='submit'
        className='mt-10 self-center font-bold uppercase w-full text-center text-rose-50 sm:w-2/3 md:1/3 lg:w-1/4 bg-violet-600 p-2 rounded-md hover:bg-violet-800'
        >Crear proyecto</button>
    </form>
  )
}

export default FormProject
