<?php
header("Access-Control-Allow-Origin: *"); 
include('db.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$pass = $request->password;
$method = $request->type;
$id = $request->id;
$picture = $request->picture;
$fullname = $request->fullname;
if($method == 'custom'){
  $sql="select * from `phonegap_login` where `email`='$email' and `password`='$pass'";    
    $result = mysql_query($sql);
    if (mysql_num_rows($result) == 0) {
       echo 0;
    }else{
      while ($row = mysql_fetch_assoc($result)) {
        $arrayd[] = $row;
        $total++;
    }
      echo json_encode($arrayd);
    }
}
else{
   $sql="select * from `phonegap_login` where `email`='$email'";
   $result = mysql_query($sql);
   if (mysql_num_rows($result) == 0) {
    $dat1e=date("d-m-y h:i:s");
    $sql1="insert into `phonegap_login` (`reg_id`,`reg_date`,`fullname`,`email`,`login_method`, `social_id`, `profile_pic`) values('','$dat1e','$fullname','$email','$method', '$id', '$picture')";
        $result1 = mysql_query($sql1);
    if ($result1) {
        $sql2="select * from `phonegap_login` where `email`='$email'";
        $result2 = mysql_query($sql2);
          while ($row = mysql_fetch_assoc($result2)) {
        $arrayd[] = $row;
        $total++;
    }
      echo json_encode($arrayd);

    }else{
      echo 0;
    }
   }else{
      while ($row = mysql_fetch_assoc($result)) {
        $arrayd[] = $row;
        $total++;
    }
      echo json_encode($arrayd);
  }
}

?>