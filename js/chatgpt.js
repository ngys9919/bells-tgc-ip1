let singaporeLat = 1.3521;
let singaporeLng = 103.8198;
let singapore = [singaporeLat, singaporeLng]; // singaporeLatlng
let singaporeZoomLevel = 12;

// const OPENAI_API = "https://api.openai.com/v1/chat/completions";


const promptTemplate = "I want you to act as a travel guide. I will give you a location and you will suggest the places to visit and some information about it. In addition, include an itinerary based on the number of days. My request is : I am going to ";
const promptFormat1 = "Please do the html formatting of the content."
const promptFormat2 = "Please provide your answers in HTML format, using appropriate HTML tags."
const promptFormat = "Please provide your answers straight right away in HTML format, using appropriate HTML tags."
const promptTour1 = "Please based the itinerary on historical type of places to visit."
const promptTour2 = "Please based the itinerary for places to visit on historical tour."
const promptTour = "Please based the itinerary for places to visit on "

let chatgptTourType = "popular tour";
let chatgptFileType = "popular";

const promptList0 = "Please just provide a list of popular places of interest in Singapore with its location in latitude and longtitude format."
const promptList1 = "Please just provide a list of popular places of interest in Singapore with the output format in an array format and its location in json format with latitude and longtitude."
const promptList2 = "Please just provide a list of budget places of interest in Singapore with the output format in an array format and its location in json format with latitude and longtitude."
const promptList3 = "Please just provide a list of cultural places of interest in Singapore with the output format in an array format and its location in json format with latitude and longtitude."
const promptList4 = "Please just provide a list of historical places of interest in Singapore with the output format in an array format and its location in json format with latitude and longtitude."
const promptList5 = "Please just provide a list of gourmet food places of interest in Singapore with the output format in an array format and its location in json format with latitude and longtitude."
const promptList6 = "Please just provide a list of tertiary institutions (including polytechnics and universities) places of interest in Singapore with the output format in an array format and its location in json format with latitude and longtitude."




async function loadData_jsonFormat(chatgptFileType) {
    if (chatgptFileType == "popular") {
        // filePath = 'data/chatgpt/chatgpt_popular.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_popular.json';
    } else if (chatgptFileType == "budget") {
        // filePath = 'data/chatgpt/chatgpt_budget.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_budget.json';
    } else if (chatgptFileType == "cultural") {
        // filePath = 'data/chatgpt/chatgpt_cultural.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_cultural.json';
    } else if (chatgptFileType == "historical") {
        // filePath = 'data/chatgpt/chatgpt_historical.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_historical.json';
    } else if (chatgptFileType == "gourmetfood") {
        // filePath = 'data/chatgpt/chatgpt_gourmetfood.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_gourmetfood.json';
    } else if (chatgptFileType == "tertiaryinstitutions") {
        // filePath = 'data/chatgpt/chatgpt_tertiaryinstitutions.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_tertiaryinstitutions.json';
    } else {
        // filePath = 'data/chatgpt/chatgpt_popular.json';
        filePath = 'https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chatgpt/chatgpt_popular.json';
    }
    const response = await axios.get(filePath);
    return response.data;
}


  
  
// curl https://api.openai.com/v1/engines/davinci/completions \ -H 
// "Content-Type: application/json" \ -H 
// "Authorization: Bearer $OPENAI_API_KEY" \ -d 
// '{ "prompt": "", 
// "temperature": 0.7, 
// "max_tokens": 64, 
// "top_p": 1, 
// "frequency_penalty": 0, 
// "presence_penalty": 0 }'

// function OpenaiFetchAPI() {
    // console.log("Calling GPT3")
    // let url = "https://api.openai.com/v1/engines/davinci/completions";
    // let bearer = 'Bearer ' + YOUR_TOKEN
    // fetch(url, {
        // method: 'POST',
        // headers: {
            // 'Authorization': bearer,
            // 'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({
            // "prompt": "Once upon a time",
            // "max_tokens": 5,
            // "temperature": 1,
            // "top_p": 1,
            // "n": 1,
            // "stream": false,
            // "logprobs": null,
            // "stop": "\n"
        // })


    // }).then(response => {
        
        // return response.json()
       
    // }).then(data=>{
        // console.log(data)
        // console.log(typeof data)
        // console.log(Object.keys(data))
        // console.log(data['choices'][0].text)
        
    // })
        // .catch(error => {
            // console.log('Something bad happened ' + error)
        // });

// }

// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
    // "model": "gpt-4o",
    // "messages": [
    //   {
        // "role": "system",
        // "content": "You are a helpful assistant."
    //   },
    //   {
        // "role": "user",
        // "content": "Hello!"
    //   }
    // ]
//   }'

// const dummy = ["sk-proj...GiD", "7hVP...eK7", "OfT...E2J"];
// let dummy1 = dummy.at(0);
// let dummy2 = dummy.at(1);
// let dummy3 = dummy.at(2);
// let apiKey = dummy1 + dummy2 + dummy3;
// console.log(apiKey);


// const apiKey = OPENAI_API_KEY;

// async function OpenaiFetchAPI2(prompt) {
    // console.log("Calling GPT4-o")
    // let url = "https://api.openai.com/v1/chat/completions";
    // let bearer = 'Bearer ' + `${apiKey}`
    // fetch(url, {
        // method: 'POST',
        // headers: {
            // 'Authorization': bearer,
            // 'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({
            // "model": "gpt-4o-mini",
            // "messages": [
                // {
                    // "role": "user",
                    // "content": `${prompt}`
                // }
            // ]
        // })


    // }).then(response => {
        // let ret = response.json();
        // return ret;
       
    // }).then(data=>{
        // console.log(data)
        // console.log(typeof data)
        // console.log(Object.keys(data))
        // console.log(data['choices'][0].message.content)

    // })
    // .catch(error => {
        // console.log('Something bad happened ' + error)
    // });

// }

// OpenaiFetchAPI2();

// const OPENAI_API = "https://api.openai.com/v1/chat/completions";
// const proxyUri = "https://sg-finder-app-cgdgd.ondigitalocean.app/v1/chat/completions";
// const proxyUri = "https://localhost:3000/v1/chat/completions";


// Use this for express app.use() via proxy server;
const proxyUri = "http://127.0.0.1:3000/v1/chat/completions";

// This wont work for proxy, but only for direct call;
// const proxyUri = "https://api.openai.com/v1/chat/completions/";


let chatgpt_reply = {};


// This is for running at backend only with proxy server!
// Remember to start proxy server first before starting the frontend.
async function OpenaiFetchAPI3(prompt3) {
    console.log("Calling GPT-4o-mini from Frontend via chatgpt.js")
    let url = proxyUri;
    console.log(url);
    response = await fetch(url, {
        

    }).then(response => {
        let ret = response.json();
        return ret;
       
    }).then(data=>{
        chatgpt_reply = data;
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].message.content)
        // return data;
    })
    .catch(error => {
        console.log('Error happened in fetching ChatGPT ' + error)
    });
    
}

const promptUri = "http://127.0.0.1:3000/prompt/";

async function promptFetchAPI3(prompt) {
    console.log("Passing prompt variable from Frontend to Backend");
    let url = promptUri;
    console.log(url);
    response = await fetch(url + 'prompt=' + `${prompt}`, {
    // response = await fetch(url + 'prompt=' + prompt.toString(), {
    }).then(response => {
        let ret = response;
        console.log(ret);
        return ret;
    })
    .catch(error => {
        console.log('Error happened in fetching Prompt ' + error)
    });
}

// This is for running at frontend only with local host!
// async function OpenaiFetchAPI4(prompt) {
    // console.log("Calling GPT-4o-mini")
    // let url = OPENAI_API;
    // let bearer = 'Bearer ' + `${apiKey}`
    // response = await fetch(url, {
        // method: 'POST',
        // headers: {
            // 'Authorization': bearer,
            // 'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({
            // "model": "gpt-4o-mini",
            // "messages": [
                // {
                    // "role": "user",
                    // "content": `${prompt}`
                // }
            // ]
        // })


    // }).then(response => {
        // let ret = response.json();
        // return ret;
       
    // }).then(data=>{
        // chatgpt_reply = data;
        // console.log(data)
        // console.log(typeof data)
        // console.log(Object.keys(data))
        // console.log(data['choices'][0].message.content)
        
    // })
    // .catch(error => {
        // console.log('Something bad happened ' + error)
    // });
    
// }

// Singapore latlng
// let currentLat = 1.29;
// let currentLng = 103.85;
// let targetLat = 1.29;
// let targetLng = 103.85;

// singaporeLatlng
// let currentLat = 1.3521;
// let currentLng = 103.8198;
// let targetLat = 1.3521;
// let targetLng = 103.8198;

// internationalPlaza
// let currentLat = 1.2761;
// let currentLng = 103.8458;
// let targetLat = 1.2761;
// let targetLng = 103.8458;
// let targetLocation = "Singapore";

// changiAirport
// let currentLat = 1.3586;
// let currentLng = 103.9899;
// let targetLat = 1.3586;
// let targetLng = 103.9899;
// let targetLocation = "Singapore";

let currentLat = singaporeLat;
let currentLng = singaporeLng;
let targetLat = singaporeLat;
let targetLng = singaporeLng;
let targetLocation = "Singapore";

function locateUser(map){
    map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
          .on('locationfound', function(e){
            for(let i = 0; i < mapMarkers.length; i++){
                map.removeLayer(mapMarkers[i]);
            }

            currentLat = e.latitude;
            currentLng = e.longitude;
            targetLat = currentLat;
            targetLng = currentLng;
            targetLocation = "";

            myMarker = L.marker([e.latitude, e.longitude]).bindPopup('This is your current location.');
            // Add marker to mapMarker for future reference
            mapMarkers.push(myMarker);
            let layer = myMarker.bindTooltip('You are here!').addTo(map);
            layer.openTooltip();
            // layer.closeTooltip();
 
            myCircle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            });
            
            map.addLayer(myMarker);
            map.addLayer(myCircle);
          })
         .on('locationerror', function(e){
              console.log(e);
              alert("Location access denied.");
          });
}

// How do I calculate the distance between two points specified by latitude and longitude?

// For clarification, I'd like the distance in kilometers; the points use the WGS84 system 
// and I'd like to understand the relative accuracies of the approaches available.

// Here are some comparisons of the various algorithms offered here:

// geoDistance(50,5,58,3)
// Haversine: 899 km
// Maymenn: 833 km
// Keerthana: 897 km
// google.maps.geometry.spherical.computeDistanceBetween(): 900 km

// geoDistance(50,5,-58,-3)
// Haversine: 12030 km
// Maymenn: 11135 km
// Keerthana: 10310 km
// google.maps.geometry.spherical.computeDistanceBetween(): 12044 km

// geoDistance(.05,.005,.058,.003)
// Haversine: 0.9169 km
// Maymenn: 0.851723 km
// Keerthana: 0.917964 km
// google.maps.geometry.spherical.computeDistanceBetween(): 0.917964 km

// geoDistance(.05,80,.058,80.3)
// Haversine: 33.37 km
// Maymenn: 33.34 km
// Keerthana: 33.40767 km
// google.maps.geometry.spherical.computeDistanceBetween(): 33.40770 km

// Calculate distance between two latitude-longitude points? 
// 1.Haversine formula
// 2.Maymenn
// 3.Keerthana

// This script [in Javascript] calculates great-circle distances between the two points –
// that is, the shortest distance over the earth’s surface – using the ‘Haversine’ formula.
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

// Anyway, here is a Javascript implementation of Keerthana's algorithm:
function geoDistance(lat1, lng1, lat2, lng2){
    const a = 6378.137; // equitorial radius in km
    const b = 6356.752; // polar radius in km

    let sq = x => (x*x);
    let sqr = x => Math.sqrt(x);
    let cos = x => Math.cos(x);
    let sin = x => Math.sin(x);
    let radius = lat => sqr((sq(a*a*cos(lat))+sq(b*b*sin(lat)))/(sq(a*cos(lat))+sq(b*sin(lat))));

    lat1 = lat1 * Math.PI / 180;
    lng1 = lng1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lng2 = lng2 * Math.PI / 180;

    let R1 = radius(lat1);
    let x1 = R1*cos(lat1)*cos(lng1);
    let y1 = R1*cos(lat1)*sin(lng1);
    let z1 = R1*sin(lat1);

    let R2 = radius(lat2);
    let x2 = R2*cos(lat2)*cos(lng2);
    let y2 = R2*cos(lat2)*sin(lng2);
    let z2 = R2*sin(lat2);

    return sqr(sq(x1-x2)+sq(y1-y2)+sq(z1-z2));
}

let map = L.map("chatgpt-map");  // create the map in inside the element with id `chatgpt-map`
let mapMarkers = [];

let myCircle;
let myMarker;

document.addEventListener("DOMContentLoaded", async function () {

    // let singaporeLatlng = [1.29, 103.85];
    // let singaporeLatlng = [1.2761, 103.8458];
    // let singaporeLatlng = [1.3586, 103.9899];
    // let singaporeLatlng = [1.3521, 103.8198];
    let singaporeLatlng = [singaporeLat, singaporeLng];
    // let singaporeLatlng = singapore;

    // L is a global variable which represents the Leaflet object
    // all functions and variables in Leaflet are in the `L` object
    
    // let map = L.map("chatgpt-results");  // create the map in inside the element with id `myMap`
    // two parameters: one is an array which represents the lat lng, second the zoom level
    // map.setView(singaporeLatlng, 12);
    map.setView(singaporeLatlng, singaporeZoomLevel);
    // map.setView(singapore, singaporeZoomLevel); 

    // create a tile layer
    let tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tileLayer.addTo(map);

    locateUser(map);

    document
    .querySelector("#distanceCalBtn")
    .addEventListener("click", function () {
        // alert("You have clicked Calculate Distance Button!");
        // lat1, lng1 -> current location
        // lat2, lng2 -> target location
        // distance = geoDistance(lat1, lng1, lat2, lng2);
        const distance = geoDistance(currentLat, currentLng, targetLat, targetLng).toFixed(2);
        if (targetLocation == "") {
            alert('You are at current location! The calculated distance is ' + `${distance}` + ' km away.');
        } else {
            alert('The distance between ' + `${targetLocation}` + ' and current location is ' + `${distance}` + ' km away.');
        }
    });

    document
    .querySelector("#clearAnswerBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        // alert("You have clicked Clear Answer Button!");
        
        // clear the answer to the chatgpt results div
        const resultElement = document.querySelector("#chatgpt-results");
        resultElement.innerHTML = "Ask ChatGPT Response:";

        for(let i = 0; i < mapMarkers.length; i++){
            map.removeLayer(mapMarkers[i]);
        }
    
        myMarker.removeFrom(map);
        myCircle.removeFrom(map);
       
        // Here you remove the layer
        // if (markerCluster) {
            // map.removeLayer(markerCluster);
        // }

        // remove all circles instances
        // map.eachLayer((layer) => {
            // if (layer instanceof L.Circle) {
            //    layer.remove();
            // }
        // });

        // map.setView(singaporeLatlng, 12);
        // map.setView(singaporeLatlng, singaporeZoomLevel);
        map.setView(singapore, singaporeZoomLevel);
        // myLocationMarker = L.marker(singaporeLatlng);
        myLocationMarker = L.marker(singapore);
        // Add marker to mapMarker for future reference
        mapMarkers.push(myLocationMarker);
        layer = myLocationMarker.bindTooltip('Hi! Welcome to SG-finder.').addTo(map);
        layer.openTooltip();

        // locateUser(map);
    });

    

    document
    .querySelector("#sendRequestBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        // alert("You have clicked Send Request Button!");

        const chatgptInputPlace = document.querySelector("#inputPlace").value;
        const chatgptInputDays = document.querySelector("#inputDays").value;

        const prompt1 = `${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ';
        const prompt2 = prompt1 + promptTour + `${chatgptTourType}` + '. ';
        const prompt3 = prompt2 + promptFormat;
        console.log(prompt3);

      // add the answer to the chatgpt results div
      const resultElement1 = document.querySelector("#chatgpt-results");
        // add the search result to the result element
        const eachResultElement1 = document.createElement("p");
        eachResultElement1.className = "chatgpt-result";
        eachResultElement1.innerHTML += `Please wait... ChatGPT is generating your answer! <br>`;
        document.getElementById("chatgpt-results").appendChild(eachResultElement1);
        
    //   resultElement1.innerHTML = "Please wait... ChatGPT is generating your answer!";
    //   resultElement1.className = "chatgpt-result";

        // const prompt = "Hello!";
        // await OpenaiFetchAPI3(prompt);

        // const prompt4 = "Say goodbye to me!";

        try {
            await promptFetchAPI3(prompt3);
            // await promptFetchAPI3(prompt4);
        } catch (error) {
            console.error("Error passing prompt to backend", error);
        } finally {
            console.log("Finally, Featch API - Prompt completed!");
        }

        try {
            await OpenaiFetchAPI3(prompt3);
            // await OpenaiFetchAPI4(prompt3);
            const reply = chatgpt_reply['choices'][0].message.content;
            console.log(reply);
    
            eachResultElement1.innerHTML = `${reply}`;
            // document.getElementById("chatgpt-results").appendChild(eachResultElement1);
        } catch (error) {
            console.error("Error connecting to OpenAI ChatGPT", error);
            eachResultElement1.innerHTML += `Error connecting to OpenAI ChatGPT: ${error} <br>`;
            // document.getElementById("chatgpt-results").appendChild(eachResultElement1); 
            eachResultElement1.innerHTML += `TripAI Advisor... feature is currently unavailable!`;
            // document.getElementById("chatgpt-results").appendChild(eachResultElement1);
        } finally {
            console.log("Finally, Fetch API - ChatGPT completed!");
            // document.getElementById("chatgpt-results").appendChild(eachResultElement1);
            resultElement1.appendChild(eachResultElement1);
        }
        
        // console.log(chatgptdata);

      //   resultElement1.innerHTML = 'ChatGPT prompt: ' + `<br> ${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ' + `<br><br>` + 'ChatGPT response: ';
      //   resultElement1.innerHTML = `${promptTemplate}`;
    
    // const reply = chatgpt_reply['choices'][0].message.content;
    // console.log(reply);

    // resultElement1.innerHTML = `${reply}`; 

    });

    document
    .querySelector("#flexRadioDefault1")
    .addEventListener("click", async function () {
        // alert("You have selected Radio1 !");
        chatgptTourType = "popular tour";
        chatgptFileType = "popular";
    });

    document
    .querySelector("#flexRadioDefault2")
    .addEventListener("click", async function () {
        // alert("You have selected Radio2 !");
        chatgptTourType = "budget tour";
        chatgptFileType = "budget";
    });

    document
    .querySelector("#flexRadioDefault3")
    .addEventListener("click", async function () {
        // alert("You have selected Radio3 !");
        chatgptTourType = "cultural tour";
        chatgptFileType = "cultural";
    });

    document
    .querySelector("#flexRadioDefault4")
    .addEventListener("click", async function () {
        // alert("You have selected Radio4 !");
        chatgptTourType = "historical tour";
        chatgptFileType = "historical";
    });

    document
    .querySelector("#flexRadioDefault5")
    .addEventListener("click", async function () {
        // alert("You have selected Radio5 !");
        chatgptTourType = "gourmet food tour";
        chatgptFileType = "gourmetfood";
    });

    document
    .querySelector("#flexRadioDefault6")
    .addEventListener("click", async function () {
        // alert("You have selected Radio6 !");
        chatgptTourType = "tertiary institutions (include popular polytechnics and universities) tour";
        chatgptFileType = "tertiaryinstitutions";
    });
    
    document
    .querySelector("#continueBtn")
    .addEventListener("click", async function () {
        // alert("You have selected Continue... Button!");
        // const extension = document.getElementById("extension");
        // if (window.getComputedStyle(extension).visibility === "hidden") {
            // extension.style.visibility = "visible";
            // locateUser(map);
        // }
        
        // clear the answer to the chatgpt results div
        const resultElement = document.querySelector("#chatgpt-tellmemore");
        resultElement.innerHTML = "Tell me more... ";

        // remove all markers instances via mapMarkers array
        // for(let i = 0; i < mapMarkers.length; i++){
            // map.removeLayer(mapMarkers[i]);
        // }
    
        // remove all markers instances (no extra measures)
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
               layer.remove();
            }
        });

        // remove last marker instance
        myMarker.removeFrom(map);
        myCircle.removeFrom(map);
       
        // Here you remove the layer
        // if (markerCluster) {
            // map.removeLayer(markerCluster);
        // }

        // only remove last circle created from L.circle
        // circle.removeFrom(map);  
        
        // remove all circles instances
        map.eachLayer((layer) => {
            if (layer instanceof L.Circle) {
               layer.remove();
            }
        });

        // map.setView(singaporeLatlng, 12);
        // map.setView(singaporeLatlng, singaporeZoomLevel);
        map.setView(singapore, singaporeZoomLevel);
        // myLocationMarker = L.marker(singaporeLatlng);
        myLocationMarker = L.marker(singapore);
        // Add marker to mapMarker for future reference
        mapMarkers.push(myLocationMarker);
        layer = myLocationMarker.bindTooltip('Hi! Welcome to SG-finder.').addTo(map);
        layer.openTooltip();

        // locateUser(map);

        // add the answer to the chatgpt results div
        // const resultElement1 = document.querySelector("#chatgpt-results");
        // resultElement1.innerHTML = "Please wait... ChatGPT is generating your answer!";
        // resultElement1.className = "chatgpt-result";

        // const prompt2 = promptList2;
        // const prompt3 = prompt2 + promptFormat;
        // console.log(prompt3);
        
        // const prompt = "Hello!";
        // await OpenaiFetchAPI3(prompt);

        // await OpenaiFetchAPI3(promptList6);
        // console.log(promptList6);

        //   resultElement1.innerHTML = 'ChatGPT prompt: ' + `<br> ${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ' + `<br><br>` + 'ChatGPT response: ';
        //   resultElement1.innerHTML = `${promptTemplate}`;
        // const reply = chatgpt_reply['choices'][0].message.content;
        // console.log(reply);

        // resultElement1.innerHTML = `${reply}`;
        
        // extractData1 = reply.split("```json");
        // console.log(extractData1);
        // console.log(extractData1[1]);
        // extractData2 = extractData1[1].split("```");
        // console.log(extractData2);
        // console.log(extractData2[0]);
        // extractData = extractData2[0];
        // console.log(extractData);

        
        let rawData = await loadData_jsonFormat(chatgptFileType);

        let transformed = rawData.map(function(placesOfInterests){
            return {
                'name': placesOfInterests.name,
                'lat': placesOfInterests.location.latitude,
                'lon': placesOfInterests.location.longitude
            }
        })

        console.log(transformed);

        let listHeader = document.querySelector("#main");
        if (chatgptFileType == "popular") {
            listHeader.innerHTML = `<h1>Popular Places of Interests in Singapore</h1>`; // add header
        } else if (chatgptFileType == "budget") {
            listHeader.innerHTML = `<h1>Budget Places of Interests in Singapore</h1>`; // add header
        } else if (chatgptFileType == "cultural") {
            listHeader.innerHTML = `<h1>Cultural Places of Interests in Singapore</h1>`; // add header
        } else if (chatgptFileType == "historical") {
            listHeader.innerHTML = `<h1>Historical Places of Interests in Singapore</h1>`; // add header
        } else if (chatgptFileType == "gourmetfood") {
            listHeader.innerHTML = `<h1>Gourmet-Food Places of Interests in Singapore</h1>`; // add header
        } else if (chatgptFileType == "tertiaryinstitutions") {
            listHeader.innerHTML = `<h1>Tertiary Institutions Places of Interests in Singapore</h1>`; // add header
        } else {
            listHeader.innerHTML = `<h1>Popular Places of Interests in Singapore</h1>`; // add header
        }
        
        

        // 1. create a DOM element
        let placesList = document.querySelector("#tellmemore");
        placesList.innerHTML = ""; // remove all existing places of interest
    for (let f of transformed) {
        console.log(f);
        // 1. create a DOM element
        let listElement = document.createElement('li');

        // 2. populate content and set properties
        listElement.innerHTML = `${f.name} <button class="btn btn-outline-success mr-2 my-2 tellMeMoreBtn" style="margin: 5px;">Tell me more...</button><button class="btn btn-outline-success mr-2 my-2 checkLocationBtn" style="margin: 5px;">Check its location.</button>`;
        listElement.className = 'list-group-item';

        
        let tellMeMoreButton = listElement.querySelector(".tellMeMoreBtn");
        let checkLocationButton = listElement.querySelector(".checkLocationBtn");

        // add event listener for the edit button
        tellMeMoreButton.addEventListener("click", async function() {
            // alert("You have selected Tell Me More Button!");
            // add the answer to the chatgpt results div
            const resultElement1 = document.querySelector("#chatgpt-tellmemore");
            // resultElement1.innerHTML = "Please wait... ChatGPT is generating your answer!";
            // resultElement1.className = "chatgpt-tellmemore";
            // add the search result to the result element
        const eachResultElement1 = document.createElement("p");
        eachResultElement1.className = "chatgpt-tellmemore";
            eachResultElement1.innerHTML += `Please wait... ChatGPT is generating your answer! <br>`;
            document.getElementById("chatgpt-tellmemore").appendChild(eachResultElement1);

            const promptTellMeMore = "Tell me more about ";
            const promptTellMeMore2 = promptTellMeMore + `${f.name}` + ' in Singapore. ';
            const promptTellMeMore3 = promptTellMeMore2 + promptFormat;
            // await OpenaiFetchAPI3(promptTellMeMore3);
            // console.log(promptTellMeMore3);

            // const prompt4 = "Say goodbye to me!";

            try {
                await promptFetchAPI3(promptTellMeMore3);
                // await promptFetchAPI3(prompt4);
            } catch (error) {
                console.error("Error passing prompt to backend", error);
            } finally {
                console.log("Finally, Featch API - Prompt completed!");
            }

            try {
                await OpenaiFetchAPI3(promptTellMeMore3);
                // await OpenaiFetchAPI4(promptTellMeMore3);
                console.log(promptTellMeMore3);
                const reply = chatgpt_reply['choices'][0].message.content;
                console.log(reply);
                // resultElement1.innerHTML = `${reply}`;
                eachResultElement1.innerHTML = `${reply}`;
            
                // Simulated clicked event for checkLocationBtn 
                const clickEvent = new Event('click');
                checkLocationButton.dispatchEvent(clickEvent);
            } catch (error) {
                console.error("Error connecting to OpenAI ChatGPT", error);
                eachResultElement1.innerHTML += `Error connecting to OpenAI ChatGPT: ${error} <br>`;
                eachResultElement1.innerHTML += "Tell me more... feature is currently unavailable!";
            } finally {
                console.error("Finally, Fetch API completed!");
                // document.getElementById("chatgpt-tellmemore").appendChild(eachResultElement1);
                resultElement1.appendChild(eachResultElement1);
            }

            // const reply = chatgpt_reply['choices'][0].message.content;
            // console.log(reply);
            // resultElement1.innerHTML = `${reply}`;
            
            // Simulated clicked event for checkLocationBtn 
            // const clickEvent = new Event('click');
            // checkLocationButton.dispatchEvent(clickEvent);

        })

        // let checkLocationButton = listElement.querySelector(".checkLocationBtn");
        checkLocationButton.addEventListener("click", async function() {
            // alert("You have simulated Check Location Button!");
            // alert("You have selected Check Location Button!");

            // only remove last marker created from L.marker
            myLocationMarker.removeFrom(map);  

            myMarker.removeFrom(map);
            myCircle.removeFrom(map);

            targetLocation = f.name;
            targetLat = f.lat;
            targetLng = f.lon;

            // add a marker
            let placeSelected = L.marker([f.lat, f.lon]);
            // Add marker to mapMarker for future reference
            mapMarkers.push(placeSelected);
            map.addLayer(placeSelected); // any objects that you can draw on top of a map is known a layer
            placeSelected.bindPopup(`<h6>${f.name}</h6>`); // show some HTML when the marker is clicked
            map.flyTo([f.lat, f.lon], 16);
            placeSelected.openPopup();

            placeSelected.addEventListener("click", function(){
                // alert(`${f.name}`);
                // lat1, lng1 -> current location
                // lat2, lng2 -> target location
                // distance = geoDistance(lat1, lng1, lat2, lng2);
                const distance = geoDistance(currentLat, currentLng, targetLat, targetLng).toFixed(2);

                alert('The distance between ' + `${targetLocation}` + ' and current location is ' + `${distance}` + ' km away.');
                // if (targetLocation == "") {
                    // alert('You are at current location! The calculated distance is ' + `${distance}` + ' km away.');
                // } else {
                    // alert('The distance between ' + `${targetLocation}` + ' and current location is ' + `${distance}` + ' km away.');
                // }
            });

            // first parameter: array that stores the lat lng
            // second paramater: an object that set the properties of the circle
            circle = L.circle([f.lat, f.lon], {
                color: 'red',
                fillColor: 'orange',
                fillOpacity: 0.5,
                radius: 200
            });
            // circle.addTo(map);
            map.addLayer(circle);

        })

        // 3. add the container the child should go into
        placesList.appendChild(listElement);

    }

    });
});

    