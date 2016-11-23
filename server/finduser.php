<?php 
header("Access-Control-Allow-Origin: *");
include('db.php');
$name=$_GET['name'];
$query=mysql_query("select * from phonegap_login where fullname = '$name'");
$data= array();
$total = 0;
while($result=mysql_fetch_assoc($query))
{
$data[]=$result;
$total++;
}
echo $result;
if($total > 0)
  echo json_encode($data);
else
   echo 2;

?>