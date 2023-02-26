import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "./App.css";
import { InfoBox, LineGraph, Maps, Table } from "./components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { sortData } from "./utils";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796])
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const { todayCases, todayRecovered, todayDeaths, cases, recovered, deaths } =
    countryInfo;

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4)
        console.log(data)
      });
  };
  console.log(mapCenter)

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
          setMapCountries(data)
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
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
          <InfoBox title="Coronavirus Cases" total={cases} cases={todayCases} />
          <InfoBox title="Recovered" total={recovered} cases={todayRecovered} />
          <InfoBox title="Deaths" total={deaths} cases={todayDeaths} />
        </div>
        <Maps center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          {/* Graph*/}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
