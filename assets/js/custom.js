
$(document).ready(function() {

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

	function pagechange() {
		var loc = location.hash.substring(1);
		loc = loc.replace(/\%20/g, ' ');
		loc = loc.toLowerCase();
		//console.log(loc);

		if(loc == "expressive") {
			goDirectToResults(0);
		}
		else if(loc == "introspective") {
			goDirectToResults(1);
		}
		else if(loc == "relational") {
			goDirectToResults(2);
		}
		else if(loc.indexOf("question") != -1) {
			var activeQuestion = parseInt(loc.substring(loc.indexOf('_') + 1));
			$('.page.active').removeClass('active');
			$('.page.question').addClass('active');
			$('.block-question.active').removeClass('active');
			$('.block-question:eq('+ (activeQuestion - 1) +')').addClass('active');
			updateProgressBar();
			resetPageAOSanimations();
		}
		else if(loc == "") {
			$('.page.active').removeClass('active');
			$('.page:eq(0)').addClass('active');
			resetPageAOSanimations();
		}
		else if(loc == "download_report") {
			$('.page.active').removeClass('active');
			$('.page.thankyou').addClass('active');
			resetPageAOSanimations();
		}
	}

	function goDirectToResults(i) {
		updateResultsPage(i);
		$('.page').each(function() {
			if($(this).hasClass('results')) {
				$(this).addClass('active');
			}
			else
			{
				$(this).removeClass('active');
			}
		});
	}

	//remove the hiding of the body
	//setTimeout(function() {
		$('.pageWrapper').removeClass('hide');
    //},200);
	

	//download report thank-you page handling
	$('.downloadReport').click(function() {
		location.hash = 'download_report';
	});

	$('.downArrow, .block-hero .btn').click(function() {
		var n = $(this).closest('section').next().offset().top - $('header').height();
		$('body,html').stop().animate({scrollTop:n},400);
	});
	
	$('.radioOption input').click(function() {
		if(!$(this).parent().hasClass('active')) {
			$(this).closest('.block-question').find('div.active').removeClass('active');
			$(this).parent().addClass('active');
			$(this).closest('section.error').removeClass('error');
		}
	});

	$('.radioOption label').click(function() {
		$(this).parent().find('input').click();
	});

	//detect pressing enter, move on to the next page if we are on a question and an answer has been selected
	$(document).on('keypress',function(e) {
	    if(e.which == 13 && $('.page.question').hasClass('active')) {
	       $('.block-question.active .nextPage').click();
	    }
	});


	$('.nextPage').click(function() {
		//if this is a question page
		if($(this).closest('section').hasClass('block-question')) {
			//if there is no answer selected for the current question, throw an error message and do not proceed
			if(!$('.block-question.active').find('.radioOption div.active').length)
			{
				$(this).closest('section').addClass('error');
			}
			else
			{
				//if we are not on the last question, proceed to the next. Otherwise, process the quiz and go to results.
				if($('.block-question.active').index() != ($('.questions .block-question').length - 1)) {
					location.hash = 'question_' + ( $('.block-question.active').index() + 2 );
				}
				else {
					processQuiz();
				}
			}
		}
		else {
			location.hash = 'question_1';
		}
	});

	$('.prevPage').click(function() {
		//if we want to go to the previous question instead of the previous page
		if($(this).closest('section').hasClass('block-question-progress') && $('.block-question.active').index() != 0) {
			location.hash = 'question_' + ( $('.block-question.active').index() );
		}
		else {
			location.hash = '';
		}
	});

	$('.explore-block button, .explore-block img').click(function() {
		var tmp = $(this).closest('.explore-block').find('.h2').text().toLowerCase();
		for (var i = 0; i < types.length; i++) {
			if(types[i]['class'] === tmp) {
				location.hash = types[i]['class'];
			}
		}
	});

	$(document).scroll(function() {
  		//var t=$(window).scrollTop();
	});

	$(window).resize(function() {
		
	});

	//enable the aos animations for the active page
	function resetPageAOSanimations() {
		$('.page.active').find('.aos-init.aos-animate').removeClass('aos-init').removeClass('aos-animate');
		AOS.refreshHard();
	}

	function updateProgressBar() {
		$('.progressBar .bar').css('width',($('.block-question.active').index()/$('.questions .block-question').length) * 100 + '%');
	}

	function processQuiz() {
		//zero out the point values
		for (var i = 0; i < types.length; i++) {
		    types[i]['points'] = 0;
		}
		
		//loop through questions and calculate their total score in the three types
		$('.block-question').each(function() {
			//loop through each question and add point values to the type array based on the answer selected
			var questionPoints = pointValues[$(this).index()][$(this).find('input:checked').val()];
			for (var i = 0; i < questionPoints.length; i++) {
			    types[i]['points'] += questionPoints[i];
			}
		});

		typeSorted = types;
		typeSorted.sort((a, b) => {
		    return b.points - a.points;
		});

		//update the content on the results page
		updateResultsPage(typeSorted[0]['id']);
		location.hash = typeSorted[0]['class'];
	}

	function updateResultsPage(id) {
		//reset classes on results page and scroll to the top of the page.
		$('body,html').stop().animate({scrollTop:0},20);
		$('.page.results').attr('class','page results active');

		//remove animations
		//resetPageAOSanimations();
		$('.page.active').find('.aos-init.aos-animate').removeClass('aos-init').removeClass('aos-animate');
		$('.page.active').addClass('hide');

		//add the personality type class to the results page
		for (var i = 0; i < types.length; i++) {
			if(types[i]['id'] == id) {
				$('.page.results').addClass(types[i]['class']);
			}
		}
		
		$('#ogTitle').attr('content', resultsContent.shareLinks.title[id]);
		$('#ogImage').attr('content', resultsContent.shareLinks.image[id]);
		$('#twTitle').attr('content', resultsContent.shareLinks.title[id]);
		$('#twImage').attr('content', resultsContent.shareLinks.image[id]);
		
		var tmp = '';
		var tmpID = -1;
		$('*[dynamicContent]').each(function() {

			//if this is a link, replace the link with the new data
			if($(this).attr('href')) {
				var tmp = 'resultsContent.' + $(this).attr('dynamicContent') + '['+id+']';
				$(this).attr('href',eval(tmp))
			}//handle the hero-images
			else if($(this).parent().parent().hasClass('results-top-images') && $(this).closest('.container').hasClass('topSection')) {
				var tmp = 'resultsContent.' + $(this).attr('dynamicContent') + '['+id+']';
				$(this).attr('src', 'assets/images/'+eval(tmp));
			}//handle the explore-block
			else if($(this).closest('.container').hasClass('explore-block')) {
				//loop through the options, if we see the image, we will increment the count by 1
				//making sure we do not print the same type as currently shown
				if($(this).hasClass('img-fluid')) {
					tmpID++;
					if(tmpID == id) {
						tmpID++;
					}
				}
				var tmp = 'resultsContent.' + $(this).attr('dynamicContent') + '['+tmpID+']';
				//if this is an image, update it. Otherwise update the text
				if($(this).hasClass('img-fluid')) {
					$(this).attr('src', 'assets/images/'+eval(tmp));
				}
				else {
					$(this).html(eval(tmp));
				}
			}
			else {
				var tmp = 'resultsContent.' + $(this).attr('dynamicContent') + '['+id+']';
				$(this).html(eval(tmp));
			}
		});
		setTimeout(function() {
			$('.page.hide').removeClass('hide');
            AOS.refreshHard();
        },10);
	}

});