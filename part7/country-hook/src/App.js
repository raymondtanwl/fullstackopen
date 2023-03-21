import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  // console.log('useCountry hook', name)
  const [country, setCountry] = useState(null)

  const _buildCountryData = (isFound, data) => {
    if (isFound && data) {
      return {
        found: true,
        data: {
          name: data.name.common,
          capital: data.capital[0],
          population: data.population,
          flag: data.flags.png
        }
      }
    } else {
      return {
        found: false
      }
    }
  }

  useEffect(() => {
    // console.log('useCountry useEffect name', name)
    if (name) {
      axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`).then(response => {
        const isFound = (response.data.length > 0)
        const countryData = _buildCountryData(isFound, response.data[0])
        setCountry(countryData)
      }).catch((error) => {
        console.log('Error calling API from restcountries.com', error)
        const countryData = _buildCountryData(false)
        setCountry(countryData)
      })
    }
  }, [name])
  // https://react.dev/reference/react/useEffect#parameters
  // https://react.dev/reference/react/useEffect#examples-dependencies
  // tl;dr:
  // not passed in: runs after every single render
  // empty array: only run after initial render
  // array with dependency(ies): runs after initial render and after re-renders with changed dependencies
  // in this case, when name state has changed, trigger the function to call api and update country state which
  // trigger re-render of App with country details being rendered

  return country
}

const App = () => {
  // console.log('App init')
  const nameInput = useField('text')
  const [name, setName] = useState('')
  // when name state changes, trigger useCountry hook
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    // on submit, update the name state
    setName(nameInput.value)
    // console.log('>>> onSubmit fetch', name)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App