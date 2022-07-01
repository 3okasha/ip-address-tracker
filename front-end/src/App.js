import React, { useState } from "react";
import "./style/style.css";
import IpSection from "./components/Ip/IpSection";
import MapSection from "./components/Map/MapSection";
import axios from "axios";

function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: "36.531544",
    longitude: "-119.586168",
  });
  const findCoordinates = (location) => {
    axios
      .post("http://localhost:7001/postLocation", {
        location: location,
      })
      .then((response) => {
        setCoordinates({
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <IpSection findCoordinates={findCoordinates} />
      <MapSection coordinates={coordinates} />
    </>
  );
}

export default App;
