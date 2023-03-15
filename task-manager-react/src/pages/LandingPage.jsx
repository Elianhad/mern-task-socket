import React from 'react'
import { Link } from 'react-router-dom'
import imageLogo from '../assets/iconTask.webp'
const LandingPage = () => {
  return (
    <>
      <header className='p-5 flex justify-between items-center bg-rose-100 shadow-sm'>
        <div className='w-14'>
          <img src={imageLogo} alt='imagen logo' className=' rounded-full' />
        </div>
        <nav className='flex gap-8'>
          <Link
            to='/account'
            className=' font-semibold text-xl text-violet-900 hover:text-orange-600 transition-colors'
          >
            Crear cuenta
          </Link>
          <Link
            to='/account/login'
            className=' font-semibold text-xl text-violet-900 hover:text-orange-600 transition-colors'
          >
            Iniciar sesión
          </Link>
        </nav>
      </header>
      <main>
        <div className='container mx-auto p-5'>
          <h1 className='font-extrabold text-transparent text-center text-5xl bg-clip-text bg-gradient-to-r from-violet-600 to-rose-600'>
            AllTask
          </h1>
        </div>
      </main>
    </>
  )
}

export default LandingPage
