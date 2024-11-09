<?php
try {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Rizzotronic";

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // No imprimir ningún mensaje aquí
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
