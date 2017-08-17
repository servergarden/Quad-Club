<?php
$str_json = file_get_contents('php://input');
function isJSON($string){
   return is_string($string) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
}
if (!isJSON($str_json)){
    echo 'dead';
    exit; 
}else{
    $file = 'counts.txt';
    file_put_contents($file, $str_json);

    echo 'ok botsi';
}
?>
