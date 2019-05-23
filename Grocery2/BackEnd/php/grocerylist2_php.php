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
	//print_r($dataTotal[$id]);
	foreach($jsonGroceryList as $key=>$value){
		if($jsonGroceryList[$key][$lid] == $id){
			$masterIndex = $key;
		}
	}
	echo"\n"."----------------"."\n";
	print_r($jsonGroceryList[$masterIndex]["items"][$info["listItemId"]]);
	echo"\n";
	if($type=='update'){
		echo "\n"."UPDATEITEM"."\n";
		$jsonGroceryList[$masterIndex]["items"][$info["listItemId"]] = $info;
		print_r($jsonGroceryList[$masterIndex]["items"][$info["listItemId"]]);
	}elseif($type=='newObject'){
		echo "\n"."NEWITEM"."\n";
		//print_r($jsonGroceryList[$masterIndex][$items]);
		array_push($jsonGroceryList[$masterIndex][$items],$info);
	}elseif($type=='new'){
		echo "\n"."NEWLIST"."\n";
		$jsonGroceryList[] = array("userId"=>$userId, "listId"=>$id, "title"=>$info,"items"=>[]);
	}elseif($type=='delete'){
		echo "\n"."DELETELIST"."\n";
		array_splice($jsonGroceryList,$masterIndex,1);
	}elseif($type=='deleteItem'){
		echo "\n"."DELETEITEM"."\n";
		print_r($jsonGroceryList[$masterIndex][$items]);
		echo"\n";
		echo "------------"."\n";
		foreach($jsonGroceryList[$masterIndex][$items] as $key=>$value){
			if($value['product']==$info){
				array_splice($jsonGroceryList[$masterIndex][$items],$key,1);
			}
		}
	}
	echo"\n"."-------------------"."\n";
	//print_r($jsonGroceryList[$masterIndex]);
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