import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
const CreateAccount = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    // validación del formulario
    if ([name, email, password, password2].includes(''))
      return toast.error('Todos los campos son obligatorios')
    if (name.trim().length <= 3)
      return toast.error('El nombre debe tener al menos 3 caracteres')
    if (password !== password2)
      return toast.error('Las contraseñas no coinciden')
    if (password.trim().length < 6)
      return toast.error('La contraseña debe tener al menos 6 caracteres')
    // pasar a la api
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACK_URL}/user/newaccount`,
        {
          name,
          email,
          password
        }
      )
      toast.success(data.msg)
      setName('')
      setEmail('')
      setPassword('')
      setPassword2('')
      
      Navigate({ replace: '/' })
    } catch (error) {
      const msg = error?.response.data.msg
      if(msg) return toast.error(msg)
    }
  }
  return (
    <>
      <Toaster position='top-center' closeButton richColors />
      <h1 className='mt-4 text-center text-3xl flex flex-col font-black text-sky-900 mx-auto uppercase'>
        Crea una cuenta{' '}
        <span className='text-rose-600 text-xl capitalize'>
          ordena tus ideas
        </span>
      </h1>
      <form
        className='p-8 flex flex-col justify-center my-3 bg-rose-50 shadow-sm rounded'
        onSubmit={handleSubmit}
      >
        <div className='mt-6'>
          <label
            className='font-bold text-rose-700 block uppercase'
            htmlFor='name'
          >
            Nombre
          </label>
          <input
            id='name'
            name='name'
            value={name}
            type='text'
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='Juan Pérez'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mt-6'>
          <label
            className='font-bold text-rose-700 block uppercase'
            htmlFor='email'
          >
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={email}
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='correo@correo.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='my-6'>
          <label
            className='font-bold text-rose-700 block uppercase'
            htmlFor='password'
          >
            Contraseña
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='my-6'>
          <label
            className='font-bold text-rose-700 block uppercase'
            htmlFor='password2'
          >
            Confirma la Contraseña
          </label>
          <input
            id='password2'
            name='password2'
            type='password'
            value={password2}
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='rounded block p-2 bg-orange-700 text-rose-50 font-bold uppercase lg:w-1/3 mx-auto my-6 hover:bg-orange-800 transition-colors'
        >
          Crear cuenta
        </button>
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block font-semibold text-center my-5 text-violet-800 hover:text-violet-700 transition-colors'
          to='/account/login'
        >
          ¿Ya tienes una cuenta? Inicia sesción
        </Link>
        <Link
          className='block font-semibold text-center my-5 text-violet-800 hover:text-violet-700 transition-colors'
          to='/'
        >
          Volver
        </Link>
      </nav>
    </>
  )
}

export default CreateAccount
