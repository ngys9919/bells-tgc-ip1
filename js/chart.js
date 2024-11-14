async function loadData_csvFormat() {
    // get the CSV file via axios
    // const response = await axios.get('data/chart/Monthly_Tourist_Arrivals_2023-cleaned.csv');
    const response = await axios.get('https://raw.githubusercontent.com/ngys9919/bells-tgc-ip1/refs/heads/main/data/chart/Monthly_Tourist_Arrivals_2023-cleaned.csv');  
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
function transformData_xRegion_yNumber(rawData) {
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

        let sum = 0;
        
        //loop through all data array
        for (let i = 0; i < rawData.length; i++) {
            //if curr not equal to region 
            if (rawData[i].Region !== region) {
                continue;
            }
            else {
                sum += parseInt(rawData[i].Number_of_Tourists);
                console.log(sum);
            }
        }
        
        transformData.push(sum);

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

window.addEventListener('DOMContentLoaded', async function(){

    let dataLine = await loadData_csvFormat();
    let transformedDataLine = transformData_xDate_yNumber(dataLine);
    // since chart is a global variable, we can use it
    // inside this function
    chartLine.updateSeries([{  // replace the old series of the chart with a new one
        'name': 'Tourists Arrivals',
        'data': transformedDataLine
    }])

    let dataBar = await loadData_csvFormat();
    let transformedDataBar = transformData_xRegion_yNumber(dataBar);
    // since chart is a global variable, we can use it
    // inside this function
    chartBar.updateSeries([{  // replace the old series of the chart with a new one
        'name': 'Tourists Arrivals',
        'data': transformedDataBar
    }])
})


const lineChartOptions = {
    chart:{
        'type':'line',
        'height':'100%'
    },
    series:[
        // no data
    ],
    xaxis:{
        'categories': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sept','Oct','Nov','Dec']
    },
    yaxis:{
        title:{
            text:'Number of Tourists Arrivals'
        },
        labels: {
            formatter: function (value) {
              return value/1000000 + " M";
            }
          }
    },
    markers:{
        size:8
    },
    stroke:{
        curve:'smooth'
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 0,
        offsetX: 0
    },
    tooltip:{
        y:{
            formatter: function(val){
                return val
            }
        }
     },
    title:{
        text: "Tourists Arrivals By Months",
        align: 'center'
    },
    // what to display when there is no data
    noData: {
        text:"Loading..."
    }
}

const barChartOptions = {
    chart:{
        'type':'bar',
        'height':'100%'
    },
    series:[
        // no data
    ],
    plotOptions:{
        bar:{
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            dataLabels:{
                position:'top',
            },
        }
    },
    dataLabels: {
        enabled: false,
        style:{
            fontSize: '12px',
            colors:['#fff']
        }
    },
    stroke:{
        show:true,
        width: 2,
        colors: ['transparent']
    },
    xaxis:{
        categories: ['Southeast Asia', 'Greater China', 'North Asia', 'South Asia', 'West Asia', 'Americas', 'Europe', 'Oceania','Africa','Others']
    },
    yaxis: {
        title:{
            text:'Number of Tourists Arrivals'
        },
        labels: {
            formatter: function (value) {
              return value/1000 + " k";
            }
          }
    },
    fill:{
        opacity:1
    },
    tooltip:{
       y:{
           formatter: function(val){
               return val
           }
       }
    },
    title:{
        text: "Tourists Arrivals By Regions",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        }
    },legend: {
        position: 'top',
        horizontalAlign: 'center',
        floating: true,
        offsetY: 0,
        offsetX: 0
    },
    // what to display when there is no data
    noData: {
        text:"Loading..."
    }
}

const chartLine = new ApexCharts(document.querySelector('#chart-xDate-yNumber'), lineChartOptions);
chartLine.render();

const chartBar = new ApexCharts(document.querySelector('#chart-xRegion-yNumber'), barChartOptions);
chartBar.render();
