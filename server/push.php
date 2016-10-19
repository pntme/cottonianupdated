<?php
error_reporting(E_ALL);
$msg = "Hello";
$user ="hiii";

$device_token="dXXSbhv1QPY:APA91bEFzJCV75kKdIyByY9PHqS5e8nnwOcuh8dSByOsECtzubWimceN9bni6kVPn9ZO3Pviu7riDJV7t_rwbU8nimvwjggVfhHBC6GcxdX84RLRU_lfSqx-NTTIdMwWRgzEX18jegtX";


$url = 'https://push.ionic.io/api/v1/push';

$data = array(
                  'tokens' => array($device_token), 
                  'notification' => array('alert' => ''.$user.': '.$msg),      
                  );


      
$content = json_encode($data);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_setopt($ch, CURLOPT_USERPWD, "Private Api key" . ":" );  
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
'Content-Type: application/json',
'X-Ionic-Application-Id: App-ID' 
));
$result = curl_exec($ch);
curl_close($ch);

?>