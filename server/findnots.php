<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$email = $_GET['email']; 
$query=mysql_query("select unseen from stuffs WHERE user = '$email'");
$data= array();
$total = 0;
$abc=0;
while($result=mysql_fetch_array($query))
{
$abc=$abc+$result['unseen'];
/*$data[]=$result['unseen'];*/
$total++;
}
if($total > 0)
  echo $abc;
else
   echo 0;

?>