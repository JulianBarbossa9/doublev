import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchComponent from './components/SearchComponent'

function App() {
  

  return (
    <>
     <div className='flex flex-col justify-center align-middle text-center mt-8'>
        <h3 className='text-4xl font-bold underline'>Users of GitHub</h3>
        <SearchComponent />
     </div>
    </>
  )
}

export default App
