// Creating map
let myMap = L.map('map', {
    center: [29.4252, -98.4946],
    zoom: 3
});

// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Link that holds GeoJSON data
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// Executing GeoJSON data
d3.json(url).then((data) => {

    console.log(data)

});