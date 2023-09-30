import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-violet-900 pt-4 text-orange-100 font-bold h-32 grid place-content-center'>
      <nav className='grid grid-flow-col gap-3'>
        <Link to='/account/login'>Iniciar sesión</Link>
        <Link to='/account'>Crear cuenta</Link>
        <Link to='/'>Inicio</Link>
        <Link>Blog</Link>
      </nav>
    </footer>
  )
}

export default Footer
