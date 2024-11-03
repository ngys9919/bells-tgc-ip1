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
        filePath = 'data/chatgpt_popular.json';
    } else if (chatgptFileType == "budget") {
        filePath = 'data/chatgpt_budget.json';
    } else if (chatgptFileType == "cultural") {
        filePath = 'data/chatgpt_cultural.json';
    } else if (chatgptFileType == "historical") {
        filePath = 'data/chatgpt_historical.json';
    } else if (chatgptFileType == "gourmetfood") {
        filePath = 'data/chatgpt_gourmetfood.json';
    } else if (chatgptFileType == "tertiaryinstitutions") {
        filePath = 'data/chatgpt_tertiaryinstitutions.json';
    } else {
        filePath = 'data/chatgpt_popular.json';
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
    // var url = "https://api.openai.com/v1/engines/davinci/completions";
    // var bearer = 'Bearer ' + YOUR_TOKEN
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


const apiKey = ChatGPT_APIkey;

async function OpenaiFetchAPI2(prompt) {
    console.log("Calling GPT4-o")
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + `${apiKey}`
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "user",
                    "content": `${prompt}`
                }
            ]
        })


    }).then(response => {
        let ret = response.json();
        return ret;
       
    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].message.content)
        // return data;
    })
    .catch(error => {
        console.log('Something bad happened ' + error)
    });

}

// OpenaiFetchAPI2();

let chatgpt_reply = {};

async function OpenaiFetchAPI3(prompt) {
    console.log("Calling GPT-4o-mini")
    var url = "https://api.openai.com/v1/chat/completions";
    var bearer = 'Bearer ' + `${apiKey}`
    response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "user",
                    "content": `${prompt}`
                }
            ]
        })


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
        console.log('Something bad happened ' + error)
    });
    
}

function locateUser(map){
    map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
          .on('locationfound', function(e){
              var marker = L.marker([e.latitude, e.longitude]).bindPopup('This is your current location.');
              // Add marker to mapMarker for future reference
              mapMarkers.push(marker);
              let layer = marker.bindTooltip('You are here!').addTo(map);
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

let map = L.map("chatgpt-map");  // create the map in inside the element with id `chatgpt-map`
let mapMarkers = [];

document.addEventListener("DOMContentLoaded", async function () {

    let singaporeLatlng = [1.3521, 103.8198];

    // L is a global variable which represents the Leaflet object
    // all functions and variables in Leaflet are in the `L` object
    
    // let map = L.map("chatgpt-results");  // create the map in inside the element with id `myMap`
    map.setView(singaporeLatlng, 12);   // two parameters: one is an array which represents the lat lng, second the zoom level

    // create a tile layer
    let tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tileLayer.addTo(map);

    locateUser(map);

    document
    .querySelector("#clearAnswerBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        // alert("You have clicked Clear Answer Button!");
        
        // clear the answer to the chatgpt results div
        const resultElement = document.querySelector("#chatgpt-results");
        resultElement.innerHTML = "Ask ChatGPT Response:";

        for(var i = 0; i < mapMarkers.length; i++){
            map.removeLayer(mapMarkers[i]);
        }
    
        // map.removeLayer(marker);
        // map.removeLayer(circle);
       
        // Here you remove the layer
        // if (markerCluster) {
            // map.removeLayer(markerCluster);
        // }

        map.setView(singaporeLatlng, 12);
        myLocationMarker = L.marker(singaporeLatlng);
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
      resultElement1.innerHTML = "Please wait... ChatGPT is generating your answer!";
      resultElement1.className = "chatgpt-result";

        // const prompt = "Hello!";
        // await OpenaiFetchAPI3(prompt);
        await OpenaiFetchAPI3(prompt3);
        // console.log(chatgptdata);

      //   resultElement1.innerHTML = 'ChatGPT prompt: ' + `<br> ${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ' + `<br><br>` + 'ChatGPT response: ';
        //   resultElement1.innerHTML = `${promptTemplate}`;
    const reply = chatgpt_reply['choices'][0].message.content;
    // console.log(reply);

      resultElement1.innerHTML = `${reply}`; 

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

    // Note: {bubbles: true} because of the event delegation ...
    document.addEventListener(`click`, handle);
    document.addEventListener(`virtualhover`, handle);

    // the actual 'trigger' function
    const trigger = (el, etype, custom) => {
        const evt = custom ?? new Event( etype, { bubbles: true } );
        el.dispatchEvent( evt );
    };

    // a custom event ;)
    const vHover = new CustomEvent(`virtualhover`, 
    { bubbles: true, detail: `red` });


    setTimeout( _ => 
        trigger( document.querySelector(`#testMe`), `click` ), 1000 );

    function handle(evt) {
        if (evt.target.id === `clickTrigger`) {
            trigger(document.querySelector(`#testMe`), `click`);  
        }

        if (evt.type === `virtualhover`) {
            evt.target.style.color = evt.detail;
            return setTimeout( _ => evt.target.style.color = ``, 1000 );
        }

        if (evt.target.id === `testMe`) {
            document.querySelector(`#testMeResult`)
.           insertAdjacentHTML(`beforeend`, `<p>One of us clicked #testMe. 
            It was <i>${evt.isTrusted ? `<b>you</b>` : `me`}</i>.</p>`);
            trigger(
                document.querySelector(`#testMeResult p:last-child`), 
                `virtualhover`, 
                vHover );  
        }
    }

    document
    .querySelector("#continueBtn")
    .addEventListener("click", async function () {
        // alert("You have selected Continue... Button!");

        // add the answer to the chatgpt results div
        const resultElement1 = document.querySelector("#chatgpt-results");
        resultElement1.innerHTML = "Please wait... ChatGPT is generating your answer!";
        resultElement1.className = "chatgpt-result";

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
        let placesList = document.querySelector("#tellmeabout");
        placesList.innerHTML = ""; // remove all existing places of interest
    for (let f of transformed) {
        console.log(f);
        // 1. create a DOM element
        let listElement = document.createElement('li');

        // 2. populate content and set properties
        listElement.innerHTML = `${f.name} <button class="btn btn-outline-success mr-2 my-2 tellMeMoreBtn" style="margin: 5px;">Tell me about...</button><button class="btn btn-outline-success mr-2 my-2 checkLocationBtn" style="margin: 5px;">Check its location.</button>`;
        listElement.className = 'list-group-item';

        let tellMeMoreButton = listElement.querySelector(".tellMeMoreBtn");
        // add event listener for the edit button
        tellMeMoreButton.addEventListener("click", async function() {
            // alert("You have selected Tell Me More Button!");
            // add the answer to the chatgpt results div
            const resultElement1 = document.querySelector("#chatgpt-results");
            resultElement1.innerHTML = "Please wait... ChatGPT is generating your answer!";
            resultElement1.className = "chatgpt-result";

            const promptTellMeMore = "Tell me more about ";
            const promptTellMeMore2 = promptTellMeMore + `${f.name}` + ' in Singapore. ';
            const promptTellMeMore3 = promptTellMeMore2 + promptFormat;
            // await OpenaiFetchAPI3(promptTellMeMore3);
            console.log(promptTellMeMore3);

            // const reply = chatgpt_reply['choices'][0].message.content;
            // console.log(reply);
            // resultElement1.innerHTML = `${reply}`;
            
        })

        let checkLocationButton = listElement.querySelector(".checkLocationBtn");
        checkLocationButton.addEventListener("click", async function() {
            // alert("You have selected Check Location Button!");

            // add a marker
            let placeSelected = L.marker([f.lat, f.lon]);
            // Add marker to mapMarker for future reference
            mapMarkers.push(placeSelected);
            map.addLayer(placeSelected); // any objects that you can draw on top of a map is known a layer
            placeSelected.bindPopup(`<h6>${f.name}</h6>`); // show some HTML when the marker is clicked
            map.flyTo([f.lat, f.lon], 16);
            placeSelected.openPopup();

            placeSelected.addEventListener("click", function(){
                alert(`${f.name}`);
            });

            // first parameter: array that stores the lat lng
            // second paramater: an object that set the properties of the circle
            let circle = L.circle([f.lat, f.lon], {
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

    