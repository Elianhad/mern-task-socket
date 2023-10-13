import { Fragment, useState } from 'react'
import useProjectContext from '../hooks/useProjectContext'
import { Transition, Dialog } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'
import { toast } from 'sonner'

const ModalColaborator = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    handleModalColaborator,
    modalColaborator,
    searchColaborator,
    colaborator,
    addColaborator
  } = useProjectContext()
  const handleSubmitSearchColaborator = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (email === '') {
      return toast.error('El campo no debe estar vacío')
    }
    await searchColaborator(email)
    setEmail('')
    setLoading(false)
  }

  return (
    <Transition.Root show={modalColaborator} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={handleModalColaborator}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-violet-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-rose-50 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                <button
                  type='button'
                  className='bg-rose-50 rounded-md text-violet-400 hover:text-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-200'
                  onClick={handleModalColaborator}
                >
                  <span className='sr-only'>Cerrar</span>
                  <IconX />
                </button>
              </div>

              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-bold text-violet-900'
                  >
                    ¿Desea agregar un colaborador?
                  </Dialog.Title>
                  <div className='mt-4'>
                    <form
                      className='flex flex-col text-violet-800'
                      onSubmit={handleSubmitSearchColaborator}
                    >
                      <label>Busca por email</label>
                      <div className='flex'>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          className='flex-1 p-1 rounded-tl-md rounded-bl-md'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                          type='submit'
                          className='w-1/3 border-2 border-violet-500 font-semibold uppercase p-1 rounded-tr-md rounded-br-md hover:text-rose-100 hover:bg-gradient-to-br from-violet-600 to-orange-600 transition-all'
                        >
                          Buscar
                        </button>
                      </div>
                    </form>
                    <div className='mt-4'>
                      <h4 className='text-lg font-semibold text-violet-600'>
                        Colaboradores:
                      </h4>
                      {colaborator?._id ? (
                        <div className='flex mt-4 p-2 border-b-2'>
                          <p className='flex-1'>{colaborator.name}</p>
                          <button
                            className='font-semibold text-violet-500 hover:scale-105 hover:text-orange-600 transition-all'
                            type='button'
                            onClick={() =>
                              addColaborator({ email: colaborator.email })
                            }
                          >
                            Agregar colaborador
                          </button>
                        </div>
                      ) : (
                        <div className='mt-4 text-orange-500'>
                          <p>Aún no ha buscado colaboradores</p>
                          <div
                            className={`${
                              loading ? 'flex' : 'hidden'
                            } items-center justify-between animate-pulse `}
                            role='status'
                          >
                            <div>
                              <div className='h-2.5 bg-orange-300 rounded-full dark:bg-violet-600 w-24 mb-2.5'></div>
                              <div className='w-32 h-2 bg-orange-200 rounded-full dark:bg-violet-700'></div>
                            </div>
                            <div className='h-2.5 bg-gray-300 rounded-full dark:bg-violet-700 w-12'></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalColaborator
