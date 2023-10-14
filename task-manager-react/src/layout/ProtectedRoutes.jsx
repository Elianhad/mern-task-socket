import { Outlet, Navigate } from 'react-router-dom'
import { ProjectProvider } from '../context/ProjectProvider'
import useAuthContext from '../hooks/useAuthContext'
import HeaderDashboard from '../components/HeaderDashboard'
import SideBar from '../components/SideBar'
import { Toaster } from 'sonner'

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext()

  if (loading) return (<div className='w-5 h-5 border-2 absolute top-0 bottom-0 left-0 right-0 animate-spin'></div>)

  return (
    <>
      {auth._id ? (
        <ProjectProvider>
          <HeaderDashboard />
          <div className='flex min-h-screen'>
            <SideBar />
            <main className='p-1 h-full w-full mx-auto'>
              <Outlet />
              <Toaster richColors />
            </main>
          </div>
        </ProjectProvider>
      ) : (
        <Navigate to='/' />
      )}
    </>
  )
}

export default ProtectedRoutes