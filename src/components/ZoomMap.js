import React, { useState } from "react";
import {
  Marker,
  Popup,
  useMapEvents,

  //Rectangle,
} from "react-leaflet";

const LocationMarker = ({ func, posi }) => {
  //const [loaded, setLoaded] = useState(true);
  const [position, setPosition] = useState(null);
  console.log(position, "popos");
  const map = useMapEvents({
    click: function () {
      console.log(func, "aquiiii");
      map.locate();
    },
    locationfound(e) {
      setPosition(posi);
      map.flyTo(posi, map.getZoom());
    },
  });

  console.log(map);

  return position === null ? null : (
    <Marker position={position} removable editable>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
