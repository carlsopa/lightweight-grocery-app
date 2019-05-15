<?php
header( "Content-type: application/json" );
$listFile = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2-test/Data/groceryLists.json';
$listData = file_get_contents($listFile);
$jsonGroceryList = json_decode($listData,true);

$userFile = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2-test/Data/groceryUsers.json';
$userData = file_get_contents($userFile);
$jsonUserList = json_decode($userData,true);
$items = "items";
$lid= 'listId';
$x = "id";
$data = "data";
$t = "type";
$ix = 'index';
$name = 'name';
$ui = 'userId';
//get the data from the front end and convert it over
$dataTotal = json_decode(file_get_contents( "php://input" ), true);

if(count($dataTotal[0]) > 1){
	$type = $dataTotal[0][$t];
	$id = $dataTotal[0][$x];
	$userId = $dataTotal[0][$ui];
	$info = $dataTotal[0][$data];
	$userGroceryList = [];
	//print_r($jsonGroceryList[4]);
	foreach($jsonGroceryList as $key=>$value){
		print_r($jsonGroceryList[$key][$lid]);
		//echo "\n";
		if($jsonGroceryList[$key][$lid] == $id){
		 	//print_r($value);
			$masterIndex = $key;
		}
	}
	//echo $masterIndex."\n";
	if($type=='update'){
		$jsonGroceryList[$masterIndex][$items] = $info;
	}elseif($type=='newObject'){
		array_push($jsonGroceryList[$masterIndex][$items],$info);
	}elseif($type=='new'){
		$jsonGroceryList[] = array("userId"=>$userId, "listId"=>$id, "title"=>$info,"items"=>[]);
	}elseif($type=='delete'){
		array_splice($jsonGroceryList,$masterIndex,1);
	}elseif($type=='deleteItem'){
		echo $masterIndex."\n";
		print_r($info);
		echo "\n";
		array_splice($jsonGroceryList[$masterIndex][$items],$info,1);
	}
	$newJsonString = json_encode($jsonGroceryList);
	file_put_contents($listFile, $newJsonString);

}elseif(count($dataTotal[0]) == 1){
	$userList = [];
	$userId = 'userId';
	
	$file = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2-test/Data/groceryUsers.json';
	$jdata = file_get_contents($file);
	$jsonUserList = json_decode($jdata,true);
	$found = false;
	foreach($jsonUserList as $a){
		if(strtolower($dataTotal[0][$name]) == strtolower($a[$name])){
			array_push($userList,$dataTotal[0][$name]);
			array_push($userList,$a[$x]);
			foreach($jsonGroceryList as $gl){
				if($gl[$userId] == $a[$x]){
					array_push($userList,$gl);
				}
			}
			exit(json_encode($userList));
			$found = true;
		}
	}
	if(!$found){
		$id = random_int(10000,99999);
		$input = ["name"=>$dataTotal[0][$name],"id"=>$id];
		$output  = [];
		array_push($output,$input[$name]);
		array_push($output,$input[$x]);
		array_push($jsonUserList,$input);
		$newJsonString = json_encode($jsonUserList);
		file_put_contents($file, $newJsonString);
		exit(json_encode($output));
	}
	 
}
?>