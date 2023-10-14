import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useProjectContext from '../hooks/useProjectContext'
const HeaderDashboard = () => {
  const navigate = useNavigate()
  const { closeApp } = useProjectContext()
  const handleClickCloseSesion = () => {
    localStorage.removeItem('token')
    closeApp()
    navigate('/')
  }
  return (
    <header className='px-1 py-3 flex justify-between items-center bg-rose-100 shadow-sm'>
      <h1 className='font-extrabold text-transparent text-center text-3xl bg-clip-text bg-gradient-to-r from-violet-600 to-rose-600'>
        <Link to='/dashboard'>IITask</Link>
    </h1>
    <nav className='flex items-center gap-4'>
      <Link
        to='/dashboard'
        className=' font-semibold text-xl text-violet-900 hover:text-orange-600 transition-colors'
      >
        Proyectos
      </Link>
        <button
        onClick={() => handleClickCloseSesion()}
        className='border-2 text-center border-violet-900 p-1 rounded-md font-semibold text-xl text-violet-900 hover:text-orange-600 hover:border-orange-600 transition-colors'
      >
        Cerrar sesión
      </button>
    </nav>
  </header>
  )
}

export default HeaderDashboard