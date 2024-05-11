import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CTA from './components/CTA'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CTA/>
    </>
  )
}

export default App
