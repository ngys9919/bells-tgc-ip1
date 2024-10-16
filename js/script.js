const FOURSQUARE_API = "https://api.foursquare.com/v3/places";

document.addEventListener("DOMContentLoaded", async function () {
  // create the map
  const map = createMap();

  // create the search result layer
  const searchResultLayer = L.layerGroup();
  searchResultLayer.addTo(map);

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
