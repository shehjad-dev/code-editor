import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import CodeEditor from './components/CodeEditor'
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-900 text-white h-[100vh] py-[5vh] px-[100px]'>
      <CodeEditor />
      <Toaster />
    </div>
  )
}

export default App
