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
// $title1=mysql_real_escape_string(htmlspecialchars(trim($title)));
// $description1=mysql_real_escape_string(htmlspecialchars(trim($description)));
if($image){
	 $sql1    = "insert into `stuffs` (`title`,`date_time`,`description`,`user`,`image`, `type`) values('$title','$date','$description','$user','$image', 'job')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}else{
	 $sql1    = "insert into `stuffs` (`id`,`title`,`date_time`,`description`,`user`, `type`) values('','$title','$date','$description','$user',  'job')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}
?>