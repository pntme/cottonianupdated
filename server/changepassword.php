<?php
header("Access-Control-Allow-Origin: *");
include('db.php');		
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$reg_id      = $request->reg_id;
$password = $request->password;
$sql1    = "UPDATE `phonegap_login` SET `password`='$password' WHERE reg_id='$reg_id'";
$result1 = mysql_query($sql1);
if($result1){
 echo 1;
}else{
	echo 0;
}
?>