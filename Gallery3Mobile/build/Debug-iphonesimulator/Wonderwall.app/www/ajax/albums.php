<?php
	
	error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED);
	
	include("Gallery3.php");
	
	$SITE_URL = 'http://localhost/~David/gallery3/index.php/rest';
	$USER     = 'admin';
	$PASSWORD = "gallery3";
	$auth = Gallery3::login($SITE_URL, $USER, $PASSWORD);
	
	if (file_exists("local_config.php")) {
		include("local_config.php");
	}
	
	$auth = Gallery3::login($SITE_URL, $USER, $PASSWORD);
	$root = Gallery3::factory("$SITE_URL/item/1", $auth);
	
	$album = Gallery3::factory($root->url, $auth)
	->set("type", "album")
	->load();
	foreach ($album->data->members as $member) {
		$memberContent = Gallery3_Helper::request('GET', $member, $auth, $params=array(), $file=null);
		echo '<li id="'.$memberContent->entity->name.'" class="arrow"><a href="#thumbs_container">'.$memberContent->entity->name.'</a></li>';
	}
	
/*if(file_exists('../images')){
	$files = array_slice(scandir('../images'), 2);
	if(count($files)){
		natcasesort($files);
		foreach($files as $file){
			if($file != '.' && $file != '..'){
				echo '<li id="'.$file.'" class="arrow"><a href="#thumbs_container">'.$file.'</a></li>';
			}
		}
	}
}*/
?>