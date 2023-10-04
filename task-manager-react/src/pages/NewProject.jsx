import React from 'react'
import FormProject from '../components/FormProject'

const NewProject = () => {
  return (
    <div>
      <h2 className='text-xl font-semibold text-violet-800'>Crear Proyecto</h2>
      <div className='w-full md:w-3/4 mx-auto mt-10 bg-rose-50 rounded'>
        <FormProject/>
      </div>
    </div>
  )
}

export default NewProject