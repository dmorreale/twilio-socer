var pathName = window.location.pathname;
var address = window.location.href;

//sanitize the address
//if there is a hash, remove it from the address variable
if(address.indexOf("#") != -1) {
  address = address.substring(0,address.indexOf("#"));
}
//if there is a query string, remove it from the address variable
if(address.indexOf("?") != -1) {
  address = address.substring(0,address.indexOf("?"));
}

const trendRegex = /\/trend\-[1-5]/;
const langRegex = /\/(de|pt-br|fr|es-es|es-mx|ja)\//;
const sitePath = pathName.replace(trendRegex, '').replace('/thank-you', '').replace(langRegex, '/');
const siteRoot =address.includes('/trend-') || address.includes('/thank-you') ? address.replace(trendRegex, '').replace('/thank-you', '').replace(langRegex, '/') : address.replace(langRegex, '/');
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
	
  function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
	var utmContent = getCookie('utm_content'),
		utmCampaign = getCookie('utm_campaign'),
		utmMedium = getCookie('utm_medium'),
		utmSource = getCookie('utm_source'),
		utmTerm = getCookie('utm_term');
	
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

  console.log(langcode);
		
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
			  
			    if(obj["Element"] == 'uimenu'){
					$('#menuText').attr('data-menu', obj["Content"]);
				}
			  
			    if(obj["Element"] == 'close'){
					$('#menuText').attr('data-close', obj["Content"]);
				}
			  
			  	if(obj["Element"] == 'localeglobal'){
					$('.selector > a').attr('data-default', obj["Content"]);
				}
			  
			    if(obj["Element"] == 'companies'){
					$('body').attr('data-company', obj["Content"]);
				}
			  
			    if(obj["Element"] == 'consumers'){
					$('body').attr('data-customers', obj["Content"]);
				}
			  
			  	if(obj["Element"] == 'year'){
					$('body').attr('data-year', obj["Content"]);
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
      $(this).removeClass('active').find('.text').text($('.nav-cta__button--hamburger .text').attr('data-menu'))
      $('.nav-wrapper.active').removeClass('active')
      $('body').removeClass('noScroll')
      aosResetNav()
    } else {
      $(this).addClass('active').find('.text').text($('.nav-cta__button--hamburger .text').attr('data-close'))
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

  if(location.hash) {
    var loc = location.hash.substring(1)
    loc = loc.toLowerCase()
    if (loc.indexOf('form_engagement') != -1) {
      $('#cover,.mktoForm_3201').addClass('show');
    }
    //if (loc.indexOf('form_expert') != -1) {
    //  $('#cover,.mktoForm_3202').addClass('show');
    //}
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
	$('input[name=uTMContentInquiry]').val(utmContent);
	$('input[name=uTMCampaignInquiry]').val(utmCampaign);
	$('input[name=uTMMediumInquiry]').val(utmMedium);
	$('input[name=uTMSourceInquiry]').val(utmSource);
	$('input[name=uTMTermInquiry]').val(utmTerm);
  }

  $('.formPopup .belowTheForm button').click(function() {
    $(this).parent().parent().find('.mktoButton').click();
  });

  $('.formPopup form').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $(this).find('.mktoButton').click();
    }
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
	var defaultVal = document.getElementById('selectRegion').firstElementChild.getAttribute('data-default');

    if (!$el.attr('data-default')) {
      var val = $el.attr('data-value')
	  var label = $el.text()

      $parent.removeClass('opened')

      if (val == defaultVal) {
        val = $parent.find('> A').attr('data-default') //reset to default
      }

      $('.selector > a').each(function () {
        $(this).text($(this).attr('data-default')) //reset the other
      })

      $parent.find('> A').text(label)
      updateChartGroup(label)
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
	  var defaultVal = document.getElementById('selectRegion').firstElementChild.getAttribute('data-default');
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
                        .filter((el) => el[0] === defaultVal)
                        .map((el) => el[2])
                    : chartGroupData[index].map((val) => val[defaultVal]),
              },
            ],
            xaxis: {
              categories:
                div.dataset.getBy === 'row'
                  ? chartGroupData[index]
                      .filter((el) => el[0] === defaultVal)
                      .map((el) => el[1])
                  : chartGroupData[index].map((val) => val.Regions),
            },
            yaxis: {
              labels: {
                offsetX: -9,
                maxWidth:550
              },
            },
          })
          var chartSixhundredWidth = 600;
          if(document.documentElement.clientWidth < 1360) {
            chartSixhundredWidth = '100%';
          }
          if(div.getAttribute('number-of-bars') == '3') {
            chartOptions = merge(chartOptions, {
              chart: {
                type: 'bar',
                height: 180,
                toolbar: {
                  show: false,
                },
                width: chartSixhundredWidth,
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
                width: chartSixhundredWidth,
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
          if(!div.getAttribute('number-of-bars')) {
            if(document.documentElement.clientWidth > 700) {
              
            }
            else {
              chartOptions = merge(chartOptions, {
                chart: {
                  type: 'bar',
                  height: 750,
                  toolbar: {
                    show: false,
                  },
                  width: '100%',
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '63%',
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
                  textAnchor: 'middle',
                  offsetX: 0,
                  style: {
                    fontSize: '14px',
                    colors: ['#121C2D'],
                  },
                },
                yaxis: {
                  labels: {
                    show: false,
                    offsetx: 0,
                  },
                  axisBorder: {
                      show: false
                  },
                  axisTicks: {
                    show: false
                  },
                },
                xaxis: {
                  labels: {
                    show:true,
                    maxHeight:609,
                    hideOverlappingLabels: false,
                    rotate: -90,
                    offsetY: 9,
                  }
                },
                tooltip: {
                  enabled: false,
                },
                grid: {
                  show: false,
                }
              })
            }
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
          var chartFivehundredWidth = 499;
          if(document.documentElement.clientWidth < 540) {
            chartFivehundredWidth = (document.documentElement.clientWidth - 40);
          }
          var chartOptions = merge(barChartOptions, {
            series: [
              {
                name: document.getElementsByTagName("body")[0].getAttribute('data-company'),
                data: chartGroupData[index]
                  .filter((el) => el[0] === defaultVal)
                  .map((el) => parseInt(el[2]))
                  .reverse(),
              },
              {
                name: document.getElementsByTagName("body")[0].getAttribute('data-customers'),
                data: chartGroupData[index]
                  .filter((el) => el[0] === defaultVal)
                  .map((el) => parseInt(el[3]))
                  .reverse(),
              },
            ],
            xaxis: {
              categories: chartGroupData[index]
                .filter((el) => el[0] === defaultVal)
                .map((el) => el[1])
                .reverse(),
            },
            chart: {
              height: 450,
              width: chartFivehundredWidth,
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
                chartGroupData[index].find((el) => el[0] === defaultVal)[1]
              ),
            ],
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((el) => el[0] === defaultVal)[1];
          break
        
		case 'dot':
          chartGroupData[index] = await $.getJSON(
            jsonRoot + div.dataset.source,
            (data) => {
              tl = data
            }
          )

          updateDotCharts(defaultVal, chartGroupData[index], div);
		  div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === defaultVal)[1];
          break
		
		case 'text':
			chartGroupData[index] = await $.getJSON(
				jsonRoot + div.dataset.source,
				(data) => {
				  tl = data
				}
			)
			  
			var year = document.getElementsByTagName("body")[0].getAttribute('data-year');
		
			div.innerHTML = `<span>${chartGroupData[index].find((e) => e[0] === defaultVal)[1]} ` + year + '</span>';
			div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === defaultVal)[1];
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
                    chartGroupData[index].find((e) => e[0] === defaultVal)[1],
                  ],
                },
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === defaultVal)[1],
                  ],
                },
              ]
            } else if (chartGroupData[index][0].length === 4) {
              return [
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === defaultVal)[2],
                  ],
                },
                {
                  data: [
                    chartGroupData[index].find((e) => e[0] === defaultVal)[3],
                  ],
                },
              ]
            }
          }

          var chartOptions = merge(columnChartOptions, {
            series: colSeries(),
            xaxis: {
              labels: {
                maxHeight: 220,
                rotate:-90,
              },
              categories:
                chartGroupData[index][0].length === 2
                  ? [defaultVal, defaultVal]
                  : [document.getElementsByTagName("body")[0].getAttribute('data-company'), document.getElementsByTagName("body")[0].getAttribute('data-customers')],
            },
          })
          chartGroupCharts[index] = new ApexCharts(div, chartOptions)
          //chartGroupCharts[index].render()
			if (chartGroupData[index][0].length === 2) {
				if(div.parentElement.parentElement.querySelector(".chart-value") !== null ){
				  div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === defaultVal)[1]; 
				}
			} else if (chartGroupData[index][0].length === 4) {
				if(div.parentElement.parentElement.querySelector(".chart-value") !== null ){
					div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === defaultVal)[2];
				} 
				if(div.parentElement.parentElement.querySelector(".chart-value2") !== null ){
					div.parentElement.nextElementSibling.querySelector(".chart-value2").innerHTML = chartGroupData[index].find((e) => e[0] === defaultVal)[3];
				}
			}
          break

        default:
          break
      }
    }
  )
}

function updateChartGroup(selection) {
  var defaultVal = document.getElementById('selectRegion').firstElementChild.getAttribute('data-default');
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
                name: document.getElementsByTagName("body")[0].getAttribute('data-company'),
                data: chartGroupData[index]
                  .filter((el) => el[0] === selection)
                  .map((el) => parseInt(el[2]))
                  .reverse(),
              },
              {
                name: document.getElementsByTagName("body")[0].getAttribute('data-customers'),
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
			var year = document.getElementsByTagName("body")[0].getAttribute('data-year');
			
			div.innerHTML = `<span>${chartGroupData[index].find((e) => e[0] === selection)[1]} `  + year + '</span>';
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
                    chartGroupData[index].find((e) => e[0] === defaultVal)[1],
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
                  ? [selection, defaultVal]
                  : [document.getElementsByTagName("body")[0].getAttribute('data-company'), document.getElementsByTagName("body")[0].getAttribute('data-customers')],
            },
          })
			if (chartGroupData[index][0].length === 2) {
				if(div.parentElement.parentElement.querySelector(".chart-value") !== null ){
					div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[1];
				}
			} else if (chartGroupData[index][0].length === 4) {
				if(div.parentElement.parentElement.querySelector(".chart-value") !== null ){
					div.parentElement.nextElementSibling.querySelector(".chart-value").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[2];
				}
				if(div.parentElement.parentElement.querySelector(".chart-value2") !== null ){
					div.parentElement.nextElementSibling.querySelector(".chart-value2").innerHTML = chartGroupData[index].find((e) => e[0] === selection)[3];
				}
			}
          break

        default:
          break
      }
    }
  )
}