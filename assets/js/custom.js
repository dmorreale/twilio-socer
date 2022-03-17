const chartGroupData = []
const chartGroupCharts = []
const merge = (...arguments) => {
  // create a new object
  let target = {}

  // deep merge the object into the target object
  const merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          // if the property is a nested object
          target[prop] = merge(target[prop], obj[prop])
        } else {
          // for regular property
          target[prop] = obj[prop]
        }
      }
    }
  }

  // iterate through all objects and
  // deep merge them with target
  for (let i = 0; i < arguments.length; i++) {
    merger(arguments[i])
  }

  return target
}

//keep track of which charts have been rendered for the scroll function
const chartsRendered = []

$(document).ready(async function () {
  setTimeout(function () {
    $(window).resize()
  }, 300)
  setTimeout(function () {
    $(window).resize()
    aosResetNav()
  }, 1000)

	var curPage = $('body').data('page');
	//load the text from the json doc.
	await $.getJSON("assets/json/twiliosocer2022.json", function(json) {
	  json.forEach(function(obj) { 
		  if(curPage == obj["Page"] || obj["Page"] == 'general'){
			  $('.json-' + obj["Element"]).each(function(){
				  var text = obj["Content"].replace("[value]", "<strong class='chart-value'></strong>");
				  var text = text.replace("[value]", "<strong class='chart-value2'></strong>");
				  $(this).html(text);
			  });
		  }
	  });
	});

  $('.trends--item').on('mouseenter', function() {
    $(this).find('.hover-follow').css('width', $(this).find('.hover-follow').height()+'px');
  });

  //mouse follow on trend hover
  $('.trends--item').on('mousemove', function (e) {
    var width = $(this).find('.hover-follow').width(),
      centerX = width / 2,
      posX = e.pageX - centerX,
      maxX = $(window).width() - width,
	  mousePosY = e.pageY - $(this).offset().top - $(this).height()/2,
	  topper = Math.floor(Math.sin( mousePosY/200 * (Math.PI/2) ) * 12);
	  
	  //console.log('m: ' + topper);

    if (posX < 0) posX = 0
    if (posX > maxX) posX = maxX

    $('.hover-follow').css({ left: posX + 'px' });
	$(this).find('.hover-follow img').css({ top: topper + 'px' });  
  });
	
  $('.video-container img').click(function(e){
	  $(this).css({zIndex: -1});
	  $(this).next()[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  });

  $('.nav-cta__button').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
    } else {
      $('.nav-cta__button.active').removeClass('active').next().slideToggle()
      $(this).addClass('active')
    }
    $(this).next().slideToggle()
  })

  $('.nav-cta__button--hamburger').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').find('.text').text('Menu')
      $('.nav-wrapper.active').removeClass('active')
      $('body').removeClass('noScroll')
      aosResetNav()
    } else {
      $(this).addClass('active').find('.text').text('Close')
      $('.nav-wrapper').addClass('active')
      $('body').addClass('noScroll')
      AOS.refreshHard()
    }
  })

  //preload images
  var images = new Array()
  function preload() {
    for (var i = 0; i < preload.arguments.length; i++) {
      images[i] = new Image()
      images[i].src = preload.arguments[i]
    }
  }
  preload()

  if (location.hash) {
    var loc = location.hash.substring(1)
    loc = loc.toLowerCase()
    //console.log(loc,loc.indexOf('form_engagement'));
    if (loc.indexOf('form_engagement') != -1) {
      $('#cover,.mktoForm_3201').addClass('show');
    }
  }

  $('.downArrowModule').click(function () {
    scrollTo($(this).closest('section').next(), 1200)
  })

  $('#cover').click(function() {
    closeCoverAndPopups();
  });

  $('.formPopup .close').click(function() {
    closeCoverAndPopups();
  });

  function closeCoverAndPopups() {
    $('#cover').removeClass('show');
    $('.formPopup.show').removeClass('show');
  }

  $(document).scroll(function () {
    var t = $(window).scrollTop();
	 
    $('.leftImageHero').each(function () {
      var topPosition = $(window).scrollTop() - $(this).offset().top
      topPosition = topPosition * 0.2
	  if(topPosition > 30) topPosition = 30;
      $(this).css('top', topPosition + 'px')
    })

    //generic parallax function
    $('.parallax-image').each(function () {
      var $cur = $(this)
      var paraStart = $(window).scrollTop() + $(window).height()
      var paraDif = paraStart - $(this).offset().top
      var speed = $cur.attr('data-speed')
      var maxDistance = $cur.attr('data-max')
      if (typeof speed !== typeof undefined && speed !== false) {
        speed = parseInt(speed) / 1000
      } else {
        speed = 0.2
      }
      if (typeof maxDistance !== typeof undefined && maxDistance !== false) {
        maxDistance = parseInt(maxDistance)
      } else {
        maxDistance = 100
      }
	  
      if (paraStart > $(this).offset().top) {
        var transform = Math.floor(paraDif * speed) - maxDistance;
        if (maxDistance && transform >= 0) transform = 0;
        var translate = 'translateY(' + transform + 'px)'
        $cur.css({
          transform: translate,
        })
      } else {
        var translate = 'translateY(' + (-1 * maxDistance) + 'px)'
        $cur.css({
          transform: translate,
        })
      }
    })

    $('.rotateOnScroll').each(function () {
      $(this).css('transform', 'rotate(' + t / 3 + 'deg)')
    })

    for(var i = 0; i < chartGroupCharts.length; i++) {
      if(chartGroupCharts[i]) {
        var topPosition = $(window).scrollTop() - chartGroupCharts[i].el.offsetTop
        if((topPosition + ($(window).height() * .7)) > 0 && !chartsRendered[i]) {
          chartGroupCharts[i].render()
          chartsRendered[i] = true
        }
      }
    }
  })

  $(window).resize(function () {
    adjustOverlappingGrid()
  })

	function aosResetNav() {
	$('.nav-dropDown')
	  .find('.aos-init.aos-animate')
	  .removeClass('aos-init')
	  .removeClass('aos-animate')
	}

	function scrollTo(destination,duration)
	{
	  //var n = destination.offset().top - $('#header').outerHeight(true);
	  var n = destination.offset().top;
	  $("body,html").stop().animate({scrollTop:n},duration);
	}

  function adjustOverlappingGrid() {
    $('.bg-grid-overlap').each(function () {
      var newHeight = $(this).parent().outerHeight(true)
      newHeight += $(this).parent().prev().find('.two-col').outerHeight(true) / 2;
      $(this).css('height', newHeight + 'px')
    })
  }

  $('.selector > a').click(async function (e) {
    e.preventDefault()
    $(this).parent().toggleClass('opened')
  })

  //dropdown selectors
  $('.selector a').click(async function (e) {
    e.preventDefault()
    var $el = $(this)
    var $parent = $el.closest('.selector')

    if (!$el.attr('data-default')) {
      var val = $el.text()

      $parent.removeClass('opened')

      if (val == 'Global') {
        val = $parent.find('> A').attr('data-default') //reset to default
      }

      $('.selector > a').each(function () {
        $(this).text($(this).attr('data-default')) //reset the other
      })

      $parent.find('> A').text(val)
      //console.log(val);
      updateChartGroup(val)
    }
  })
  renderChartGroup()
})

const trendNum = $('.regionaldata').attr('data-trendNum');

function updateDotCharts(val, dataSet, $elem) {
    var dots = '';
    var percentage = 0;

    for(var i = 0; i < dataSet.length; i++) {
      if(dataSet[i][0]) {
        //console.log(dataSet[i][0],val);
        if(dataSet[i][0] == val) {
          percentage = dataSet[i][1];
          percentage = parseInt(percentage.replace('%', ''));
        }
      }
    }

    for(var i = 100; i > 0; i--) {
      filled = i > percentage ? '' : 'filled';
      dots += '<div class="dot-' + i + ' ' + filled + '"></div>';
    }

    $elem.innerHTML = dots;
}

async function renderChartGroup(val, tl, tr, bl, br) {
  await Array.from(document.querySelectorAll('.chart-placeholder')).map(
    async (div, index) => {
      const type = div.dataset.chartType
      switch (type) {
        case 'bar':
          chartGroupData[index] = await $.getJSON(
            `json/by_${div.dataset.getBy ?? 'header'}/${div.dataset.source}`,
            (data) => {
              tl = data
            }
          )
          var chartOptions = merge(barChartOptions, {
            series: [
              {
                data:
                  div.dataset.getBy === 'row'
                    ? chartGroupData[index]
                        .filter((el) => el[0] === 'Global')
                        .map((el) => el[2])
                    : chartGroupData[index].map((val) => val['Global']),
              },
            ],
            xaxis: {
              categories:
                div.dataset.getBy === 'row'
                  ? chartGroupData[index]
                      .filter((el) => el[0] === 'Global')
                      .map((el) => el[1])
                  : chartGroupData[index].map((val) => val.Regions),
            },
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          //chartGroupCharts[index].render()
          break

        case 'double-bar':
          chartGroupData[index] = await $.getJSON(
            `json/by_row/${div.dataset.source}`,
            (data) => {
              tl = data
            }
          )
          var chartOptions = merge(barChartOptions, {
            series: [
              {
                name: 'Companies',
                data: chartGroupData[index]
                  .filter((el) => el[0] === 'Global')
                  .map((el) => parseInt(el[2]))
                  .reverse(),
              },
              {
                name: 'Consumers',
                data: chartGroupData[index]
                  .filter((el) => el[0] === 'Global')
                  .map((el) => parseInt(el[3]))
                  .reverse(),
              },
            ],
            xaxis: {
              categories: chartGroupData[index]
                .filter((el) => el[0] === 'Global')
                .map((el) => el[1])
                .reverse(),
            },
            chart: {
              height: 384,
              width: 499,
            },
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          //chartGroupCharts[index].render()
          break

        case 'radial-bar':
          chartGroupData[index] = await $.getJSON(
            `json/by_row/${div.dataset.source}`,
            (data) => {
              tl = data
            }
          )
          var chartOptions = merge(radialBarOptions, {
            series: [
              parseInt(
                chartGroupData[index].find((el) => el[0] === 'Global')[1]
              ),
            ],
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((el) => el[0] === 'Global')[1];
          break
        
		case 'dot':
          chartGroupData[index] = await $.getJSON(
            `json/by_row/${div.dataset.source}`,
            (data) => {
              tl = data
            }
          )

          updateDotCharts('Global', chartGroupData[index], div);
		  div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[1];
          break
		
		case 'text':
			chartGroupData[index] = await $.getJSON(
				`json/by_row/${div.dataset.source}`,
				(data) => {
				  tl = data
				}
			)
		
			div.innerHTML = `<span>${chartGroupData[index].find((e) => e[0] === 'Global')[1]} YEARS</span>`;
			div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[1];
			break

        case 'column':
          chartGroupData[index] = await $.getJSON(
            `json/by_row/${div.dataset.source}`,
            (data) => {
              tl = data
            }
          )

          let colSeries = () => {
            if (chartGroupData[index][0].length === 2) {
              return [
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === 'Global')[1],
                  ],
                },
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === 'Global')[1],
                  ],
                },
              ]
            } else if (chartGroupData[index][0].length === 4) {
              return [
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === 'Global')[2],
                  ],
                },
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === 'Global')[3],
                  ],
                },
              ]
            }
          }

          var chartOptions = merge(columnChartOptions, {
            series: colSeries(),
            xaxis: {
              categories:
                chartGroupData[index][0].length === 2
                  ? ['Global', 'Global']
                  : ['Companies', 'Customers'],
            },
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          //chartGroupCharts[index].render()
			if (chartGroupData[index][0].length === 2) {
				//div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[1];
			} else if (chartGroupData[index][0].length === 4) {
				div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[2];
				div.nextElementSibling.querySelector(".chart-value2").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[3];
			}
          break

        default:
          break
      }
    }
  )
}

function updateChartGroup(selection) {
  Array.from(document.querySelectorAll('.chart-placeholder')).map(
    (div, index) => {
      const type = div.dataset.chartType
      switch (type) {
        case 'bar':
          chartGroupCharts[index].updateOptions({
            series: [
              {
                data:
                  div.dataset.getBy === 'row'
                    ? chartGroupData[index]
                        .filter((el) => el[0] === selection)
                        .map((el) => el[2])
                    : chartGroupData[index].map((val) => val[selection]),
              },
            ],
          })
          break

        case 'double-bar':
          chartGroupCharts[index].updateOptions({
            series: [
              {
                name: 'Companies',
                data: chartGroupData[index]
                  .filter((el) => el[0] === selection)
                  .map((el) => parseInt(el[2]))
                  .reverse(),
              },
              {
                name: 'Consumers',
                data: chartGroupData[index]
                  .filter((el) => el[0] === selection)
                  .map((el) => parseInt(el[3]))
                  .reverse(),
              },
            ],
          })
          break

        case 'radial-bar':
          chartGroupCharts[index].updateOptions({
            series: [
              parseInt(
                chartGroupData[index].find((el) => el[0] === selection)[1]
              ),
            ],
          })
		  div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
          break

        case 'dot':

          updateDotCharts(selection, chartGroupData[index], div);
		  div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
          break
			  
		case 'text':
			
			div.innerHTML = `<span>${chartGroupData[index].find((e) => e[0] === selection)[1]} YEARS</span>`
			div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
			break

        case 'column':
          let colSeries = () => {
            if (chartGroupData[index][0].length === 2) {
              return [
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === selection)[1],
                  ],
                },
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === 'Global')[1],
                  ],
                },
              ]
            } else if (chartGroupData[index][0].length === 4) {
              return [
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === selection)[2],
                  ],
                },
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === selection)[3],
                  ],
                },
              ]
            }
          }
          chartGroupCharts[index].updateOptions({
            series: colSeries(),
            xaxis: {
              categories:
                chartGroupData[index][0].length === 2
                  ? [selection, 'Global']
                  : ['Companies', 'Customers'],
            },
          })
			if (chartGroupData[index][0].length === 2) {
				div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
			} else if (chartGroupData[index][0].length === 4) {
				div.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[2];
				div.nextElementSibling.querySelector(".chart-value2").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[3];
			}
          break

        default:
          break
      }
    }
  )
}