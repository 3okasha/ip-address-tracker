import React from "react";

const MapSection = () => {
  return (
    <section id="map-container">
      <div
        className="vh-100"
        id="map"
        style={{ /* height: 100vh; */ zIndex: "-1" }}
      ></div>
    </section>
  );
};

export default MapSection;
