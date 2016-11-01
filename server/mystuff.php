<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
$type  = $_GET['type'];
$user  = $_GET['user'];
$sql = "select * from stuffs where type = '$type' AND user = '$user' order by id desc";
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