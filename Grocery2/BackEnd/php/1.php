<?php
$file = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2/Data/grocery.json';
$user_array = array();
$jdata = file_get_contents($file);
$jsonData = json_decode($jdata,true);
$items = "items";
$x = "id";
$data = "data";
$t = "type";
//get the data from the front end and convert it over
//sendData = [{'type':type, 'id': listIndex, 'data': data }];
$dataTotal = json_decode(file_get_contents( "php://input" ), true);
$type = $dataTotal[0][$t];
$id = $dataTotal[0][$x];
$info = $dataTotal[0][$data];
print_r($id);
//echo $type;
echo "----------------------------------------------------------------";
//echo $id; 
echo'++++++++++++++++++++++++++++++++++++++';
if($type=='update'){
	$jsonData[$id][$items]=$dataTotal[0][$data];
}elseif($type=='new'){
echo"this is good";
	$jsonData[] = array("title"=>$info,"items"=>[]);
}
 $newJsonString = json_encode($jsonData);
 file_put_contents($file, $newJsonString);

?>