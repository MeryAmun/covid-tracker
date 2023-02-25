import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "./App.css";
import { InfoBox, Maps } from "./components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({})

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
     countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data)
    })
  };
console.log(countryInfo)
  useEffect(() => {
  
     fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
         setCountryInfo(data);
        }); 
  }, []);
  useEffect(() => {
    const getApiData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getApiData();
  }, []);

  return (
    <div className="app">
      <div className="app-_left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(({ name, value }, index) => (
                <MenuItem value={value} key={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>
        {/* Info Boxes */}
        {/* Info Boxes */}
        {/* Info Boxes */}
        <Maps />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
           {/* Table */}
          <h3>Worldwide New Cases</h3>
                  {/* Graph*/}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
