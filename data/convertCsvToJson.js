const fs = require('fs')
const csvToJson = require('csvtojson')

const openCsv = fs.readFileSync('./SG_postal.csv', 'utf8')

// can't use axios since downloaded csv file. Axios is http request though it works for local json.

async function convertCsvToJson(dataSource){
    let convertedData = await csvToJson().fromString(dataSource)
    return convertedData
}

convertCsvToJson(openCsv).then((jsonObj) => {
    const jsonString = JSON.stringify(jsonObj);   //convert the array of json object to string because fs.writeFileSync expects a string
    fs.writeFileSync('postallist.json', jsonString);
})
  .catch((error) => {
    console.error('Error:', error);
  });

// because csvToJson is asynchonous - it return promise. So use .then to handle promise.then(onFulfilled, onRejected);
// use await in function to make it synchronous. Don't need .then here actually. But will do for learning.

