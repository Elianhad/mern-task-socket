import { Fragment } from 'react'
import useProjectContext from '../hooks/useProjectContext'
import { Transition, Dialog } from '@headlessui/react'
import { IconTrash, IconX } from '@tabler/icons-react'

const ModalDelete = () => {
  const { handleModalDelete, modalDelete, actualTask, deleteTask } = useProjectContext()

  return (
    <Transition.Root show={modalDelete} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={handleModalDelete}
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
                  onClick={handleModalDelete}
                >
                  <span className='sr-only'>Cerrar</span>
                  <IconX />
                </button>
              </div>

              <div className='sm:flex sm:items-start'>
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg leading-6 font-bold text-violet-900'
                  >
                    ¿Desea eliminar la tarea?
                  </Dialog.Title>
                  <div className='mt-4'>
                    <div>
                      <p className='font-thin text-violet-500'>Si lo elimina no lo podrá recuperar </p>
                    </div>
                    <div className='mt-6 flex gap-4'>
                      <button type='button' className='p-2 flex gap-1 shadow text-red-500 hover:scale-105 transition-all'
                        onClick={deleteTask}
                      >
                        <IconTrash />
                        <p>Eliminar</p>
                      </button>
                      <button type="button" className='p-2 flex gap-1 shadow text-violet-800  hover:scale-105 transition-all'
                        onClick={handleModalDelete}
                      >Cancelar</button>
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

export default ModalDelete