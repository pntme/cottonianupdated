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
if($image){
	 $sql1    = "insert into `news` (`title`,`date_time`,`description`,`user`,`image`) values('$title','$date','$description','$user','$image')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	header("location:push.php?msg=$description&title=New news posted");
	  }else{
	  	echo 0;
	  }
}else{
	 $sql1    = "insert into `news` (`id`,`title`,`date_time`,`description`,`user`) values('','$title','$date','$description','$user')";
	  $result1 = mysql_query($sql1);
	 if($result1){
	  	header("location:push.php?msg=$description&title=New news posted");
	  }else{
	  	echo 0;
	  }
}

?>