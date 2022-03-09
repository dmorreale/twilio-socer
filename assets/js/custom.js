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
		  if(curPage == obj["Page"] || obj["Page"] == 'global'){
			  $('.json-' + obj["Element"]).html(obj["Content"]);
		  }
	  });
	});

  //mouse follow on trend hover
  $('.trends--item').on('mousemove', function (e) {
    var width = $('.hover-follow').width(),
      centerX = width / 2,
      posX = e.pageX - centerX,
      maxX = $(this).width() - width

    if (posX < 0) posX = 0
    if (posX > maxX) posX = maxX

    $('.hover-follow').css({ left: posX + 'px' })
  })

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
    if (loc.indexOf('question') == -1) {
      pagechange()
    }
  }

  $(window).on('hashchange', function () {
    pagechange()
  })
	
 $('.downArrowModule').click(function() {
	scrollTo($(this).closest('section').next(),1200);
  });

  $(document).scroll(function () {

    var t=$(window).scrollTop();
	$('.leftImageHero').each(function() {
		var topPosition = $(window).scrollTop() - $(this).offset().top;
		topPosition = topPosition*(.2);
		$(this).css('top',topPosition + 'px');
	});
	  
	//generic parallax function
	$('.parallax-image').each(function(){
		var $cur = $(this);
		var paraStart = $(window).scrollTop() + $(window).height();
		var paraDif = paraStart - $(this).offset().top;
		var speed = $cur.attr('data-speed');
		var maxDistance = $cur.attr('data-max');
		if(typeof speed !== typeof undefined && speed !== false ){
			speed = parseInt(speed)/1000;
		} else {
			speed = .2;
		}
		if(typeof maxDistance !== typeof undefined && maxDistance !== false ){
			maxDistance = parseInt(maxDistance);
		} else {
			maxDistance = false;
		}
		if(paraStart > $(this).offset().top){
			var transform =  Math.floor(paraDif * speed);
			if( maxDistance && transform > maxDistance ) transform = maxDistance;
			var translate =  'translateY(' + transform + 'px)';
		   $cur.css({
				transform: translate
			});
		} else {
			$cur.removeAttr('style');
		}
		
	});
	  
	$('.rotateOnScroll').each(function() {
      $(this).css('transform','rotate('+(t/3)+'deg)');
    });
	  
  });
	
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
	
	  // load charts
	  const trendNum = $('.regionaldata').attr('data-trendNum');
	  let tl, tr, bl, br;
	  await $.getJSON(
		`json/by_row/trend_${trendNum}_explore_top_left.json`,
		(data) => {
		  tl = data
		}
	  )
	  await $.getJSON(
		`json/by_row/trend_${trendNum}_explore_top_right.json`,
		(data) => {
		  tr = data
		}
	  )
	  await $.getJSON(
		`json/by_row/trend_${trendNum}_explore_bottom_left.json`,
		(data) => {
		  bl = data
		}
	  )
	  await $.getJSON(
		`json/by_row/trend_${trendNum}_explore_bottom_right.json`,
		(data) => {
		  br = data
		}
	  )


	  updateChartGroup('Global', tl, tr, bl, br)
    updateDotCharts('Global', tl, tr, bl, br);


  function adjustOverlappingGrid() {
    $('.bg-grid-overlap').each(function () {
      var newHeight = $(this).parent().outerHeight(true)
      newHeight += $(this).parent().prev().find('.two-col').outerHeight(true) / 2;
      $(this).css('height', newHeight + 'px')
    })
  }
	
  $('.selector > a').click(async function (e) {
    e.preventDefault();
  	$(this).parent().toggleClass('opened');
  });

  //dropdown selectors
  $('.selector a').click(async function (e) {
    e.preventDefault()
    var $el = $(this)
    var $parent = $el.closest('.selector')
	  
    if (!$el.attr('data-default')) {
      var val = $el.text()
	  
	  $parent.removeClass('opened');

      if (val == 'Global') {
        val = $parent.find('> A').attr('data-default') //reset to default
      }

      $('.selector > a').each(function () {
        $(this).text($(this).attr('data-default')) //reset the other
      })

      $parent.find('> A').text(val)
      updateChartGroup(val, tl, tr, bl, br)

      updateDotCharts(val, tl, tr, bl, br);
    }
  })
	
})

function updateDotCharts(val, tl, tr, bl, br) {
  $('.dot-chart').each(function() {
    var dots = '';
    var dataSet;
    var percentage = 0;

    //if the chart is not initialized, create it
    if(!$(this).find('.dot-100').length) {
      for(var i = 100; i > 0; i--) {
        dots += '<div class="dot-' + i + '"></div>';
      }

      $(this).html(dots);
    }

    if($(this).parent().hasClass('chart-top-left')) {
      dataSet = tl;
    }
    else if($(this).parent().hasClass('chart-top-right')) {
      dataSet = tr;
    }
    else if($(this).parent().hasClass('chart-bottom-left')) {
      dataSet = bl;
    }
    else if($(this).parent().hasClass('chart-bottom-right')) {
      dataSet = br;
    }

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
      var dot = $(this).find('.dot-'+i);
      if(i >= percentage) {
        dot.removeClass('filled');
      }
      else {
        dot.addClass('filled');
      }
    }

  });
}

function updateChartGroup(val, tl, tr, bl, br) {
  const trendNum = $('.regionaldata').attr('data-trendNum')
  switch (trendNum) {
    case '1':
      topLeftChart.updateOptions({
        series: [
          {
            name: val,
            data: [tl.find((e) => e[0] === val)[1]],
          },
          {
            name: 'GLOBAL AVERAGE',
            data: [tl.find((e) => e[0] === 'Global')[1]],
          },
        ],
        xaxis: { categories: [val, 'Global Average'] },
      })
      topRightChart.innerHTML = `<span>${tr.find((e) => e[0] === val)[1]} YEARS</span>`
      bottomLeftChart.updateOptions({
        series: [parseInt(bl.find((e) => e[0] === val)[1].replace('%', ''))],
      })
      bottomRightChart.updateOptions({
        series: [
          {
            data: br.filter((el) => el[0] === val).map((el) => parseInt(el[2])),
          },
        ],
      })
      break
    case '2':
		 
	  
      if (topRightChart instanceof ApexCharts) {
        topRightChart.updateOptions({
          series: [
            {
              name: val,
              data: [tr.find((e) => e[0] === val)[2]],
            },
            {
              name: val,
              data: [tr.find((e) => e[0] === val)[3]],
            },
          ],
        })
      } else {
        topRightChart = new ApexCharts(
          document.querySelector('.chart-top-right'),
          {
            ...columnChartOptions,
            series: [
              {
                name: val,
                data: [tr.find((e) => e[0] === val)[2]],
              },
              {
                name: val,
                data: [tr.find((e) => e[0] === val)[3]],
              },
            ],
          }
        )
        topRightChart.render()
      }

      bottomLeftChart.updateOptions({
        ...columnChartOptions,
        series: [
          {
            name: val,
            data: [bl.find((e) => e[0] === val)[2]],
          },
          {
            name: val,
            data: [bl.find((e) => e[0] === val)[3]],
          },
        ],
        xaxis: { 
          axisBorder: { show: false },
          axisTicks: { show: false },
          categories: ['Companies', 'Consumers'] 
        }, 
      })

      bottomRightChart.updateOptions({
        ...barChartOptions,
        series: [
          {
            name: 'Companies',
            data: br.filter((el) => el[0] === val).map((el) => parseInt(el[2])),
          },
          {
            name: 'Consumers',
            data: br.filter((el) => el[0] === val).map((el) => parseInt(el[3])),
          },
        ],
        chart: {
          height: 400,
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
          xaxis: {
            labels: {
              show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            labels: {
              offsetX: -14,
            }
          }
      })
		  
  case '3':

  case '4':

  case '5':
		  
    default:
      break
  }
}
