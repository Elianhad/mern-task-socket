import React from 'react'
import { Link } from 'react-router-dom'
const CreateAccount = () => {
  return (
    <>
      <h1 className='mt-4 text-center text-3xl flex flex-col font-black text-sky-900 mx-auto uppercase'>
        Crea una cuenta{' '}
        <span className='text-rose-600 text-xl capitalize'>
          ordena tus ideas
        </span>
      </h1>
      <form className='p-8 flex flex-col justify-center my-3 bg-rose-50 shadow-sm rounded'>
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
            type='text'
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='Juan Pérez'
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
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
            placeholder='correo@correo.com'
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
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
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
            className='w-full rounded-sm p-2 mt-2 outline-none focus:border-2 focus:border-orange-400 bg-rose-100'
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
