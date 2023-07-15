// Creating map
let myMap = L.map('map', {
    center: [29.4252, -98.4946],
    zoom: 4
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

    // Quering the data
    let features = data.features;
    let metadata = data.metadata;

    let latitude = features[0].geometry.coordinates[1];
    let longitude = features[0].geometry.coordinates[0];
    console.log(features[0]);
    
    let newMarker = L.circle([latitude, longitude], {
        color: 'black',
        fillColor: "green",
        fillOpacity: 0.75,
        weight: 0.5,
        radius: 100000   
    }).addTo(myMap);

    // Creates popup when marker is clicked on
    newMarker.bindPopup('Chingado my first marker');


});