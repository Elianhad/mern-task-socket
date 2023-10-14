import React from 'react'
import { Link } from 'react-router-dom'
const HeaderLanding = () => {
  return (
    <header className='p-3 flex justify-between items-center bg-rose-100 shadow-sm'>
      <h1 className='font-extrabold text-transparent text-center text-4xl bg-clip-text bg-gradient-to-r from-violet-600 to-rose-600'>
        IITask
      </h1>
      <nav className='flex gap-3 justify-center items-center'>
        <Link
          to='/account'
          className='font-semibold text-sm text-violet-900 hover:text-orange-600 transition-colors'
        >
          Crear cuenta
        </Link>
        <Link
          to='/account/login'
          className='font-semibold text-sm text-violet-900 hover:text-orange-600 transition-colors'
        >
          Iniciar sesión
        </Link>
      </nav>
    </header>
  )
}

export default HeaderLanding
