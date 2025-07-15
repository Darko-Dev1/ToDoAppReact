import { useEffect, useState } from 'react'
import SearchTab from './components/searchTab'


function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

    const jsonapi = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos")
      const resaw = await res.json()
      console.log(resaw)
    }

    jsonapi()

  }, [])

  return (
    <> 
      <SearchTab></SearchTab>
    </>
  )
}

export default App
