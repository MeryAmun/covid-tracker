import React, { useState, useEffect } from 'react'
import { FormControl, MenuItem, Select } from "@mui/material";
import "./App.css";
import { InfoBox } from './components'



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")


  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    console.log('testing1234',countryCode)
    setCountry(countryCode)
  }
  
useEffect(() => {
  const getApiData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json())
     .then((data) => {
      const countries = data.map((country) => ({
          name:country.country,
          value:country.countryInfo.iso2
        }));
        setCountries(countries)
    })
    }
  getApiData()
}, [])


  return (
    <div className="app">
     <div className="app__header">
     <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
          {
            countries.map(({name, value}, index) => (
              <MenuItem value={value} key={index}>{name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
     </div>
<div className="app__stats">
  <InfoBox title='Coronavirus Cases' total={3000} cases={4000}/>
  <InfoBox title='Recovered' total={3000} cases={4000}/>
  <InfoBox title='Deaths' total={3000} cases={4000}/>
{/* Info Boxes title=coronavirus cases */}
{/* Info Boxes title=coronavirus recoveries */}
{/* Info Boxes title=coronavirus deaths */}
</div>
      {/* Info Boxes */}
      {/* Info Boxes */}
      {/* Info Boxes */}

      {/* Map */}
      {/* Table */}
      {/* Graph*/}
    </div>
  );
}

export default App;
