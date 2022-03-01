var columnChartOptions = {
  series: [
    {
      name: 'NAMAR',
      data: [44],
    },
    {
      name: 'GLOBAL AVERAGE',
      data: [76],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  fill: {
    colors: ['#F22F46', 'transparent'],
    type: 'image',
    image: {
      src: ['', '../images/charts/diagonal-lines.png'],
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -20,
    style: {
      colors: ['#333'],
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  grid: {
    show: false,
  },
  xaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    categories: ['NAMAR', 'GLOBAL AVERAGE'],
  },
  legend: {
    show: false,
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: false,
  },
}

var columnChart = new ApexCharts(
  document.querySelector('.chart-column'),
  columnChartOptions
)
columnChart.render()

var radialBarOptions = {
  series: [80],
  chart: {
    height: 350,
    type: 'radialBar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '70%',
      },
    },
  },
  labels: [''],
}

var radialBarChart = new ApexCharts(
  document.querySelector('.chart-radial-bar'),
  radialBarOptions
)
radialBarChart.render()

var barChartOptions = {
  series: [
    {
      data: [400, 430, 448],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Today', 'In the past week', 'In the past month'],
  },
  tooltip: {
    enabled: false,
  },
}

var barChart = new ApexCharts(
  document.querySelector('.chart-bar'),
  barChartOptions
)
barChart.render()

var lineChartOptions = {
  series: [
    {
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#F22F46'],
  stroke: {
    curve: 'straight',
    width: 2  
  },
  xaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
  yaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    categories: [0, 50, 100, 150, 200, 250, 300, 350, 400],
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: false,
  }
}

