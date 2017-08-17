<?php
$ordner = $_GET['ordner'];
if ($handle = opendir($ordner)) {
    while (false !== ($entry = readdir($handle))) {
        echo "$entry ";
    }
    closedir($handle);
}
?>