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
	$.getJSON("/assets/json/twiliosocer2022.json", function(json) {
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
    //var t=$(window).scrollTop();
	$('.leftImageHero').each(function() {
		var topPosition = $(window).scrollTop() - $(this).offset().top;
		topPosition = topPosition*(.3);
		$(this).css('top',topPosition + 'px');
	});
	  
	$('.parallax-image').each(function(){
		var $cur = $(this);
		var paraStart = $(window).scrollTop() + ($(window).height() * .8);
		var paraDif = paraStart - $(this).offset().top;
		var speed = $cur.attr('data-speed');
		if(typeof speed !== typeof undefined && speed !== false ){
			speed = parseInt(speed)/1000;
		} else {
			speed = .2;
		}
		if(paraStart > $(this).offset().top){
			var translate =  'translateY(' + Math.floor(paraDif * speed) + 'px)';
		   $cur.css({
				transform: translate
			});
		} else {
			$cur.removeAttr('style');
		}
		
	});
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


  // load charts
  const trendNum = $('.regionaldata').attr('data-trendNum')
  let tl, tr, bl, br
  await $.getJSON(
    `../../json/by_row/trend_${trendNum}_explore_top_left.json`,
    (data) => {
      tl = data
    }
  )
  await $.getJSON(
    `../../json/by_row/trend_${trendNum}_explore_top_right.json`,
    (data) => {
      tr = data
    }
  )
  await $.getJSON(
    `../../json/by_row/trend_${trendNum}_explore_bottom_left.json`,
    (data) => {
      bl = data
    }
  )
  await $.getJSON(
    `../../json/by_row/trend_${trendNum}_explore_bottom_right.json`,
    (data) => {
      br = data
    }
  )
	

  updateChartGroup('Global', tl, tr, bl, br)

  function adjustOverlappingGrid() {
    $('.bg-grid-overlap').each(function () {
      var newHeight = $(this).parent().outerHeight(true)
      newHeight +=
        $(this).parent().prev().find('.two-col').outerHeight(true) / 2
      console.log(newHeight)
      $(this).css('height', newHeight + 'px')
    })
  }

  //dropdown selectors
  $('.selector a').click(async function (e) {
    e.preventDefault()
    var $el = $(this)
    var $parent = $el.closest('.selector')

    if (!$el.attr('data-default')) {
      var val = $el.text()

      if (val == 'Global') {
        val = $parent.find('> A').attr('data-default') //reset to default
      }

      $('.selector > a').each(function () {
        $(this).text($(this).attr('data-default')) //reset the other
      })

      $parent.find('> A').text(val)
      updateChartGroup(val, tl, tr, bl, br)
    }
  })
	
})



function updateChartGroup(val, tl, tr, bl, br) {
  columnChart.updateOptions({
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
    xaxis: { categories: [val.toLocaleUpperCase(), 'GLOBAL AVG'] },
  })
  document.querySelector('.chart-text').innerHTML = `${
    tr.find((e) => e[0] === val)[1]
  } YEARS`
  radialBarChart.updateOptions({
    series: [parseInt(bl.find((e) => e[0] === val)[1].replace('%', ''))],
  })
  barChart.updateOptions({
    series: [{data: br.filter(el => el[0] === val).map(el => parseInt(el[2]))}],
  })
}
