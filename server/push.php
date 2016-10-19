<?php
$to="fyZCbA7hgvA:APA91bGwHwwGrJZsBRy3_iJA7IwuDTfUXIcolmDE885y1i4SOsX81lsaOv45t6lJ8F921DNAg_6uglATE8PICQg2UyFHqq0J3t3_u79dlsrWhy0VgAJvvzvHf85EWDsqVjdvfeSXMENi";
$title="Push Notification Title";
$message="Push Notification Message";
sendPush($to,$title,$message);
echo "clear one";
function sendPush($to,$title,$message)
{
// API access key from Google API's Console
// replace API
	echo "clear two";
define( 'API_ACCESS_KEY', 'AIzaSyDpG1nEX1LOzlKF1ne1THZxHI0PnpgtONM');
$registrationIds = array($to);
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
curl_close( $ch );
echo $result;
}
?>