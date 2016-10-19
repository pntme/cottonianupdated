<?php
header("Access-Control-Allow-Origin: *");
include('db.php');
$keyword = $_GET['keyword']; 
 $total = 0;
 $sql = "Select * from jobs WHERE title like '%$keyword%' OR description like '%$keyword%'";
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