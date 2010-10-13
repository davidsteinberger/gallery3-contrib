(function( $ ){
	var igallery3 = '';
	var config = '';

	function thumbClickHandler(id){
		var tmp = id
		id = tmp.substring(4, tmp.length);
		
		if($('#aldi' + id).length == 0 && $('#phdi' + id).length == 0 ){

			igallery3.a_generateThumbsHTML(id);
			
			$('div.albums').undelegate('li','click tap');			
			$('div.albums').delegate('li','click',function(e){
				var $this 	= $(this);
				var tmp = $this.attr('id');
				thumbClickHandler('aldi' + tmp);
			});
		} else {
			$('#albums_container').hide()
			
			if( $('#aldi' + id).length != 0) {
				jQT.goTo('#aldi' + id, 'cube');
			} else {
				jQT.goTo('#phdi' + id, 'cube');
			}
		}		
	}
	
	function saveSettings() {
		localStorage.url = $('#url').val();
		localStorage.user = $('#user').val();
		localStorage.password = $('#password').val();
		
		jQT.goTo('#albums_container', 'cube');
		
		igallery3.init({
			'siteUrl': localStorage.url,
			'user': localStorage.user,
			'password': localStorage.password
		});
		
		registerHandlers();

		return true;
	}
	
	$(document).ready(function(){
		igallery3 = $(this).gallery3;
		$('#enterSettings form').submit(saveSettings);
/*
igallery3.init({
	'siteUrl': 'http://localhost/~david/gallery3/index.php/rest',
	'user': 'admin',
	'password': 'gallery3'
});
registerHandlers();
*/
//http://localhost/~david/gallery3/index.php/rest

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
				igallery3.getPhoto();
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
})( jQuery );