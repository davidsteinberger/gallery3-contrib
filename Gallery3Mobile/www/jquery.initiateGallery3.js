(function( $ ){
	var igallery3 = '';
	var config = '';
	var picsDB;

	function thumbClickHandler(id){
		var tmp = id
		id = tmp.substring(4, tmp.length);
		
		if($('#aldi' + id).length == 0 && $('#phdi' + id).length == 0 ){

			igallery3.generatePage(id);
			//alert("1");
			$('div.albums').undelegate('li.album','click tap');			
			$('div.albums').delegate('li.album','click',function(e){
				var $this 	= $(this);
				var tmp = $this.attr('id');
				thumbClickHandler('aldi' + tmp);
			});
			$('div.albums').delegate('li.photo','click',function(e){
				//alert(this.id);
				$('#albums_container').hide();
				$('#photo_container div#theimage').html("");
				jQT.goTo('#photo_container', 'cube');
				
				igallery3.getPhoto(this.id);
			});
		} else {
			$('#albums_container').hide()
			//alert("2");
			if( $('#aldi' + id).length != 0) {
				jQT.goTo('#aldi' + id, 'cube');
			} else {
				jQT.goTo('#phdi' + id, 'cube');
			}
		}		
	}
	
	function saveSettings() {
		//alert("");
		localStorage.url = $('#url').val();
		localStorage.user = $('#user').val();
		localStorage.password = $('#password').val();
		
		jQT.goTo('#albums_container', 'cube');
		
		igallery3.init({
			'siteUrl': localStorage.url,
			'user': localStorage.user,
			'password': localStorage.password
		});
		
		//registerHandlers();

		return true;
	}
	
	$(document).ready(function(){
		$("#submit1").click(function(){saveSettings();});
		igallery3 = $(this).gallery3;
		igallery3.init({
			'siteUrl': 'http://localhost/~David/gallery3',
			//'siteUrl': 'http://localhost/~David/test',
			//'siteUrl': 'http://david-steinberger.at/test',
			//'siteUrl': 'http://david-steinberger.at/gallery3/index.php',
			'user': 'admin',
			'password': 'gallery3'
		});
		$("#submit2").click(function(){igallery3.resetDB(); $("div.albums").remove();jQT.goTo('#albums_container', 'cube');});
		//igallery3.resetDB();
		registerHandlers();
	})
	function registerHandlers() {
		/*
		clicking on an album:
		we keep track of which album is currently selected by
		getting the id (album name) of the cliked row
		*/
		//$('#albums_container').undelegate('li','click tap');
		$('#albums_container').delegate('li','click',function(e){
			var $this 	= $(this);
			var tmp = $this.attr('id');
			thumbClickHandler(tmp);
		});
		
		$('#photo_container').bind('pageAnimationEnd', function(e, info){
			if (info.direction == 'in'){
				//igallery3.getPhoto();
			}
			else{
				return;
			}
		});
		
		/* swipe image - navigate right/left */
		$('#theimage').unbind();
		$('#theimage').swipe(function(evt, data) {
			if(data.direction=='left')
				igallery3.navigateNext();
			else
				igallery3.navigatePrevious();
		});
			
		/*
		Events for navigating through the images
		The current gives us our current photo,
		so we need to get the next / previous one
		from the thumbs container - these have
		the source for the large photo in the
		alt attribute
		*/
		$('#next').unbind('click');
		$('#next').bind('click',function(){
			igallery3.navigateNext();
		});
		$('#prev').unbind('click');
		$('#prev').bind('click',function(){
			igallery3.navigatePrevious();
		});
	
		
	}
	
	
// Convenience array of status values
var cacheStatusValues = [];
cacheStatusValues[0] = 'uncached';
cacheStatusValues[1] = 'idle';
cacheStatusValues[2] = 'checking';
cacheStatusValues[3] = 'downloading';
cacheStatusValues[4] = 'updateready';
cacheStatusValues[5] = 'obsolete';

// Listeners for all possible events
var cache = window.applicationCache;
cache.addEventListener('cached', logEvent, false);
cache.addEventListener('checking', logEvent, false);
cache.addEventListener('downloading', logEvent, false);
cache.addEventListener('error', logEvent, false);
cache.addEventListener('noupdate', logEvent, false);
cache.addEventListener('obsolete', logEvent, false);
cache.addEventListener('progress', logEvent, false);
cache.addEventListener('updateready', logEvent, false);

// Log every event to the console
function logEvent(e) {
    var online, status, type, message;
    online = (navigator.onLine) ? 'yes' : 'no';
    status = cacheStatusValues[cache.status];
    type = e.type;
    message = 'online: ' + online;
    message+= ', event: ' + type;
    message+= ', status: ' + status;
    if (type == 'error' && navigator.onLine) {
        message+= ' (prolly a syntax error in manifest)';
    }
    //console.log(message);
}

// Swap in newly downloaded files when update is ready
window.applicationCache.addEventListener(
    'updateready', 
    function(){
        window.applicationCache.swapCache();
        //console.log('swap cache has been called');
    }, 
    false
);

// Check for manifest changes every 10 seconds
// setInterval(function(){cache.update()}, 10000);
})( jQuery );