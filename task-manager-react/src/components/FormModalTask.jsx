import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { IconX } from '@tabler/icons-react'
import useProjectContext from '../hooks/useProjectContext'
import { toast } from 'sonner'

const PRIOTITY_OPTION = ['Baja', 'Media', 'Alta']

const FormModalTask = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [deliveryDate, setDeliveryDate] = useState(new Date())
    const [id, setId] = useState('')
    const { modalFormTask, handleModalTask, saveTask, actualTask } = useProjectContext()
    const params = useParams()

    const handleSubmitFormTask = async (e) => {
        e.preventDefault()
        if ([description, name, priority, deliveryDate].includes('')) {
            return toast.error('Todos los campos son obligatorios')
        }
        const newtask = { name, description, priority, deliveryDate, project: params.id, id }
        await saveTask(newtask)
        setName('')
        setDescription('')
        setDeliveryDate('')
        setPriority('')
        setId('')
        handleModalTask()
    }
    useEffect(() => {
        if (actualTask._id) {
            setId(actualTask._id)
            setName(actualTask.name)
            setDescription(actualTask.description)
            setDeliveryDate(actualTask.deliveryDate.split('T')[0])
            setPriority(actualTask.priority)
            return
        }
        setName('')
        setDescription('')
        setDeliveryDate('')
        setPriority('')
        setId('')
    }, [actualTask])

    return (
        <Transition.Root show={modalFormTask} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={handleModalTask}
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
                                    onClick={handleModalTask}
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
                                        {id ? 'Editar tarea' : 'Crear tarea'}
                                    </Dialog.Title>
                                    <form
                                        className='flex flex-col gap-4 mt-4'
                                        onSubmit={handleSubmitFormTask}
                                    >
                                        <div className='flex flex-col gap-2'>
                                            <label
                                                htmlFor='name'
                                                className='font-semibold text-violet-700'
                                            >
                                                ¿Qué tarea es?
                                            </label>
                                            <input
                                                type='text'
                                                name='name'
                                                id='name'
                                                value={name}
                                                className='mt-1 p-1 focus:ring-1 focus:ring-orange-300 rounded-md placeholder:text-violet-200'
                                                placeholder='Pon un nombre a la tarea'
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2 mt-4'>
                                            <label
                                                htmlFor='description'
                                                className='font-semibold text-violet-700'
                                            >
                                                ¿De qué trata la tarea?
                                            </label>
                                            <textarea
                                                type='text'
                                                name='desciption'
                                                id='description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className='mt-1 p-1 focus:ring-1 focus:ring-orange-300 rounded-md placeholder:text-violet-200'
                                                placeholder='Describe la tarea'
                                            />
                                        </div>
                                        <div className='flex gap-2 items-center my-4'>
                                            <label
                                                htmlFor='priority'
                                                className='font-semibold text-violet-700'
                                            >
                                                ¿Qué prioridad tiene la tarea?
                                            </label>
                                            <select
                                                name='priority'
                                                id='priority'
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                                className='flex-1 bg-violet-200 p-2 rounded-md text-orange-800'
                                            >
                                                <option value="">Elige la prioridad</option>
                                                {PRIOTITY_OPTION.map((option) => {
                                                    return <option key={option}>{option}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className='flex gap-2 items-center my-4'>
                                            <label
                                                htmlFor='delivery-date'
                                                className='font-semibold text-violet-700'
                                            >
                                                ¿En qué fecha debe entregarse?
                                            </label>
                                            <input
                                                type='date'
                                                name='delivery-date'
                                                id='delivery-date'
                                                value={deliveryDate}
                                                onChange={(e) => setDeliveryDate(e.target.value)}
                                                className='flex-1 bg-violet-200 p-2 rounded-md text-orange-800'
                                            />
                                        </div>

                                        <input
                                            type='submit'
                                            className='text-violet-700 font-bold uppercase my-4 border-2 border-violet-700 p-1 rounded-md hover:bg-gradient-to-br from-violet-700 to-rose-400 hover:text-rose-100 transition-all w-1/2 mx-auto'
                                            value={id ? 'Editar tarea' : 'Crear tarea'}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default FormModalTask
