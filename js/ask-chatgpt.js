const promptTemplate = "I want you to act as a travel guide. I will give you a location and you will suggest the places to visit and some information about it. In addition, include an itinerary based on the number of days. My request is : I am going to ";
const promptFormat1 = "Please do the html formatting of the content."
const promptFormat2 = "Please provide your answers in HTML format, using appropriate HTML tags."
const promptFormat = "Please provide your answers straight right away in HTML format, using appropriate HTML tags."
const promptTour1 = "Please based the itinerary on historical type of places to visit."
const promptTour2 = "Please based the itinerary for places to visit on historical tour."
const promptTour = "Please based the itinerary for places to visit on "
let chatgptTourType = "popular tour";

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

const apiKey = "OPENAI_API_KEY";

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

document.addEventListener("DOMContentLoaded", async function () {


    document
    .querySelector("#clearAnswerBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        // alert("You have clicked Clear Answer Button!");
        
        // clear the answer to the chatgpt results div
        const resultElement = document.querySelector("#chatgpt-results");
        resultElement.innerHTML = "Ask ChatGPT Response:";

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
    });

    document
    .querySelector("#flexRadioDefault2")
    .addEventListener("click", async function () {
        // alert("You have selected Radio2 !");
        chatgptTourType = "budget tour";
    });

    document
    .querySelector("#flexRadioDefault3")
    .addEventListener("click", async function () {
        // alert("You have selected Radio3 !");
        chatgptTourType = "cultural tour";
    });

    document
    .querySelector("#flexRadioDefault4")
    .addEventListener("click", async function () {
        // alert("You have selected Radio4 !");
        chatgptTourType = "historical tour";
    });

    document
    .querySelector("#flexRadioDefault5")
    .addEventListener("click", async function () {
        // alert("You have selected Radio5 !");
        chatgptTourType = "gourmet food tour";
    });

    document
    .querySelector("#flexRadioDefault6")
    .addEventListener("click", async function () {
        // alert("You have selected Radio6 !");
        chatgptTourType = "tertiary institutions (include popular polytechnics and universities) tour";
    });
});

    