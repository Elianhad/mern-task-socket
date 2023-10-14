import FormProject from '../components/FormProject'

const NewProject = () => {
  return (
    <div>
      <h2 className='text-xl font-semibold text-violet-800'>Crear Proyecto</h2>
      <div className='max-w-lg mx-auto mt-10 bg-rose-50 rounded'>
        <FormProject />
      </div>
    </div>
  )
}

export default NewProject