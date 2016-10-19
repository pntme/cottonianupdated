<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$keyword = $_GET['keyword']; 
 $total = 0;
 $sql = "Select * from news WHERE title like '$keyword' OR desciption like '$keyword'";
 $result = mysql_query($sql);
 while ($row = mysql_fetch_assoc($result)) {
        $arrayd[] = $row;
        $total++;
    }
    if ($total == 0) {
        echo 0;
    } else {
        echo json_encode($arrayd);
    }
 
?>