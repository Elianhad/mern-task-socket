import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='container mx-auto mt-5 md:mt-20 md:flex p-5 md:justify-center '>
      <div className='md:w-2/3 lg:w-1/2 rounded-md'>
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
