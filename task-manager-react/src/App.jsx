import useProjectContext from './hooks/useProjectContext'
import ProjectPreview from './components/ProjectPreview'
function App() {
  const { projects } = useProjectContext()
  return (
    <div>
      <h1 className='text-2xl font-semibold text-violet-800 uppercase text-center'>Proyectos</h1>
      <main className='p-2 mt-4 flex flex-col gap-2 max-w-2xl mx-auto'>
        {
          !projects?.length ?
            <p className='text-lg text-violet-600 font-semibold'>Esto se ve vacío. Inicia un proyecto 😎</p> :
            projects.map(( project ) => {
              return (
                <ProjectPreview project={project} key={project._id} />
              )
            })
        }
      </main>
    </div>
  )
}

export default App
