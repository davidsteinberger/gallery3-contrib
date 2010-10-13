$(function(){
    /* name of the selected album */
    var album 				= 1;
    var level				= 0;
    var data;
    /* index of li where there is the selected image */
    var current				= -1;
    
    /* 1 step : Load the Albums */
    loadAlbums();
	//loadThumbs();
	
    function loadAlbums(){
        var gallery3 = $('#albums').gallery3;
        gallery3.config();
    	gallery3.login();
    	gallery3.getItems();
    }

    /*
    clicking on an album:
    we keep track of which album is currently selected by
    getting the id (album name) of the cliked row
    */
    $('#albums_container').delegate('li','click tap',function(e){
        //alert("");
        var $this 	= $(this);
        album 		= $this.attr('id');
        generateHTML();
        loadThumbs(album, '');
    });
    
    $('#upButton').click(function () {
    	//generatePage();
    });
    
    $(".albums").delegate('li','click tap',function(){
		alert("");
		generateHTML();
		loadThumbs(album, '');
	});
	
	//var i = 1;
	function generateHTML() {
		album = $(this).id;
		//alert("");
		id = 'album' + album;
		var html = '\
<div id="' + id + '" class="albums">\
            <div class="toolbar">\
                <h1>Thumbs</h1>\
                <a class="back" href="#albums_container">Albums</a>\
<!--                <a class="button slideup" id="infoButton" href="#about">About</a> -->\
                <a class="button" id="upButton" href="#" >Up</a>\
            </div>\
            <div class="loader" style="display:none;"></div>\
            <ul id="thumbs" class="thumbView" style="display:none;">\
            </ul>\
		';
		$('body').append(html);
		$('#' + id).delegate('li','click tap',function(){generateHTML();});
		jQT.goTo('#' + id);
		//i++;
	};

    /*
    gets the photos information with an AJAX request to the PHP side
    then creates and loads each one of the images,
    and appends it to the DOM
    after that, we need to center the grid of the images
    based on how many fit per row
    */
    function loadThumbs(albumId, level){
    	//album 		= $this.attr('id');
    	generatePage();
        var gallery3 = $('#thumbs_container').gallery3;
        gallery3.config();
    	gallery3.login();
    	gallery3.getThumbs(albumId, level);
    }
    
    function generatePage() {
    	var html = '\
    	<div id="' + album + '" class="albums">\
            <div class="toolbar">\
                <h1>Thumbs</h1>\
                <a class="back" href="#albums_container">Albums</a>\
                <a class="button slideup" id="infoButton" href="#about">About</a>\
            </div>\
            <div class="loader" style="display:none;"></div>\
            <ul id="thumbs" class="thumbView" style="display:none;">\
            </ul>\
        </div>\
        ';
        //alert('');
        $('body').append(html);
        //alert();
        $('#' + album).find('ul').append($('#thumbs_container').find('ul').html());
    }
    
    /*
    $(window).bind( 'hashchange', function() {
    	//alert("hash changed");
    	if ( window.location.hash.replace(/^.*#/, '') == 'thumbs_container') {
    		$('#thumbs_container').find('ul').html('').end().hide();
    	    		var $loader 	= $('#thumbs_container').find('.loader');
    	    		$loader.show();
    		loadThumbs(album, '');
    	} 
    	if ( window.location.hash.replace(/^.*#/, '') == '') {
    		generatePage();
    	}
    	else {
    		$('#thumbs_container').hide();
    	}
    });
	*/
    /*
    when clicking on an image we keep track of the index
    of the image, which is in the alt attribute of the thumb
    */
    $('.albums').delegate('li','click tap',function(){
        current	= this.id;
		if(!$(this).children().children().hasClass('photo')) {
			album = this.id;
			//loadThumbs(album, ++level);
		}
    });
				
    /*
    load the large image when the panel photo_container slides in;
    empty the contents of the image element when it slides out
    */
    $('#photo_container').bind('pageAnimationEnd', function(e, info){
        if (info.direction == 'in'){
            var $thumb 		= $('#thumbs_container li:nth-child('+parseInt(current+1)+')').find('img').attr("id");
            if(!$thumb.length) return;            
			            loadPhoto($thumb);
        }
        else{
            $('#theimage').empty();
            $('#description').empty();
            $('#prev,#next').hide();
        }
    });

    /* loads a large photo */
    function loadPhoto(id){
 		var $loader 	= $('#photo_container').find('.loader');
        $loader.show();
        var $theimage 	= $('#theimage');
        
        var gallery3 = $(this).gallery3();
    	gallery3.login();
    	data = gallery3.getEntity(id);
        //alert("");
        
        $('<img/>').load(function(){
            var $this 	= $(this);
            resize($this);
            $loader.hide();
            var $a=$('<a/>');/*for swipe*/
            $theimage.empty().append($a.append($this));
            $('#description').empty().html(data.description);
            $('#prev,#next').show();
        }).attr('src',data.resize_url);
    }

    /* swipe image - navigate right/left */
    $('#theimage').swipe(function(evt, data) {
        if(data.direction=='left')
            navigateNext();
        else
            navigatePrevious();
    });
	
    /*
    Events for navigating through the images
    The current gives us our current photo,
    so we need to get the next / previous one
    from the thumbs container - these have
    the source for the large photo in the
    alt attribute
    */
    $('#next').bind('click tap',function(){
        navigateNext();
    });
    $('#prev').bind('click tap',function(){
        navigatePrevious();
    });
	
    /* goes to next image */
    function navigateNext(){
        ++current;
        var $thumb = $('#thumbs_container li:nth-child('+parseInt(current+1)+')').find('img').attr("id");
        if(!$thumb.length) {
            --current;
            return;
        }
        loadPhoto($thumb);
    }
	
    /* goes to previous image */
    function navigatePrevious(){
        --current;
        var $thumb = $('#thumbs_container li:nth-child('+parseInt(current+1)+')').find('img').attr("id");
        if(!$thumb.length) {
            ++current;
            return;
        }
        loadPhoto($thumb);
    }

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

    /*
    when we resize the window, the image needs to be resized,
    and also the grid should be centered
    */
    $(window).bind('resize', function() {
        autoCenterPhotos()
        if($('#theimage').find('img').length)
            resize($('#theimage').find('img'));
    });

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
    Orientation callback event
    When we flip the device we need the image to be resized,
    and also the grid should be centered
    */
    $('body').bind('turn', function(e, data){
        autoCenterPhotos()
        if($('#theimage').find('img').length){
            resize($('#theimage').find('img'));
        }
    });
});