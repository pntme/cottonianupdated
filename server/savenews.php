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
$fullname = $request->fullname;
$video = $request->video;
$location = $request->location;

if($image){
	 $sql1    = "insert into `stuffs` (`title`,`date_time`,`description`,`user`,`image`, `type`, `fullname`, `location`) values('$title','$date','$description','$user','$image', 'News', '$fullname', '$location')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}else if($video){
	 $sql1    = "insert into `stuffs` (`title`,`date_time`,`description`,`user`,`video`, `type`, `fullname` , `location`) values('$title','$date','$description','$user','$video', 'News', '$fullname', '$location')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}else{
	 $sql1    = "insert into `stuffs` (`id`,`title`,`date_time`,`description`,`user`, `type`, `fullname`, `location`) values('','$title','$date','$description','$user', 'News', '$fullname','$location')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 1;
	  }else{
	  	echo 0;
	  }
}
?>