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
$video = $request->video;
$fullname = $request->fullname;
if($image){
	 $sql1    = "insert into `stuffs` (`title`,`date_time`,`description`,`user`,`image`, `type`, `fullname`) values('$title','$date','$description','$user','$image', 'Event', '$fullname')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}else if($video){
	 $sql1    = "insert into `stuffs` (`title`,`date_time`,`description`,`user`,`video`, `type`, `fullname`) values('$title','$date','$description','$user','$video', 'Event', '$fullname')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}else{
	 $sql1    = "insert into `stuffs` (`title`,`date_time`,`description`,`user`, `type`, `fullname`) values('".$title."','$date','$description','$user', 'Event', '$fullname')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}
?>