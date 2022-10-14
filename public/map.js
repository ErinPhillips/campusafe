/* TODOS
[] connect with firebase
[] 
*/
var map1, map2;
   let markersArray1 = []; 
   let markersArray2 = []; 
   let polyline = null; 
     
   function drawMap() {

      var myStyles =[
         {
            featureType: "poi",
            elementType: "labels",
            stylers: [
               {visibility: "off"}
            ]
         }
      ];
      
       var mapOptions = {
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         styles: myStyles,
         streetViewControl: false,  //don't show the  pegman 
         mapTypeControl: false,
         fullscreenControl: false
        }
       
       const geocoder = new google.maps.Geocoder();
      
       mapOptions.center = new google.maps.LatLng(32.78357208741187, -79.93661390988309); // London
       map1 = new google.maps.Map(document.getElementById("map1"), mapOptions);

       mapOptions.center = new google.maps.LatLng(32.78357208741187, -79.93661390988309); // Amsterdam
       map2 = new google.maps.Map(document.getElementById("map2"), mapOptions);
       
       map2.addListener('click', function(e) {
         setMapAll(markersArray1, null);
         setMapAll(markersArray2, null);
         deleteMarkers();
         document.getElementById("latlng").innerText = e.latLng;
         geocodeLatLng(geocoder, map2);
       
       });
   }
  function geocodeLatLng(geocoder, map){
     let input = document.getElementById("latlng").innerText;
     input = input.slice(1, -1);
     let latlngStr = input.split(",", 2);
     let latlng = {
        lat: parseFloat(latlngStr[0]),
        lng: parseFloat(latlngStr[1]),
     };
     
     
  geocoder
    .geocode({ location: latlng })
    .then((response) => {
        if (response.results[0]) {

        addMarker(latlng);
           
        document.getElementById("location").value = response.results[0].formatted_address;
        document.getElementById("location").style = "color:black; border: none"
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

function setMapAll(markersArray, map)  
{
   for(let i = 0; i < markersArray.length; i++)
   {
           markersArray[i].setMap(map);
   }
}
function addMarker(latLng) {
    let marker1 = new google.maps.Marker({
        map: map1,
        position: latLng,
        draggable: true
    });
   let marker2 = new google.maps.Marker({
        map: map2,
        position: latLng,
        draggable: true
    });
   document.getElementById("location").value = marker2.position.formatted_address;

    //store the marker object drawn on map in global array
    markersArray1.push(marker1);
    markersArray2.push(marker2);
  }
function deleteMarkers(markersArray)
{
   markersArray = []     
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
    map: map2,
    path: markersPositionArray,
    strokeOpacity: 0.4
  });
}