import React from 'react';
import './maps.css'
import { MapContainer , TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../utils';


const Maps = ({center,casesType, zoom,countries}) => {
 
  return (
    <div className='map'>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
  {/* write a function to loop through the countries and draw circles */}
{showDataOnMap(countries,casesType)}
      </MapContainer>
    </div>
  )
}

export default Maps