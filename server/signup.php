<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$postdata    = file_get_contents("php://input");
$request     = json_decode($postdata);
$fullname    = $request->fullname;
$email       = $request->email;
$pass        = $request->password;
$method      = "custom";
$batch       = $request->batch;
$dat1e       = date("d-m-y h:i:s");
$checksql    = "select * from `phonegap_login` where `email`='$email'";
$checkresult = mysql_query($checksql);
if (mysql_num_rows($checkresult) == 0) {
    $sql1    = "insert into `phonegap_login` (`reg_id`,`reg_date`,`fullname`,`email`,`login_method`, `social_id`, `profile_pic`, `password`, `school_batch`) values('','$dat1e','$fullname','$email','$method', '$id', '$picture', '$pass', '$batch')";
    $result1 = mysql_query($sql1);
    if ($result1) {
        $sql2    = "select * from `phonegap_login` where `email`='$email'";
        $result2 = mysql_query($sql2);
        while ($row = mysql_fetch_assoc($result2)) {
            $arrayd[] = $row;
            $total++;
        }
        echo json_encode($arrayd);
        
    } else {
        echo 0;
    }
} else {
    echo 2;
}

?>