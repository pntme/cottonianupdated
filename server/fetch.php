<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
session_start();
$username=$_SESSION['email'];
$query=mysql_query("select * from phonegap_login");
$data= array();
while($result=mysql_fetch_row($query))
{
$data[]=$result;
}
echo json_encode($data);

?>