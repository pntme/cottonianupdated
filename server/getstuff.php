<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
$id=$_GET['id'];
$query=mysql_query("select * from stuffs where id = '$id'");
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