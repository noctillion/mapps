import React, { useEffect } from "react";

const MapquestOne = ({ height, width, center, tileLayer, zoom, apiKey }) => {
  useEffect(() => {
    console.log(apiKey);
    //api key
    window.L.mapquest.key = apiKey;
    // map inizialize
    const map = window.L.mapquest.map("map", {
      center,
      layers: window.L.mapquest.tileLayer(tileLayer),
      zoom,
    });
    map.addControl(window.L.mapquest.control());
  }, [apiKey, tileLayer, center, zoom]);
  return (
    <div id="map" style={{ width, height }}>
      <p>Cargando mapa</p>
    </div>
  );
};

export default MapquestOne;
