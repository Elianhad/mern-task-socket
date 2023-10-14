import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import { Toaster, toast } from 'sonner'

const ConfirmAccount = () => {
  const [confirmed, setConfirmed] = useState(false)
  const { id } = useParams()
  const confirmAccount = async () => {
    try {
      const { data } = await clienteAxios(`/user/validaccount/${id}`)
      toast.success(data.msg)
      setConfirmed(true)
    } catch (error) {
      if (error) {
        const msg = error?.response.data.msg
        toast.error(msg)
      }
    }
  }

  useEffect(() => {
    confirmAccount()
  }, [])

  return (
    <div>
      <h1 className='mt-4 text-center text-3xl flex flex-col font-black text-sky-900 mx-auto uppercase'>
        Confirmar cuenta{' '}
        <span className='text-rose-600 text-xl capitalize'>
          Si tu cuenta ha sido validada tendrás un mensaje de confirmación.
        </span>
      </h1>
      {confirmed ? (
        <Navigate to='/account/login' />
      ) : (
        <Navigate to='/account/' />
      )}
      <Toaster />
    </div>
  )
}

export default ConfirmAccount
