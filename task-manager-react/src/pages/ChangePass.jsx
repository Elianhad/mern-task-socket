import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import clienteAxios from '../config/clienteAxios'
import { Toaster, toast } from 'sonner'

const ChangePass = () => {
  const [newPass, setNewPass] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const { token } = params
  const handleSubmitNewPass = async (e) => {
    e.preventDefault()
    if (newPass === '' || newPass.length < 6) {
      toast.error('La contraseña debe ser mayor a 6 caracteres')
      return
    }
    try {
      const { data } = await clienteAxios.post(`/user/resetpassword/${token}`, { password: newPass })
      toast.success(data.msg)
      navigate({ to: '/account/login' })
    } catch (error) {
      console.error(error.response)
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clienteAxios(`/user/resetpassword/${token}`)
        toast.success(`${data.msg} | Puede cambiar la contraseña`)
        setTokenValido(true)
      } catch (error) {
        console.error(error.response)
        toast.error(error.response.data.msg)
      }
    }
    checkToken()
  }, [])
  return (
    <>
      <h1 className='mt-4 text-center text-3xl flex flex-col font-black text-sky-900 mx-auto uppercase'>
        Crea una nueva contraseña{' '}
        <span className='text-rose-600 text-xl capitalize'>
          y recupera tus proyectos
        </span>
      </h1>
      {
        tokenValido && (
        <form className='p-8 flex flex-col justify-center my-3 bg-rose-50 shadow-sm rounded'
          onSubmit={handleSubmitNewPass}
        >
          <div className='my-6'>
            <label
              className='font-bold text-rose-700 block uppercase'
              htmlFor='password'
            >
              Nueva Contraseña
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={newPass}
              placeholder='Escribe tu nueva contraseña'
              className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
              onChange={ (e) => setNewPass( e.target.value ) }
            />
          </div>
          <button
            type='submit'
            className='rounded block p-2 bg-orange-700 text-rose-50 font-bold uppercase lg:w-1/3 mx-auto my-6 hover:bg-orange-800 transition-colors'
          >
          Aceptar
          </button>
        </form>

        )
      }
      <nav className='lg:flex lg:justify-between mt-10'>
        <Link
          className='block font-semibold text-center my-5 text-violet-800 hover:text-violet-700 transition-colors'
          to='/account'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          className='block font-semibold text-center my-5 text-violet-800 hover:text-violet-700 transition-colors'
          to='/'
        >
          Volver
        </Link>
      </nav>
      <Toaster />
    </>
  )
}

export default ChangePass
