

const lineChartOptions = {
    'chart': {
        'type':'line',
        'height':'100%'
    },
    'series':[
        {
            'name':'sightings',
            'data': sightings
        },
        {
            'name':'temperature',
            'data': temperature
        }
    ],
    'xaxis':{
        'categories':['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct']
    }
}

// const lineChart = new ApexCharts(document.querySelector('#line-chart'),lineChartOptions);
// lineChart.render();