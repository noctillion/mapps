import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
  useMapEvents,

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

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
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

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [steps, setSteps] = useState("");
  const [kms, setKms] = useState("");
  const [distance, setDistance] = useState(Number("2"));
  const [positionD, setPositionD] = useState([]);
  console.log(distance);

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

  /*   const shapePoints = [
    [40.203735, -76.729667],
    [40.203617, -76.729705],
    [40.203617, -76.729705],
    [40.203571, -76.733085],
    [40.203571, -76.733085],
    [40.212993, -76.735542],
    [40.212993, -76.735542],
    [40.222515, -76.753242],
    [40.222515, -76.753242],
    [40.222, -76.754974],
    [40.222, -76.754974],
    [40.227867, -76.757873],
    [40.227867, -76.757873],
    [40.227539, -76.761886],
    [40.227539, -76.761886],
    [40.221908, -76.783859],
    [40.221908, -76.783859],
    [40.249027, -76.812561],
    [40.249027, -76.812561],
    [40.304954, -76.83039],
    [40.304954, -76.83039],
    [40.301498, -76.872665],
    [40.301498, -76.872665],
    [40.364498, -76.92881],
    [40.368495, -76.981414],
    [40.382682, -77.016967],
    [40.397239, -77.008132],
    [40.430889, -77.010658],
    [40.471801, -77.032135],
    [40.480957, -77.049224],
    [40.479011, -77.068656],
    [40.493789, -77.082611],
    [40.498321, -77.126365],
    [40.526847, -77.134216],
    [40.564601, -77.169754],
    [40.57061, -77.243759],
    [40.539234, -77.341888],
    [40.556442, -77.362098],
    [40.594371, -77.377586],
    [40.611503, -77.445732],
    [40.579284, -77.551391],
    [40.622348, -77.580848],
    [40.653442, -77.583488],
    [40.668922, -77.604171],
    [40.683479, -77.607658],
    [40.703529, -77.597267],
    [40.727935, -77.604621],
    [40.732955, -77.63565],
    [40.760101, -77.614212],
    [40.794662, -77.625228],
    [40.798587, -77.656425],
    [40.779037, -77.771057],
    [40.779037, -77.771057],
    [40.778633, -77.793205],
    [40.778633, -77.793205],
    [40.777702, -77.793266],
  ]; */

  /*  const shapePointsDos = [
    47.563023, -52.710659, 47.563034, -52.710678, 47.563034, -52.710678,
    47.540806, -52.724449, 47.50325, -52.780273, 47.497005, -52.802975,
    47.51104, -52.828621, 47.509804, -52.854946, 47.509804, -52.854946,
    47.510857, -52.853992, 47.510857, -52.853992, 47.475849, -52.875458,
    47.462139, -52.894753, 47.463657, -52.933224, 47.409176, -53.018265,
    47.35181, -53.053936, 47.340687, -53.075893, 47.342064, -53.111446,
    47.32645, -53.143375, 47.340675, -53.201725, 47.35767, -53.215755,
    47.371391, -53.261955, 47.397068, -53.27718, 47.412815, -53.331738,
    47.438957, -53.354858, 47.447292, -53.406467, 47.450607, -53.576118,
    47.478931, -53.666862, 47.522396, -53.719986, 47.535233, -53.720509,
    47.548725, -53.73605, 47.554741, -53.758686, 47.617146, -53.788364,
    47.620361, -53.821556, 47.648445, -53.864738, 47.672832, -53.878353,
    47.691032, -53.901527, 47.718624, -53.909195, 47.729431, -53.933544,
    47.75552, -53.93594, 47.780315, -53.976387, 47.804115, -53.963463,
    47.816624, -53.969257, 47.830925, -53.959499, 47.917839, -53.946629,
    47.941845, -53.947811, 47.972023, -53.96249, 48.014103, -53.954865,
    48.027153, -53.965286, 48.031876, -53.938129, 48.042324, -53.932125,
    45.920044, -72.476067, 45.909531, -72.489761, 45.909687, -72.516563,
    45.78038, -72.671631, 45.666927, -72.852615, 45.632572, -73.023979,
    45.595463, -73.137947, 45.593727, -73.243835, 45.570244, -73.402382,
    45.57708, -73.46888, 45.57708, -73.46888, 45.579712, -73.475273, 45.534897,
    -73.51828, 45.534897, -73.51828, 45.531803, -73.52301, 45.531803, -73.52301,
    45.525112, -73.516281, 45.525112, -73.516281, 45.526016, -73.554924,
    45.526016, -73.554924, 45.523048, -73.546791, 45.523048, -73.546791,
    45.517704, -73.549995, 45.517704, -73.549995, 45.517506, -73.550148,
    45.517506, -73.550148, 45.515751, -73.551918, 45.515751, -73.551918,
    45.511379, -73.556007, 45.511379, -73.556007, 45.510738, -73.554604,
    45.510738, -73.554604, 45.510975, -73.554459, 45.510975, -73.554459,
    45.510132, -73.552528, 45.510132, -73.552528, 45.509064, -73.55336,
    45.509064, -73.55336, 45.506176, -73.555664, 45.506176, -73.555664,
    45.506874, -73.557304, 45.506874, -73.557304, 45.508282, -73.556221,
    45.508282, -73.556221, 45.472046, -73.597313, 45.472046, -73.597313,
    45.501308, -73.663277, 45.501308, -73.663277, 45.489067, -73.710045,
    45.488842, -73.77372, 45.420399, -73.930412, 45.415848, -74.023018,
    45.400818, -74.060577, 45.42387, -74.088173, 45.438885, -74.18885,
    45.488045, -74.30629, 45.486691, -74.342232, 45.511272, -74.372314,
    45.534931, -74.380066, 45.539219, -74.389801, 45.539219, -74.389801,
    45.564674, -74.506943, 45.542721, -74.542114, 45.509727, -74.571404,
    45.443798, -74.731812, 45.422928, -74.763855, 45.397636, -74.776169,
    45.385143, -74.795532, 45.365189, -74.871231, 45.332031, -74.927864,
    45.323204, -75.002594, 45.304058, -75.070282, 45.304379, -75.138321,
    45.317616, -75.165977, 45.313156, -75.253929, 45.330151, -75.288521,
    45.351231, -75.456245, 45.362419, -75.481941, 45.375282, -75.569489,
    45.423084, -75.617363, 45.417343, -75.669655, 45.417343, -75.669655,
    45.423313, -75.687469, 45.423313, -75.687469, 45.42104, -75.693039,
    45.42104, -75.693039, 45.419792, -75.692078, 45.419792, -75.692078,
    45.420422, -75.692429, 45.420422, -75.692429, 45.420361, -75.692589,
    45.420361, -75.692589, 45.412247, -75.685501, 45.412247, -75.685501,
    45.410595, -75.689445, 45.410595, -75.689445, 45.396851, -75.727898,
    45.366215, -75.759186, 45.347359, -75.794106, 45.320217, -75.886765,
    45.271954, -75.977356, 45.310375, -76.042778, 45.339222, -76.186882,
    45.362064, -76.233376, 45.417137, -76.307243, 45.420689, -76.370995,
    45.434811, -76.39521, 45.439716, -76.463608, 45.439716, -76.463608,
    45.448654, -76.600708, 45.476017, -76.630501, 45.490784, -76.666336,
    45.536869, -76.705238, 45.565037, -76.756493, 45.573425, -76.813744,
    45.72488, -76.994972, 45.749077, -77.007881, 45.766048, -77.076714,
    45.799801, -77.125946, 45.790466, -77.181015, 45.823162, -77.213394,
    45.84827, -77.276474, 45.872429, -77.298744, 45.920044, -77.320229,
    47.906021, -84.817581, 47.920551, -84.805222, 47.944427, -84.809685,
    47.972618, -84.784088, 47.994598, -84.819633, 48.022038, -84.823448,
    48.036533, -84.836105, 48.068249, -84.807739, 48.130627, -84.813324,
    48.150948, -84.807098, 48.186668, -84.842918, 48.210201, -84.847115,
    48.247089, -84.882942, 48.288425, -84.890266, 48.297817, -84.984154,
    48.356136, -85.067009, 48.375385, -85.087029, 48.394138, -85.079147,
    48.533031, -85.162209, 48.565319, -85.253166, 48.590939, -85.26757,
    48.596478, -85.316902, 48.631317, -85.349968, 48.630505, -85.391045,
    48.641937, -85.436752, 48.688755, -85.498573, 48.714661, -85.578484,
    48.714195, -85.618568, 48.724312, -85.63089, 48.712265, -85.727943,
    48.716999, -85.790123, 48.691177, -85.895798, 48.693619, -86.032509,
    48.682243, -86.185257, 48.705788, -86.257378, 48.711906, -86.320816,
    48.744781, -86.335327, 48.758621, -86.351601, 48.781197, -86.423386,
    48.797279, -86.43943, 48.789513, -86.480171, 48.794937, -86.498444,
    48.773575, -86.510544, 48.762932, -86.532616, 48.789555, -86.612747,
    48.801926, -86.624809, 48.796196, -86.648819, 48.815746, -86.675514,
    48.817444, -86.705025, 48.799644, -86.74855, 48.803944, -86.774971,
    48.777679, -86.866692, 48.775852, -86.902702, 48.808727, -86.939034,
    48.844791, -86.942802, 48.85458, -86.960732, 48.85154, -87.0271, 48.832813,
    -87.071571, 48.79961, -87.0839, 48.78162, -87.102058, 48.793053, -87.218231,
    48.801762, -87.233009, 48.798496, -87.254898, 48.816093, -87.273415,
    48.828011, -87.346252, 48.823631, -87.369942, 48.828457, -87.390045,
    48.840576, -87.400543, 48.836525, -87.507874, 48.842216, -87.520752,
    48.85458, -87.520622, 48.85458, -88.516457, 48.794445, -88.540916,
    48.726707, -88.5942, 48.716873, -88.620789, 48.670357, -88.647354,
    48.652367, -88.682137, 48.641682, -88.737518, 48.583118, -88.801689,
    48.569756, -88.834694, 48.505405, -89.050079, 48.505543, -89.118805,
    48.482086, -89.190529, 48.443481, -89.263695, 48.427834, -89.281746,
    48.405464, -89.287865, 48.405464, -89.287865, 48.406815, -89.246231,
    48.406815, -89.246231, 48.382511, -89.245483, 48.382511, -89.245483,
    48.406803, -89.245483, 48.406803, -89.245483, 48.405006, -89.285484,
    48.405006, -89.285484, 48.428776, -89.280945, 48.449631, -89.250923,
    48.449631, -89.250923, 48.48827, -89.337349, 48.49707, -89.432854,
    48.535809, -89.558723, 48.534225, -89.648193, 48.534225, -89.648193,
    48.596161, -89.895409, 48.694168, -89.892525, 48.768448, -89.876976,
    48.803242, -89.898346, 48.85458, -89.956039, 49.457706, -91.810951,
    49.46397, -91.900375, 49.484711, -91.960464, 49.488609, -92.005219, 49.5355,
    -92.1231, 49.534424, -92.153198, 49.566887, -92.245079, 49.588078,
    -92.270424, 49.58305, -92.3433, 49.594337, -92.410873, 49.612194, -92.4431,
    49.641644, -92.442032, 49.652176, -92.474678, 49.690121, -92.498116,
    49.698326, -92.568825, 49.739571, -92.619713, 49.768131, -92.687134,
    49.78503, -92.703766, 49.786922, -92.84536, 49.815079, -92.85202, 49.811329,
    -93.245071, 49.860825, -93.392441, 49.814316, -93.521538, 49.835148,
    -93.568123, 49.828598, -93.629379, 49.838188, -93.669846, 49.833958,
    -93.754005, 49.839996, -93.834908, 49.84951, -93.850548, 49.844639,
    -93.917534, 49.826488, -93.984627, 49.770889, -94.090385, 49.767437,
    -94.120331, 49.755814, -94.136398, 49.762745, -94.172638, 49.75238,
    -94.217445, 49.73299, -94.229973, 49.7267, -94.247414, 49.733231, -94.30407,
    49.733231, -94.30407, 49.737812, -94.318909, 49.793663, -94.344681,
    49.805939, -94.462456, 49.781452, -94.570206, 49.785587, -94.592415,
    49.777618, -94.626831, 49.770218, -94.638397, 49.74614, -94.645859,
    49.74614, -94.645859, 49.717888, -94.718094, 49.711327, -94.84964,
    49.722477, -94.888008, 49.730053, -95.047577, 49.74332, -95.102097,
    49.739204, -95.153046, 49.739204, -95.153046, 49.735977, -95.227921,
    49.727604, -95.252281, 49.706329, -95.269157, 49.680122, -95.370255,
    49.660225, -95.40303, 49.644836, -95.454834, 49.635422, -95.536247,
    49.63541, -95.694557, 49.648712, -95.723579, 49.649456, -95.973129,
    49.667545, -96.103378, 49.656197, -96.15313, 49.663345, -96.549232,
    49.855022, -97.008942, 49.855766, -97.104057, 49.888969, -97.134804,
    49.888969, -97.134804, 49.888027, -97.138977, 49.888027, -97.138977,
    49.895809, -97.143188, 49.895809, -97.143188, 49.900497, -97.139313,
    49.900497, -97.139313, 49.900097, -97.138039, 49.900097, -97.138039,
    49.895557, -97.13855, 49.895557, -97.13855, 49.874989, -97.259453, 49.88308,
    -97.303108, 49.875565, -97.392998, 49.875565, -97.392998, 49.887852,
    -97.502129, 49.887352, -97.65184, 49.972618, -98.10569, 49.975979,
    -98.222588, 49.961285, -98.241043, 49.946201, -98.297531, 49.97504,
    -98.369698, 49.975418, -98.76667, 49.961994, -98.818336, 49.960159,
    -98.922302, 49.947292, -98.987183, 49.919247, -99.024628, 49.901936,
    -99.068596, 49.901253, -99.706482, 49.886852, -99.764755, 49.886753,
    -100.06292, 49.843071, -100.148598, 49.842293, -100.261726, 49.82962,
    -100.334312, 49.785286, -100.426888, 49.783195, -100.46965, 49.772011,
    -100.489906, 49.76931, -100.706863, 49.800415, -100.833473, 49.856548,
    -100.920265, 49.89814, -101.021423, 49.93924, -101.128571, 49.947498,
    -101.188034, 49.983932, -101.238556, 50.078136, -101.516068, 50.126286,
    -101.630661, 50.147224, -101.653648, 50.206272, -101.774208, 50.311241,
    -102.12635, 50.314854, -102.17543, 50.358276, -102.371239, 51.107872,
    -115.010666, 51.067131, -115.085938, 51.069836, -115.118851, 51.049942,
    -115.162178, 51.055206, -115.199387, 51.038612, -115.268013, 51.057716,
    -115.317863, 51.087955, -115.341476, 51.126961, -115.391602, 51.126961,
    -117.884766, 51.080578, -117.927803, 51.053574, -117.935898, 51.047344,
    -117.951157, 51.016937, -118.081467, 50.991898, -118.142639, 51.01041,
    -118.213921, 50.993916, -118.246056, 50.962505, -118.385277, 50.928734,
    -118.461624, 50.931313, -118.481552, 50.950237, -118.483261, 50.976257,
    -118.524902, 50.971184, -118.590279, 51.001316, -118.653656, 51.001312,
    -118.679817, 50.946491, -118.77549, 50.890381, -118.834541, 50.88253,
    -118.911896, 50.838707, -118.965057, 50.830078, -119.017311, 50.789394,
    -119.080002, 50.79488, -119.126144, 50.784325, -119.165359, 50.746819,
    -119.226524, 50.709126, -119.231308, 50.692863, -119.309448, 50.697353,
    -119.330978, 50.730118, -119.315636, 50.77409, -119.340599, 50.809361,
    -119.319885, 50.843479, -119.32988, 50.856106, -119.367393, 50.878571,
    -119.394234, 50.877018, -119.472183, 50.892727, -119.519691, 50.826714,
    -119.670197, 50.80579, -119.699387, 50.777821, -119.716766, 50.762775,
    -119.742004, 50.725468, -119.767342, 50.684792, -119.817787, 50.645496,
    -119.90638, 50.653633, -120.066734, 50.680519, -120.268211, 50.674358,
    -120.293846, 50.674358, -120.293846, 50.673187, -120.29953, 50.673187,
    -120.29953, 50.673164, -120.312561, 50.673164, -120.312561, 50.675674,
    -120.320351, 50.675674, -120.320351, 50.676655, -120.33902, 50.676655,
    -120.33902, 50.676655, -120.339127, 50.676655, -120.339127, 50.671471,
    -120.338951, 50.671471, -120.338951, 50.672794, -120.353111, 50.660088,
    -120.358818, 50.660088, -120.358818, 50.652664, -120.376556, 50.666687,
    -120.450439, 50.650227, -120.485558, 50.619381, -120.472, 50.591881,
    -120.477318, 50.554977, -120.449593, 50.531479, -120.479057, 50.494415,
    -120.501488, 50.48431, -120.55867, 50.465576, -120.586754, 50.444847,
    -120.593803, 50.420242, -120.619232, 50.351002, -120.626701, 50.307575,
    -120.641815, 50.270088, -120.626167, 50.23431, -120.629318, 50.221897,
    -120.644508, 48.899151, -123.266579, 48.860813, -123.311501, 48.859837,
    -123.348976, 48.823086, -123.340424, 48.771938, -123.347588, 48.755753,
    -123.358849, 48.710453, -123.430389, 48.701672, -123.430908, 48.68924,
    -123.411407, 48.68924, -123.411407, 48.67329, -123.428963, 48.646034,
    -123.405373, 48.629398, -123.412224, 48.605511, -123.396492, 48.586006,
    -123.401451, 48.512001, -123.383926, 48.481796, -123.387062, 48.435841,
    -123.362808, 48.435841, -123.362808, 48.435806, -123.367325, 48.435806,
    -123.367325, 48.427502, -123.367256,
  ]; */

  /*  const rectangle = [
    [45.383321536272049, -75.3372987731628],
    [45.467134581917357, -75.546518086577947],
  ]; */

  /*  const der = lines.route.legs[0].maneuvers.map((elem) => {
    return Object.values(elem.startPoint).reverse();
  }); */

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

  let newRout = chunk(routedata.shapePoints);

  //console.log(der);

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

  useEffect(() => {
    let frty = valg(distance);
    setPositionD(frty);
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
          <div class="formBlock">
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

          <Sidebar />

          <MapContainer
            center={[50.79961, -90.0839]}
            zoom={5}
            /* scrollWheelZoom={false} */
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
            {/* <Polyline pathOptions={limeOptions} positions={der} /> */}
            {/*   <Polyline pathOptions={limeOptions} positions={shapePoints} /> */}
            <Polyline pathOptions={limeOptions} positions={newRout} />
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
