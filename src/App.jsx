import {useState} from 'react'
import './App.css'
import ReactCountryFlag from 'react-country-flag'
import CurrencyChart from './components/CurrencyCharts'
import { FaMagnifyingGlass } from "react-icons/fa6";
import NewCurrencyCharts from './components/NewCurrencyCharts';

function App() {
  const [query, setQuery] = useState('')
  const [queryInput, setQueryInput] = useState('')
  const [data, setData] = useState('')
  const [currencyCode, setCurrencyCode] = useState([]);
  const [targetCurrency, setTargetCurrency] = useState('');

  async function getData() {
    fetch(`https://restcountries.com/v3.1/name/${queryInput}`)
    .then(res => res.json())
    .then(json => setData(Array.isArray(json) ? json : []))
    .catch(err => console.error(err))
  }

  return (
    <div className="relative min-h-screen">
      {/* Bakgrundsbild */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>

    <div className="absolute inset-0 bg-black/50 z-0"></div>

    <div className='relative z-20 flex flex-col items-center gap-6 p-4 min-h-screen'>
    <h1>{query}</h1>
    <div className='flex gap-4 justify-center m-auto'>
    <form className='flex gap-4 justify-center w-full' onSubmit={(e) => {
      e.preventDefault();
      if (queryInput.trim() !== '') {
        setQuery('')
        getData(queryInput)
        setQueryInput('')
      }
    }}
    >
    <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4 justify-center'>
    <input className='bg-gray-200 p-4 rounded-2xl text-3xl focus:outline-none focus:ring-2 focus:ring-purple-400 w-full' value={queryInput} type="text" placeholder='Search for a country...' onChange={(e) => setQueryInput(e.target.value)} autoFocus/>
    <button className='
    bg-gradient-to-r from-purple-500 to-pink-500
    text-white
    p-4
    rounded-3xl
    shadow-lg
    flex items-center justify-center
    transform
    transition
    duration-300
    hover:scale-110
    hover:shadow-2xl
    active:scale-95
    active:shadow-md
    cursor-pointer w-full md:w-48 h-full'> <FaMagnifyingGlass size={24} className="mr-2" />
  <span className="font-semibold text-lg">Search</span></button>
  </div>
  </form>
    </div>
    
    {data && data.map(country => (
      <div key={country.cca3} className='flex gap-4 p-4'>
        <div className='bg-white/20 backdrop-blur-md text-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto'>
        <p>Flag:</p><ReactCountryFlag svg countryCode={country.cca2} className='text-9xl'/>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        </div>

      <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-xl">
        <h3 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'>{country.name.common} - {currencyCode} → {targetCurrency} (Last 30 days) </h3>
        <div className='w-full h-80 md:h-96'>
              <CurrencyChart country={country} currencyCode={currencyCode} setCurrencyCode={setCurrencyCode} targetCurrency={targetCurrency} setTargetCurrency={setTargetCurrency}/>
              <NewCurrencyCharts />
        </div>
        
      </div>
      </div>
    ))}
    </div>
    </div>
  )
}

export default App
