// Leaflet Map Setting


const mymap = L.map('mapid').setView([10, 25], 2);

const attribution = '&copy; <a href="openstreetmap.org/copyright"> OpenStreetMap </a> contributors'; 

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution , maxZoom: 5, minZoom: 2});

tiles.addTo(mymap);


// Custom Icon 

var myIcon = new L.Icon ({
    iconUrl: 'libs/images/myIcon.png',
    iconAnchor: [15, 30],
    popupAnchor: [0, -25]
})


// Client Geolocalization


if('geolocation' in navigator) {
    console.log('Geolocation Available');
    navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lgn = position.coords.longitude;
        document.getElementById('latitude').textContent = lat;
        document.getElementById('longitude').textContent = lgn;
        L.marker([lat, lgn]).addTo(mymap);
    });
} else { 
    console.log('Geolocation NOT Available')
};











