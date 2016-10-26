<?php
header("Access-Control-Allow-Origin: *");
include('db.php');		
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$title       = $request->title;
$description = $request ->description;
$user = $request->user;
$image = $request->image;
$date = $request->date;

$title1=mysql_real_escape_string(htmlspecialchars(trim($title)));
$description1=mysql_real_escape_string(htmlspecialchars(trim($description)));
if($image){
	 $sql1    = "insert into `news` (`title`,`date_time`,`description`,`user`,`image`) values('$title1','$date','$description1','$user','$image')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}else{
	 $sql1    = "insert into `news` (`id`,`title`,`date_time`,`description`,`user`) values('','$title1','$date','$description1','$user')";
	  $result1 = mysql_query($sql1);
	 if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}

?>