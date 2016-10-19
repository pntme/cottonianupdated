<?php
if($_FILES['file']['name']){
 $prod_name=$_POST['username'];
 $prod_desc=$_POST['prod_desc']; 
 $cat_id=$_POST['cat_id']; 
 $file_name = $_FILES['file']['name'];
 $file_size = $_FILES['file']['size'];
 $file_tmp = $_FILES['file']['tmp_name'];
 $file_type = $_FILES['file']['type'];
 $file_ext = strtolower(end(explode('.', $_FILES['file']['name'])));
 $fname = rand(22,2100).".".$file_ext;
      if (!move_uploaded_file($file_tmp, "images/".  $fname)) {
      echo 0;
      die;
  }else{
   echo $fname;
  } 
}
?>

