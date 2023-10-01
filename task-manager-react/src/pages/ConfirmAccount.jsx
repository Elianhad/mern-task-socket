import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster, toast } from 'sonner'

const ConfirmAccount = () => {
  const [confirmed, setConfirmed] = useState(false)
  const { id } = useParams()
  const confirmAccount = async () => {
    try {
      const url = `${import.meta.env.VITE_BACK_URL}/user/validaccount/${id}`
      const { data } = await axios(url)
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
      {confirmed ? <Link className='block' to='/account/login' /> : <Link to='/account/'/> }
      <Toaster />
    </div>
  )
}

export default ConfirmAccount
