<?php

	$executionStartTime = microtime(true) / 1000;

	$url= 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['latlng'] . '&key=82b1c05e30244efd82f6f6cf033ba93d';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

	//https://api.opencagedata.com/geocode/v1/json?q=10+10&key=82b1c05e30244efd82f6f6cf033ba93d

?>