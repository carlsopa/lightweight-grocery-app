<?php
$file = $_SERVER['DOCUMENT_ROOT'].'/Grocery/Grocery2/Data/grocery.json';
$user_array = array();
$jsondata = file_get_contents($file);
$data = json_decode($jsondata,true);

echo($data[0][items][1][product]);
foreach($data[0][items] as $key => $value){
  echo($key);
}
// $title = $_POST['title'];
// $index = $_POST['index'];
// $item = $_POST['product'];
// $itemQty = $_POST['quantity'];

// $items = "items";
// $product = "product";
// $quantity = "quantity";

// echo($data[$title][$items][$index][$quantity]);
// $data[$title][$items][$index][$product] = $item;
// $data[$title][$items][$index][$quantity] = $itemQty;

// $newJsonString = json_encode($data);
// file_put_contents($file, $newJsonString);

?>