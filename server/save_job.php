<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$title = $_GET['title']; 
$description = $_GET['description'];
$user = $_GET['user'];
$image = $_GET['image'];
date_default_timezone_set("Asia/Kolkata");
$dat1e=date("Y-m-d H:i:s");
$q=mysql_query("insert into `jobs` (`id`,`title`,`description`,`user`,`date_time`,`image`) values('','$title','$description','$user','$dat1e','$image')");
if($q)
{
echo "success";
}
else
{
echo "failed";
} 
 
?>