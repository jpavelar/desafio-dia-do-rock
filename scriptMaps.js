let map;
let geocoder;

window.initializeMap = function () {
    loadMap(-23.4742494, -46.7027369, 16)
};

window.loadGoogleMaps = function () {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        initializeMap();
    } else {
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyClamc-U7M-Pa97noCfDQ6JlHyLLzOC4Yg&callback=initializeMap';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
};

function loadMap(lat, lng, zoom) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// Geolocalização
const addressInput = document.getElementById('address');
const coordinatesDisplay = document.getElementById('coordinates');

let timeout = null;

addressInput.addEventListener('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        geocodeAddress(this.value);
    }, 500);
});

function geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK' && results[0]) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            map.setCenter(new google.maps.LatLng(lat, lng, 16));
        }
    });
}

window.onload = function() {
    initializeMap();
    loadGoogleMaps();
}
