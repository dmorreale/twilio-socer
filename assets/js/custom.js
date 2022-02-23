
$(document).ready(function() {

	$('.nav-cta__button').click(function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
		}
		else {
			$('.nav-cta__button.active').removeClass('active').next().slideToggle();
			$(this).addClass('active');
		}
		$(this).next().slideToggle();
	});

	$('.nav-cta__button--hamburger').click(function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.nav-wrapper.active').removeClass('active');
			//$('body').removeClass('noScroll');
		}
		else {
			$(this).addClass('active');
			$('.nav-wrapper').addClass('active');
			//$('body').addClass('noScroll');
		}
	});

	//preload images
	var images = new Array()
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}
	preload(
		
	)

	if(location.hash)
	{
		var loc = location.hash.substring(1);
		loc = loc.toLowerCase();
		if(loc.indexOf("question") == -1) {
			pagechange();
		}
	}

	$(window).on('hashchange',function() {
		pagechange();
	});

	

	

	

	$(document).scroll(function() {
  		//var t=$(window).scrollTop();
	});

	$(window).resize(function() {
		
	});

});