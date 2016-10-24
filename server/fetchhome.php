<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
session_start();
$username=$_SESSION['email'];
$query=mysql_query("select * from news order by id desc");
$data= array();
while($result=mysql_fetch_assoc($query))
{
$data[]=$result;
}
echo json_encode($data);
?>