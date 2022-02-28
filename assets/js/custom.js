$(document).ready(function () {
  setTimeout(function () {
    aosResetNav()
  }, 1000)

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

  $(document).scroll(function () {
    //var t=$(window).scrollTop();
  })

  $(window).resize(function () {})

  function aosResetNav() {
    $('.nav-dropDown')
      .find('.aos-init.aos-animate')
      .removeClass('aos-init')
      .removeClass('aos-animate')
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

      console.log(val)
      const trendNum = $('.regionaldata').attr('data-trendNum')
      let tl, tr, bl, br;
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
        `../../json/by_row/trend_${trendNum}_explore_top_left.json`,
        (data) => {
          br = data
        }
      )
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
        series: []
      })
    }
  })
})
