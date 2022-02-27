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
    title: {
      text: '$ (thousands)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: false,
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands'
      },
    },
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
    categories: [
      'Today',
      'In the past week',
      'In the past month',
    ],
  },
}

var barChart = new ApexCharts(document.querySelector('.chart-bar'), barChartOptions)
barChart.render()
