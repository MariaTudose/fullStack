import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({country}) => {
    const [weather, setWeather] = useState([])

    const hook = () => {
        axios.get(`http://api.apixu.com/v1/current.json?key=e79cfe8ff41d452c807234107193003&q=${country.capital}`).then(response => {
            setWeather(response.data.current)
        })
    }

    useEffect(hook, [])
    
    if (weather.length === 0) {
        return(<></>)
    }

    return (
        <>
            <h3>Weather in {country.name}</h3>
            <p><b>temperature:</b> {weather.temp_c} Celsius </p>
            <img src={`http:${weather.condition.icon}`} alt="temp"/>
            <p><b>wind:</b> {weather.wind_kph} kph direction {weather.wind_dir}</p>
        </>
    )
}

const Country = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            <img style={{ maxWidth: 250 }} src={country.flag} alt="flag" />

        </>
    )
}

const Countries = ({ countries, filter, showCountry }) => {
    let filtered = countries.filter(country => country.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

    if (filtered.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (filtered.length === 1) {
        let country = filtered[0]
        return (
            <div>
                <Country country={country} />
                <Weather country={country} />
            </div>
        )
    } else {
        return (
            <ul>
                {filtered.map(country => <div key={country.name} ><li key={country.name}>{country.name} <button onClick={() => showCountry(country)}>show</button></li></div>)}
            </ul>
        )
    }

}

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            find countries <input value={filter} onChange={handleFilter} />
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const hook = () => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
        })
    }

    useEffect(hook, [])

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const showCountry = (country) => {
        setFilter(country.name)
    }

    return (
        <div>
            <Filter filter={filter} handleFilter={handleFilter} />
            <Countries countries={countries} filter={filter} showCountry={showCountry} />
        </div>
    );
}

export default App;
