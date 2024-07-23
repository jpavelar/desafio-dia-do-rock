let map;
let geocoder;
let markers = [];
let autocomplete;



const lightStyle = [];
const darkStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

window.initializeMap = function () {
  loadMap(-23.4742494, -46.7027369, 10);
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
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: lightStyle
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
  }, 1000);
});

function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK' && results[0]) {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      map.setCenter(new google.maps.LatLng(lat, lng, 27));
    }
  });
}

// Adiciona um ponteiro no mapa
function addMarker(lat, lng) {
  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map
  });
  markers.push(marker);
}

// Remove todos os ponteiros do mapa
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// Geocodificação e adição de ponteiro com a entrada de endereço
function geocodeAndAddMarker(address) {
  clearMarkers()
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK' && results[0]) {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      map.setCenter(new google.maps.LatLng(lat, lng));
      addMarker(lat, lng);
    }
  });
}

window.onload = function () {
  initializeMap();
  loadGoogleMaps();

}

function applyThemeMap(theme) {
  map.setOptions({ styles: theme === 'dark' ? darkStyle : lightStyle });
}

function toggleThemeMap() {
  map.setOptions({ styles: document.documentElement.getAttribute('data-theme') === 'dark' ? darkStyle : lightStyle });
}