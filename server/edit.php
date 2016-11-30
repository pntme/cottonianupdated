<?php
header("Access-Control-Allow-Origin: *");
include('db.php');		
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$title       = $request->title;
$description = $request ->description;
$image = $request->image;
$id = $request->id;
$video = $request->video;
$location = $request->location;
$image = $request->image;
$delete = $request->deletePic;
$deleteVideo = $request->deleteVideo;
$sql;
if($image)
     $sql =  "UPDATE `stuffs` SET `title`='$title', `description`='$description', `location` = '$location', `image` = '$image' , `video` = '' WHERE id='$id'";
else if($video)
	 $sql =  "UPDATE `stuffs` SET `title`='$title', `description`='$description', `location` = '$location', `image` = '' , `video` = '$video' WHERE id='$id'";
else
    $sql = "UPDATE `stuffs` SET `title`='$title', `description`='$description', `location` = '$location', `image` = '' , `video` = '' WHERE id='$id'";
// else if($delete == 0)
//      $sql =  "UPDATE `stuffs` SET `title`='$title', `description`='$description', `location` = '$location', `video` = '' WHERE id='$id'";
// else if
//      $sql =  "UPDATE `stuffs` SET `title`='$title', `description`='$description', `location` = '$location', `image` = '', `video` = '' WHERE id='$id'";



$result1 = mysql_query($sql);
if($result1){
	echo 1;
}else{
	echo 0;
}





// $id = $_GET['id'];
// $title      = $request->title;
// $desc = $request->description;
// $sql1    = "UPDATE `stuffs` SET `title`='$title', `description`='$desc' WHERE id='$id'";
// $result1 = mysql_query($sql1);
// if($result1){
//  echo 1;
// }else{
// 	echo 0;
// }
?>