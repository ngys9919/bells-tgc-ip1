const promptTemplate = "I want you to act as a travel guide. I will give you a location and you will suggest the places to visit and some information about it. In addition, include an itinerary based on the number of days. My request is : I am going to ";

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
    console.log("Calling GPT4-o")
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
        resultElement.innerHTML = "";

    });

    document
    .querySelector("#sendRequestBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        // alert("You have clicked Send Request Button!");

        const chatgptInputPlace = document.querySelector("#inputPlace").value;
        const chatgptInputDays = document.querySelector("#inputDays").value;

        const prompt = `${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ';

        // const prompt = "Hello!";
        await OpenaiFetchAPI3(prompt);
        // console.log(chatgptdata);
        // const key = 'choices';
      // add the answer to the chatgpt results div
      const resultElement1 = document.querySelector("#chatgpt-results");
      resultElement1.innerHTML = "";
      resultElement1.className = "chatgpt-result";
      //   resultElement1.innerHTML = 'ChatGPT prompt: ' + `<br> ${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ' + `<br><br>` + 'ChatGPT response: ';
        //   resultElement1.innerHTML = `${promptTemplate}`;
    const reply = chatgpt_reply['choices'][0].message.content;
    console.log(reply);

      resultElement1.innerHTML = `${reply}`; 

      // add the search result to the result element
      // const eachResultElement1 = document.createElement('div');
      // eachResultElement1.className = "chatgpt-result";
      // eachResultElement1.innerHTML = 'ChatGPT prompt';
      // eachResultElement1.append = promptTemplate;
      // eachResultElement1.append(" ");
      // eachResultElement1.append('ChatGPT response: ');
      // resultElement1.appendChild(eachResultElement1);
    });

});
