<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$email = $_GET['email']; 
$sql = "select unseen, accept, apply, title from stuffs WHERE user  = '$email'";
$query=mysql_query($sql);
$data= array();
$total = 0;
while($result=mysql_fetch_assoc($query))
{
$data[]=$result;
$total++;
}
if($total > 0)
  echo json_encode($data);
else
   echo 2;
?>