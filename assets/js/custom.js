const trendRegex = /\/trend\-[1-5]/;
const langRegex = /\/(de|pt-br|fr|es-es|ed-mx|ja)\//;
const sitePath = window.location.pathname.replace(trendRegex, '').replace('/thank-you', '').replace(langRegex, '/');
const siteRoot = window.location.href.includes('/trend-') || window.location.href.includes('/thank-you') ? window.location.href.replace(trendRegex, '').replace('/thank-you', '').replace(langRegex, '/') : window.location.href.replace(langRegex, '/');
const jsonRoot = siteRoot + 'assets/json/numbers/' + document.getElementsByTagName("html")[0].getAttribute('lang') + '/';
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
	var langcode = $('html').attr('lang');
	var language = langcode + '/';
	
	var link = location.pathname ? location.pathname + '/' : '/';
	
	$('.language-nav a').each(function(e){
		var thisLang = $(this).attr('hreflang');
		if(langcode == 'en' && thisLang != 'en'){
			$(this).attr('href', ( sitePath + thisLang + location.pathname.replace(sitePath, '/')));
		} else if(thisLang == 'en'){
			$(this).attr('href', location.pathname.replace((sitePath + langcode + '/'), sitePath));
		} else {
			$(this).attr('href', ( sitePath + thisLang + location.pathname.replace((sitePath + langcode), '')));
		}
	});
		
	//load the text from the json doc.
	var textJSON = siteRoot + 'assets/json/text/' + language + 'twiliosocer2022.json';
	await $.getJSON(textJSON, function(json) {
	  json.forEach(function(obj) { 
		  if(curPage == obj["Page"] || obj["Page"] == 'general'){
			    
				if(obj["Element"] == 'socialdescription'){
					var url = encodeURIComponent(location.href),
						description = encodeURIComponent(obj["Content"]);
					$('.social-twitter').each(function(){
						$(this).attr('href', ('https://twitter.com/intent/tweet?text=' + description + '%0A%0A' + url)).attr('target', '_blank');
					});
					$('.social-linkedin').each(function(){
						$(this).attr('href', ('https://www.linkedin.com/shareArticle?mini=true&url=' + url +'&summary=' + description)).attr('target', '_blank');
					});
				}
			  
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

    if (posX < 0) posX = 0
    if (posX > maxX) posX = maxX

    $('.hover-follow').css({ left: posX + 'px' });
	$(this).find('.hover-follow img').css({ top: topper + 'px' });  
  });
	
  $('.video-container img').click(function(e){
	  $(this).css({zIndex: -1});
	  $(this).next()[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
  });

  $('.nav-cta__button').click(function (e) {
	  e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
    } else {
      $('.nav-cta__button.active').removeClass('active').next().slideToggle()
      $(this).addClass('active')
    }
    $(this).next().slideToggle()
  })

  $('.nav-cta__button--hamburger').click(function (e) {
	e.preventDefault();
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
    if (loc.indexOf('form_engagement') != -1) {
      $('#cover,.mktoForm_3201').addClass('show');
    }
    if (loc.indexOf('form_expert') != -1) {
      $('#cover,.mktoForm_3202').addClass('show');
    }
  }

  $('.downArrowModule').click(function () {
    scrollTo($(this).closest('section').next(), 1200)
  })

  $('#cover, .formPopup .close').click(function() {
    closeCoverAndPopups();
  });

  function closeCoverAndPopups() {
    $('#cover').removeClass('show');
    $('.formPopup.show').removeClass('show');
  }

  $('.json-ctabuttontext').click(function() {
    showPopup($('.mktoForm_3201'));
  });

  $('.json-ctabuttoncontact').click(function() {
    showPopup($('.mktoForm_3202'));
  });

  function showPopup(popup) {
    $('#cover').addClass('show');
    popup.addClass('show');
  }

  $('.formPopup .belowTheForm button').click(function() {
    $(this).parent().parent().find('.mktoButton').click();
  });

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
      var val = $el.attr('data-value')
	  var label = $el.text()

      $parent.removeClass('opened')

      if (val == 'Global') {
        val = $parent.find('> A').attr('data-default') //reset to default
      }

      $('.selector > a').each(function () {
        $(this).text($(this).attr('data-default')) //reset the other
      })

      $parent.find('> A').text(label)
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
            jsonRoot + div.dataset.source,
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
            yaxis: {
              labels: {
                offsetX: -9,
                maxWidth:280
              },
            },
          })
          if(div.getAttribute('number-of-bars') == '3') {
            chartOptions = merge(chartOptions, {
              chart: {
                type: 'bar',
                height: 180,
                toolbar: {
                  show: false,
                },
                width: 600,
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  barHeight: '45%',
                  dataLabels: {
                    position:'top',
                  },
                },
              },
            })
          }
          if(div.getAttribute('number-of-bars') == '6') {
            chartOptions = merge(chartOptions, {
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
                  barHeight: '50%',
                  dataLabels: {
                    position:'top',
                  },
                },
              },
            })
          }

          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          //chartGroupCharts[index].render()
          break

        case 'double-bar':
          chartGroupData[index] = await $.getJSON(
            jsonRoot + div.dataset.source,
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
              height: 450,
              width: 499,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                barHeight: '60%',
                dataLabels: {
                  position:'top',
                },
              },
            },
            colors: ['#F22F46', 'transparent'],
            stroke: {
              show: true,
              width: 1,
              colors: ['#F22F46'],
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
                radius: 0
              },
            },
            fill: {
              type: 'solid',
              colors: ['#F22F46', 'transparent'],
              opacity: 1,
            },
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          //chartGroupCharts[index].render()
          break

        case 'radial-bar':
          chartGroupData[index] = await $.getJSON(
            jsonRoot + div.dataset.source,
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
          div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((el) => el[0] === 'Global')[1];
          break
        
		case 'dot':
          chartGroupData[index] = await $.getJSON(
            jsonRoot + div.dataset.source,
            (data) => {
              tl = data
            }
          )

          updateDotCharts('Global', chartGroupData[index], div);
		  div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[1];
          break
		
		case 'text':
			chartGroupData[index] = await $.getJSON(
				jsonRoot + div.dataset.source,
				(data) => {
				  tl = data
				}
			)
		
			div.innerHTML = `<span>${chartGroupData[index].find((e) => e[0] === 'Global')[1]} YEARS</span>`;
			div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[1];
			break

        case 'column':
          chartGroupData[index] = await $.getJSON(
            jsonRoot + div.dataset.source,
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
				if(div.parentElement.parentElement.querySelector(".chart-value") !== null ){
				  div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[1]; 
				}
			} else if (chartGroupData[index][0].length === 4) {
				div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[2];
				div.parentElement.nextElementSibling.querySelector(".chart-value2").innerHTML = chartGroupData[index].find((e) => e[0] === 'Global')[3];
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
		  div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
          break

        case 'dot':

          updateDotCharts(selection, chartGroupData[index], div);
		  div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
          break
			  
		case 'text':
			
			div.innerHTML = `<span>${chartGroupData[index].find((e) => e[0] === selection)[1]} YEARS</span>`
			div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
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
				if(div.parentElement.parentElement.querySelector(".chart-value") !== null ){
					div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
				}
			} else if (chartGroupData[index][0].length === 4) {
				div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[2];
				div.parentElement.nextElementSibling.querySelector(".chart-value2").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[3];
			}
          break

        default:
          break
      }
    }
  )
}