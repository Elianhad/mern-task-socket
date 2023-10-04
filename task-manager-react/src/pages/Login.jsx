import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import useAuthContext from '../hooks/useAuthContext'
import { Toaster, toast } from 'sonner'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAuth, auth, loading } = useAuthContext()
  const navigate = useNavigate()
  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      return toast.error('La contraseña debe tener al menos 6 caracteres')
    }
    try {
      const { data } = await clienteAxios.post('/user/login', { email, password })
      toast.success('Inicio de sesión aprobado')
      localStorage.setItem('token', data.token)
      setAuth(data)
    } catch (error) {
      console.error(error)
      toast.error(error?.response.data.msg)
    }
  }
  useEffect(() => {
    if(!loading && auth._id) return navigate('/dashboard')
  },[auth])
  return (
    <>
      <div className='block'>
        <h1 className='mt-4 text-3xl font-black text-sky-900 mx-auto uppercase'>
          Inicia sesión{' '}
        </h1>
        <span className='text-rose-600 font-black text-2xl capitalize'>
          y administra tus proyectos
        </span>
      </div>

      <form className='p-8 flex flex-col justify-center my-3 bg-rose-50 shadow-sm rounded'
          onSubmit={handleSubmitLogin}      
      >
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
            required
            value={email}
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='correo@correo.com'
            onChange={ (e) => setEmail(e.target.value)}
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
            type='password'
            id='password'
            name='password'
            value={password}
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <button
          type='submit'
          className='rounded block p-2 bg-orange-700 text-rose-50 font-bold uppercase lg:w-1/3 mx-auto my-6 hover:bg-orange-800 transition-colors'
        >
          Iniciar sesión
        </button>
      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block font-semibold text-center my-5 text-violet-800 hover:text-violet-700 transition-colors'
          to='/account'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          className='block font-semibold text-center my-5 text-violet-800 hover:text-violet-700 transition-colors'
          to='/account/forgotten-password'
        >
          Olvidé mi contraseña
        </Link>
      </nav>
      <Toaster richColors />
    </>
  )
}

export default Login
