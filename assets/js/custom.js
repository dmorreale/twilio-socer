$(document).ready(async function () {
  setTimeout(function () {
    $(window).resize()
  }, 300)
  setTimeout(function () {
    $(window).resize()
    aosResetNav()
  }, 1000)

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

  $(document).scroll(function () {
    //var t=$(window).scrollTop();
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
        xaxis: { categories: [val.toLocaleUpperCase(), 'GLOBAL AVG'] },
      })
      topRightChart.innerHTML = `${tr.find((e) => e[0] === val)[1]} YEARS`
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
      console.log({ val, tl, tr, bl, br })
      // topLeftChart.updateOptions({
      //   // dot chart config here
      // })
      console.log(tr.find((e) => e[0] === val))
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
        xaxis: { categories: [val.toLocaleUpperCase(), 'GLOBAL AVG'] },
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
        dataLabels: {
          enabled: true,
          formatter: (val) => val + '%',
          textAnchor: 'start',
          offsetX: 0,
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
      })

    default:
      break
  }
}
