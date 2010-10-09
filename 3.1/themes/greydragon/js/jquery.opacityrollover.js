;(function($) {
    var defaults = {
		nsOpacity:   0.67,
		sOpacity:  1.0,
		fadeSpeed: 'fast',
		selector: 'selected'
	};

	$.fn.opacityrollover = function(settings) {
    
        $.extend(this, defaults, settings);
		var config = this;
    
        $(this).each(function(index, obj) {
            if ($(this).hasClass(config.selector))
                $(this).fadeTo(config.fadeSpeed, config.sOpacity);
            else
                $(this).fadeTo(config.fadeSpeed, config.nsOpacity);
            return this;
        });

	};
})(jQuery);

