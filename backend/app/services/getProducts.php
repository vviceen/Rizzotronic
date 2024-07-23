<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../app/connection/connection.php';

$sql = "SELECT * FROM producto";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

$rol = isset($_SESSION['rol']) ? $_SESSION['rol'] : 'cliente';

header('Content-Type: application/json');
echo json_encode(['products' => $products, 'rol' => $rol]);

$conn->close();
