import React, { useState, useEffect } from 'react'
import axios from 'axios'

/* 2.12* maiden tiedot, step1 */
/* Tee sovellus, jonka avulla voit tarkastella eri https://restcountries.eu maiden tietoja. 
/* Sovelluksen kannattaa hakea tiedot endpointista all */

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const countriesToShow = 
    countries.filter(
      country => country.name.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <div>
      <form>
        <div>
          Find countries <input 
            value={filter}
            onChange={handleFilterChange}/>
        </div>
      </form>
      
      <Countries countriesToShow={countriesToShow} setFilter={setFilter}/>
    </div>
  )
}

const Countries = (props) => {
  if (props.countriesToShow.length === 0) {
    return (
      <div>
        There are no countries that match your filter
      </div>
    )
  }
  else if (props.countriesToShow.length === 1) {
    return (
      <div>
        {props.countriesToShow.map(country => 
          <div key={country.alpha3Code}>
            <h2>{country.name}</h2>
            Capital: {country.capital}<br></br>
            Population: {country.population}

            <h3>Languages</h3>
            <ul>
              {country.languages.map(language =>
                <li key={language.name}>{language.name}</li>
              )}
            </ul>

            <img src={country.flag} height="100" width="120" alt="flag"/>

            <h3>Weather in {country.capital}</h3>
            <Weather capital={country.capital}/>
          </div>)}
      </div>
    )
  }
  /* 2.13*: maiden tiedot, step2 */
  /* Paranna edellisen tehtävän maasovellusta siten, että kun sivulla näkyy useiden maiden nimiä, */
  /* tulee maan nimen viereen nappi, jota klikkaamalla pääsee suoraan maan näkymään */
  else if (props.countriesToShow.length > 1 && props.countriesToShow.length <= 10) {
    return (
      <div>
        {props.countriesToShow.map(country => 
          <div key={country.alpha3Code}>
            {country.name}
            <button onClick={() => props.setFilter(country.name)}>show</button>
          </div>)}
      </div>
    )
  }
  else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

/* 2.14*: maiden tiedot, step3 */
/* Lisää yksittäisen maan näkymään pääkaupungin säätiedotus */
const Weather = (props) => {
  const [weather, setWeather] = useState([])

  console.log(weather)
  
  useEffect(() => {
    console.log('Weather')
    axios
      .get(`http://api.apixu.com/v1/current.json?key=a153232756284ee79c595542190508&q=${props.capital}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }, [])

  /* Ilman tätä if kohtaa, koko ohjelma kaatuu, sillä kaikki weather.current arvot ovat aluksi undefined, */
  /* ja näiden käyttäminen kaataa ohjelman (reactissa toiminnot eivät mene samoin järjestyksessä, kuten Javassa) */
  if (typeof weather.current != "undefined") {
    return (
      <div>
        <strong>Temperature:</strong> {weather.current.temp_c} Celsius<br></br>
        <img src={weather.current.condition.icon} alt="weather-icon"/><br></br>
        <strong>Wind:</strong> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
      </div>
    )
  }
  else {
    return (
      <div>
        Weather info was not found
      </div>
    )
  }
}

export default App;

// http://api.apixu.com/v1/current.json?key=a153232756284ee79c595542190508&q=Helsinki
