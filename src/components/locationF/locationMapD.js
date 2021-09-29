import React, { Component, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Popup from "react-leaflet-editable-popup";

function LocationMarker(props) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    moveend() {
      let center = map.getCenter();
      let zoom = map.getZoom();

      props.effectOn.setState((state) => {
        state.lat = center.lat;
        state.lng = center.lng;
        return { ...state };
      });
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} removable editable>
      <Popup>You are here</Popup>
    </Marker>
  );
}
class MapA extends Component {
  state = {
    lat: 35.76218444303944,
    lng: 51.33657932281495,
  };

  render() {
    return (
      <MapContainer
        center={[this.state.lat, this.state.lng]}
        zoom={13}
        scrollWheelZoom={false}
        id="mapId"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker effectOn={this} />
      </MapContainer>
    );
  }
}

export default MapA;
