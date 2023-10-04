import React from 'react'
import { Link } from 'react-router-dom'
const HeroCTA = () => {
  return (
    <section className='md:max-w-[60rem] min-w-fit mx-auto py-12 md:p-6 relative'>
      <div className='w-full'>
        <div className='p-4 lg:p-8 grid lg:grid-cols-2 gap-8 place-items-center'>
          <div>
            <h2 className='font-bold text-2xl lg:text-4xl text-violet-700 text-right md:text-center '>
              Proyecta, concreta y colabora con ideas
            </h2>
            <p className='font-semibold text-xl text-right text-gray-700 md:w-1/2 md:text-center mx-auto'>
              Realiza proyectos rápidamente sólo con la información necesaria
              para realizarlos, con posibilidad de agregar colaboradores de
              manera simple y segura.
            </p>
          </div>
          <div>
            <Link
              to='/account'
              className='bg-violet-700 rounded mt-3 md:mt-0 p-2 text-center text-orange-200 uppercase font-bold w-2/3 mx-auto hover:bg-violet-500 transition-colors'
              >
              Empezar una nueva idea!!{' '}
            </Link>
          </div>
        </div>
      </div>
      <div className='absolute left-0 right-0 top-0 -z-10 w-full h-full bg-hero bg-center bg-no-repeat bg-cover opacity-70 rounded-2xl'></div>
    </section>
  )
}

export default HeroCTA
