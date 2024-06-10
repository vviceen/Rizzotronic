<?php

$con = new PDO("mysql:host=localhost;dbname=proyecto3ro",'root','');

if($con){
    echo "BD conectada";
}
else{
    echo "no se pudo conectar a la BD";
}