import React from 'react'

const Features = () => {
  return (
    <div className='lg:grid mx-auto lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center'>
      <h4 className='mt-2 text-2xl font-extrabold leading-8 text-violet-900  sm:text-3xl sm:leading-9'>
        La interacción entre miembros de un equipo es la clave para un resultado
        exitoso.
      </h4>
      <div className='ml-auto lg:col-start-2 lg:max-w-2xl'>
        <div className='relative mt-6 text-lg font-bold leading-6 text-violet-900'>
          <span className='absolute w-full h-full border-2 rounded-xl shadow-lg animate-pulse'></span>
          <p className='p-3'>Crea un espacio simple y poderoso para tu equipo. Sigue, comparte.
          Nunca nada fue tan simple y eficiente.</p>
        </div>
        <ul className='gap-6 mt-8 md:grid md:grid-cols-2'>
          <li className='mt-6 lg:mt-0'>
            <div className='flex'>
              <span className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-violet-800 bg-orange-100 rounded-full dark:text-green-500 '>
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </span>
              <span className='ml-4 text-lg font-semibold leading-6 text-violet-900'>
                Vive las modificaciones
              </span>
            </div>
          </li>
          <li className='mt-6 lg:mt-0'>
            <div className='flex'>
              <span className='flex items-center justify-center flex-shrink-0 w-6 h-6  text-violet-800 bg-orange-100 rounded-full dark:text-green-500 drark:bg-transparent'>
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </span>
              <span className='ml-4  text-lg font-semibold leading-6  text-violet-900'>
                Data tracker
              </span>
            </div>
          </li>
          <li className='mt-6 lg:mt-0'>
            <div className='flex'>
              <span className='flex items-center justify-center flex-shrink-0 w-6 h-6  text-violet-900 bg-orange-100 rounded-full dark:text-green-500 drark:bg-transparent'>
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </span>
              <span className='ml-4 text-lg font-semibold leading-6  text-violet-900'>
                Tips para incrementar la productividad
              </span>
            </div>
          </li>
          <li className='mt-6 lg:mt-0'>
            <div className='flex'>
              <span className='flex items-center justify-center flex-shrink-0 w-6 h-6  text-violet-900 bg-orange-100 rounded-full dark:text-green-500 drark:bg-transparent'>
                <svg
                  className='w-4 h-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </span>
              <span className='ml-4  text-lg font-semibold leading-6  text-violet-900'>
                IA para redacciones y completar ideas
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Features
