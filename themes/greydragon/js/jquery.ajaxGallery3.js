(function($) 
   {
    var config = {}; 

    var global = {
                  selected : '',
                  selector : ''
                 };

    var init = $.prototype.init; 
  
    $.prototype.init = function(selector, context) 
     {
      var r = init.apply(this, arguments);
   
      if (selector && selector.selector)
        r.context = selector.context, r.selector = selector.selector;
    
      if ( typeof selector == 'string' )
       {
        r.context = context || document, r.selector = selector;
        global.selector = r.selector;
       }
  
      global.selected = r;   
  
      return r;
     };

    $.prototype.init.prototype = $.prototype;

    $.fn.ajaxGallery3 = {
                       config : function(args) 
                        {
                         setConfig($.extend({
                                            'gallery' : '',
                                            'controller_path' : ''
                                            }, args));
                         return (getConfig());
                        },
                       init : function(cfg)
                        {
                         setConfig(cfg);
                         var config = getConfig();
                         
                         if ($.browser.msie && jQuery.browser.version.substr(0,1)=='6')
						 	return;
						 else {
                         
							 // create necessary html
							 generateHTML();
							 
							 // additional CSS styling
							 // We only want these styles applied when javascript is enabled
							 

							 // Scroll initially to image
							 scroll(0,90);
							 
							 // Initialize Minimal Galleriffic Gallery
							 var gallery;
							 gallery = $('#thumbs').galleriffic({
									 delay:                     2000,
											 numThumbs:                 15,
											 preloadAhead:              1,
											 imageContainerSel:         '#slideshow',
											 controlsContainerSel:      '#controls',
											 captionContainerSel:       '#caption',
											 loadingContainerSel:       '#loading',
											 renderSSControls:          true,
											 renderNavControls:         false,
											 playLinkText:              'Play Slideshow',
											 pauseLinkText:             'Pause Slideshow',
											 enableHistory:             true,
											 autoStart:                 false,
											 syncTransitions:           false,
											 defaultTransitionDuration: 900
								 });	
							 }
								 /**** Functions to support integration of galleriffic with the jquery.history plugin ****/
							 // PageLoad function
							 // This function is called when:
							 // 1. after calling $.historyInit();
							 // 2. after calling $.historyLoad();
							 // 3. after pushing "Go Back" button of a browser
							 function pageload(hash) {
								 //select the correct thumbnail
								 manipulateDOM(hash, config.controller_path);
								 
								 if(hash) {
									 $.galleriffic.gotoImage(hash);
								 } else {
									 gallery.gotoIndex(0);
								 }
								 // Optional Opacity-Roller-Effect BEGIN
								 $('#thumbs ul.thumbs li').opacityrollover();
								 // Optional Opacity-Roller-Effect END
							 };
							 
							 // Initialize history plugin.
							 // The callback is called at once by present location.hash. 
							 $.historyInit(pageload, "advanced.html");
							 
							 // set onlick event for buttons using the jQuery 1.3 live method
							 $("a[rel='history']").live('click', function(event) {
								 event.preventDefault();	
					 
								 if (event.button != 0) return true;
								 
								 var hash = this.href;
								 hash = hash.replace(/^.*#/, '');
							 
								 // moves to a new page. 
								 // pageload is called at once. 
								 // hash don't contain "#", "?"
								 $.historyLoad(hash);
								 
								 // !!!very important!!!
								 // prevent Safari from scrolling!
								 scroll(0,90);
								 return false;
							 });
	  generateCSS();
							 return (global.selected);
                        }
                      };
                   
	function generateHTML() {
		  object = (global.selected);
		  var html = '\
			  <!-- Galleriffic HTML START -->\
			  <div id="controls" class="controls"></div>\
			  <div class="slideshow-container">\
				  <div id="loading" class="loader"></div>\
				  <div id="slideshow" class="slideshow"></div>\
			  </div>\
			  <div style="clear: both;"></div>\
			  <!-- Galleriffic HTML END -->';

		  $(object).replaceWith(html);
    };
    
    function generateCSS() {
    	$('div.g-thumbnav li').css({
			'float' : 'left'
		});
		$('div.controls *').css({
			'text-align': 'center'
		});
	   /*$('div.slideshow img').css({
		  'margin': '0 auto',
		  'vertical-align': 'middle',
		  'border': '1px solid #ccc'
	   });
	   $('div.loader').css({
		  'position': 'absolute', 
		  'top': '0', 
		  'left': '0', 
		  'background-image': 'url("../images/loaderWhite.gif")', 
		  'background-repeat': 'no-repeat',
		  'background-position': 'center',
		  'width': '768px',
		  'height': '768px'
	  });
	  $('span.image-wrapper').css({
		  'display': 'block'
	  });
	  $('a.advance-link').css({
		  'display': 'block',
		  'width': '100%',
		  'text-align': 'center'
	  });*/
    };
    
    // -- Galleriffic JS START
	// methods that reloads item-/meta-data and replaces the information on the site
	function reloadData(id, controller_path) {
		$.getJSON(
			//"/gallery3_test/index.php/greydragon/reloadData" + "/" + id,
            //"/~David/gallery3/index.php/greydragon/reloadData" + "/" + id,
            controller_path + id,
			{},
			function(data) {
				$.each(data, function(i,item){
					if (item.type == 'html') {
						$(item.sel.toString()).html(item.val.toString());
					}
					if (item.type == 'text') {
                        			$(item.sel.toString()).text(item.val.toString());					
                        		}
				});
			}
		);
	};
	
	// main method that selects the thumb (according to the url), 
	// attaches and detaches the event-handlers
	function manipulateDOM(hash, controller_path) {	
		// List all onclick handlers of all anchor elements:
		//$('a').listHandlers('onclick', console.info);
		
		// variables
		var hash = hash.replace(/^.*#/, '');		
		var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
		var hash = hash.replace(specials, "\\$&");
		// current paginator objects

		$(".g-paginator").replaceWith('<ul class="g-paginator">' + $(".g-paginator").children().eq(1).parent().html().replace(/\u2026/, "&middot;") + '</ul>');

		var array = $(".g-paginator .g-pagination span");				
		// get seleted link of current item ('li') and it's position
		var x = $('a[href=#' + hash +']').parent();
		var position = x.parent().children().index(x);
		// current Thumbs
		var curThumb = $('#thumbs a[href=#' + hash +']');
		var ItemImages = $(".thumb img");
		
		
		// reload meta- and item-data
		reloadData($("#thumbs a[href*=" + hash + "]").attr("id").substring(2,$("#thumbs a[href*=" + hash + "]").attr("id").length), controller_path);				
		
		// 're-init' galleriffic
		reInitGalleriffic(hash, curThumb, ItemImages);

		// rebuild paginator bar (1, 2, 3, ...)
		rebuildPaginator(hash, position, x, array);
		// rebuild navigation bar (back-, forward-button, et al)
		rebuildNavigation(hash, position);
	};
	
	function reInitGalleriffic(hash, curThumb, ItemImages) {
		// remove border from all images
		ItemImages.removeAttr("class").attr("class", "g-navthumb");
		// detach event handlers, do nothing for the selected thumb, re-attach for the rest
		curThumb.children("img").attr("class", "g-navthumb g-current");
		$("#thumbs a.thumb").unbind();
		curThumb.click(function(){return false;});
	};
	
	function rebuildPaginator(hash, position, x, array) {
		var i = 0;
		if ($(x).prevAll("#g-column-right li").eq(4).get(0)) {
			x = $(x).prevAll("#g-column-right li").eq(4);
			var i = -5;
		}
		else if ($(x).prevAll("#g-column-right li").eq(3).get(0)) {
			x = $(x).prevAll("#g-column-right li").eq(3);
			var i = (-1) * (parseInt(position));
		}
		else if ($(x).prevAll("#g-column-right li").eq(2).get(0)) {
			x = $(x).prevAll("#g-column-right li").eq(2);
			var i = (-1) * (parseInt(position));
		}
		else if ($(x).prevAll("#g-column-right li").eq(1).get(0)) {
			x = $(x).prevAll("#g-column-right li").eq(1);
			var i = (-1) * (parseInt(position));
		}
		else if ($(x).prevAll("#g-column-right li").eq(0).get(0)) {
			x = $(x).prevAll("#g-column-right li").eq(0);
			var i = (-1) * (parseInt(position));
		}
		else {
			x = $(x);
			var i = (-1) * (parseInt(position));
		}

		// itereate over current paginator and replace elements ...
		$.each(array, function(index, value) {
			if ((parseInt(position) + 1 + i) <= $("#thumbs .thumbs li").length) {
			$(this).show();			
				var tmp = x.children().attr("href");
				if (x.children().attr("href") == "#" + hash) {
					$(this).html((parseInt(position) + 1 + i));
				}
				else {
					$(this).html("<a>" + (parseInt(position) + 1 + i) + "</a>")
					$("a", this).attr("href", x.children().attr("href") );
					$("a", this).attr("rel", "history");
					$("a", this).attr("class", "thumb");
				}
			}
			else {
				$(this).hide();
			}
			x = $(x).next();
			i++;
		});
	};
	
	function rebuildNavigation(hash, position) {
		// (de)activate forward / backward buttons		
		var leftMostElement = $('a[href=#' + hash +']').parent().parent().children().eq(0).children().attr("href");
		var leftElement = $('a[href=#' + hash +']').parent().prev().children().attr("href");
		var rightElement = $('a[href=#' + hash +']').parent("li").next("li").children().attr("href");
		var rightMostElement = $('div#thumbs li:last-child').children().attr("href");
		
		if (position == 0) {
			$('li.g-navigation').children().eq(3).replaceWith('<a rel="history" href="' + rightElement + '"><span class="ui-icon ui-icon-next" style="background-position: -194px -178px;">&nbsp;</span></a>');
			$('li.g-navigation').children().eq(4).replaceWith('<a rel="history" href="' + rightMostElement + '"><span class="ui-icon ui-icon-next" style="background-position: -210px -178px;">&nbsp;</span></a>');
			$("span.ui-icon-prev").parent().replaceWith('<span class="ui-icon ui-icon-prev-d" style="background-position: -178px -162px;">&nbsp;</span>');
		}

		if (position > 0 && $('a[href=#' + hash +']').parent("li").next("li").get(0)) {
			$('li.g-navigation').children().eq(0).replaceWith('<a rel="history" href="' + leftMostElement + '"><span class="ui-icon ui-icon-prev" style="background-position: -162px -178px;">&nbsp;</span></a>');
			$('li.g-navigation').children().eq(1).replaceWith('<a rel="history" href="' + leftElement + '"><span class="ui-icon ui-icon-prev" style="background-position: -178px -178px;">&nbsp;</span></a>');
			$('li.g-navigation').children().eq(3).replaceWith('<a rel="history" href="' + rightElement + '"><span class="ui-icon ui-icon-next" style="background-position: -194px -178px;">&nbsp;</span></a>');
			$('li.g-navigation').children().eq(4).replaceWith('<a rel="history" href="' + rightMostElement + '"><span class="ui-icon ui-icon-next" style="background-position: -210px -178px;">&nbsp;</span></a>');
		} else if ( !$('a[href=#' + hash +']').parent("li").next("li").get(0) ){
			$('li.g-navigation').children().eq(0).replaceWith('<a rel="history" href="' + leftMostElement + '"><span class="ui-icon ui-icon-prev" style="background-position: -162px -178px;">&nbsp;</span></a>');
			$('li.g-navigation').children().eq(1).replaceWith('<a rel="history" href="' + leftElement + '"><span class="ui-icon ui-icon-prev" style="background-position: -178px -178px;">&nbsp;</span></a>');
			$('li.g-navigation').children().eq(3).replaceWith('<span class="ui-icon ui-icon-next-d" style="background-position: -194px -162px;">&nbsp;</span>');
			$('li.g-navigation').children().eq(4).replaceWith('<span class="ui-icon ui-icon-next-d" style="background-position: -210px -162px;">&nbsp;</span>');
		}
	};
	
	// helper method to list all handlers
	/*
	$.fn.listHandlers = function(events, outputFunction) {
		return this.each(function(i){
			var elem = this,
				dEvents = $(this).data('events');
			if (!dEvents) {return;}
			$.each(dEvents, function(name, handler){
				if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
				   $.each(handler, function(i,handler){
					   outputFunction(elem, '\n' + i + ': [' + name + '] : ' + handler );
				   });
			   }
			});
		});
	};
	*/
	
	
// -- Galleriffic JS END
  
    function setConfig(value)
     {
      config = value;
     }
  
    function getConfig()
     {
      return config;
     }
   })(jQuery); 