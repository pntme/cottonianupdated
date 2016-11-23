<?php 
header("Access-Control-Allow-Origin: *");
require_once('db.php');
$postdata    = file_get_contents("php://input");

$id= $_GET['id'];
$pid=$_REQUEST['pid'];
$qry="select accept from stuffs where id='$pid'";
$query=mysql_query($qry);
$result=mysql_fetch_assoc($query);
echo $result['accept'];
if($result['accept']=='')
{
$accept ="$id";
$query=mysql_query("update stuffs set accept='$accept', unseen = unseen + 1 where id='$pid'");
$rows= mysql_num_rows($query);
 if($rows >0)
 {
 	echo "failure";
 }else{
 	echo "success";
 }
}else{
$abc=$result['accept'];
$accept ="$abc,$id";
$query=mysql_query("update stuffs set accept='$accept', unseen = unseen + 1 where id='$pid'");
$rows= mysql_num_rows($query);
 if($rows >0)
 {
 	echo "failure 1";
 }else{
 	echo "success 1";
 }
}



?>
