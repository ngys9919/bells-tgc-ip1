window.addEventListener('DOMContentLoaded', async function(){
    // we can only call loadData if
    // the function is already in the global scope
    // it is in global scope if we include
    // data.js before chart.js (since the loadData
    // is in chart.js)
    // let data1 = await loadData_csvFormat();
    // let transformedData1 = transformData_xNumber_yNumber(data1);
    // since chart is a global variable, we can use it
    // inside this function
    // chart1.updateSeries([{  // replace the old series of the chart with a new one
        // 'name': 'Sales',
        // 'data': transformedData1
    // }])

    let rawData = await loadData_jsonFormat();
    let series = transformData_xMonth_yNumber(rawData);
    // since chart is a global variable, we can use it
    // inside this function
    chart2.updateSeries([{  // replace the old series of the chart with a new one
        'name': 'Sales',
        'data': series
    }])

    let data = await loadData_csvFormat2();
    let transformedData = transformData_xDate_yNumber(data);
    // since chart is a global variable, we can use it
    // inside this function
    chart.updateSeries([{  // replace the old series of the chart with a new one
        'name': 'Tourists Arrivals',
        'data': transformedData
    }])
})


//btnLoad button when clicked has no effect here since yearly2 data is unavailable
//note that yearly2 data is for example in 06-external-data folder 
document.querySelector("#btnLoad")
    .addEventListener('click', async function(){
        let data = await loadData_xNumber_yNumber();
        chart.updateSeries([{
            'name': 'Sales',
            'data': data.yearly2
        }])
    })

const options = {
    chart:{
        'type':'line',
        'height':'100%'
    },
    series:[
        // no data
    ],
    // what to display when there is no data
    noData: {
        text:"Loading..."
    }
}

const lineChartOptions = {
    chart:{
        'type':'line',
        'height':'100%'
    },
    series:[
        // no data
    ],
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
    // what to display when there is no data
    noData: {
        text:"Loading..."
    }
}

// create the chart
// const lineChart = new ApexCharts(document.querySelector('#line-chart'),lineChartOptions);
// lineChart.render();

// const barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
// barChart.render();

// const chart1 = new ApexCharts(document.querySelector('#chart-xNumber-yNumber'), options);
// chart1.render();

const chart2 = new ApexCharts(document.querySelector('#chart-xMonth-yNumber'), options);
chart2.render();

const chart = new ApexCharts(document.querySelector('#chart-xDate-yNumber'), options);
chart.render();
