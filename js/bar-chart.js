const barChartOptions = {
    chart:{
        type:'bar',
        height:'100%'
    },
    series:[
        {
            name:'sightings',
            data:sightings
        },
        {
            name:'temperature',
            data: temperature
        }
    ],
    xaxis:{
        'categories':['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sept','Oct']
    }
}
// const barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
// barChart.render();