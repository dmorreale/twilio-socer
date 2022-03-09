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
    width: '320px',
  },
  fill: {
    type: ['solid','image'],
    colors: ['#F22F46'],
    opacity: 1,
    image: {
      src: ['http://192.168.0.126/twilio-socer/assets/images/bar-with-lines.svg'],
      width: 100,
      height: 300
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '48%',
      endingShape: 'rounded',
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    offsetY: -30,
    style: {
      fontSize: '14px',
      colors: ['#121C2D'],
    },
    background: {
      enabled: false,
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
  tooltip: {
    enabled: false,
  },
}

var radialBarOptions = {
  series: [80],
  chart: {
    height: 480,
    type: 'radialBar',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    offsetY: -30,
    style: {
      fontSize: '14px',
      colors: ['#121C2D'],
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '80%',
      },
      track: {
        background: '#ffffff',
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#F22F46'],
    opacity: 1,
  },
  labels: [''],
  xaxis: {},
}

var barChartOptions = {
  series: [
    {
      data: [400, 430, 448],
    },
  ],
  chart: {
    type: 'bar',
    height: 212,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position:'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    textAnchor: 'start',
    offsetX: 20,
    style: {
      fontSize: '14px',
      colors: ['#121C2D'],
    },
  },
  colors: ['#F22F46'],
  stroke: {
    show: true,
    width: 1,
    colors: ['#F22F46'],
  },
  fill: {
    type: 'solid',
    opacity: 1,
    colors: ['#F22F46', 'transparent']
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
        show: false
    },
    axisTicks: {
      show: false
    },
    categories: ['Today', 'In the past week', 'In the past month'],
  },
  yaxis: {
    labels: {
      offsetX: -14,
      maxWidth:224
    }
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: false,
  }
}

var lineChartOptions = {
  series: [
    {
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  chart: {
    height: 400,
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
  colors: ['#F22F46', '#121C2D'],
  stroke: {
    curve: 'straight',
    width: 2,
  },
  xaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    type: 'datetime',
    labels: {
      format: 'MM/yy'
    }
  },
  yaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    min: 0
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: false,
  },
}

var stackedBar100Options = {
  series: [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: 'Reborn Kid',
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ],
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
	style: {
		colors: ['#FFFFFF', '#000000']
	}
  },
  stroke: {
    width: 1,
    colors: ['#F22F46', '#F22F46'],
  },
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
  },
  tooltip: {
    display: false,
  },
  fill: {
    opacity: 1,
	  type: 'solid',
	  colors: ['#F22F46', 'transparent'] 
  },
  legend: {
    show: false,
  },
}
