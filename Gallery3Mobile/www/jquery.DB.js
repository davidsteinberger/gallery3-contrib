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
	
	$.fn.DB = {
		config : function(args){
			setConfig($.extend({
				'db' : ''
			}, args));
	
			return (getConfig());
		},
		createDB : _createDB,
		emptyDB : _emptyDB,
		
		insertImage : function(){
			var config = getConfig();
			
			return (global.selected);
		},
		selectImage : _selectImage
	};
	
	function _createDB(){
		try {
			if (!window.openDatabase) {
				console.log('Databases are not supported in this browser');
			} else {
				var shortName = 'Gallery3';
				var version = '1.0';
				var displayName = 'gallery3\'s database';
				var maxSize = 50000000; // in bytes
				picsDB = openDatabase(shortName, version, displayName, maxSize);
				console.log("Database is setup: "+picsDB);
				
				picsDB.transaction(
					function (transaction) {
						transaction.executeSql('CREATE TABLE IF NOT EXISTS ImageData(id INTEGER NOT NULL PRIMARY KEY, base64 TEXT NOT NULL);', [], _nullDataHandler, _errorHandler);
						transaction.executeSql('CREATE TABLE "AjaxData" ("Url" TEXT PRIMARY KEY  NOT NULL , "Response" TEXT);', [], _nullDataHandler, _errorHandler);
					}
				);	
				/*
				picsDB.transaction(
					function (transaction) {
						transaction.executeSql("Delete From ImageData;", [], _nullDataHandler, _errorHandler);
					}
				);
				
				picsDB.transaction(
					function (transaction) {
						transaction.executeSql("Delete From AjaxData;", [], _nullDataHandler, _errorHandler);
					}
				);
				*/
				return picsDB;
			}
		} catch(e) {
			// Error handling code goes here.
			if (e == 2) {
				// Version number mismatch.
				console.log("Invalid database version.");
			} else {
				console.log("Unknown error "+e+".");
			}
			return;
		}
		
		//setConfig({'db' : picsDB});

		
	}
	
	// doesn't work as of now!
	function _emptyDB(){
		getConfig().db.transaction(
			function (transaction) {
				transaction.executeSql("Delete From ImageData;", [], _nullDataHandler, _errorHandler);
			}
		);
	}
	
	function _nullDataHandler(){
		console.log("Seems that SQL statement succeeded");
	}
	
	function _errorHandler(transaction, error)
	{
		if (error.code==1){
			//DB Table already exists
		} else {
			// Error is a human-readable string.
			console.log('Oops.  Error was '+error.message+' (Code '+error.code+')');
		}
	
		return false;
	}
	
	function _selectImage(photoID){
		getConfig().db.transaction(
			function (transaction) {
				transaction.executeSql("Select * from ImageData where id = ?;", [photoID], 
					function(transaction, results){
						if (results.rows.length > 0){
							console.log("Photodata had Results: "+results.rows.length);
							for (var n=0; n<results.rows.length; n++) {
								var row = results.rows.item(n);							
								var newImage = new Object();
								newImage.picid = row['id'];
								newImage.encodedtext = row['base64'];
								console.log("DB: " + newImage.picid);
								return newImage.encodedtext;
							}
						} else {
							return false;
						}
					}
				)
			}
		)
	}

    function setConfig(value)
     {
      config = value;
     }
  
    function getConfig()
     {
      return config;
     }
})(jQuery); 