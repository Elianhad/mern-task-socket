import { useEffect, useState } from 'react'
import useProjectContext from './useProjectContext'
import useAuthContext from './useAuthContext'

const useAdmin = () => {
  const { auth } = useAuthContext()
  const { actualProject } = useProjectContext()

  return actualProject.creator === auth._id
}

export default useAdmin
