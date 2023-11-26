import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Current weather in x is x.</p>
      <container className="flex">
        <LeftPanel />
        <CentralPanel />
        <RightPanel /> 
      </container>
    </>

  )
}

export default App
