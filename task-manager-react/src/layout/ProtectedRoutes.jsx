import { Outlet, Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext()
  
  if(loading) return( <div className='w-5 h-5 border-2 absolute top-0 bottom-0 left-0 right-0 animate-spin'></div>)

  return (
    <>
      { auth._id ? (
        <>
          <Outlet />
        </>
      ) : <Navigate to='/' />}  
    </>
  )
}

export default ProtectedRoutes