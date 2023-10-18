import
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Current weather in x is x.</p>
      <container>
        <LeftPanel />
        <CentralPanel />
        <RightPanel /> 
      </container>
    </>

  )
}

export default App
