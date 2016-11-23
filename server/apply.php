<?php 
header("Access-Control-Allow-Origin: *");
require_once('db.php');
$postdata    = file_get_contents("php://input");
$id= $_GET['id'];
$pid=$_REQUEST['pid'];
$qry="select apply from stuffs where id='$pid'";
$query=mysql_query($qry);
$result=mysql_fetch_assoc($query);
echo $result['apply'];
if($result['apply']=='')
{
$apply ="$id";
$query=mysql_query("update stuffs set apply='$apply', unseen = unseen + 1 where id='$pid'");
$rows= mysql_num_rows($query);
 if($rows >0)
 {
 	echo "failure";
 }else{
 	echo "success";
 }
}else{
$abc=$result['apply'];
$apply ="$abc,$id";
$query=mysql_query("update stuffs set apply='$apply', unseen = unseen + 1 where id='$pid'");
$rows= mysql_num_rows($query);
 if($rows >0)
 {
 	echo "failure 1";
 }else{
 	echo "success 1";
 }
}
?>
