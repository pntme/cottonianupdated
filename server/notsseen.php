<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$email = $_GET['email']; 
$sql = "update stuffs set unseen=0 where user='$email'";
echo $sql;
$query=mysql_query($sql);
if($query)
  echo 1;
else
   echo 2;
?>