<?php
session_start();
include '../../app/connection/connection.php';

$sql = "SELECT * FROM producto";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}



echo json_encode(['products' => $products, 'rol' => $_SESSION['rol']]);

$conn->close();
