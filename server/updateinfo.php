<?php
header("Access-Control-Allow-Origin: *");
include('db.php');		
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$reg_id      = $request->reg_id;
$bno = $request ->bno;
$sql1    = "UPDATE `phonegap_login` SET `school_batch`='$bno' WHERE reg_id='$reg_id'";
$result1 = mysql_query($sql1);
if($result1){
	$sql2    = "SELECT * FROM `phonegap_login` WHERE `reg_id` = '$reg_id'";
    $result2 = mysql_query($sql2);
    if($result2){
    	    while ($row = mysql_fetch_assoc($result2)) {
    	        $arrayd[] = $row;
    	        $total++;
    	    }
          echo json_encode($arrayd);
      } else {
      	echo 0;
      }
}else{
	echo 0;
}
?>