function testFourSqAPI_APIKeys() {
  const response = axios.get(FOURSQUARE_API + "/search", {
    headers: {
      Accept: "application/json",
      // All the below Authorization can work!
      // class
      Authorization: "fsq3EFsPimlfZXz0cUnuO3fdFPkGT7bmZSrRaQbgeimIoGI=",
      // eric
      // Authorization: "fsq32JqRqo6AHKIhCP2yosAeYOhHUDuoLuKTfgsOQmhStCY="
    },
    params: {
      // static query using testFourSqAPI_APIKeys()
      radius: 5000, // Sets a radius distance (in meters) used to define an area to bias search results.
      limit: 1, // The number of results to return, up to 50. Defaults to 10.
      // This wont work because of space between lat and lng
      // "ll": '1.3521, 103.8198' ,
      // This work when the space between lat and lng is removed
      "ll": '1.3521,103.8198' , // The latitude/longitude around which to retrieve place information. This must be specified as latitude,longitude (e.g., ll=41.8781,-87.6298).
      query: 'coffee' // A string to be matched against all content for this place, including but not limited to venue name, category, telephone number, taste, and tips.
    },
  })
  .then(function(response){
      console.log(response);
      console.log("Test Response A: "+response.data.results[0].name);
      console.log("Test response B: "+response.data.results[0].categories[0].name);
  });

}

async function loadPostalCode(){
  let response = await axios.get("./data/postallist.json") 
  return response.data    
}

function search2(searchPostalCode) {

for (let entry of loadedData){

  if (entry.postal_code == searchPostalCode){

      return entry;

  }
}

entry = {"postal_code": 0, "street_name": "", "lat": 1.29, "lon": 103.85};
console.log(entry);
return entry;

}

async function search(searchQuery, lat, lng, radius = 2500) {
    const response = await axios.get(FOURSQUARE_API + "/search", {
      headers: {
        Accept: "application/json",
        // All the below Authorization can work!
        // class
        // Authorization: "fsq3EFsPimlfZXz0cUnuO3fdFPkGT7bmZSrRaQbgeimIoGI=",
        // eric
        Authorization: "fsq32JqRqo6AHKIhCP2yosAeYOhHUDuoLuKTfgsOQmhStCY="
      },
      params: {
        query: searchQuery,
        ll: `${lat},${lng}`,
        radius: radius,
        limit: 50
        // limit: 15
      },
    });
    return response.data;
  }