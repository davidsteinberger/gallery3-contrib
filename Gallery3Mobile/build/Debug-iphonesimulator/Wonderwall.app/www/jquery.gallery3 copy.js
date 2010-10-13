(function($) {
$.fn.gallery3 = function(settings) {
	var config = {
		'siteUrl': 'http://localhost/~david/gallery3/index.php/rest',
		'user': 'admin',
		'password': 'gallery3',
		'token': ''
	};
	
	var items;
 
	if (settings) $.extend(config, settings);

	this.login = function() {
		$.ajax({
			  type: 'POST',
			  async: false,
			  url: "http://localhost/~david/gallery3/index.php/rest",
			  data: {user: "admin", password:"gallery3"},
			  success: function(data) {
			  	config.token = data;
			  	//alert(config.token);
			  },
			  dataType: 'json'
		});
	};
	
	this.getRoot = function() {
		return config.siteUrl + "/item/1";
	};
	
	this.g3Ajax = function(url, data) {
		var returnVal = "";
		//alert(config.token);
		$.ajax({
		  async: false,
		  url: url,
		  beforeSend: function(xhr) {
			xhr.setRequestHeader("X-Gallery-Request-Key", config.token);
		  },
		  data: data,
		  success: function(resource) {
		  	returnVal = resource;
		  },
		  dataType: 'json'
		});
		return returnVal;
	};
	
	this.getItem = function(id){
		var entity = '';
		entity = this.g3Ajax(config.siteUrl + "/item/" + id);
		return entity.url;
	};
	
	this.getEntity = function(id){
		var entity = '';
		entity = this.g3Ajax(config.siteUrl + "/item/" + id);
		return entity.entity;
	};
	
	this.searchItem = function(item, type) {
		if (type)
			var itemUrl = this.g3Ajax(config.siteUrl + "/item/1?scope=all&type=" + type + "&name=" + item).members[0];
		else
			var itemUrl = this.g3Ajax(config.siteUrl + "/item/1?scope=all&name=" + item).members[0];
		//alert(itemUrl);
		return itemUrl;
	};
	
	this.getThumbs = function(url) {
		var urls = "[";
		
		var album = this.g3Ajax(url);

		$.each(album.members, function(i,url){
			urls += "\"" + url + "\",";
		});
		urls = urls.slice(0, -1) + "]";

		items = this.g3Ajax(config.siteUrl + "/items?urls=" + urls);			
		
		return this;
	};	

	this.getFormattedThumbs = function() {
		var returnVal = "";
		$.each(items, function(i,item){
			returnVal += "<li id=\"" + item.entity.id + "\" class=\"arrow\"><a href=\"#thumbs_container\">" + item.entity.name + "</a></li>";
		});
		return returnVal;
	};
	
	this.getThumbArray = function() {
		var tArray = new Array();
		$.each(items, function(i,item){
			tArray[i] = new Array();
			tArray[i]['id'] = item.entity.id;
			tArray[i]['type'] = item.entity.type;
			tArray[i]['src'] = item.entity.thumb_url;
			tArray[i]['alt'] = item.entity.name;
			tArray[i]['desc'] = item.entity.description;
		});
		//alert("");
		return tArray;
	};
	return this;
};	
})(jQuery);
