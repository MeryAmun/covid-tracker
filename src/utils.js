import React from 'react'
import { Popup , Circle} from 'react-leaflet';
import './components/maps/maps.css'
import numeral from 'numeral'

const casesTypeColors = {
    cases:{
        hex:"#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier:70
    },
    recovered:{
        hex:"#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier:70
    },
    deaths:{
        hex:"#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier:70
    },
}
// sort data function

export const sortData = (data) =>{
    const sortedData = [...data];
   return sortedData.sort((a,b) =>  b.cases - a.cases)//descending order
   //return sortedData.sort((a,b) =>  a.cases > a.cases ? -1 : 1)//descending order
   //return sortedData.sort((a,b) => a.cases - b.cases) ascending order
  
}


// set data to graph format function

export const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x:date,
                y:data[casesType][date] - lastDataPoint
            };
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
    };
    return chartData
}

export const showDataOnMap = (data, casesType) => 
   data.map((country, index) => (
<Circle
key={index}
center={[country.countryInfo.lat, country.countryInfo.long]}
color={casesTypeColors[casesType].hex}
fillColor={casesTypeColors[casesType].hex}
fillOpacity={0.4}
radius={
    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
}

>
<Popup>
    <div className="map__popup">
    <div className='map__popupFlag' style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
        <div className='map__popupCountry'>{country.country}</div>
        <div className='map__popupConfirmed'><strong>Cases</strong>: {numeral(country.cases).format("0,0")}</div>
        <div className='map__popupRecovered'><strong>Recovered</strong>: {numeral(country.recovered).format("0,0")}</div>  
        <div className='map__popupDeath'><strong>Deaths</strong>: {numeral(country.deaths).format("0,0")}</div>
    </div>
</Popup>
</Circle>
    ))



    export const prettyPrintStat = (stat) => 
stat ? `+${numeral(stat).format("0,0a")}` : "+0"
    
