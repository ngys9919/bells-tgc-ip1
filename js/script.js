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

// let lang = "en";

loadDefaultSettings();

let loadedData = [];

async function loadPostal() {
  loadedData = await loadPostalCode();
  console.log(loadedData);
  return loadedData;
}

loadedData = loadPostal();

let fileName = null;

async function loadData_jsonFormat(fileName) {
  let filePath = `data/transport/${fileName}.json`;
  console.log(filePath);
  const response = await axios.get(filePath);
  console.log(response.data);
  return response.data;
}

function loadData(fileName) {
  const data = loadData_jsonFormat(fileName);
  console.log(data);
  return data;
}

let dataTAXI = [];

fileName = "TaxiStands-WGS84";

dataTAXI = loadData(fileName);
console.log(dataTAXI);

let dataBUS = [];

fileName = "BusStops-WGS84";

dataBUS = loadData(fileName);
// console.log(dataBUS);

let dataMRT = [];

fileName = "mrt_stations-cleaned";

dataMRT = loadData(fileName);
// console.log(dataMRT);

let dataLRT = [];

fileName = "lrt_stations-cleaned";
  
dataLRT = loadData(fileName);
// console.log(dataLRT);

let clusterGroup = null;

function addMarkersToCluster(data, clusterGroup) {
    let marker = 0;

    for (let d of data) {
      if (layerGroupID == "MRT" || layerGroupID == "LRT") {
        // const transitLat = d.PossibleLocations[0].LATITUDE;
        // const transitLon = d.PossibleLocations[0].LONGITUDE;
        // console.log(d.PossibleLocations[0].LATITUDE, d.PossibleLocations[0].LONGITUDE);
        if (d.PossibleLocations.length != 0) {
          if (layerGroupID == "MRT") {
            marker = L.marker([d.PossibleLocations[0].LATITUDE, d.PossibleLocations[0].LONGITUDE],{ icon: customIconMRT });
            marker.bindPopup(`<h5>Station Code:${d.Station}</h5>
              <h6>Station Name: ${d.PossibleLocations[0].BUILDING}</h6>           
          `);
          // add to marker clustering)
          marker.addTo(clusterGroup);
          } else if (layerGroupID == "LRT") {
            marker = L.marker([d.PossibleLocations[0].LATITUDE, d.PossibleLocations[0].LONGITUDE],{ icon: customIconLRT });
            marker.bindPopup(`<h5>Station Code: ${d.Station}</h5>
              <h6>Station Name: ${d.PossibleLocations[0].BUILDING}</h6>           
          `);
          // add to marker clustering)
          marker.addTo(clusterGroup);
          } else {
            console.error("Error: Not found!");
          }
        } else {
          marker = L.marker([1.29,103.85]);
          marker.bindPopup(`<h5>Station Code:${d.Station}</h5>
            <h6>Station Name:${d.StationName}</h6>           
        `);
          // marker.addTo(layerGroup);
          // add to marker clustering)
          marker.addTo(clusterGroup);
        }
      } else {
        console.error("Error: No layerGroupID defined!");
    }
    }
    
  }

  let layerGroupID = null;

  function addMarkersToCircleLayer(data, layerGroup, layerGroupID) {
    let marker = 0;
    
      for (let d of data) {
        
          // const transitLat = d.PossibleLocations[0].LATITUDE;
          // const transitLon = d.PossibleLocations[0].LONGITUDE;
          // console.log(d.PossibleLocations[0].LATITUDE, d.PossibleLocations[0].LONGITUDE);
          if (d.PossibleLocations.length != 0) {
            if (layerGroupID == "MRT") {
              L.circle([d.PossibleLocations[0].LATITUDE, d.PossibleLocations[0].LONGITUDE], {
                color: 'green',
                fillColor:'blue',
                fillOpacity: 0.5,
                radius: 500
              }).addTo(layerGroup);
            } else if (layerGroupID == "LRT") {
              L.circle([d.PossibleLocations[0].LATITUDE,d.PossibleLocations[0].LONGITUDE], {
                color: 'red',
                fillColor:'orange',
                fillOpacity: 0.5,
                radius: 500
              }).addTo(layerGroup);
            } else {
              marker.addTo(layerGroup);
            }
          } else {
            marker = L.marker([1.29,103.85]);
            marker.bindPopup(`<h5>Station Code:${d.Station}</h5>
              <h6>Station Name:${d.StationName}</h6>           
          `);
            marker.addTo(layerGroup);
          }
      }
    }

const customIconMRT = L.icon({
  iconUrl: './res/markerMRT.png',
  iconSize: [20, 40],
});

const customIconLRT = L.icon({
  iconUrl: './res/markerLRT.png',
  iconSize: [20, 40],
});

const customIcon = L.icon({
  iconUrl: './res/icongreen.png',
  iconSize: [12, 20],
});

let marker = 0;

  function addMarkersToLayerTRANSIT(data, layerGroup) {
      if (layerGroupID == "MRT") {
        // data.forEach(functionMRT);
        data.forEach(functionTRANSIT);
      } else if (layerGroupID == "LRT") {
        // data.forEach(functionLRT);
        data.forEach(functionTRANSIT);
      }

      function functionTRANSIT(value, index, array) { 
        if (layerGroupID == "MRT" || layerGroupID == "LRT") {
          // const transitLat = d.PossibleLocations[0].LATITUDE;
          // const transitLon = d.PossibleLocations[0].LONGITUDE;
          // console.log(d.PossibleLocations[0].LATITUDE, d.PossibleLocations[0].LONGITUDE);
          if (array[index].PossibleLocations.length != 0) {
            if (layerGroupID == "MRT") {
              marker = L.marker([array[index].PossibleLocations[0].LATITUDE, array[index].PossibleLocations[0].LONGITUDE],{ icon: customIconMRT });
              marker.bindPopup(`<h5>Station Code:${array[index].Station}</h5>
                <h6>Station Name: ${array[index].PossibleLocations[0].BUILDING}</h6>           
            `);
            } else if (layerGroupID == "LRT") {
              marker = L.marker([array[index].PossibleLocations[0].LATITUDE, array[index].PossibleLocations[0].LONGITUDE],{ icon: customIconLRT });
              marker.bindPopup(`<h5>Station Code: ${array[index].Station}</h5>
                <h6>Station Name: ${array[index].PossibleLocations[0].BUILDING}</h6>           
            `);
            } else {
              console.error("Error: Not found!");
            }
            marker.addTo(layerGroup);
          } else {
            marker = L.marker([1.29,103.85],{ icon: customIcon });
            marker.bindPopup(`<h5>Station Code:${array[index].Station}</h5>
              <h6>Station Name:${array[index].StationName}</h6>           
          `);
            marker.addTo(layerGroup);
          }
        }
          
      }
  }    

  function addMarkersToLayerTAXI(dataTAXI, layerGroup) {
      dataTAXI.forEach(functionTAXI);

      function functionTAXI(value, index, array) { 
            // keep in mind that the API is [lng, lat] so we have to inverse manually
            // const taxiLat = d.features.geometry.coordinates[1];
            // const taxiLng = d.features.geometry.coordinates[0];
            const taxiLat = array[index].geometry.coordinates[1];
            const taxiLng = array[index].geometry.coordinates[0];
            marker = L.marker([taxiLat, taxiLng],{ icon: customIconMRT });
            marker.addTo(layerGroup);
      }
  }

  function addMarkersToLayerBUS(dataBUS, layerGroup) {
      dataBUS.forEach(functionBUS);

      function functionBUS(value, index, array) { 
        // keep in mind that the API is [lng, lat] so we have to inverse manually
        // const busLat = d.features.geometry.coordinates[1];
        // const busLng = d.features.geometry.coordinates[0];
        const busLat = array[index].geometry.coordinates[1];
        const busLng = array[index].geometry.coordinates[0];
        marker = L.marker([busLat, busLng],{ icon: customIconMRT });
        marker.bindPopup(`<h5>Bus Stop No.: ${array[index].properties.BUS_STOP_N}</h5>
          <h6>Location Description: ${array[index].properties.LOC_DESC}</h6>           
        `);
        marker.addTo(layerGroup);
    }
  }

document.addEventListener("DOMContentLoaded", async function () {

  // language support
  const userPreferredLanguage = localStorage.getItem('language') || 'en';
  lang = userPreferredLanguage;
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  
  console.log(lang);
  console.log(langData);

  // create the map
  const map = createMap();

  // create the search result layer
  const searchResultLayer = L.layerGroup();
  searchResultLayer.addTo(map);

  const searchResultLayer1 = L.layerGroup();
  searchResultLayer1.addTo(map);

  // This is a test function in which its search results is output via console. 
  testFourSqAPI_APIKeys(); // New approach using API Keys
  
  // let response = await axios.get("data/transport/LTATaxiStopGEOJSON.geojson");
  // console.log(response.data);

  // let taxiLayer = L.geoJson(response.data);
  // taxiLayer.addTo(map);

  function myFunction(arg) {
    // this output the first row
    // console.log(arg.var1 + ' ' + arg.var2 + ' ' + arg.var3);
    // alert(arg.var1 + ' ' + arg.var2 + ' ' + arg.var3);
    // this is for array iteration
    arg.forEach(theFunction);

    function theFunction(value, index, array) {
      // this output all the rows of column var1 
      // console.log(array[index].var1);
      // alert(array[index].var1);
    };
  }

  myFunction ([{ var0: "Option 0", var1: "Option 1", var2: "Option 2", var5: "Option 5", var3: "Option 3", var4: "Option 4" },
              { var0: "Option 10", var1: "Option 11", var2: "Option 12", var5: "Option 15", var3: "Option 13", var4: "Option 14" }
  ]);
  
  let ArrayID = 0;
  let myArray1 = [];
  let myArray2 = [];

  myArray1 = [{ var0: "Option 0", var1: "Option 1", var2: "Option 2", var5: "Option 5", var3: "Option 3", var4: "Option 4" },
    { var0: "Option 10", var1: "Option 11", var2: "Option 12", var5: "Option 15", var3: "Option 13", var4: "Option 14" },
    { var0: "Option 20", var1: "Option 21", var2: "Option 22", var5: "Option 25", var3: "Option 23", var4: "Option 24" }
  ];

  myArray2 = [{ var10: "Option 0", var11: "Option 1", var15: "Option 5", var14: "Option 4" },
    { var10: "Option 10", var11: "Option 11", var15: "Option 15", var14: "Option 14" },
    { var10: "Option 20", var11: "Option 21", var15: "Option 25", var14: "Option 24" }
  ];

  function arrayFunction1(myArray1) {
      myArray1.forEach(theFunction1);
  }

  function arrayFunction2(myArray2) {
      myArray2.forEach(theFunction2);
  }

  function arrayFunction3(passArray) {
    if (ArrayID == 1) {
      passArray.forEach(theFunction1);
    } else if (ArrayID == 2) {
      passArray.forEach(theFunction2);
    }
  }

  function theFunction1(value, index, array) {
      // this output all the rows of column var1 
      console.log(array[index].var1);
      alert(array[index].var1);
  }

  function theFunction2(value, index, array) {
      // this output all the rows of column var14 
      console.log(array[index].var14);
      alert(array[index].var14);
  }

  // ArrayID = 1;
  // arrayFunction1(myArray1);

  // ArrayID = 2;
  // arrayFunction2(myArray2);

  // ArrayID = 1;
  // arrayFunction3(myArray1);

  // ArrayID = 2;
  // arrayFunction3(myArray2);

  function yourFunction(args) {
    let defaults = {opt1: true, opt2: 'something'};
    let params = {...defaults, ...args}; // right-most object overwrites 
    const {opt1, opt2, opt3} = params
    // this output the new value for opt2, ie "Args Nothing", note opt1 -> unchanged, opt3 -> undefined
    console.log(opt1 + ' ' + opt2 + ' ' + opt3);
    alert(opt1 + ' ' + opt2 + ' ' + opt3);
  }

  // yourFunction ({ opt2: "Args Nothing"});

  // return;

  fileName = "TaxiStands-WGS84";

  // let dataTAXI = await loadData_jsonFormat(fileName);
  // console.log(dataTAXI);

  // const taxiResponse = dataTAXI;
  // console.log(taxiResponse);

  const taxiRequest = axios.get("data/transport/TaxiStands-WGS84.json");

  const taxiResponse = await taxiRequest;
    
  console.log(taxiResponse.data);

  layerGroupID = "TAXI";
  const taxiLayerGroup = L.layerGroup();
  // taxiLayerGroup.addTo(map); // show by default
  // addMarkersToLayer(taxiResponse, taxiLayerGroup);
  addMarkersToLayerTAXI(taxiResponse.data, taxiLayerGroup);
  // addMarkersToLayer(taxiResponse, transitLayerGroup);
  // addMarkersToCircleLayer(taxiResponse, taxiLayerGroup, layerGroupID);

  fileName = "BusStops-WGS84";

  // let dataBUS = await loadData_jsonFormat(fileName);
  // console.log(dataBUS);

  // const busResponse = dataBUS;
  // console.log(busResponse);

  const busRequest = axios.get("data/transport/BusStops-WGS84.json");

  const busResponse = await busRequest;
    
  console.log(busResponse.data);

  layerGroupID = "BUS";
  const busLayerGroup = L.layerGroup();
  // busLayerGroup.addTo(map); // show by default
  // addMarkersToLayer(busResponse, busLayerGroup);
  addMarkersToLayerBUS(busResponse.data, busLayerGroup);
  // addMarkersToLayer(busResponse, transitLayerGroup);
  // addMarkersToCircleLayer(busResponse, busLayerGroup, layerGroupID);
  
  fileName = "mrt_stations-cleaned";
  
  // let dataMRT = await loadData_jsonFormat(fileName);
  // console.log(dataMRT);

  // const mrtResponse = dataMRT;
  // console.log(mrtResponse);

  const mrtRequest = axios.get("data/transport/mrt_stations-cleaned.json");

  const mrtResponse = await mrtRequest;
    
  console.log(mrtResponse.data);

  fileName = "lrt_stations-cleaned";
  
  // let dataLRT = await loadData_jsonFormat(fileName);
  // console.log(dataLRT);

  // const lrtResponse = dataLRT;
  // console.log(lrtResponse);

  const lrtRequest = axios.get("data/transport/lrt_stations-cleaned.json");

  const lrtResponse = await lrtRequest;
    
  console.log(lrtResponse.data);

  const transitLayerGroup = L.layerGroup();

  layerGroupID = "MRT";
  const mrtLayerGroup = L.layerGroup();
  // mrtLayerGroup.addTo(map); // show by default
  addMarkersToLayerTRANSIT(mrtResponse.data, mrtLayerGroup);
  addMarkersToLayerTRANSIT(mrtResponse.data, transitLayerGroup);
  // addMarkersToLayer(mrtResponse, mrtLayerGroup);
  // addMarkersToLayer(mrtResponse, transitLayerGroup);
  // addMarkersToCircleLayer(mrtResponse, mrtLayerGroup, layerGroupID);

  layerGroupID = "LRT";
  const lrtLayerGroup = L.layerGroup();
  addMarkersToLayerTRANSIT(lrtResponse.data, lrtLayerGroup);
  addMarkersToLayerTRANSIT(lrtResponse.data, transitLayerGroup);
  // addMarkersToLayer(lrtResponse, lrtLayerGroup);
  // addMarkersToLayer(lrtResponse, transitLayerGroup);
  // addMarkersToCircleLayer(lrtResponse, lrtLayerGroup, layerGroupID);

  const clearLayerGroup = L.layerGroup();

  const baseLayers = {
    "Clear": clearLayerGroup
  }

  // transitLayerGroup.addTo(map); // show by default

  // const baseLayers = {
    // "Transit Stations": transitLayerGroup
  // }
  

  // first parameter: base layers
  // second parameter: overlays, in this case: none
  // L.control.layers(baseLayers, {}).addTo(map);

  // optional (can toggle on or off) and can have more than one visible 
  let overlays = {
    // "MRT/LRT Stations": transitLayerGroup,
    "MRT Stations": mrtLayerGroup,
    "LRT Stations": lrtLayerGroup,
    "TAXI Stands": taxiLayerGroup,
    "BUS Stops": busLayerGroup
  };

  // a layer control to our map
  L.control.layers(baseLayers, overlays).addTo(map);

  

  // create a marker cluster group
  clusterGroup = L.markerClusterGroup();

  layerGroupID = "MRT";
  addMarkersToCluster(mrtResponse.data, clusterGroup);
  layerGroupID = "LRT";
  addMarkersToCluster(lrtResponse.data, clusterGroup);
  // addMarkersToCluster(taxiResponse.data, clusterGroup);
  // addMarkersToCluster(busResponse.data, clusterGroup);

  // addMarkersToCluster(mrtResponse, clusterGroup);
  // addMarkersToCluster(lrtResponse, clusterGroup);
  // addMarkersToCluster(taxiResponse, clusterGroup);
  // addMarkersToCluster(busResponse, clusterGroup);

  clusterGroup.addTo(map);


  // default position: bottomleft for scale
  // L.control.scale().addTo(map);

  // L.control.scale({'position':'bottomleft', 'metric':true,'imperial':false}).addTo(map);

  L.control.scale({
    // position: 'bottomright',
    'metric':true,
    'imperial':false
  }).addTo(map);

  let options = {
    flyTo: true,
    initialZoomLevel: 16,
    drawCircle: false,
    returnToPrevBounds: true,
    // position: 'bottomright',
    strings: {
        title: "Show me where I am, yo!"
    }
  };

  let locateControl = L.control.locate(options)
  locateControl.addTo(map)


  let myLocation = document.querySelector("#locateBtn");

  let locateClickCount = 0;

  let myLocationMarker = L.marker([1.29, 103.85]);
  let layer = myLocationMarker.bindTooltip('Hi! Welcome to SG-finder.').addTo(map);
  layer.openTooltip();
  // layer.closeTooltip();

  
  myLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

        locateControl.start()
        if (lang === 'zh') {
          myLocation.innerText = "复原位置"
        } else {
          myLocation.innerText = "Reset Location"
        }
        
    }
    else if (locateClickCount % 2 == 0){

        locateControl.stop()
        // map.setView(setCoordinates, 11.5)
        map.setView(setCoordinates, 10)
        locateClickCount = 0

        if (lang === 'zh') {
          myLocation.innerText = "寻找位置"
        } else {
          myLocation.innerText = "My Location"
        }

        for(var i = 0; i < mapMarkers.length; i++){
          map.removeLayer(mapMarkers[i]);
        }
        for(var i = 0; i < mapMarkers1.length; i++){
          map.removeLayer(mapMarkers1[i]);
        }
        // Here you remove the layer
        if (markerCluster) {
          map.removeLayer(markerCluster);
        }
    }
});

let geoLocation = document.querySelector('.leaflet-bar-part.leaflet-bar-part-single')

geoLocation.addEventListener("click", function() {

    locateClickCount ++

    if (locateClickCount % 2 !== 0){

      if (lang === 'zh') {
        myLocation.innerText = "复原位置"
      } else {
        myLocation.innerText = "Reset Location"
      }

    }

    else if (locateClickCount % 2 == 0){
        // map.setView(setCoordinates, 11.5)
        map.setView(setCoordinates, 10)
        locateClickCount = 0
        
        if (lang === 'zh') {
          myLocation.innerText = "寻找位置"
        } else {
          myLocation.innerText = "My Location"
        }
        
        for(var i = 0; i < mapMarkers.length; i++){
          map.removeLayer(mapMarkers[i]);
        }
        for(var i = 0; i < mapMarkers1.length; i++){
          map.removeLayer(mapMarkers1[i]);
        }
        // Here you remove the layer
        if (markerCluster) {
          map.removeLayer(markerCluster);
        }
        // Here you remove the layer
        if (clusterGroup) {
          map.removeLayer(clusterGroup);
        }
    }
});

document
    .querySelector("#resetBtn")
    .addEventListener("click", async function () {
      lang = "en";
      changeLanguage(lang);
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

      // Here you remove the layer
      if (markerCluster) {
        map.removeLayer(markerCluster);
      }

      loadDefaultSettings();
      locateClickCount = 0;

      map.setView(defaultCoordinates, 10);
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

      console.error(data.results.length);

      // remove all existing markers from the search results layer
      searchResultLayer.clearLayers();

      // add the result to the search results div
      const resultElement = document.querySelector("#search-results");
      if (data.results.length == 0) {
        if (lang === 'zh') {
          resultElement.innerHTML = "无搜索结果!";
        } else {
          resultElement.innerHTML = "No Results Found!";
        }
      } else {
        resultElement.innerHTML = "";

        // add the search results as marker
        addSearchResultToMap(data, searchResultLayer, resultElement, map);
      }
      

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
      
      console.error(data1.results.length);

      // remove all existing markers from the search results layer
      searchResultLayer1.clearLayers();
      map.removeLayer(myLocationMarker);
      
      // add the result to the search results div
      const resultElement1 = document.querySelector("#result-listing");
      
      if (data1.results.length == 0) {
        if (lang === 'zh') {
          resultElement1.innerHTML = "无搜索结果!";
        } else {
          resultElement1.innerHTML = "No Results Found!";
        }
      } else {
        resultElement1.innerHTML = "";

        // add the search results to panel
        addSearchResultToOrderlist(data1, searchResultLayer1, resultElement1, map);
      }
      
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
      // Here you remove the layer
      if (markerCluster) {
        map.removeLayer(markerCluster);
      }
    });

async function quickSearchCall(quickSearchByCategoryID) {
// get the center of the map
const center = map.getCenter();

data1 = await quickSearch(quickSearchByCategoryID, center.lat, center.lng, searchRadius, searchLimit);

console.log(data1);

console.error(data1.results.length);

// remove all existing markers from the search results layer
searchResultLayer1.clearLayers();

// add the result to the search results div
const resultElement1 = document.querySelector("#result-listing");

if (data1.results.length == 0) {
  if (lang === 'zh') {
    resultElement1.innerHTML = "无搜索结果!";
  } else {
    resultElement1.innerHTML = "No Results Found!";
  }
} else {
  resultElement1.innerHTML = "";

  // add the search results to panel
  addSearchResultToOrderlist(data1, searchResultLayer1, resultElement1, map);
}

    }

    document
    .querySelector("#itemN1Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 1!");

      // 12068	Community and Government > Government Building > Embassy or Consulate
      quickSearchByCategoryID = "12068";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemN2Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 2!");

      // 19028	Travel and Transportation > Tourist Information and Service
      quickSearchByCategoryID = "19028";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemN3Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 3!");

      // 19009	Travel and Transportation > Lodging
      quickSearchByCategoryID = "19009";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemN4Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 4!");

      // 19030	Travel and Transportation > Transport Hub
      quickSearchByCategoryID = "19030";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemN5Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 5!");

      // 19051	Travel and Transportation > Transportation Service
      quickSearchByCategoryID = "19051";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemN6Selected")
    .addEventListener("click", async function () {
      // alert("You have selected N-Item 6!");

      // 19055	Travel and Transportation > Travel Agency
      quickSearchByCategoryID = "19055";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemE1Selected")
    .addEventListener("click", async function () {
      // alert("You have selected E-Item 1!");

      // 12072	Community and Government > Government Building > Law Enforcement and Public Safety > Police Station
      quickSearchByCategoryID = "12072";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemE2Selected")
    .addEventListener("click", async function () {
      // alert("You have selected E-Item 2!");

      // 12071	Community and Government > Government Building > Law Enforcement and Public Safety > Fire Station
      quickSearchByCategoryID = "12071";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemE3Selected")
    .addEventListener("click", async function () {
      // alert("You have selected E-Item 3!");

      // 15008	Health and Medicine > Emergency Service
      quickSearchByCategoryID = "15008";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemE4Selected")
    .addEventListener("click", async function () {
      // alert("You have selected E-Item 4!");

      // 15014	Health and Medicine > Hospital
      quickSearchByCategoryID = "15014";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#itemE5Selected")
    .addEventListener("click", async function () {
      // alert("You have selected E-Item 5!");

      // 15011	Health and Medicine > Healthcare Clinic
      quickSearchByCategoryID = "15011";

      quickSearchCall(quickSearchByCategoryID);

    });

    document
    .querySelector("#selectEnglish")
    .addEventListener("click", async function () {
      // alert("You have selected English!");
      lang = "en";
      changeLanguage('en');
    });

    document
    .querySelector("#selectChinese")
    .addEventListener("click", async function () {
      // alert("You have selected Chinese!");
      lang = "zh";
      changeLanguage('zh');
    });

});

