<?php
header("Access-Control-Allow-Origin: *");
include('db.php');		
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$id = $_GET['id'];
$title      = $request->title;
$desc = $request->description;
$sql1    = "UPDATE `stuffs` SET `title`='$title', `description`='$desc' WHERE id='$id'";
$result1 = mysql_query($sql1);
if($result1){
 echo 1;
}else{
	echo 0;
}
?>