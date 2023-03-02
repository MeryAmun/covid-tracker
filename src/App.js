import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "./App.css";
import { InfoBox, LineGraph, Loader, Maps, Table } from "./components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { prettyPrintStat, sortData } from "./utils";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796})
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");
  const [loading, setLoading] = useState(true)
  const { todayCases, todayRecovered, todayDeaths, cases, recovered, deaths } =
    countryInfo;

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
          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data)
          setTableData(sortedData);
          setLoading(false)
        });
    };
    getApiData();
  }, []);

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
        setMapZoom(5)
      });
  };

if(loading){
 return ( <Loader/>)
}
  return (
    <div className="app">
      <div className="app-_left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
             sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
             
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
          <InfoBox 
           active={casesType === 'cases'}
          title="Coronavirus Cases" total={prettyPrintStat(cases)} cases={prettyPrintStat(todayCases)}
          onClick={() => setCasesType("cases")}
          isRed />
          <InfoBox 
           active={casesType === 'recovered'}
          title="Recovered" total={prettyPrintStat(recovered)} cases={prettyPrintStat(todayRecovered)} 
           onClick={() => setCasesType("recovered")}
          />
          <InfoBox 
          active={casesType === 'deaths'}
          title="Deaths" 
          total={prettyPrintStat(deaths)} cases={prettyPrintStat(todayDeaths)} 
           onClick={() => setCasesType("deaths")}
           isRed
          />
        </div>
        <Maps center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
          <h3>Live Cases By Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className="app__worldTitle">Worldwide New {casesType}</h3>
          {/* Graph*/}
          <LineGraph casesType={casesType} className='app__graph'/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
