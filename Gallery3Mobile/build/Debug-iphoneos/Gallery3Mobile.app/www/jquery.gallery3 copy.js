(function($) {
	var config = {}; 
	var global = {
		selected : '',
		selector : ''
	};
	var init = $.prototype.init; 
	$.prototype.init = function(selector, context) {
		var r = init.apply(this, arguments);
		if (selector && selector.selector)
			r.context = selector.context, r.selector = selector.selector;
		if ( typeof selector == 'string' ) {
			r.context = context || document, r.selector = selector;
			global.selector = r.selector;
		}
		global.selected = r;   
		return r;
	};
	$.prototype.init.prototype = $.prototype;
	
	$.fn.gallery3 = {
		config : function(args){
			if(args+'' != 'undefined') {
			setConfig($.extend({
				//'default' : 'value'
				'siteUrl': 'http://localhost/~david/gallery3/index.php/rest',
				'user': 'admin',
				'password': 'gallery3',
				'token': '',
				'g3Ajax': '',
				'cntItems' : '',
				'items': '',
				'thumbs': '',
				'currentId': '',
				'albumId': '',
				'type': '',
				'parent': '',
				'entity': ''
			}, args));
			}
			return (getConfig());
		},
		
		a_autoCenterPhotos : autoCenterPhotos,
		a_generateThumbsHTML : generateThumbsHTML,
		
		getPhoto : function(){
			id = this.config().currentId;
			var $loader 	= $('#photo_container').find('.loader');
			$loader.show();
			var $theimage 	= $('#theimage');
			
			setItems(id); 
			
			var photo = getConfig().entity;
			//alert("");
			$('<img/>').load(function(){
				var $this 	= $(this);
				resize($this);
				$loader.hide();
				var $a=$('<a/>');/*for swipe*/
				$theimage.empty().append($a.append($this));
				$('#description').empty().html(photo.description);
				$('#prev,#next').show();
			}).attr('src',photo.resize_url_public);
		},
		
		init : function(args){
			if(args+'' != 'undefined'){
				this.config(args);
			}
			
			// 1. step : login
			login();
			
			/* 2. step : Load the Albums */
		    getAlbum();
		    
			return (global.selected);
		},
		
		/* goes to next image */
		navigateNext : function(){
			var config = getConfig();
			
			albumId = config.albumId;
			id = config.currentId;
			
			// get the position
			var x = $('li#' + id);
			var position = x.parent().children().index(x);
			position++;
			
			var $thumb = $('#aldi' + albumId + ' li:nth-child('+parseInt(position+1)+')').find('img').attr("id");
			if($thumb == 'undefined') {
				//alert("");
				return;
			}
			setConfig($.extend(getConfig(),{
				'currentId': $thumb
			}));
			this.getPhoto();
		},
		
		/* goes to previous image */
		
		navigatePrevious : function(){
			var config = getConfig();
			
			albumId = config.albumId;
			id = config.currentId;
			
			// get the position
			var x = $('li#' + id);
			var position = x.parent().children().index(x);
			position++;
			
			var $thumb = $('#aldi' + albumId + ' li:nth-child('+parseInt(position-1)+')').find('img').attr("id");
			if($thumb == 'undefined') {
				return;
			}
			setConfig($.extend(getConfig(),{
				'currentId': $thumb
			}));
			this.getPhoto();
		}
	};
	
	/* centers the thumbs grid, based on how many photos fit per row */
	function autoCenterPhotos() {
		var photosLength = $('.pic').size();
		if(photosLength > 0) {
			var photosPerRow = Math.floor(($(window).width()-0)/80);
			//0 of paddings (if you want more...)
			var left = Math.floor(($(window).width()-(photosPerRow*80))/2);
			$('.pic').each(function(i){
				var $this = $(this);
				if(i%photosPerRow == 0) {
					$this.css('margin-left',left+'px');
				}
				else {
					$this.css('margin-left','0px');
				}
			});
		}
	}
	
	function generateThumbsHTML(id){
		var idPrefix = '';
		
		config = getConfig();
		url = config.siteUrl + '/item/' + id;
		config = setItems(id); 	

		if(config.entity+'' != 'undefined'){
			if(config.entity.type == 'album')
				idPrefix = 'al';	
			else idPrefix = 'ph'
		}
		
		if (idPrefix == 'al') {
			var html = '\
				<div id="' + idPrefix + 'di' + id + '" class="albums">\
				<div class="toolbar">\
					<h1>Thumbs</h1>\
					<a class="back" href="#">Albums</a>\
					<!--                <a class="button slideup" id="infoButton" href="#about">About</a> -->\
					<a class="button slideup" id="enterSettings" href="#enterSettings">Enter Settings</a>\
				</div>\
				<div class="loader" style="display:none;"></div>\
				<ul id="thumbs" class="thumbView" style="display:none;">\
				</ul>\
			';
			$('body').append(html);
			$('#albums_container').hide();
			getThumbs(id, '');
			jQT.goTo('#' + idPrefix + 'di' + id, 'cube');
		} else {
			setConfig($.extend(getConfig(),{
				'currentId': id
			}));
			$('#albums_container').hide();
			$('#photo_container div#theimage').html("");
			jQT.goTo('#photo_container', 'cube');
		}
	}
	
	function getAlbum(id){
		var html = "";
		selected = global.selected;
		var $loader = $('#albums_container').find('.loader');
		$loader.show();
		setItems(id); 			
		
		var items = getConfig().items
		//$.each(getConfig().items, function(i,item){
		//for (i=0; i<= items.length; i++){
		for (var i in items){
			html += "<li id=\"alli" + items[i]['entity']['id'] + "\" class=\"arrow\"><a href=\"albums_container\" >" + items[i]['entity']['name'] + "</a></li>";
		};
		$loader.hide();
		$('#albums_container').find('ul').append(html).show();	
		return (global.selected);
	}
	
	function getImageSource(id){
		var img = '';
		/*
		$.ajax({
				async: false,
				url: 'http://localhost/~david/gallery3/index.php/rest/data/' + id + '?size=thumb&encoding=base64',
				beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Gallery-Request-Key", config.token);
				},
				success: function(resource) {
					img = resource;
				},
				dataType: 'base64'
		});
		return 'data:image/jpeg;base64,' + img;
		*/
		return id
	}

	function g3Ajax(url){
		var config = getConfig();
		var returnVal = "";

		$.ajax({
			async: false,
			url: url,
			beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Gallery-Request-Key", config.token);
			},
			//data: data,
			success: function(resource) {
			returnVal = resource;
			},
			dataType: 'json'
		});
		
		return returnVal;
	}
	
	// asumes that setItems(id) was called before!
	function getThumbs(id){
		var $thumbscontainer = $('#album' + id);
		var counter = 0;
		var html = '';
		var countImages = '';
		var $ul = $('#aldi' + id).find('ul');
	
		selected = global.selected;
		
		var $loader = $('div#aldi' + id).find('.loader');
		$loader.show();
		
		//url = ((id)?config.siteUrl + '/item/' + id:config.siteUrl + '/item/1');
		//this.setItems(id); 
		countImages = getConfig().cntItems;
		
		for (var i in items){
			try {
				var description = items[i]['entity']['description'];
			} catch(e){
				description = '';
			}
			if(description == undefined)
				description = '';
			
			$('<img id="' + items[i]['entity']['id'] + '" class="' + items[i]['entity']['type']  + '" alt="'+ items[i]['entity']['name'] +'" title="'+ description+'"/>').load(function(){
				++counter;
				var $this = $(this);
				/*
				we need to make sure the grid thumbs are no bigger than 75 px
				*/
				resizeGridImage($this);
				var $li = $('<li />',{
					id : this.id,
					className	: 'pic album'
				});
				var $a = $('<a/>',{
					href	:	'aldi' + id
				});
				$ul.append($li.append($a.append($this)));
				if(counter == countImages) {
					$loader.hide();
					$thumbscontainer.append($ul.show());
					autoCenterPhotos();
				}
			}).attr('src',items[i]['entity']['thumb_url_public']);
			//}).attr('src',getImageSource(items[i]['entity']['id']));
		};
		//$loader.hide();
		//$thumbscontainer.show();
		
		return (global.selected);
	}
	
	function login(){
		var config = getConfig();
		
		$.ajax({
			type: 'POST',
			async: false,
			url: config.siteUrl,
			data: {user: config.user, password:config.password},
			success: function(data) {
				setConfig($.extend(getConfig(),{
					'token':data
				}));
			},
			dataType: 'json'
		});
		return (global.selected);
	}
	
	/*
    resize the image, based on windows width and height
    */
    function resize($image){
        var widthMargin		= 10
        var heightMargin 	= 80;
		
        var windowH      = $(window).height()-heightMargin;
        var windowW      = $(window).width()-widthMargin;
        var theImage     = new Image();
        theImage.src     = $image.attr("src");
        //var imgwidth     = theImage.width;
        var imgwidth     = $image[0].width;
        //var imgheight    = theImage.height;
        var imgheight    = $image[0].height;

        if((imgwidth > windowW)||(imgheight > windowH)){
            if(imgwidth > imgheight){
                var newwidth = windowW;
                var ratio = imgwidth / windowW;
                var newheight = imgheight / ratio;
                theImage.height = newheight;
                theImage.width= newwidth;
                if(newheight>windowH){
                    var newnewheight = windowH;
                    var newratio = newheight/windowH;
                    var newnewwidth =newwidth/newratio;
                    theImage.width = newnewwidth;
                    theImage.height= newnewheight;
                }
            }
            else{
                var newheight = windowH;
                var ratio = imgheight / windowH;
                var newwidth = imgwidth / ratio;
                theImage.height = newheight;
                theImage.width= newwidth;
                if(newwidth>windowW){
                    var newnewwidth = windowW;
                    var newratio = newwidth/windowW;
                    var newnewheight =newheight/newratio;
                    theImage.height = newnewheight;
                    theImage.width= newnewwidth;
                }
            }
        }
        $image.css({
            'width':theImage.width+'px',
            'height':theImage.height+'px'
            });
    }
	
	/*
	we need to make sure the grid thumbs are no bigger than 75 px
	*/
	function resizeGridImage($image){
		var theImage 	= new Image();
		theImage.src 	= $image.attr("src");
		//var imgwidth 	= theImage.width;
		var imgwidth 	= $image[0].width;
		//var imgheight 	= theImage.height;
		var imgheight 	= $image[0].height;
		
		var containerwidth  = 75;
		var containerheight = 75;
		
		if(imgwidth	> containerwidth){
			var newwidth = containerwidth;
			var ratio = imgwidth / containerwidth;
			var newheight = imgheight / ratio;
			if(newheight > containerheight){
				var newnewheight = containerheight;
				var newratio = newheight/containerheight;
				var newnewwidth =newwidth/newratio;
				theImage.width = newnewwidth;
				theImage.height= newnewheight;
			}
			else{
				theImage.width = newwidth;
				theImage.height= newheight;
			}
		}
		else if(imgheight > containerheight){
			var newheight = containerheight;
			var ratio = imgheight / containerheight;
			var newwidth = imgwidth / ratio;
			if(newwidth > containerwidth){
				var newnewwidth = containerwidth;
				var newratio = newwidth/containerwidth;
				var newnewheight =newheight/newratio;
				theImage.height = newnewheight;
				theImage.width= newnewwidth;
			}
			else{
				theImage.width = newwidth;
				theImage.height= newheight;
			}
		}
		
		$image.css({
		'width':theImage.width,
		'height':theImage.height
		});
	}

	function setConfig(value){
		config = value;
	}
	
	function setItems(id) {
		var config = '';
		var album = '';
		var url = '';
		var urls = "[";		
		
		config = getConfig();
		url = ((id)?config.siteUrl + '/item/' + id:config.siteUrl + '/item/1');
		
		album = g3Ajax(url);	
		
		// if we receive an album --> load members
		if(album.members+'' != 'undefined') {
			$.each(album.members, function(i,url){
				urls += "\"" + url + "\",";
			});
			urls = urls.slice(0, -1) + "]";
			items = g3Ajax(config.siteUrl + "/items?urls=" + urls);

			var nItems = new Array();
			$.each(items, function(i,item){
				nItems[item.entity.id] = new Array();
				nItems[item.entity.id]['entity'] = new Array();
				
				nItems[item.entity.id]['entity']['id'] = item.entity.id;
				nItems[item.entity.id]['entity']['type'] = item.entity.type;
				nItems[item.entity.id]['entity']['parent'] = item.entity.parent;
				nItems[item.entity.id]['entity']['name'] = item.entity.name;
				nItems[item.entity.id]['entity']['thumbs_url'] = item.entity.thumb_url;
			});			
		
			setConfig($.extend(getConfig(),{
				'currentId': id,
				'albumId': id,
				'entity': album.entity,
				'type': album.entity.type,
				'cntItems': items.length,
				'items': nItems
			}));
		} else {
			setConfig($.extend(getConfig(),{
				'currentId': id,
				'entity': album.entity
			}));
		}
		return getConfig();
	}
	
	function getConfig() {
		return config;
	}
})(jQuery); 