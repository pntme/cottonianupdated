<?php
header("Access-Control-Allow-Origin: *");
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$title       = $request->title;
$description = $request ->description;
$user = $request->user;
$image = $request->image;
if($image){
	 $sql1    = "insert into `news` (`id`,`title`,`date_time`,`description`,`user`,`image`) values('','$title','$description','$user','$image')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 0;
	  }else{
	  	echo 1;
	  }
}else{
	 $sql1    = "insert into `news` (`id`,`title`,`date_time`,`description`,`user`) values('','$title','$description','$user')";
	  $result1 = mysql_query($sql1);
	  if($result1){
	  	echo 0;
	  }else{
	  	echo 1;
	  }
}

?>