
const promptTemplate = "I want you to act as a travel guide. I will give you a location and you will suggest the places to visit and some information about it. In addition, include an itinerary based on the number of days. My request is : I am going to ";

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

      // add the answer to the chatgpt results div
      const resultElement1 = document.querySelector("#chatgpt-results");
      resultElement1.innerHTML = "";
      resultElement1.className = "chatgpt-result";
      resultElement1.innerHTML = 'ChatGPT prompt: ' + `<br> ${promptTemplate} ${chatgptInputPlace}` + ' for ' + `${chatgptInputDays}` + ' days ' + `<br><br>` + 'ChatGPT response: ';

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
