import React, { useState } from "react";
import "./style/style.css";
import IpSection from "./components/Ip/IpSection";
import MapSection from "./components/Map/MapSection";

function App() {
  return (
    <>
      <IpSection />
      <MapSection />
    </>
  );
}

export default App;
