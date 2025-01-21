// import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Books from './components/books/books'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <main>
        <Navbar/>
        <div className="header">
          <h2>Lista e Librave</h2>
        </div>
        <Books/>
      </main>
    </>
  )
}

export default App
