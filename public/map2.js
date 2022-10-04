// This example uses SVG path notation to add a vector-based symbol
// as the icon for a marker. The resulting icon is a marker-shaped
// symbol with a blue fill and no border.

let markersArray = []; 
let polyline = null; 
let map;

function initMap() {
  
  const center = new google.maps.LatLng(32.7882, -79.9591);
map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: center,
    
  });
  
   map.addListener('click', function(e) {
    console.log(e);
    addMarker(e.latLng);
      
     drawPolyline();
  });
}


// define function to add marker at given lat & lng
  function addMarker(latLng) {
    let marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true
    });

    //store the marker object drawn on map in global array
    markersArray.push(marker);
  }

function drawPolyline() {
  let markersPositionArray = [];
  // obtain latlng of all markers added on map
  markersArray.forEach(function(e) {
    markersPositionArray.push(e.getPosition());
  });
  
  // check if there is already polyline drawn on map
  // remove the polyline from map before we draw new one
  if (polyline !== null) {
    polyline.setMap(null);
  }
  
  // draw new polyline at markers' position
  polyline = new google.maps.Polyline({
    map: map,
    path: markersPositionArray,
    strokeOpacity: 0.4
  });
}
window.initMap = initMap;