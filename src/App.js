import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,

  //Rectangle,
} from "react-leaflet";

import { Icon } from "leaflet";
//import * as parkData from "./data/skateboard-parks.json";
//import * as lines from "./data/lines.json";
import * as routedata from "./data/data.json";
import LatLon from "geodesy/latlon-spherical.js";
import "./App.css";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
//import LocationMarker from "./components/ZoomMap";

//import MapquestOne from "./components/mapquestone/mapquestOne";

export const icon = new Icon({
  iconUrl: "address.svg", //"/skateboarding.svg",address.svg, LogoMakr-5RTw5R.png
  iconSize: [35, 35], //25
});

export const start = new Icon({
  iconUrl: "startup-rocket-launch.svg", //"/skateboarding.svg",
  iconSize: [45, 45], //25
});

export const end = new Icon({
  iconUrl: "race.svg", //"/skateboarding.svg",
  iconSize: [45, 45], //25
});

//console.log(lines.route.legs[0].maneuvers);

const MainButton = styled.button`
  margin-top: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
  //height: 40px;
  background-color: #ff0d1d;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  min-height: 2rem;
  text-decoration-line: none;
  width: 10em;
  text-align: center;

  &:hover {
    background-color: #bd0d19;
  }
`;

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [steps, setSteps] = useState("");
  const [kms, setKms] = useState("");
  const [distance, setDistance] = useState(Number("2"));
  const [positionD, setPositionD] = useState([]);
  const [newRoutD, setnewRoutD] = useState([]);
  const [letsseeM, setletsseeM] = useState([]);

  console.log(letsseeM, "letsseeM");

  const [initialSet, setInitialSet] = useState({
    center: [50.79961, -90.0839],
    zoom: 5,
    map: null,
  });

  console.log(distance);

  const chunk = (arr) => {
    const size = 2;
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i++) {
      const last = chunkedArray[chunkedArray.length - 1];
      if (!last || last.length === size) {
        chunkedArray.push([arr[i]]);
      } else {
        last.push(arr[i]);
      }
    }
    return chunkedArray;
  };

  let cons = (arr) => {
    let accu = [];
    for (let i = 0; i < arr.length - 1; i++) {
      const p1f = new LatLon(arr[i][0], arr[i][1]);
      const p2f = new LatLon(arr[i + 1][0], arr[i + 1][1]);
      const b1 = p1f.initialBearingTo(p2f);
      const d = p1f.distanceTo(p2f);
      //const reco = p1.destinationPoint(dist, b1);
      accu.push({ p1: p1f, p2: p2f, b1: b1, dist: d });
    }
    console.log(accu, "accu");

    const accumulate = (arr) =>
      arr.map(
        (
          (sum) => (value) =>
            (sum += value)
        )(0)
      );
    let ryu = accu.map((elem) => elem.dist);
    let bhu = accumulate(ryu);

    let accuK = [];
    for (let i = 0; i < accu.length; i++) {
      let yt = Object.assign(accu[i], { acum: bhu[i], id: i });
      accuK.push(yt);
    }
    return accuK;
  };

  useEffect(() => {
    const fetchD = async () => {
      try {
        const data = await fetch("http://localhost:8800/api/corridor");
        const response = await data.json();
        //console.log(response, "response");
        var result = chunk(response[0].shapePoints);
        //console.log(result, "result");
        setnewRoutD(result);
        let letsseeMs = cons(result);

        setletsseeM(letsseeMs);

        //console.log(letsseeM, "letsseeM ");
      } catch (error) {
        console.log(error);
      }
    };
    fetchD();
  }, []);

  //const [activePark, setActivePark] = React.useState(null);

  //const [lat, setLat] = useState("19.0333");
  //const [lng, setLng] = useState("-98.1833");

  const limeOptions = { color: "red" };
  //const blackOptions = { color: "black" };
  /*   const polyline = [
    [45.383321536272049, -75.3372987731628],
    [45.467134581917357, -75.546518086577947],
    [45.295014379864874, -75.898610599532319],
    [45.345566668964558, -75.760933332842754],
  ]; */

  /*  const rectangle = [
    [45.383321536272049, -75.3372987731628],
    [45.467134581917357, -75.546518086577947],
  ]; */

  /*  const der = lines.route.legs[0].maneuvers.map((elem) => {
    return Object.values(elem.startPoint).reverse();
  }); */

  /*   const chunk = (arr) => {
    const size = 2;
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i++) {
      const last = chunkedArray[chunkedArray.length - 1];
      if (!last || last.length === size) {
        chunkedArray.push([arr[i]]);
      } else {
        last.push(arr[i]);
      }
    }
    return chunkedArray;
  }; */

  //console.log(routedata, "routedataDeData");

  //let newRout = chunk(routedataD[0].shapePoints);
  let newRout = chunk(routedata.shapePoints);

  //console.log(der);

  useEffect(() => {}, []);

  let letssee = cons(newRout);

  /*   let b1null = letssee
    .filter((elem) => Number.isNaN(elem.b1))
    .map((elem) => elem.id); */

  let valg = (dist) => {
    let x = letssee.filter((a, i) => {
      if (a.acum <= dist) {
        return a;
      } else {
        return false;
      }
    });

    let vaf = letssee[x.splice(-1).pop().id + 1];
    const reco = vaf.p1.destinationPoint(vaf.acum - dist, vaf.b1);
    const posti = Object.values(reco);

    return posti;
  };

  let valgCD = (dist, letseeArr) => {
    let x = letseeArr.filter((a, i) => {
      if (a.acum <= dist) {
        return a;
      } else {
        return false;
      }
    });

    let vaf = letseeArr[x.splice(-1).pop().id + 1];
    const reco = vaf.p1.destinationPoint(vaf.acum - dist, vaf.b1);
    const posti = Object.values(reco);

    return posti;
  };

  /*  useEffect(() => {
    let frty = valg(distance);
    setPositionD(frty);

    setInitialSet({ ...initialSet, center: frty });
    const { map } = initialSet;
    if (map) map.flyTo(frty, 7.5);
  }, [distance]);
 */

  useEffect(() => {
    let frty = valg(distance);
    setPositionD(frty);

    setInitialSet({ ...initialSet, center: frty });
    const { map } = initialSet;
    if (map) map.flyTo(frty, 7.5);
  }, [distance]);

  //console.log(frty, "accc");

  /* const p1 = new LatLon(newRout[0][0], newRout[0][1]);
  const p2 = new LatLon(newRout[1][0], newRout[1][1]);
  const b1 = p1.initialBearingTo(p2); // 9.1419°

  console.log(newRout[1][0], "ohh");

  const d = p1.distanceTo(p2);
  console.log(d, "dis");

  const dist = 55000;

  const reco = p1.destinationPoint(dist, b1);

  const posti = Object.values(reco);

  console.log(posti, "reco"); */

  const sendData = (event) => {
    event.preventDefault();
    if (keyword === "wounding") {
      setDistance(kms);
    } else if (keyword !== "wounding") {
      alert("Please write the rigth keyword");
    }
    console.log("dddeerrttAqui");

    setKeyword("");
    setSteps("");
    setKms("");
  };

  return (
    <>
      <div id="map">
        <div
          style={{
            backgroundColor: "#287E9E",
            position: "relative",
            width: "100%",
          }}
        >
          <div className="formBlock">
            <form id="form" onSubmit={sendData}>
              <input
                type="text"
                className="input"
                id="start"
                placeholder="User Key"
                value={keyword}
                name="keyword"
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
              <input
                type="text"
                value={steps}
                name="steps"
                className="input"
                id="destination"
                placeholder="steps"
                onChange={(e) => setSteps(e.target.value)}
              />
              <div style={{ color: "white" }}>or</div>
              <input
                type="text"
                value={kms}
                name="kms"
                className="input"
                id="destinationkm"
                placeholder="km"
                onChange={(e) => setKms(e.target.value)}
              />
              <MainButton type="submit">Submit</MainButton>
              {/* <button type="submit">Get Directions</button> */}
            </form>
          </div>
          <div className="blackScreen">
            <div className="innerScreen">
              <span>Distance left: 23456 km</span>
              <span>Distance covered: 456 km</span>
              <span>Number of contributions: 56745</span>
            </div>
          </div>

          <Sidebar />

          <MapContainer
            center={initialSet.center}
            zoom={initialSet.zoom}
            whenCreated={(map) => setInitialSet({ map })}
            /* scrollWheelZoom={false} */
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker func={clicked} posi={positionD} /> */}
            {/* <Polyline pathOptions={limeOptions} positions={der} /> */}
            {/*   <Polyline pathOptions={limeOptions} positions={shapePoints} /> */}
            <Polyline pathOptions={limeOptions} positions={newRoutD} />
            {/* Route Shape */}
            {/*  <Rectangle bounds={rectangle} pathOptions={blackOptions} /> */}
            {/* <Marker position={[47.563034, -52.710678]} />
        <Marker position={[47.540806, -52.724449]} /> */}
            <Marker position={newRout[0]} icon={start}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={newRout.slice(-1).pop()} icon={end}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker position={positionD} />
            {/* reco */}
            {/* icon={icon} */}

            {/* {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            position={[
              park.geometry.coordinates[1],
              park.geometry.coordinates[0],
            ]}
            onClick={() => {
              setActivePark(park);
            }}
            icon={icon}
          />
        ))}

        {activePark && (
          <Popup
            position={[
              activePark.geometry.coordinates[1],
              activePark.geometry.coordinates[0],
            ]}
            onClose={() => {
              setActivePark(null);
            }}
          >
            <div>
              <h2>{activePark.properties.NAME}</h2>
              <p>{activePark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )} */}
          </MapContainer>
          {/*       <MapquestOne
        height="80vh"
        width="100%"
        center={[lat, lng]}
        tileLayer={"map"}
        zoom={12}
        apiKey="GTM0fLDaKICVG6X5xJfvkTtGMGB8Zgx4"
      /> */}
        </div>
      </div>
    </>
  );
}
