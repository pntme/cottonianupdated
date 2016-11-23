<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$ids       = $request->ids;
$idsToDelete = implode($ids, ', ');
$sql =  "DELETE from stuffs where id IN ($idsToDelete)";
$query=mysql_query($sql);
if($query)
	echo 1;
else
	echo 0;
?>