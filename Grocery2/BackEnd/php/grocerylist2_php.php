<?php
$file = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2/Data/grocery.json';
$user_array = array();
$jdata = file_get_contents($file);
$jsonData = json_decode($jdata,true);
$items = "items";
$x = "id";
$data = "data";
$t = "type";
$ix = 'index';
//get the data from the front end and convert it over
$dataTotal = json_decode(file_get_contents( "php://input" ), true);
$type = $dataTotal[0][$t];
$id = $dataTotal[0][$x];
$info = $dataTotal[0][$data];
echo "----------------------------------------------------------------";
if($type=='update'){
	$jsonData[$id][$items] = $info;
}elseif($type=='newObject'){
	array_push($jsonData[$id][$items],$info);
}elseif($type=='new'){
	$jsonData[] = array("title"=>$info,"items"=>[]);
}elseif($type=='delete'){
	array_splice($jsonData,$info,1);
}elseif($type=='deleteItem'){
	echo array_splice($jsonData[$id][$items],$info,1);
}
 $newJsonString = json_encode($jsonData);
 file_put_contents($file, $newJsonString);

?>