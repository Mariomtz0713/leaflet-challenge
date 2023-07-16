// Creating map
let myMap = L.map('map', {
    center: [29.4252, -98.4946],
    zoom: 2
});

// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Link that holds GeoJSON data
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// Executing GeoJSON data
d3.json(url).then((data) => {

    // Promising data
    console.log(data)
    let features = data.features;
    let metadata = data.metadata;
    
    for (let i = 0; i < features.length; i++) {
        // Data query
        let latitude = features[i].geometry.coordinates[1];
        let longitude = features[i].geometry.coordinates[0];
        let depth = features[i].geometry.coordinates[2];

        // Determining marker color
        if (depth >= 0 && depth < 1) {
            depthColor = '#E2FFAE' // White color but not
        }

        else if (depth >= -10 && depth < 10) {
            depthColor = '#00FF00' // Light green
        }

        else if (depth >= 10 && depth < 30) {
            depthColor = 'green'
        }

        else if (depth >= 30 && depth < 40) {
            depthColor = 'yellow'
        }

        else if (depth >= 40 && depth < 50) {
            depthColor = 'orange'
        }

        else {
            depthColor = 'red'
        };

        // Displaying marker and information
        let marker = L.circle([latitude, longitude], {
            radius: features[i].properties.mag * 50000,
            color: 'black',
            weight: 0.5,
            fillColor: depthColor,
            fillOpacity: 0.75
        }).addTo(myMap);

        marker.bindPopup(
        `Location: ${features[i].properties.place} <br>
        Time: ${features[i].properties.time} <br>
        Radius: ${features[i].properties.mag * 50000} <br>
        Magnitude: ${features[i].properties.mag} <br>
        Number of felt reports: ${features[i].properties.felt}`
        );
    };

});

// radius: Math.sqrt(countries[i].gdp_pc) * 500
