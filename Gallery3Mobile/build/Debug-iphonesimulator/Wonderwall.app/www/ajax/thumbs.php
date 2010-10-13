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
	
	//alert("Connect to $SITE_URL");
	$auth = Gallery3::login($SITE_URL, $USER, $PASSWORD);
	$photos = Gallery3::factory("$SITE_URL/item/1?name=" .$_GET['album'], $auth)
	->load();
	//alert("Found: {$photos->data->members[0]}");
	foreach($photos->data->members as $member) {
		$album = Gallery3::factory($member, $auth);
		//exit;
		$imagesArr[] = array(
							 'src' => $album->data->entity->thumb_url,
							 'alt' => $album->data->entity->name,
							 'desc' => $album->data->entity->description
							 );
	}
	
	$json 		= $imagesArr; 
	$encoded 	= json_encode($json);
	echo $encoded;
	unset($encoded);
	/*
	$album 		= $_GET['album'];
	$imagesArr	= array();
	$i			= 0;
	/* read the descriptions xml file */
	/*if(file_exists('../thumbs/'.$album.'/desc.xml')){
		$xml = simplexml_load_file('../thumbs/'.$album.'/desc.xml');
	}
	if(file_exists('../thumbs/'.$album)){
		$files = array_slice(scandir('../thumbs/'.$album), 2);
		if(count($files)){
			foreach($files as $file){
				if($file != '.' && $file != '..' &&  $file!='desc.xml'){					
					if($xml){
						$desc = $xml->xpath('image[name="'.$file.'"]/text');
						$description = $desc[0];
						if($description=='')
							$description = '';
					}	
					$imagesArr[] = array('src' 	=> 'thumbs/'.$album.'/'.$file,
										 'alt'	=> 'images/'.$album.'/'.$file,
										 'desc'	=> $description);	
				}
			}
		}
	}
	$json 		= $imagesArr; 
	$encoded 	= json_encode($json);
	echo $encoded;
	unset($encoded);*/
?>