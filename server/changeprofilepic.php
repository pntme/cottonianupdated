<?php
header("Access-Control-Allow-Origin: *");
include('db.php');		
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$id       = $request->id;
$image = $request->image;
$sql1    = "UPDATE `phonegap_login` SET `profile_pic`='$image', `pic_updtaed` = '1' WHERE reg_id='$id'";
$result1 = mysql_query($sql1);
if($result1)
  echo 1;
else
  echo 0;

?>