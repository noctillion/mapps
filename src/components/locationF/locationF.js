import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";
import LocationMaker from "./locationMaker";

const LocationF = () => {
  return (
    <>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMaker />
      </MapContainer>
    </>
  );
};

export default LocationF;
