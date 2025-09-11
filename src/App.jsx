import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')

  async function getData() {
    fetch(`https://restcountries.com/v3.1/name/${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res)))
  }

  return (
    <>
    <h1>{query}</h1>
    <input type="text" onChange={(e) => setQuery(e.target.value)}/>
    <button onClick={getData}>Search country</button>
    </>
  )
}

export default App
