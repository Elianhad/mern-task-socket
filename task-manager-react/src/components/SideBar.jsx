import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import { IconSearch } from '@tabler/icons-react'
import useProjectContext from '../hooks/useProjectContext'

const SideBar = () => {
  const { auth } = useAuthContext()
  const { handleModalSearcher } = useProjectContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const handleOnClickModalSearch = () => {
    handleModalSearcher()
  }
  return (
    <aside className='p-4 min-h-screen shadow-md flex flex-col gap-4'>
      {!id && (
        <button
          className='text-violet-800 border-2 border-violet-800 rounded-full p-2 gap-1 flex items-center justify-center hover:border-orange-600 hover:text-orange-600 transition-all'
          onClick={() => handleOnClickModalSearch()}
        >
          <IconSearch />
          <span className='hidden md:block'> Buscar </span>
        </button>
      )}

      <button className='text-violet-800 border-2 border-violet-800 rounded-full p-2 gap-1 flex items-center justify-center hover:border-orange-600 hover:text-orange-600 transition-all'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-user'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0'></path>
          <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2'></path>
        </svg>
        <span className='hidden md:block'> {auth.name} </span>
      </button>
      <button
        className='mt-3 text-violet-800 flex items-center justify-center hover:text-orange-600 transition-all md:border-2 md:border-violet-800 md:p-1 rounded-lg'
        onClick={() => navigate('/dashboard/new-project')}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-circle-plus'
          width={40}
          height={40}
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
          <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0'></path>
          <path d='M9 12h6'></path>
          <path d='M12 9v6'></path>
        </svg>
        <span className='hidden md:block'>Nuevo Proyecto</span>
      </button>
    </aside>
  )
}

export default SideBar
