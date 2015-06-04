var React = require('react');
var ReactAddons = require('react/addons');

var spot = 'a, input, button, .spotlight';
var spothov = '.hovered';



function _log(msg) {
	console.log('should log', msg);
	$('._log').html("<h1>message is <lg_red>" + msg + "</lg_red></h1>"); 
}
function getNearestNeighbour(element, direction) {
	//console.log('should get ', direction, 'of', element);

	if(element == undefined) {
		$(spot).get(0) && $($(spot).get(0)).addClass('hovered');
		return;
	}

	//console.log($(element).nearest('.spotlight', {sameX: true}));
	var nearest;
	var minDist = Infinity;
	var distx, disty;
	var tolerance = 200;
	$(spot).each(function (index, el) {
		if(el == element)
			return;
		disty = el.offsetTop - element.offsetTop;
		distx = el.offsetLeft - element.offsetLeft;

		switch(direction) {
			case 'down':
				if (disty > 0 && disty < minDist && Math.abs(distx) < tolerance) {
					minDist = disty;
					nearest = el;
				}
				break;
			case 'up':
				if (disty < 0 && Math.abs(disty) < minDist && Math.abs(distx) < tolerance) {
					minDist = Math.abs(disty);
					nearest = el;
				}
				break;
			case 'left':
				if (distx < 0 && Math.abs(distx) < minDist && Math.abs(disty) < tolerance) {
					minDist = Math.abs(distx);
					nearest = el;
				}
				break;
			case 'right':
				if (distx > 0 && distx < minDist && Math.abs(disty) < tolerance) {
					minDist = distx;
					nearest = el;
				}
				break;
			default: break;
		}
	});

	//console.log(nearest);
	return nearest;
}

var rc = {
	init: function () {
		console.log('rc init');
		$("body").keydown(function(e) {
			console.log(e.which)
			//e.preventDefault();

			switch(e.which) {
			case KEYS.RIGHT:
				this.handleRight();
				e.preventDefault();
				break;
			case KEYS.DOWN:
				this.handleDown();
				e.preventDefault();
				break;
			case KEYS.UP:
				this.handleUp();
				e.preventDefault();
				break;
			case KEYS.LEFT:
				this.handleLeft();
				e.preventDefault();
				break;
			case KEYS.ENTER:
				this.handleSelect();
				e.preventDefault();
				break;
			}
		}.bind(this));
	},

	handleSelect: function () {
		var focused = $(spothov).get(0);
		$(focused).focus();
		var node = React.findDOMNode(focused);
        React.addons.TestUtils.Simulate.click(node, {button: 0});
        $(node).click();
		/*console.log(focused);
        console.log('onter keydown',  node);*/
        //_log(webOS.keyboard);
        
	},
	handleRight: function () {
		var focused = $(spothov).get(0);
		var nearest = getNearestNeighbour(focused, 'right');
		doChange(focused, nearest);
		/*var focused = spothov.get(0);
			
		if(focused.length > 0) {
			var next = $(focused).nextAll('.spotlight').get(0);
			focused.removeClass('hovered');
			$(next).addClass('hovered');
			
		} else {
			$('.spotlight')[0] && $($('.spotlight')[0]).addClass('hovered');
		}*/
	},

	handleDown: function () {
		var focused = $(spothov).get(0);
		var nearest = getNearestNeighbour(focused, 'down');
		doChange(focused, nearest);
	},

	handleUp: function () {
		var focused = $(spothov).get(0);
		var nearest = getNearestNeighbour(focused, 'up');
		doChange(focused, nearest);
		
	},
	handleLeft: function () {
		var focused = $(spothov).get(0);
		var nearest = getNearestNeighbour(focused, 'left');
		doChange(focused, nearest);
	}
};

function doChange(focused, nearest) {
	if(nearest) {
		$(focused).removeClass('hovered');
		focused.blur();
		$(nearest).addClass('hovered');
		scrollTo(nearest);
	}

	/*if(focused.length > 0) {

	} else {
		$(spot).get(0) && $($(spot).get(0)).addClass('hovered');
	}*/
}

function scrollTo(element) {
	var offset = $(element).offset().top;
	var visible_area_start = $(window).scrollTop();
    var visible_area_end = visible_area_start + window.innerHeight;

    if(offset < visible_area_start || offset > visible_area_end)
		jQuery('body, #content').animate({
	        scrollTop: $(element).offset().top - 20
	    }, 500);
}



module.exports = rc;


/*$(document).ready(function () {
		console.log('document ready');
	
		//$('.spotlight')[0].focus();
		$("body").keydown(function(e) {
			console.log(e.which)
			switch(e.which) {
			case 39:
				handleRight();
				break;
			case 37:
				handleLeft();
				break;
			case 13:
				handleSelect();
				break;
			}
		});
		
		function handleRight() {
			_log('right');
			var focused = $('.spotlight.hovered');			
			
			if(focused.length > 0) {
				var next = $(focused).nextAll('.spotlight')[0];
				focused.removeClass('hovered');
				$(next).addClass('hovered');
				
			} else {
				$('.spotlight')[0] && $($('.spotlight')[0]).addClass('hovered');
			}
			
		}
		
		function handleLeft() {
			_log('left');
			var focused = $('.spotlight.hovered');
			
			if(focused.length > 0) {
				var next = $(focused).prevAll('.spotlight')[0];
				focused.removeClass('hovered');
				next.addClass('hovered');
				
			} else {
				$('.spotlight').addClass('hovered');
			}
		}
		
		function handleSelect() {
			//_log('select ' + window.location.hash);
			//console.log(window.location.hash);	
			var focused = $('.spotlight.hovered').click();
			//window.location.hash="/add";
		}
		
		function _log(msg) {
			console.log('should log', msg);
			$('._log').html("<h1>message is <lg_red>" + msg + "</lg_red></h1>"); 
		}
	});*/