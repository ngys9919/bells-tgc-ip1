const FOURSQUARE_API = "https://api.foursquare.com/v3/places";

let loginCoordinates = [];
// let defaultCoordinates = [1.33433, 103.821833];
let defaultCoordinates = [1.29,103.85]; // #1 Singapore latlng
let setCoordinates = defaultCoordinates;

if (loginCoordinates.length !== 0){
    setCoordinates = loginCoordinates
};

document.addEventListener("DOMContentLoaded", async function () {
  // create the map
  const map = createMap();

  // create the search result layer
  const searchResultLayer = L.layerGroup();
  searchResultLayer.addTo(map);

  const searchResultLayer1 = L.layerGroup();
  searchResultLayer1.addTo(map);

  // This is a test function in which its search results is output via console. 
  testFourSqAPI_APIKeys(); // New approach using API Keys

  // default position: bottomleft for scale
  // L.control.scale().addTo(map);

  // L.control.scale({'position':'bottomleft', 'metric':true,'imperial':false}).addTo(map);

  L.control.scale({
    position: 'bottomright',
    'metric':true,
    'imperial':false
  }).addTo(map);

  let options = {
    flyTo: true,
    initialZoomLevel: 16,
    drawCircle: false,
    returnToPrevBounds: true,
  };

  // let locateControl = L.control.locate(options)
  // locateControl.addTo(map)

  var locateControl = L.control.locate({
    flyTo: true,
    initialZoomLevel: 16,
    drawCircle: false,
    returnToPrevBounds: true,
    position: 'topright',
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);

function locateUser(){
  map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
            let layer = marker.bindTooltip('Hi There 1!').addTo(map);
            layer.openTooltip();
            // layer.closeTooltip();
            var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            });
            map.addLayer(marker);
            map.addLayer(circle);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
}

  // locateUser();


  let myLocation = document.querySelector("#locateBtn");

  let locateClickCount = 0;

  const myLocationMarker = L.marker([1.29, 103.85]);
  let layer = myLocationMarker.bindTooltip('Hi There 1!').addTo(map);
  layer.openTooltip();
  // layer.closeTooltip();

  myLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

        locateControl.start()
        myLocation.innerText = "Reset Location"
        const myLocationMarker = L.marker(setCoordinates);
  let layer = myLocationMarker.bindTooltip('Hi There 2!').addTo(map);
  layer.openTooltip();
    }
    else if (locateClickCount % 2 == 0){

        locateControl.stop()
        map.setView(setCoordinates, 11.5)
        locateClickCount = 0
        myLocation.innerText = "My Location"
        
    }
})

let geoLocation = document.querySelector('.leaflet-bar-part.leaflet-bar-part-single')

geoLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

        myLocation.innerText = "Reset Location"
        const myLocationMarker = L.marker(setCoordinates);
  let layer = myLocationMarker.bindTooltip('Hi There 3!').addTo(map);
  layer.openTooltip();
           
    }

    else if (locateClickCount % 2 == 0){
        map.setView(setCoordinates, 11.5)
        locateClickCount = 0
        myLocation.innerText = "My Location"
        
    }
})

document
    .querySelector("#resetBtn")
    .addEventListener("click", function () {
      map.setView(defaultCoordinates, 10)
      locateClickCount = 0
      // let myLocation = document.querySelector("#locateBtn");
      myLocation.innerText = "Locate Me!"
      // let locateControl = L.control.locate(options)
      // locateControl.addTo(map)
      // map.removeLayer(locateControl)
      // const searchTerms = document.querySelector("#searchTerms");
      searchTerms.value = ""
      // const searchTerms1 = document.querySelector("#searchTerms1");
      searchTerms1.value = "Search"
      const resultElement = document.querySelector("#search-results");
      resultElement.innerHTML = "";
      // const searchResultLayer = L.layerGroup();
      // searchResultLayer.clearLayers();
      const resultElement1 = document.querySelector("#result-listing");
      resultElement1.innerHTML = "";
      // const searchResultLayer1 = L.layerGroup();
      // searchResultLayer1.clearLayers();
      // map.removeLayer(searchResultLayer);
      // map.removeLayer(searchResultLayer1);
      // map.removeLayer(marker);
      // marker.closePopup();
      // $(".leaflet-marker-icon").remove(); $(".leaflet-popup").remove();
      // $('.leaflet-interactive').remove(); 
      // $(".leaflet-popup-pane").empty(); $(".leaflet-marker-pane").empty();
      for(var i = 0; i < mapMarkers.length; i++){
        map.removeLayer(mapMarkers[i]);
      }
      for(var i = 0; i < mapMarkers1.length; i++){
        map.removeLayer(mapMarkers1[i]);
      }
  })

  document
    .querySelector("#searchBtn")
    .addEventListener("click", async function () {
      const searchTerms = document.querySelector("#searchTerms").value;

      // get the center of the map
      const center = map.getCenter();

      const data = await search(searchTerms, center.lat, center.lng);

      console.log(data);

      // remove all existing markers from the search results layer
      searchResultLayer.clearLayers();

      // add the result to the search results div
      const resultElement = document.querySelector("#search-results");
      resultElement.innerHTML = "";

      // add the search results as marker
      addSearchResultToMap(data, searchResultLayer, resultElement, map);

    });

    document
    .querySelector("#searchBtn1")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const searchTerms1 = document.querySelector("#searchTerms1").value;

      // get the center of the map
      const center = map.getCenter();

      const data1 = await search(searchTerms1, center.lat, center.lng);

      console.log(data1);
      
      // remove all existing markers from the search results layer
      searchResultLayer1.clearLayers();

      // add the result to the search results div
      const resultElement1 = document.querySelector("#result-listing");
      resultElement1.innerHTML = "";

      // add the search results to panel
      addSearchResultToOrderlist(data1, searchResultLayer1, resultElement1, map);
    });
});

