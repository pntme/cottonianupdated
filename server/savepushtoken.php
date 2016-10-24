<?php
header("Access-Control-Allow-Origin: *"); 
include('db.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$token = $request->token;
$email = $request->email;
$sql = "UPDATE `phonegap_login` SET `push_id`='$token' WHERE email='$email'";
$result = mysql_query($sql);
?>