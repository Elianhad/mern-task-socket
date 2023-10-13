import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useProjectContext from '../hooks/useProjectContext'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ModalSearcher = () => {
  const [search, setSearch] = useState('')
  const { searcherModal, handleModalSearcher, projects } = useProjectContext()
  const navigate = useNavigate()
  const projectsFiltered =
    search === ''
      ? []
      : projects.filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        )
  return (
    <Transition.Root
      show={searcherModal}
      as={Fragment}
      afterLeave={() => setSearch('')}
    >
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20'
        onClose={handleModalSearcher}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Combobox
            as='div'
            className='mx-auto max-w-xl transform divide-y divide-orange-100 overflow-hidden rounded-xl bg-rose-50 shadow-2xl ring-1 ring-violet-600 ring-opacity-5 transition-all'
            onChange={(project) => navigate(`/dashboard/${project._id}`)}
          >
            <div className='relative'>
              <Combobox.Input
                className='h-12 w-full border-0 bg-transparent pl-11 pr-4 text-violet-800 placeholder-rose-400 focus:ring-0 sm:text-sm'
                placeholder='Buscar...'
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {projectsFiltered.length > 0 && (
              <Combobox.Options
                static
                className='max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-violet-800'
              >
                {projectsFiltered.map((project) => (
                  <Combobox.Option
                    key={project._id}
                    value={project}
                    className={({ active }) =>
                      classNames(
                        'cursor-default select-none px-4 py-2',
                        active && 'bg-orange-200 text-violet-800'
                      )
                    }
                  >
                    {project.name}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalSearcher
