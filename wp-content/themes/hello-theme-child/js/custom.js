var $ = jQuery.bind({});
$(window).scroll(function() {    
	var scroll = $(window).scrollTop();
	if (scroll >= 300) {
		$("body").addClass("hdactive"); 
	} else {
		$("body").removeClass("hdactive"); 
	}
});   
