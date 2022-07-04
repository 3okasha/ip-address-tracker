import React, { useState } from "react";
import "./style/style.css";
import IpSection from "./components/Ip/IpSection";
import MapSection from "./components/Map/MapSection";
import axios from "axios";
import Footer from "./components/Footer";

function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: "36.531544",
    longitude: "-119.586168",
  });
  const findCoordinates = (location) => {
    // axios
    //   .post("http://localhost:7001/postLocation", {
    //     location: location,
    //   })
    //   .then((response) => {
    //     setCoordinates({
    //       latitude: response.data.lat,
    //       longitude: response.data.long,
    //     });
    //   })
    //   .catch((error) => console.log(error));

    /*For deploying purposes on Vercel, I used the direct positionstack API call without passing through my small nodejs server*/
    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=37de37f43241d3f8f6355c6f8b78a934&query=${location}`
      )
      .then((response) => {
        setCoordinates({
          latitude: response["data"]["data"][0]["latitude"],
          longitude: response["data"]["data"][0]["longitude"],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <IpSection findCoordinates={findCoordinates} />
      <MapSection coordinates={coordinates} />
      <Footer />
    </>
  );
}

export default App;
