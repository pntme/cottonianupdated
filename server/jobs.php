<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
session_start();
$username=$_SESSION['email'];
$sql = "select * from stuffs where type = 'Job' order by id desc";
$query=mysql_query($sql);
$data= array();
while($result=mysql_fetch_assoc($query))
{
$data[]=$result;
}
echo json_encode($data);
?>