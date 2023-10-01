import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

const ForgottenPass = () => {
  const [email, setEmail] = useState('')

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // email validado por html
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACK_URL}/user/resetpassword`, { email })
      toast.success(data.msg)
    } catch (error) {
      console.error(error?.response)
      toast.error(error?.response?.data.msg)
    }
  }
  return (
    <>
      <div className='block'>
        <h1 className='mt-4 text-3xl font-black text-sky-900 mx-auto uppercase'>
          Cambia tu contraseña{' '}
        </h1>
      </div>

      <form className='p-8 flex flex-col justify-center my-3 bg-rose-50 shadow-sm rounded'
            onSubmit={handleSubmit}
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
            value={email}
            required
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='correo@correo.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='rounded block p-2 bg-orange-700 text-rose-50 font-bold uppercase lg:w-1/3 mx-auto mt-14 mb-8 hover:bg-orange-800 transition-colors'
        >
          Resetear contraseña
        </button>
      </form>
      <nav className='lg:flex lg:justify-between'>
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

export default ForgottenPass
