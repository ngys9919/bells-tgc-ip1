const sightings = [10, 13,15,22,34,23,55,78,44,31];
const temperature = [33,21,22,24,25,26,26,21,31,44];

async function loadData_csvFormat() {
    // get the CSV file via axios
    const response = await axios.get('data/data.csv'); 
    // const response = await axios.get('data/Monthly_Tourist_Arrivals_2023.csv');
    // convert the raw CSV file into an array of JSON objects
    // the csv() function is included in the global scope
    // when we include in csvtojson js file.
    const json = await csv().fromString(response.data);
    return json;
}

// input: rawData of population statistics of birth and death
// output: a series, where x is the number year, and y is the number of live births
function transformData_xNumber_yNumber(rawData) {
    let transformedData = [];
    for (let d of rawData) {
        if (d.ethnic_group.toLowerCase().trim() == 'others') {
            transformedData.push({
                'x':Number(d.year),
                'y':Number(d.live_births)
            })
        }
    }
    return transformedData;

}

async function loadData_jsonFormat() {
    // const response = await axios.get('https://raw.githubusercontent.com/kunxin-chor/sales-data/main/data/sales.json');
    const response = await axios.get('data/sales.json');
    return response.data;
}

// input: rawData of sales transaction
// output: a series, where x is the name of the month, and y is total revenue for the month
function transformData_xMonth_yNumber(rawData) {
    console.log(rawData);
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct','Nov','Dec']

    // 1. use map to keep only the information that we want
    let transformed = rawData.map(function(transaction){
        return {
            'amount': transaction.payment.amount,
            'date': new Date(transaction.completed_at) //=> convert from date string to a date object
        }
    })
    let filtered = transformed.filter(function(transaction){
        return transaction.date.getFullYear() == 2020;
    });
    let withMonth = filtered.map(function(transaction){
        return {
            amount: transaction.amount,
            month: monthNames[transaction.date.getMonth()]
        }
    })


    // grouping
    // final results should look something like this:
    /* {
        0: [ t1, t2, t6 ],
        1: [ t3, t4, t7]
        ...
    } */
    // create the empty groups
    let groups = {};
    for (let m=0; m < 12; m++) {
        groups[monthNames[m]] = []; // create one array for month
    }
    // categorize each transaction by its month
    for(let transaction of withMonth) {
        let monthNumber = transaction.month;
        groups[monthNumber].push(transaction);
    }
   
    let series = [];
    let reducer = function(totalSoFar, currentTransaction ){
        return currentTransaction.amount + totalSoFar;
    }
    for (let eachMonth in groups) {
        let coordinate = {
            x: eachMonth,
            y: groups[eachMonth].reduce(reducer , 0)
        }
        series.push(coordinate);
    }
    return series;
}

// input: rawData of sales transaction
// output: a series, where x is the name of the month-year for Date_of_Arrival, and y is Number_of_Tourists
function transformData_xDate_yNumber(rawData) {
    console.log(rawData);
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct','Nov','Dec']

    // 1. use map to keep only the information that we want
    let transformed = rawData.map(function(transaction){
        return {
            'amount': transaction.payment.amount,
            'date': new Date(transaction.completed_at) //=> convert from date string to a date object
        }
    })
    let filtered = transformed.filter(function(transaction){
        return transaction.date.getFullYear() == 2020;
    });
    let withMonth = filtered.map(function(transaction){
        return {
            amount: transaction.amount,
            month: monthNames[transaction.date.getMonth()]
        }
    })


    // grouping
    // final results should look something like this:
    /* {
        0: [ t1, t2, t6 ],
        1: [ t3, t4, t7]
        ...
    } */
    // create the empty groups
    let groups = {};
    for (let m=0; m < 12; m++) {
        groups[monthNames[m]] = []; // create one array for month
    }
    // categorize each transaction by its month
    for(let transaction of withMonth) {
        let monthNumber = transaction.month;
        groups[monthNumber].push(transaction);
    }
   
    let series = [];
    let reducer = function(totalSoFar, currentTransaction ){
        return currentTransaction.amount + totalSoFar;
    }
    for (let eachMonth in groups) {
        let coordinate = {
            x: eachMonth,
            y: groups[eachMonth].reduce(reducer , 0)
        }
        series.push(coordinate);
    }
    return series;
}
