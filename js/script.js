const FOURSQUARE_API = "https://api.foursquare.com/v3/places";

let loginCoordinates = [];
// let defaultCoordinates = [1.33433, 103.821833];
let defaultCoordinates = [1.29,103.85]; // #1 Singapore latlng
let setCoordinates = defaultCoordinates;

if (loginCoordinates.length !== 0){
    setCoordinates = loginCoordinates
};

let defaultSearchLimit = 10;
let defaultSearchRadius = 2500;

let searchLimit = defaultSearchLimit;
let searchRadius = defaultSearchRadius;

let searchLimitIsValid = true;
let searchRadiusIsValid = true;

let quickSearchByCategoryID = null;

function loadDefaultSettings() {
  document.getElementById("inputSearchLimit").value = defaultSearchLimit;
  console.log(defaultSearchLimit);

  document.getElementById("inputSearchRadius").value = defaultSearchRadius;
  console.log(defaultSearchRadius);
}

loadDefaultSettings();

let loadedData = [];

async function loadPostal() {
  loadedData = await loadPostalCode();
  console.log(loadedData);
  return loadedData;
}

loadedData = loadPostal();

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
            let layer = marker.bindTooltip('Hi! Welcome to Singapore.').addTo(map);
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
  let layer = myLocationMarker.bindTooltip('Hi! Welcome to SG-finder.').addTo(map);
  layer.openTooltip();
  // layer.closeTooltip();

  myLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

        locateControl.start()
        myLocation.innerText = "Reset Location"
    }
    else if (locateClickCount % 2 == 0){

        locateControl.stop()
        // map.setView(setCoordinates, 11.5)
        map.setView(setCoordinates, 10)
        locateClickCount = 0
        myLocation.innerText = "My Location"
        for(var i = 0; i < mapMarkers.length; i++){
          map.removeLayer(mapMarkers[i]);
        }
        for(var i = 0; i < mapMarkers1.length; i++){
          map.removeLayer(mapMarkers1[i]);
        }
    }
});

let geoLocation = document.querySelector('.leaflet-bar-part.leaflet-bar-part-single')

geoLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

        myLocation.innerText = "Reset Location"

    }

    else if (locateClickCount % 2 == 0){
        // map.setView(setCoordinates, 11.5)
        map.setView(setCoordinates, 10)
        locateClickCount = 0
        myLocation.innerText = "My Location"
        for(var i = 0; i < mapMarkers.length; i++){
          map.removeLayer(mapMarkers[i]);
        }
        for(var i = 0; i < mapMarkers1.length; i++){
          map.removeLayer(mapMarkers1[i]);
        }
    }
});

document
    .querySelector("#resetBtn")
    .addEventListener("click", function () {
      quickSearchByCategoryID = null;
      // let myLocation = document.querySelector("#locateBtn");
      myLocation.innerText = "Locate Me!"
      // const searchTerms = document.querySelector("#searchTerms");
      searchTerms.value = ""
      // const searchByKeyword = document.querySelector("#searchByKeyword");
      searchByKeyword.value = "Enter Search Keyword"
      const resultElement = document.querySelector("#search-results");
      resultElement.innerHTML = "";
      // const searchByPostalCode = document.querySelector("#searchByPostalCode");
      searchByPostalCode.value = "Enter Postal Code"
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
      loadDefaultSettings();
      map.setView(defaultCoordinates, 10)
      locateClickCount = 0
      myLocationMarker = L.marker([1.29, 103.85]);
      layer = myLocationMarker.bindTooltip('Hi! Welcome to SG-finder.').addTo(map);
      layer.openTooltip();
  });


  document
  .querySelector("#searchPostalCodeBtn")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const searchPostalCode = document.querySelector("#searchByPostalCode").value;

    let entry = search2(searchPostalCode);
    
    // remove all existing markers from the search results layer
    searchResultLayer.clearLayers();

    // add the search results as marker
    addPostalSearchResultToMap(entry, searchResultLayer, map);

  });


  document
    .querySelector("#searchBtn")
    .addEventListener("click", async function () {
      const searchTerms = document.querySelector("#searchTerms").value;

      // get the center of the map
      const center = map.getCenter();

      const data = await search(searchTerms, center.lat, center.lng, radius=2500, limit=50);

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
    .querySelector("#searchKeywordBtn")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      const searchByKeyword = document.querySelector("#searchByKeyword").value;

      // get the center of the map
      const center = map.getCenter();

      if (quickSearchByCategoryID !== null) {
        console.error("superSearch");
        data1 = await superSearch(quickSearchByCategoryID, searchByKeyword, center.lat, center.lng, searchRadius, searchLimit);
      } else {
        console.error("search");
        data1 = await search(searchByKeyword, center.lat, center.lng, searchRadius, searchLimit);
      }

      console.log(data1);
      
      // remove all existing markers from the search results layer
      searchResultLayer1.clearLayers();

      // add the result to the search results div
      const resultElement1 = document.querySelector("#result-listing");
      resultElement1.innerHTML = "";

      // add the search results to panel
      addSearchResultToOrderlist(data1, searchResultLayer1, resultElement1, map);
    });
// });


    document
    .querySelector("#submitSettingsBtn")
    .addEventListener("click", function () {
      
      searchLimit = document.querySelector("#inputSearchLimit").value;

      if ((searchLimit <=0) || (searchLimit > 50)) {
        searchLimitIsValid = false;
        alert("Please enter the searchLimit between 1 and 50! The number of results to return, up to 50. Defaults to 10.");
        document.querySelector("#inputSearchLimit").value = "Maximum Number of Search Results";
      } else {
        searchLimitIsValid = true;
      }

      searchRadius = document.querySelector("#inputSearchRadius").value;

      if ((searchRadius < 0) || (searchRadius > 100000)) {
        searchRadiusIsValid = false;
        alert("Please enter the searchRadius between 0 and 100000! Sets a radius distance (in meters) used to define an area to bias search results. The maximum allowed radius is 100,000 meters.");
        document.querySelector("#inputSearchRadius").value = "Radius of Search Location";
      } else {
        searchRadiusIsValid = true;
      }

      if ((searchLimitIsValid) && (searchRadiusIsValid)) {
        alert("You have entered valid search settings!");
      }

    });

      // 12068	Community and Government > Government Building > Embassy or Consulate
      // 12069	Community and Government > Government Building > Government Department
      // 12070	Community and Government > Government Building > Law Enforcement and Public Safety
      // 12072	Community and Government > Government Building > Law Enforcement and Public Safety > Police Station
      // 12071	Community and Government > Government Building > Law Enforcement and Public Safety > Fire Station


      // 15008	Health and Medicine > Emergency Service
      // 15009	Health and Medicine > Emergency Service > Ambulance Service
      // 15010	Health and Medicine > Emergency Service > Emergency Room

      // 15000	Health and Medicine
      // 15011	Health and Medicine > Healthcare Clinic
      // 15014	Health and Medicine > Hospital
      // 15016	Health and Medicine > Medical Center
      // 15019	Health and Medicine > Mental Health Service > Mental Health Clinic
      // 15033	Health and Medicine > Physician > Family Medicine Doctor
      // 15056	Health and Medicine > Women's Health Clinic
      // 15058	Health and Medicine > Hospital > Children's Hospital
      // 15059	Health and Medicine > Hospital > Hospital Unit

      // 19000	Travel and Transportation
      // 19005	Travel and Transportation > Cruise
      // 19009	Travel and Transportation > Lodging
      // 19010	Travel and Transportation > Lodging > Bed and Breakfast
      // 19013	Travel and Transportation > Lodging > Hostel
      // 19014	Travel and Transportation > Lodging > Hotel
      // 19018	Travel and Transportation > Lodging > Resort
      // 19028	Travel and Transportation > Tourist Information and Service
      // 19029	Travel and Transportation > Tourist Information and Service > Tour Provider
      // 19030	Travel and Transportation > Transport Hub
      // 19031	Travel and Transportation > Transport Hub > Airport
      // 19040	Travel and Transportation > Transport Hub > Airport > International Airport
      // 19041	Travel and Transportation > Transport Hub > Airport > Private Airport
      // 19042	Travel and Transportation > Transport Hub > Bus Station
      // 19043	Travel and Transportation > Transport Hub > Bus Stop
      // 19045	Travel and Transportation > Transport Hub > Marine Terminal
      // 19046	Travel and Transportation > Transport Hub > Metro Station
      // 19047	Travel and Transportation > Transport Hub > Rail Station
      // 19048	Travel and Transportation > Transport Hub > Rental Car Location
      // 19049	Travel and Transportation > Transport Hub > Taxi Stand
      // 19051	Travel and Transportation > Transportation Service
      // 19053	Travel and Transportation > Transportation Service > Limo Service
      // 19054	Travel and Transportation > Transportation Service > Public Transportation
      // 19055	Travel and Transportation > Travel Agency
      // 19067	Travel and Transportation > Transportation Service > Public Transportation > Bus Line
      // 19068	Travel and Transportation > Transportation Service > Taxi

    document
    .querySelector("#item1Selected")
    .addEventListener("click", async function () {
      // alert("You have selected Item 1!");
      quickSearchByCategoryID = null;
      const resultElement = document.querySelector("#search-results");
      resultElement.innerHTML = "";
      const resultElement1 = document.querySelector("#result-listing");
      resultElement1.innerHTML = "";
      for(var i = 0; i < mapMarkers.length; i++){
        map.removeLayer(mapMarkers[i]);
      }
      for(var i = 0; i < mapMarkers1.length; i++){
        map.removeLayer(mapMarkers1[i]);
      }
    });

    document
    .querySelector("#itemN1Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 1!");

      // 12068	Community and Government > Government Building > Embassy or Consulate
      quickSearchByCategoryID = "12068";

      // get the center of the map
      const center = map.getCenter();

      data1 = await quickSearch(quickSearchByCategoryID, center.lat, center.lng, searchRadius, searchLimit);

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