const FOURSQUARE_API = "https://api.foursquare.com/v3/places";

let loginCoordinates = [];
// let defaultCoordinates = [1.33433, 103.821833];
let defaultCoordinates = [ 1.29,103.85]; // #1 Singapore latlng
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

  // This is a test function in which its search results is output via console. 
  testFourSqAPI_APIKeys(); // New approach using API Keys

  L.control.scale().addTo(map);

  let options = {
    flyTo: true,
    initialZoomLevel: 16,
    drawCircle: false,
    returnToPrevBounds: true,
  };

  let locateControl = L.control.locate(options)
  locateControl.addTo(map)

  let myLocation = document.querySelector("#locateBtn");

  let locateClickCount = 0;

  myLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

        locateControl.start()
        myLocation.innerText = "Reset Location"
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
      myLocation.innerText = "My Location"
    })

  document
    .querySelector("#searchBtn")
    .addEventListener("click", async function () {
      const searchTerms = document.querySelector("#searchTerms").value;

      // get the center of the map
      const center = map.getCenter();

      const data = await search(searchTerms, center.lat, center.lng);

      // remove all existing markers from the search results layer
      searchResultLayer.clearLayers();

      // add the result to the search results div
      const resultElement = document.querySelector("#search-results");
      resultElement.innerHTML = "";

      // add the search results as marker
      addSearchResultToMap(data, searchResultLayer, resultElement, map);
    });
});

