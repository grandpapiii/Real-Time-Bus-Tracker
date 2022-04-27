// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// TODO: add your own access token
mapboxgl.accessToken = 'pk.eyJ1IjoidG9tdHVtdGFtIiwiYSI6ImNsMW1vNDZkaTAwNTQzaW83dGlwZHp2a2kifQ.fcOr30zeQaU_NrvUBa3P4Q';



// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// TODO: add a marker to the map at the first coordinates in the array busStops. The marker variable should be named "marker"

var el = document.createElement('div');
el.className = 'stop-marker';
el.style.backgroundColor = 'red';
el.style.backgroundImage = 'none'
el.style.borderRadius = '5px';
el.style.width = '5px';
el.style.height = '5px'
let marker = new mapboxgl.Marker(el).setLngLat([-71.092761, 42.357575]).addTo(map);


// counter here represents the index of the current bus stop
let counter = 0;
let up = true;
let timer;
let moving = false;

function nextStop() {
  if (up) marker.setLngLat(busStops[++counter]);
  else marker.setLngLat(busStops[--counter]);
  if(counter === busStops.length - 1) up = !up;
  if(counter === 0){ up = !up;}

  console.log(nextStop);
}

function previousStop() {
  if (!up) marker.setLngLat(busStops[++counter]);
  else marker.setLngLat(busStops[--counter]);
  if(counter === busStops.length - 1) up = !up;
  if(counter === 0){ up = !up;}
}

async function busLocations() {
  const response = await fetch('https://api-v3.mbta.com/vehicles');
  const json = await response.json();
  const locations = json.data;
  locations.forEach(bus => {
    let busAttributes = bus.attributes;
    new mapboxgl.Marker().setLngLat([busAttributes.longitude, busAttributes.latitude]).addTo(map);


  })
}


// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move };
}
