// Protecting Private API Keys using a Simple Proxy Server

const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');

// enable dotenv (allow Express application to read .env files)
require('dotenv').config();

// set the openaiUrl to be OPENAI_URL from the .env file
// set the openaiKey to be OPENAI_API_KEY from the .env file
// make sure to read data from process.env AFTER `require('dotenv').config()`
// const proxyUri = process.env.PROXY_URI;
// const proxyUri = process.env.LOCAL_URI;
const openaiUrl = process.env.OPENAI_URL;
const openaiKey= process.env.OPENAI_API_KEY;

// const dataGetter = require('js/chatgpt.js');
// const myData = dataGetter();

// 1a. create the app
const app = express();
app.use(cors()); // enable cross origin resources sharing

// 1b. enable JSON processing (i.e allow clients to send JSON data to our server)
app.use(express.json());

const port = 3000;

const bearer = `Bearer ${openaiKey}`;

let prompt = "Say hello to me!";

// This middleware function logs the HTTP method and URL of each request. 
// The next() function is called to pass control to the next middleware function.
// app.use(async (req, res, next) => {
  // console.log(`${req.method} ${req.url}`);
  // const { path, port, query } = req;

  // console.log(req.path);
  
  // Replace server domain with OpenAI API domain for the proxy request
  //   const fetchURL = `https://api.openai.com${path}?${new URLSearchParams(query)}`;
  // const fetchURL = `${openaiUrl}${path}?${new URLSearchParams(query)}`;
  // const fetchURL = `${openaiUrl}:${port}${path}?${new URLSearchParams(query)}`;

  // const fetchURL = `https://api.openai.com${path}`;  

  // Only make proxy request if there is a URL path
  // if (path.length > 1) {
    // try {
      // console.log("Calling GPT-4o-mini from Backend via server.js");
      // console.log(fetchURL);
      // const response = await fetch(fetchURL, {
          // method: 'POST',
          // headers: { 
            // Authorization: bearer,
            // 'Content-Type': 'application/json' 
          // },
          // body: JSON.stringify({
            // "model": "gpt-4o-mini",
            // "messages": [
                // {
                    // "role": "user",
                    // "content": "Say hello to me!"
                // }
            // ]
          // })  
        // })
  
      // If there is a response body, send it as text to the application.
      // if (response.body) {
        // const text = await response.text();
        // console.log(text);
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // return res.send(text);
      // }

      // If there is a response body, send it as json to the application.
      // if (response.body) {
        // const text = await response.json();
        // console.log(text);
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // return res.send(text);
      // }
    // } catch (error) {
      // console.error('Error fetching from OpenAI API:', error);
      // return res.status(500).send('Error fetching data');
    // }
  // } else {
    // If there is no URL path, display "Hello World"
    // res.send("Hello World");
  // }
  // next();
// });

// app.use(async (req, res) => {
// const { path, port, query } = req;

  // console.log(req.path);
  
  // Replace server domain with OpenAI API domain for the proxy request
  //   const fetchURL = `https://api.openai.com${path}?${new URLSearchParams(query)}`;
  // const fetchURL = `${openaiUrl}${path}?${new URLSearchParams(query)}`;
  // const fetchURL = `${openaiUrl}:${port}${path}?${new URLSearchParams(query)}`;

  // const fetchURL = `https://api.openai.com${path}`;  

  // Only make proxy request if there is a URL path
  // if (path.length > 1) {
    // try {
      // console.log("Calling GPT-4o-mini from Backend via server.js");
      // console.log(fetchURL);
      // const response = await fetch(fetchURL, {
          // method: 'POST',
          // headers: { 
            // Authorization: bearer,
            // 'Content-Type': 'application/json' 
          // },
          // body: JSON.stringify({
            // "model": "gpt-4o-mini",
            // "messages": [
                // {
                    // "role": "user",
                    // "content": "Say hello to me!"
                // }
            // ]
          // })  
        // })
  
      // If there is a response body, send it as text to the application.
      // if (response.body) {
        // const text = await response.text();
        // console.log(text);
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // return res.send(text);
      // }

      // If there is a response body, send it as json to the application.
      // if (response.body) {
        // const text = await response.json();
        // console.log(text);
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // return res.send(text);
      // }
    // } catch (error) {
      // console.error('Error fetching from OpenAI API:', error);
      // return res.status(500).send('Error fetching data');
    // }
  // } else {
    // If there is no URL path, display "Hello World"
    // res.send("Hello World");
  // }
// });

// 2. CREATE ROUTES
// All routes will be created in the `main` function
async function main() {

 
app.get('/v1/chat/completions', async function (req, res) {
  const { path, port, query } = req;

  console.log(req.path);
  
  // Replace server domain with OpenAI API domain for the proxy request
//   const fetchURL = `https://api.openai.com${path}?${new URLSearchParams(query)}`;
// const fetchURL = `${openaiUrl}${path}?${new URLSearchParams(query)}`;
// const fetchURL = `${openaiUrl}:${port}${path}?${new URLSearchParams(query)}`;

// const fetchURL = `https://api.openai.com${path}`;  
  const fetchURL = "https://api.openai.com" + req.path;  

  // Only make proxy request if there is a URL path
  if (path.length > 1) {
    // try {
      // console.log("Calling GPT-4o-mini from Backend via server.js");
      // console.log(fetchURL);
      // const response = await fetch(fetchURL, {
          // method: 'POST',
          // headers: { 
            // Authorization: bearer,
            // 'Content-Type': 'application/json' 
          // },
          // body: JSON.stringify({
            // "model": "gpt-4o-mini",
            // "messages": [
                // {
                    // "role": "user",
                    // "content": "Say hello to me!"
                // }
            // ]
          // })  
        // })


        try {
          console.log("Calling GPT-4o-mini from Backend via server.js");
          console.log(fetchURL);
          const response = await fetch(fetchURL, {
              method: 'POST',
              headers: { 
                Authorization: bearer,
                'Content-Type': 'application/json' 
              },
              body: JSON.stringify({
                "model": "gpt-4o-mini",
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
              })  
            })
  
      // If there is a response body, send it as text to the application.
      // if (response.body) {
        // const text = await response.text();
        // console.log(text);
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // return res.send(text);
      // }

      // If there is a response body, send it as json to the application.
      if (response.body) {
        const text = await response.json();
        console.log(text);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.send(text);
      }
    } catch (error) {
      console.error('Error fetching from OpenAI API:', error);
      return res.status(500).send('Error fetching data');
    }
  } else {
    // If there is no URL path, display "Hello World"
    res.send("Hello World");
  }
});


app.get('/prompt/:prompt', function (req, res) {
  try {
    console.log("Receiving prompt variable from Frontend to Backend");
    // const { prompt } = req.params;
    // console.log(req.params.prompt);
    prompt = req.params.prompt; 
    console.log(prompt);
    return res.send(prompt);
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return res.status(500).send('Error fetching prompt');
  }
});

console.log(prompt);

}

main();


// 3. START SERVER (Don't put any routes after this line)
// app.listen(3000, function () {
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
