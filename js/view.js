function createMap() {
  let singapore = [ 1.29,103.85]; // #1 Singapore latlng
  // let map = L.map('map');
  // let map = L.map('map1');
  var map = L.map('map1', {
    center: [1.2494, 103.8303],
    zoom: 10,
    maxZoom: 19,
    minZoom: 10,
    zoomControl: true,
    scrollWheelZoom: true,
    attributionControl: true,
    preferCanvas: false // Disable Canvas rendering (default behavior)
    // preferCanvas: true // Enable Canvas rendering
  });

  map.setView(singapore, 10); // #2 Set the center point

  // The attribution control allows you to display attribution data in a small text box on a map. 
  // It is put on the map by default unless you set its attributionControl option to false.
  // default position: bottomright for attribution
  // default attribution:'Leaflet'

  // L.control.attribution({
    // position: 'bottomright', // Position the control in the bottom-right corner
    // prefix: 'Map Data Sources:' // Prefix text before attribution information
  // }).addTo(map);
  
  map.attributionControl.setPosition('bottomright');

  // map.attributionControl.setPrefix('Map Data Source:'); // Prefix text before attribution information
  // map.attributionControl.addAttribution('&copy; Leaflet');
  // map.attributionControl.addAttribution('&copy; OpenStreetMap contributors');
  // map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');

  // map.zoomControl.remove();

  // default position: topleft for zoom
  map.zoomControl.setPosition('topright');

  // Using Zoom Slider (with Leaflet-zoom-slider plugin):
  // Add zoom slider control
  // L.control.zoomslider().addTo(map);

  // In Leaflet.js, scrollWheelZoom is an option that controls whether or not the map 
  // can be zoomed using the scroll wheel of the mouse. 
  // When this option is enabled, users can zoom in and out of the map by scrolling up or down with the mouse wheel. 
  // Conversely, when it’s disabled, scrolling the mouse wheel won’t change the zoom level of the map.
  // var map = L.map('map', {
    // scrollWheelZoom: true // Enable scroll wheel zoom
  // });

// Or disable scroll wheel zoom
// var map = L.map('map', {
//     scrollWheelZoom: false // Disable scroll wheel zoom
// });

// In Leaflet.js, the attributionControl is a built-in feature that manages the display of attribution information on the map. 
// Attribution refers to giving credit to the data sources or map providers whose content is being used in the map. 
// The attributionControl allows developers to control how this attribution information is presented to users.

// var map = L.map('map', {
  // attributionControl: true, // Enable attribution control
  // attributionControlOptions: {
      // position: 'bottomright', // Position the control in the bottom-right corner
      // prefix: 'Data sources:' // Prefix text before attribution information
  // }
// });

// In Leaflet.js, the preferCanvas option is used to specify whether to prioritize rendering map layers 
// using HTML5 Canvas instead of the default SVG (Scalable Vector Graphics) method. Canvas rendering typically offers 
// better performance for large datasets or complex maps due to its efficient rendering approach.

// Disabling Canvas Rendering (using the default SVG rendering):

// preferCanvas: false // Disable Canvas rendering (default behavior)

// Enabling Canvas Rendering:
// In this example, the preferCanvas option is set to true when initializing the Leaflet map. 
// This instructs Leaflet to prioritize rendering map layers using Canvas.

// preferCanvas: true // Enable Canvas rendering

  // const singaporeLatLng = [1.3521, 103.8198];
  // const map = L.map("map");
  // map.setView(singaporeLatLng, 11);

  // var map = L.map('map', {
    // maxZoom: 19,
    // minZoom: 10,
    // zoomControl: false
// });

// So the positions can be

// topleft
// topright
// bottomleft
// bottomright

// L.control.zoom({
    // position: 'topright'
// }).addTo(map);

// map.setView(singapore, 10); // #2 Set the center point

  // map settings
map.setMinZoom(10);

let maxBounds = map.getBounds();
map.setMaxBounds(maxBounds)

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  return map;
}

// Create additional Control placeholders
function addControlPlaceholders(map) {
  var corners = map._controlCorners,
      l = 'leaflet-',
      container = map._controlContainer;

  function createCorner(vSide, hSide) {
      var className = l + vSide + ' ' + l + hSide;

      corners[vSide + hSide] = L.DomUtil.create('div', className, container);
  }

  createCorner('verticalcenter', 'left');
  createCorner('verticalcenter', 'right');
}

// addControlPlaceholders(map);

// Change the position of the Zoom Control to a newly created placeholder.
// map.zoomControl.setPosition('verticalcenterright');

// You can also put other controls in the same placeholder.
// L.control.scale({position: 'verticalcenterright'}).addTo(map);

let mapMarkers = [];

function addSearchResultToMap(data, searchResultLayer, resultElement, map) {

  

    for (let r of data.results) {

      // create and add the marker
        const lat = r.geocodes.main.latitude;
        const lng = r.geocodes.main.longitude;
        const marker = L.marker([lat, lng]);
        // Add marker to mapMarker for future reference
        mapMarkers.push(marker);
        marker.bindPopup(`<h5>${r.name}</h5>
                <h6>Address:${r.location.formatted_address}</h6>           
            `);
        marker.addTo(searchResultLayer);

        // add the search result to the result element
        const eachResultElement = document.createElement("div");
        eachResultElement.className = "search-result";
        eachResultElement.innerHTML = r.name;
        eachResultElement.addEventListener("click", function(){
          map.flyTo([lat, lng], 16);
          marker.openPopup();
        })
        resultElement.appendChild(eachResultElement);


      }

      

}

let mapMarkers1 = [];

function addSearchResultToOrderlist(data1, searchResultLayer1, resultElement1, map) {


  for (let r of data1.results) {

    // create and add the marker
      const lat = r.geocodes.main.latitude;
      const lng = r.geocodes.main.longitude;
      const marker = L.marker([lat, lng]);
      // Add marker to mapMarker for future reference
      mapMarkers1.push(marker);
      marker.bindPopup(`<h5>${r.name}</h5>
              <h6>Address:${r.location.formatted_address}</h6>
              <h6>Status:${r.closed_bucket}</h6>           
          `);
      marker.addTo(searchResultLayer1);

      

      // add the search result to the result element
      const eachResultElement1 = document.createElement('li');
      // eachResultElement1.className = "search-result";
      eachResultElement1.innerHTML = r.name;

      // eachResultElement1.append(`${r.name}`);
      eachResultElement1.append(" ");
      eachResultElement1.append(`${r.location.address}`);
      
      

      // eachResultElement1.append(`<ul><li>${r.location.formatted_address}</li></ul>`);

      eachResultElement1.addEventListener("click", function(){
        map.flyTo([lat, lng], 16);
        marker.openPopup();
      })
      resultElement1.appendChild(eachResultElement1);

      
    }

    

}
