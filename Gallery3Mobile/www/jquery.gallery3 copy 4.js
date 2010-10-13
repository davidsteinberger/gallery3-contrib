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
				setConfig(
					$.extend({
						'siteUrl': 'http://localhost/~David/test',
						//'siteUrl': 'http://localhost/~David/gallery3/index.php',
						//'siteUrl': 'http://www.david-steinberger.at/test/rest',
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
						'entity': '',
						'db': ''
						}, getConfig(), args
					)
				);
			}
			return (getConfig());
		},
		
		a_autoCenterPhotos : autoCenterPhotos,
		
		// creates dynamically the website-container (for jqtouch) for each album/photo that the user clicks
		generatePage : function(id){
			var config = getConfig();
			var idPrefix = '';
		
			config = getConfig();
			url = config.siteUrl + '/item/' + id;
			config = setItems(id); 	
	
			if(config.entity != 'undefined'){
				if(config.entity.type == 'album')
					idPrefix = 'al';	
				else idPrefix = 'ph'
			} else idPrefix = 'ph'
			
			if (idPrefix == 'al') {
				var html = '\
					<div id="' + idPrefix + 'di' + id + '" class="albums">\
					<div class="toolbar">\
						<h1>Thumbs</h1>\
						<a class="back" href="#">Albums</a>\
							                <a class="button slideup" style="right: 120px; width: 81px;" id="makePhoto" href="#makePhoto">Upload Photo</a>\
						<!--                <a class="button slideup" id="infoButton" href="#about">About</a> -->\
						<a class="button slideup" id="enterSettings" href="#enterSettings">Enter Settings</a>\
					</div>\
					<div class="loader" style="display:none;"></div>\
					<ul id="thumbs" class="thumbView" style="display:none;">\
					</ul>\
				';
				$('body').append(html);
				$('#albums_container').hide();
				jQT.goTo('#' + idPrefix + 'di' + id, 'cube');
				getThumbs(id, '');
			} else {
				setConfig($.extend(getConfig(),{
					'currentId': id
				}));
				//$('div.current').attr("class", "albums current flag");
				$('#albums_container').hide();
				$('#photo_container div#theimage').html("");
				jQT.goTo('#photo_container', 'cube');
			}
			
			return (global.selected)
		},
		
		getPhoto : function(){
			id = this.config().currentId;
			
			setItems(id); 
			loadPictures('', id, 'drawThumb');
		},
		
		init : function(args){
			if(args+'' != 'undefined'){
				this.config(args);
			}
			
			// 1. step : create DB
			try {
				if (!window.openDatabase) {
					//console.log('Databases are not supported in this browser');
				} else {
					var shortName = 'Gallery3';
					var version = '1.0';
					var displayName = 'gallery3\'s database';
					var maxSize = 1000000; // in bytes
					picsDB = openDatabase(shortName, version, displayName, maxSize);
					//console.log("Database is setup: "+picsDB);
					
					picsDB.transaction(
						function (transaction) {
							//transaction.executeSql('DROP TABLE ImageData;', [], _nullDataHandler, _errorHandler);
							transaction.executeSql('CREATE TABLE IF NOT EXISTS ImageData(id INTEGER NOT NULL PRIMARY KEY, size INTEGER, base64 TEXT NOT NULL);', [], _nullDataHandler, _errorHandler);
							//transaction.executeSql('CREATE TABLE "AjaxData" ("Url" TEXT PRIMARY KEY  NOT NULL , "Response" TEXT);', [], _nullDataHandler, _errorHandler);
							//transaction.executeSql('DROP TABLE AjaxData;', [], _nullDataHandler, _errorHandler);
						}
					);
					
					this.config({db: picsDB});
				}
			} catch(e) {
				// Error handling code goes here.
				if (e == 2) {
					// Version number mismatch.
					//console.log("Invalid database version.");
				} else {
					//console.log("Unknown error "+e+".");
				}
				return;
			}
			
			// 1. step : login
			login();
			
			/* 2. step : Load the Albums */
		    //getAlbum();
		    
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
		},
		
		resetDB : function(){
			localStorage.clear();
			sessionStorage.clear();
			this.config().db.transaction(
				function (transaction) {
					transaction.executeSql("Delete From ImageData;", [], this._nullDataHandler, this._errorHandler);
				}
			);
			
			this.config().db.transaction(
				function (transaction) {
					transaction.executeSql("Delete From AjaxData;", [], this._nullDataHandler, this._errorHandler);
				}
			);
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
	
	function getAlbum(id){
		var html = "";
		selected = global.selected;
		var $loader = $('#albums_container').find('.loader');
		$loader.show();
		setItems(id); 			
		
		var items = getConfig().items
		
		for (var i in items){
			html += "<li id=\"alli" + items[i]['entity']['id'] + "\" class=\"arrow\"><a href=\"albums_container\" >" + items[i]['entity']['name'] + "</a></li>";
		};
		$loader.hide();
		$('#albums_container').find('ul').append(html).show();	
		return (global.selected);
	}

	function g3Ajax(url){
		//console.log("g3Ajax called: " + url);
		var config = getConfig();
		var returnVal = "";
		
		returnVal = JSON.parse(localStorage.getItem(url));
		tmp = returnVal+'';
		if (returnVal+'' == 'null' && config.token != ''){
		$.ajax({
			async: false,
			url: url,
			beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Gallery-Request-Key", config.token);
			},
			//data: data,
			success: function(resource) {
				returnVal = resource;
				localStorage.setItem(url, JSON.stringify(returnVal));
			},
			dataType: 'json'
		});
		}
		return returnVal;
	}
	
	// asumes that setItems(id) was called before!
	function getThumbs(albumId){
		var $thumbscontainer = $('#album' + albumId);
		var counter = 0;
		var html = '';
		var countImages = '';
		var $ul = $('#aldi' + albumId).find('ul');
	
		selected = global.selected;
		
		var $loader = $('div#aldi' + albumId).find('.loader');
		$loader.show();
		
		countImages = getConfig().cntItems;
		items = getConfig().items;

		for (var i in items){
			try {
				var description = items[i]['entity']['description'];
			} catch(e){
				description = '';
			}
			if(description == undefined)
				description = '';
			var tmp = '';
			
			loadPictures(albumId, i, 'drawThumbs');
			
		};
		
		return (global.selected);
	}
	
	function loadPictures(albumId, photoID, callback){
		// check if picture is cached in DB
		// if yes, picture is loaded from there!
		// if no, picture is loaded from server (asynchron)

		getConfig().db.transaction(
				function (transaction) {
					transaction.executeSql("Select * from ImageData where id = ? order by size;", [photoID], 
						function(transaction, results){
							if (results.rows.length > 0){
								////console.log("Photodata had Results: "+results.rows.length);
								for (var n=0; n<1; n++) {
									var row = results.rows.item(n);							
									picid = row['id'];
									encodedtext = row['base64'];
									////console.log("DB: " + picid);
									if(callback == 'drawThumbs'){
										drawThumbs(albumId, photoID, encodedtext);
									} 
									else if (callback == 'drawThumb'){
										drawThumb(albumId, photoID, encodedtext);
									}
								}
							}
							else {
								////console.log("resize: " + 'http://localhost/~david/gallery3/index.php/rest/data/' + photoID + '?size=thumb&encoding=base64_2');
								$.ajax({
										async: true,
										url: getConfig().siteUrl + "/rest/data/" + photoID + '?size=thumb&encoding=base64_2',
										beforeSend: function(xhr) {
										xhr.setRequestHeader("X-Gallery-Request-Key", config.token);
										},
										success: 
											function(resource) {
												//if resource = ""
												to = resource.indexOf('||');
												photoId = resource.substring(0, to);
												length = resource.length;
												////console.log("Ajax: " + photoId);
												//store thumb
												////console.log('base64 resource loaded: ' + resource.substring(to+2, length));
												//alert(resource);
												getConfig().db.transaction(
													function (transaction) {
														//transaction.executeSql("DELETE FROM ImageData where id = ?", [photoId]/*, function(){alert("delete operation ... null");}, function(){alert("delete operation ... error");}*/ );
														//transaction.executeSql("INSERT INTO ImageData (id, size, base64) VALUES (?, ?, ?)", [photoId, '0', resource.substring(to+2, length)], _nullDataHandler, _errorHandler );
														if(callback == 'drawThumbs'){
															drawThumbs(albumId, photoID, resource.substring(to+2, length));
														}
														else if (callback == 'drawThumb'){
															drawThumb(albumId, photoID, resource.substring(to+2, length));
														}	
													}
												);
										},
										error:
											function(resource) {
												$.ajax({
													async: true,
													url: getConfig().siteUrl + "/rest/data/" + photoID + '?size=thumb&encoding=base64_2',
													beforeSend: function(xhr) {
													xhr.setRequestHeader("X-Gallery-Request-Key", config.token);
													},
													success: 
														function(resource) {
															//if resource = ""
															to = resource.indexOf('||');
															photoId = resource.substring(0, to);
															length = resource.length;
															////console.log("Ajax: " + photoId);
															//store thumb
															////console.log('base64 resource loaded: ' + resource.substring(to+2, length));
															//alert(resource);
															
															//alert(albumId+photoId+resource.substring(to+2, length));
															getConfig().db.transaction(
																function (transaction) {
																	//transaction.executeSql("DELETE FROM ImageData where id = ?", [photoId]);
																	//transaction.executeSql("INSERT INTO ImageData (id, size, base64) VALUES (?, ?, ?)", [photoId, '1', resource.substring(to+2, length)], _nullDataHandler, _errorHandler );
																	if(callback == 'drawThumbs'){
																		drawThumbs(albumId, photoID, resource.substring(to+2, length));
																	}
																	else if (callback == 'drawThumb'){
																		drawThumb(albumId, photoID, resource.substring(to+2, length));
																	}
																}
															);
													},
													dataType: 'base64'
												});
											}
										,
										dataType: 'base64'
								});
							}
						}
					);	
				}
			);
	}
	
	function drawThumbs(albumId, photoId, resource){
		var $thumbscontainer = $('#aldi' + albumId);
		var counter = 0;
		var html = '';
		var countImages = '';
		var $ul = $('#aldi' + albumId).find('ul');
		
		var $loader = $('div#aldi' + albumId).find('.loader');
		
		$('<img id="' + photoId + '" class="' + ''  + '" alt="'+ '' +'" title="'+ 'description' +'"/>').load(function(){
			++counter;
			var $this = $(this);
			/*
			we need to make sure the grid thumbs are no bigger than 75 px
			*/
			resizeGridImage($this);
			var $li = $('<li />',{
				id : photoId,
				className	: 'pic album'
			});
			var $a = $('<a/>',{
				href	:	'aldi' + photoId
			});
			$ul.append($li.append($a.append($this)));
			if(counter == countImages) {
				$loader.hide();
				$thumbscontainer.append($ul.show());
				autoCenterPhotos();
			}
		}).attr('src','data:image/jpeg;base64,' + resource);
		$loader.hide();
		$ul.show();
	}
	
	function drawThumb(albumId, photoId, resource){
		var $loader 	= $('#photo_container').find('.loader');
		$loader.show();
		var $theimage 	= $('#theimage');
		var photo = getConfig().entity;
		$('<img/>').load(function(){
			var $this 	= $(this);
			resize($this);
			$loader.hide();
			var $a=$('<a/>');/*for swipe*/
			$theimage.empty().append($a.append($this));
			$('#description').empty().html(photo.description);
			$('#prev,#next').show();
		}).attr('src','data:image/jpeg;base64,' + resource);
	}
	
	function login(){
		var config = getConfig();	
		
		$.ajax({
			type: 'POST',
			async: false,
			//url: 'http://www.david-steinberger.at/test/rest',
			//url: 'http://localhost/~david/test/index.php/rest',
			//url: 'http://localhost/~David/gallery3/index.php/rest',
			url: config.siteUrl + '/rest',
			/*beforeSend: function(xhr) {
				xhr.setRequestHeader("X-Gallery-Request-Method", "post");
			},*/
			data: {user: config.user, password:config.password},
			success: function(data) {
				//alert(data);
				//"dcab652d8b00b106e81a6f758d65e90b"
				setConfig($.extend(getConfig(),{
					'token':data
				}));
				
				/* 2. step : Load the Albums */
			    getAlbum();
			}//,
			//dataType: 'jsonp'
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
		url = ((id)?config.siteUrl + '/rest/item/' + id:config.siteUrl + '/rest/item/1');
		
		album = g3Ajax(url);	
		
		// if we receive an album --> load members
		if(album){
			if(album.members) {
			$.each(album.members, function(i,url){
				urls += "\"" + url + "\",";
			});
			urls = urls.slice(0, -1) + "]";
			items = g3Ajax(config.siteUrl + "/rest/items?urls=" + urls);

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
			
			//sort the array before we store it
			//nItems.sort();
			/*
			nItems.sort(function(a, b){
				return a.val - b.val;
			});
			*/
			
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
				'entity': 'undefined'
			}));
			return getConfig();
		}
		}
		else {
			setConfig($.extend(getConfig(),{
				'currentId': id,
				'entity': 'undefined'
			}));
			return getConfig();
		}
		return getConfig();
	}
	
	function _nullDataHandler(){
		//console.log("Seems that SQL statement succeeded");
	}
	
	function _errorHandler(transaction, error)
	{
		if (error.code==1){
			//DB Table already exists
		} else {
			// Error is a human-readable string.
			//console.log('Oops.  Error was '+error.message+' (Code '+error.code+')');
		}
	
		return false;
	}
	
	function getConfig() {
		return config;
	}
})(jQuery); 