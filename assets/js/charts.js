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
    width: '100%',
  },
	states: {
		normal: {
			filter: {
				type: 'none',
				value: 0,
			}
		},
		hover: {
			filter: {
				type: 'none',
				value: 0,
			}
		},
		active: {
			allowMultipleDataPointsSelection: false,
			filter: {
				type: 'none',
				value: 0,
			}
		},
	},
  fill: {
    type: ['solid','image'],
    colors: ['#F22F46'],
    opacity: 1,
    image: {
      src: ['/assets/images/bar-with-lines.svg'],
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
    categories: ['NAMAR'],
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
	width: 500,
    type: 'radialBar',
    toolbar: {
      show: false,
    },
  },
	states: {
		normal: {
			filter: {
				type: 'none',
				value: 0,
			}
		},
		hover: {
			filter: {
				type: 'none',
				value: 0,
			}
		},
		active: {
			allowMultipleDataPointsSelection: false,
			filter: {
				type: 'none',
				value: 0,
			}
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
    height: 300,
    toolbar: {
      show: false,
    },
	  width: 600,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '40%',
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
	states: {
		normal: {
			filter: {
				type: 'none',
				value: 0,
			}
		},
		hover: {
			filter: {
				type: 'none',
				value: 0,
			}
		},
		active: {
			allowMultipleDataPointsSelection: false,
			filter: {
				type: 'none',
				value: 0,
			}
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
      offsetX: -9,
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
    height: 320,
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '35%',
      barWidth: '35%',
    },
  },
  dataLabels: {
    enabled: true,
    formatter: (val) => val + '%',
    textAnchor: 'middle',
    offsetY: -27,
    style: {
      fontSize: '14px',
      colors: ['#121C2D'],
    },
  },
  stroke: {
    width: 1,
    colors: ['#F22F46', '#F22F46'],
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
    show: true,
    horizontalAlign: 'left',
    height: 80,
    markers: {
      width: 18,
      height: 18,
      strokeWidth: '1px',
      strokeColor: '#F22F46',
      fillColors: ['#F22F46', 'transparent'],
      radius: 0
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
        show: false,
    },
    axisTicks: {
      show: false,
    }
  },
  yaxis: {
    labels: {
      offsetX: -9,
    },
  },
  grid: {
    show: false,
  }
}

var scatterPlotChartOptions = {
  series: [
    {
      name: 'SAMPLE A',
      data: [
        [16.4, 5.4],
        [21.7, 2],
        [25.4, 3],
        [19, 2],
        [10.9, 1],
        [13.6, 3.2],
        [10.9, 7.4],
        [10.9, 0],
        [10.9, 8.2],
        [16.4, 0],
        [16.4, 1.8],
        [13.6, 0.3],
        [13.6, 0],
        [29.9, 0],
        [27.1, 2.3],
        [16.4, 0],
        [13.6, 3.7],
        [10.9, 5.2],
        [16.4, 6.5],
        [10.9, 0],
        [24.5, 7.1],
        [10.9, 0],
        [8.1, 4.7],
        [19, 0],
        [21.7, 1.8],
        [27.1, 0],
        [24.5, 0],
        [27.1, 0],
        [29.9, 1.5],
        [27.1, 0.8],
        [22.1, 2],
      ],
    },
    {
      name: 'SAMPLE B',
      data: [
        [36.4, 13.4],
        [1.7, 11],
        [5.4, 8],
        [9, 17],
        [1.9, 4],
        [3.6, 12.2],
        [1.9, 14.4],
        [1.9, 9],
        [1.9, 13.2],
        [1.4, 7],
        [6.4, 8.8],
        [3.6, 4.3],
        [1.6, 10],
        [9.9, 2],
        [7.1, 15],
        [1.4, 0],
        [3.6, 13.7],
        [1.9, 15.2],
        [6.4, 16.5],
        [0.9, 10],
        [4.5, 17.1],
        [10.9, 10],
        [0.1, 14.7],
        [9, 10],
        [12.7, 11.8],
        [2.1, 10],
        [2.5, 10],
        [27.1, 10],
        [2.9, 11.5],
        [7.1, 10.8],
        [2.1, 12],
      ],
    },
    {
      name: 'SAMPLE C',
      data: [
        [21.7, 3],
        [23.6, 3.5],
        [24.6, 3],
        [29.9, 3],
        [21.7, 20],
        [23, 2],
        [10.9, 3],
        [28, 4],
        [27.1, 0.3],
        [16.4, 4],
        [13.6, 0],
        [19, 5],
        [22.4, 3],
        [24.5, 3],
        [32.6, 3],
        [27.1, 4],
        [29.6, 6],
        [31.6, 8],
        [21.6, 5],
        [20.9, 4],
        [22.4, 0],
        [32.6, 10.3],
        [29.7, 20.8],
        [24.5, 0.8],
        [21.4, 0],
        [21.7, 6.9],
        [28.6, 7.7],
        [15.4, 0],
        [18.1, 0],
        [33.4, 0],
        [16.4, 0],
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'scatter',
    zoom: {
      enabled: true,
      type: 'xy',
    },
  },
  xaxis: {
    tickAmount: 10,
    labels: {
      formatter: function (val) {
        return parseFloat(val).toFixed(1)
      },
    },
  },
  yaxis: {
    tickAmount: 7,
  },
}