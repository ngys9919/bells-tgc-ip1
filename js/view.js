function createMap() {
  let singapore = [ 1.29,103.85]; // #1 Singapore latlng
  let map = L.map('map');
  map.setView(singapore, 10); // #2 Set the center point

  // const singaporeLatLng = [1.3521, 103.8198];
  // const map = L.map("map");
  // map.setView(singaporeLatLng, 11);

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


function addSearchResultToMap(data, searchResultLayer, resultElement, map) {



    for (let r of data.results) {

      // create and add the marker
        const lat = r.geocodes.main.latitude;
        const lng = r.geocodes.main.longitude;
        const marker = L.marker([lat, lng]);
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