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
//import * as routedata from "./data/data.json";
import LatLon from "geodesy/latlon-spherical.js";
import "./App.css";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";

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
  const [distance, setDistance] = useState(null);
  const [positionD, setPositionD] = useState([]);
  const [newRoutD, setnewRoutD] = useState([]);
  const [letsseeM, setletsseeM] = useState([]);
  const [lastPoint, setLastPoint] = useState([]);
  const [setNewDistance] = useState([]);
  const [lastCummDistance, setLastCummDistance] = useState(null);
  const [remainingDista, setRemainingDista] = useState(null);
  const [contribNu, setContribNu] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [initialSet, setInitialSet] = useState({
    center: [50.79961, -90.0839],
    zoom: 5,
    map: null,
  });

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
        var result = chunk(response[0].shapePoints);
        setnewRoutD(result);
        let letsseeMs = cons(result);

        setletsseeM(letsseeMs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchD();
  }, []);

  useEffect(() => {
    const fetchD = async () => {
      try {
        const data = await fetch("http://localhost:8800/api/pins");
        const response = await data.json();
        const lastPointM = response.splice(-1).pop();
        //console.log(lastPointM, "responseCoord");

        setLastPoint(response);
        setPositionD(lastPointM.latlong);
        setLastCummDistance(lastPointM.cummulatedDistance);
        setDistance(
          Math.trunc((7432669.473190754 - lastPointM.cummulatedDistance) / 1000)
        );
        setContribNu(response.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchD();
  }, []);

  const limeOptions = { color: "red" };

  let valg = (dist, arr) => {
    let x = arr.filter((a, i) => {
      if (a.acum <= dist) {
        return a;
      } else {
        return false;
      }
    });

    let vaf = arr[x.splice(-1).pop().id + 1];
    const reco = vaf.p1.destinationPoint(vaf.acum - dist, vaf.b1);
    const posti = Object.values(reco);

    return posti;
  };

  useEffect(() => {
    let remainD = Math.trunc(7432669.473190754 / 1000) - distance;
    setRemainingDista(remainD);
  }, [distance]);

  const Consolidate = async (data) => {
    const res = await fetch("http://localhost:8800/api/pins", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    /* .then((res) => console.log(res)); */
    const response = res;
    setNewDistance(response);

    //setDataToProviderConsolidated(response);
  };

  const sendData = (event) => {
    event.preventDefault();
    /////

    ////
    let currDist = lastCummDistance;
    console.log(currDist, "currDist");
    let tempDist = null;
    if (keyword === "wounding") {
      if (kms) {
        tempDist = Number(kms) * 1000 + currDist;
      }
      if (steps) {
        tempDist = (Number(steps) / 1312) * 1000 + currDist;
      }

      setContribNu(lastPoint.length + 1);
      setDistance(Math.trunc((7432669.473190754 - tempDist) / 1000));
      let frty = valg(tempDist, letsseeM);
      setPositionD(frty);
      Consolidate({
        latlong: frty,
        cummulatedDistance: tempDist,
        newDistance: Number(kms),
      });
      const { map } = initialSet;
      if (map) map.flyTo(frty, 9.5);
      setDisabled(true);
    } else if (keyword !== "wounding") {
      alert("Please write the rigth keyword");
    }

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
                disabled={disabled}
              />
              <input
                type="text"
                value={steps}
                name="steps"
                className="input"
                id="destination"
                placeholder="steps"
                onChange={(e) => setSteps(e.target.value)}
                disabled={kms ? !disabled : disabled}
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
                disabled={steps ? !disabled : disabled}
              />
              <MainButton type="submit">Submit</MainButton>
            </form>
          </div>
          <div className="blackScreen">
            <div className="innerScreen">
              <span>Distance left: {distance} km</span>
              <span>Distance covered: {remainingDista} km</span>
              <span>Number of contributions: {contribNu}</span>
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

            <Polyline pathOptions={limeOptions} positions={newRoutD} />

            {newRoutD.length > 0 ? (
              <>
                {" "}
                <Marker position={newRoutD[0]} icon={start}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                <Marker position={newRoutD.slice(-1).pop()} icon={end}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            ) : null}
            {positionD.length > 0 ? (
              <>
                <Marker position={positionD}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </>
            ) : null}
          </MapContainer>
        </div>
      </div>
    </>
  );
}
