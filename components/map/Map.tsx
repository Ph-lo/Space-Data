import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet'

// WILL BE USED TO ADD FOCUS
export function ChangeView({ coords }: any) {
    const map = useMap();
  //  L.marker(coords, {icon: deathstar}).addTo(map);
  /* const lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  const darkLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  const baseMap = {
    "Dark theme": darkLayer,
    "Light theme": lightLayer
  }
  L.control.layers(baseMap).addTo(map) */
  map.setView(coords);
  return null;
}

type Props = {
    lat: number | null;
    lng: number | null;
    first: boolean;
};

console.log()

export default function Map() {
  const [geoData, setGeoData] = useState<Props>({ lat: null, lng: null, first: true });
  //const map = useMap();
  const center = [geoData.lat, geoData.lng];
  
  //const layerCtrl = L.control.layers(baseMap).addTo(map);

  const fetchData = () => {
    fetch("http://api.open-notify.org/iss-now.json", {
        method: 'GET'
    })
    .then(r => r.json())
    .then(res => {
        //console.log(res)
        setGeoData({ lat: res.iss_position.latitude, lng: res.iss_position.longitude, first: false});
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
        fetchData();
    }, 100);
    return () => clearInterval(interval);
  }, []);

 
  return (
    <>
    {(geoData.lat !== null && geoData.lng !== null) && (
    <MapContainer className='map-container' preferCanvas={true} center={center as LatLngExpression} zoom={4} style={{ height: '530px', zIndex: '0' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        
      />
        <Marker 
            position={[geoData.lat, geoData.lng]}             
        >
            <Popup>This is the ISS position</Popup>
        </Marker>
            {geoData.first && (
        <ChangeView coords={center} />
          )}
      
    </MapContainer>)}
    </>
  );
}
