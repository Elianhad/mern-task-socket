import React from 'react'
import { Link } from 'react-router-dom'
const ForgottenPass = () => {
  return (
    <>
      <div className='block'>
        <h1 className='mt-4 text-3xl font-black text-sky-900 mx-auto uppercase'>
          Cambia tu contraseña{' '}
        </h1>
      </div>

      <form className='p-8 flex flex-col justify-center my-3 bg-rose-50 shadow-sm rounded'>
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
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='correo@correo.com'
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
    </>
  )
}

export default ForgottenPass
