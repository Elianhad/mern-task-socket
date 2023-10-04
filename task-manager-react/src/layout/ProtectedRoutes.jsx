import { Outlet, Navigate } from 'react-router-dom'
import { ProjectProvider } from '../context/ProjectProvider'
import useAuthContext from '../hooks/useAuthContext'
import HeaderDashboard from '../components/HeaderDashboard'
import SideBar from '../components/SideBar'

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext()
  
  if(loading) return( <div className='w-5 h-5 border-2 absolute top-0 bottom-0 left-0 right-0 animate-spin'></div>)

  return (
    <>
      { auth._id ? (
        <ProjectProvider>
          <HeaderDashboard />
          <div className='flex gap-2 min-h-screen'>
            <SideBar />
            <main className='w-full h-full p-2'>
              <Outlet />
            </main>
          </div>
        </ProjectProvider>
      ) : <Navigate to='/' />}  
    </>
  )
}

export default ProtectedRoutes