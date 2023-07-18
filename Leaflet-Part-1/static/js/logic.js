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
        if (depth >= -10 && depth < 10) {
            depthColor = '#0000FF' // blue
        }

        else if (depth >= 10 && depth < 30) {
            depthColor = '#00FF00' // dark green
        }

        else if (depth >= 30 && depth < 50) {
            depthColor = '#008000'  // light green
        }

        else if (depth >= 50 && depth < 70) {
            depthColor = '#FFFF00' // yellow
        }

        else if (depth >= 70 && depth < 90) {
            depthColor = '#FFA500' // orange
        }

        else {
            depthColor = '#FF0000' // red
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

let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<i style="background: #0000FF"></i>-10-10<br>'
    div.innerHTML += '<i style="background: #008000"></i>10-30<br>'
    div.innerHTML += '<i style="background: #00FF00"></i>30-50<br>'
    div.innerHTML += '<i style="background: #FFFF00"></i>50-70<br>'
    div.innerHTML += '<i style="background: #FFA500"></i>70-90<br>'
    div.innerHTML += '<i style="background: #FF0000"></i>90+<br>'

    return div;
};

legend.addTo(myMap)