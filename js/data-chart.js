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

async function loadData_csvFormat2() {
    // get the CSV file via axios
    const response = await axios.get('data/Monthly_Tourist_Arrivals_2023-cleaned.csv'); 
    // const response = await axios.get('data/Monthly_Tourist_Arrivals_2023.csv');
    // convert the raw CSV file into an array of JSON objects
    // the csv() function is included in the global scope
    // when we include in csvtojson js file.
    const json = await csv().fromString(response.data);
    return json;
}

// input: rawData of tourists arrival statistics
// output: a series, where x is the name of the month-year for Date_of_Arrival, and y is Number_of_Tourists
function transformData_xDate_yNumber(rawData) {
    console.log(rawData);
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct','Nov','Dec']

    // 1. use map to keep only the information that we want
    let transformed = rawData.map(function(tourists){
        return {
            'number': tourists.Number_of_Tourists,
            'date': new Date(tourists.Date_of_Arrival) //=> convert from date string to a date object
        }
    })
    let filtered = transformed.filter(function(tourists){
        return tourists.date.getFullYear() == 2023;
    });
    let withMonth = filtered.map(function(tourists){
        return {
            number: tourists.number,
            month: monthNames[tourists.date.getMonth()]
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
    for(let tourists of withMonth) {
        let monthNumber = tourists.month;
        groups[monthNumber].push(tourists);
    }
   
    let series = [];
    let reducer = function(totalSoFar, currentTourists ){
        return currentTourists.number + totalSoFar;
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


// input: rawData of tourists arrival statistics
// output: a series, where x is the name of the month-year for Date_of_Arrival, and y is Number_of_Tourists
function transformData_xDate_yNumber2(rawData) {
    console.log(rawData);
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct','Nov','Dec'];

    // 1. use map to keep only the information that we want
    let transformed = rawData.map(function(tourists){
        return {
            'number': tourists.Number_of_Tourists,
            'date': new Date(tourists.Date_of_Arrival) //=> convert from date string to a date object
        }
    })
    console.log(transformed);

    let filtered = transformed.filter(function(tourists){
        return tourists.date.getFullYear() == 2023;
    });
    let withMonth = filtered.map(function(tourists){
        return {
            number: tourists.number,
            month: monthNames[tourists.date.getMonth()]
        }
    })
    console.log(withMonth);
    // create the empty groups
    let groups = {};
    for (let m=0; m < 12; m++) {
        groups[monthNames[m]] = []; // create one array for month
    }
    console.log(groups);
    // categorize each transaction by its month
    for(let tourists of withMonth) {
        let monthNumber = tourists.month;
        groups[monthNumber].push(tourists);
    }
    console.log(groups);
    let series = [];
    let reducer = function(totalSoFar, currentTourists ){
        // console.log(currentTourists);
        // console.log(currentTourists.number);
        // console.log(totalSoFar);
        totalSoFar += parseInt(currentTourists.number);
        return (totalSoFar);
        // return currentTourists.number + totalSoFar;
    }
    console.log(reducer);
    for (let eachMonth in groups) {
        let coordinate = {
            x: eachMonth,
            y: groups[eachMonth].reduce(reducer , 0)
        }
        // console.log(coordinate);
        series.push(coordinate);
        // break;
    }
    console.log(series);
    return series;

}

// input: rawData of tourists arrival statistics
// output: a series, where x is the name for Region, and y is Number_of_Tourists for each Region
function transformData_xRegion_yNumber3(rawData) {
    console.log(rawData);
    let regionNames = ['Southeast Asia', 'Greater China', 'North Asia', 'South Asia', 'West Asia', 'Americas', 'Europe', 'Oceania','Africa','Others'];

    // 1. use map to keep only the information that we want
    let transformed = rawData.map(function(tourists){
        return {
            'number': tourists.Number_of_Tourists,
            'region': tourists.Region //=> convert from date string to a date object
        }
    })
    console.log(transformed);

    let transformData = [];
    let series = [];

    //loop through all the region
    for (let region of regionNames) {
        //loop through all years
        transformData = [];
        
        console.log(region);

        // for (let y = 2023) {
        let sum = 0;
        // let count = 0;
        //loop through all data array
        for (let i = 0; i < rawData.length; i++) {
            //if curr not equal to region 
            if (rawData[i].Region !== region) {
                continue;
            }
            else {
                //compare curr year with year 
                // let num = data[i].month.slice(0, 4)
                // if (parseInt(num) === parseInt(y)) {
                    // count++;
                    sum += parseInt(rawData[i].Number_of_Tourists);
                // }
                console.log(sum);
            }
        }
        // let avg = sum / count;
        // transformData.push(avg.toFixed(0));
        transformData.push(sum);
        // }
    
        // series.push({
            // 'name': region,
            // 'data': transformData
        // });

        let coordinate = {
            x: region,
            y: transformData
        }
        // console.log(coordinate);
        series.push(coordinate);
    }
        console.log(series);
        return series;
    
}