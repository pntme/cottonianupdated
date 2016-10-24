<?php
header("Access-Control-Allow-Origin: *"); 
include('db.php');
$m = $_GET["msg"];
$t = $_GET["title"];
$query=mysql_query("select `push_id` from `phonegap_login`");
$data= array();
while($result=mysql_fetch_array($query))
{
$data[]=$result[0];
}

sendPush($data, $t,$m);
function sendPush($data, $title,$message)
{
define( 'API_ACCESS_KEY', 'AIzaSyDpG1nEX1LOzlKF1ne1THZxHI0PnpgtONM');
$registrationIds = $data;
echo $registrationIds;
$msg = array
(
'message' => $message,
'title' => $title,
'vibrate' => 1,
'sound' => 1

// you can also add images, additionalData
);
$fields = array
(
'registration_ids' => $registrationIds,
'data' => $msg
);
$headers = array
(
'Authorization: key=' . API_ACCESS_KEY,
'Content-Type: application/json'
);
$ch = curl_init();
curl_setopt( $ch,CURLOPT_URL, 'https://android.googleapis.com/gcm/send' );
curl_setopt( $ch,CURLOPT_POST, true );
curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
$result = curl_exec($ch);
echo $result;
curl_close( $ch );
}
?>