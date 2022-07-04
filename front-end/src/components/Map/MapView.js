import React from "react";
import { useMap } from "react-leaflet";

const MapView = (props) => {
  const map = useMap();
  map.setView([props.coordinates.latitude, props.coordinates.longitude], 13);
  return null;
};

export default MapView;
