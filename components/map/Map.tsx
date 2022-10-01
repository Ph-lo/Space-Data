import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import Switch from "react-switch";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import Loader from "../../components/Loader";

export function ChangeView({ coords }: any) {
  const map = useMap();
  map.setView(coords);
  return null;
}

type Props = {
  lat: number | null;
  lng: number | null;
  first: boolean;
};

const themes = {
  dark: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

type Theme = {
  theme: string;
  checked: boolean;
};

export default function Map() {
  const [geoData, setGeoData] = useState<Props>({
    lat: null,
    lng: null,
    first: true,
  });
  const [theme, setTheme] = useState<Theme>({
    theme: themes.light,
    checked: false,
  });
  const [focus, setFocus] = useState<boolean>(false);
  //const map = useMap();
  const center = [geoData.lat, geoData.lng];

  const fetchData = () => {
    fetch("http://api.open-notify.org/iss-now.json", {
      method: "GET",
    })
      .then((r) => r.json())
      .then((res) => {
        setGeoData({
          lat: res.iss_position.latitude,
          lng: res.iss_position.longitude,
          first: false,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 100);
    return () => clearInterval(interval);
  }, [theme]);

  const themeSwitch = () => {
    console.log(theme);
    if (theme.theme === themes.light) {
      setTheme({ theme: themes.dark, checked: true });
    } else {
      setTheme({ theme: themes.light, checked: false });
    }
  };

  const handleFocus = () => {
    setFocus((current) => !current);
  };

  return (
    <>
      {geoData.lat !== null && geoData.lng !== null ? (
        <>
          <div className="flex items-center mb-2">
            <Switch
              onChange={handleFocus}
              checked={focus}
              className="react-switch"
              onColor="#0369A1"
              uncheckedIcon={false}
              checkedIcon={false}
              offColor={"#949CA1"}
              handleDiameter={20}
              height={21}
              width={40}
            />
            <p className="ml-3">Stay focused</p>
          </div>
          <MapContainer
            preferCanvas={true}
            center={center as LatLngExpression}
            zoom={4}
            style={{ height: "530px", zIndex: "0" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[geoData.lat, geoData.lng]}>
              <Popup>This is the ISS position</Popup>
            </Marker>
            {focus && <ChangeView coords={center} />}
          </MapContainer>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
