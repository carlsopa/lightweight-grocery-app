<?php
header( "Content-type: application/json" );
$listFile = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2-test/Data/groceryLists.json';
$listData = file_get_contents($listFile);
$jsonGroceryList = json_decode($listData,true);

$userFile = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2-test/Data/groceryUsers.json';
$userData = file_get_contents($userFile);
$jsonUserList = json_decode($userData,true);

$categoryFIle = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2-test/Data/usersCategories.json';
$categoryData = file_get_contents($categoryFIle);
$jsonCategoryList = json_decode($categoryData,true);

$items = "items";
$lid= 'listId';
$x = "id";
$data = "data";
$t = "type";
$ix = 'index';
$name = 'name';
$ui = 'userId';
$categories = 'categories';
//get the data from the front end and convert it over
$dataTotal = json_decode(file_get_contents( "php://input" ), true);

if(count($dataTotal[0]) > 1){
	print_r($dataTotal[0]);
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
		print_r($info);
		echo "\n";
		foreach($jsonGroceryList[$masterIndex]["items"] as $key=>$value){
			print_r($value);
			if($value["listItemId"]==$info["listItemId"])
			{
				print_r($key);
				$jsonGroceryList[$masterIndex]["items"][$key] = $info;
			}
		}

		echo"\n"."#-#-#-#-#-#-#-#-#"."\n";
		print_r($jsonGroceryList[$masterIndex]["items"]);
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
	}elseif($type == 'cart'){
		echo"\n"."Cart"."\n";
		foreach($jsonGroceryList[$masterIndex]["items"] as $key=>$value){
			//print_r($value);
			if($value["listItemId"]==$info["listItemId"])
			{
				echo"\n"."found"."\n";
				print_r($value);
				$jsonGroceryList[$masterIndex]["items"][$key] = $info;
			}
		}
	}
	echo"\n"."-------------------"."\n";
	//print_r($jsonGroceryList[$masterIndex]);
	$newJsonString = json_encode($jsonGroceryList);
	//file_put_contents($listFile, $newJsonString);

}elseif(count($dataTotal[0]) == 1){
	$userList = [];
	$userId = 'userId';
	
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
			foreach($jsonCategoryList as $jcl){
				if($jcl[$x]==$a[$x]){
					array_push($userList,$jcl[$categories]);
				}
			}
			exit(json_encode($userList));
			$found = true;
		}
	}
	exit(json_encode($userList));
	$found = true;
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