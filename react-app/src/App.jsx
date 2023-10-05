import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [ data, setData ] = useState("")

  const makeApiCall = async () => {
    try {
      const response = await fetch('http://localhost:3001/api')
      const data = await response.json()
      console.log({data})
      setData(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    makeApiCall()
  },[])

  return (
    <>
     <div>
        <h3>{data}</h3>
     </div>
    </>
  )
}

export default App
