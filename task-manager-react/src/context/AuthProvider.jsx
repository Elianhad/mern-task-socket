import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';
import configHeader from '../config/configHeader'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const userAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const { data } = await clienteAxios('/user/profile', configHeader(token))
        setAuth(data)
      } catch (error) {
        console.error(error.response.data)
        setAuth({})
      } finally {
        setLoading(false)
      }
    }
    userAuth()
  },[])

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext