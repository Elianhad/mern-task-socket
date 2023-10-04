import useProjectContext from './hooks/useProjectContext'

function App() {
  const { projects } = useProjectContext()
  return (
    <div>
      <h1>Proyectos</h1>
      
    </div>
  )
}

export default App
