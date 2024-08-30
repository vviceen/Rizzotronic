<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../app/connection/connection.php';

// Verificar si se pasó una ID válida
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID de producto no proporcionada']);
    exit;
}

$product_id = $_GET['id'];

// Obtener los detalles del producto desde la base de datos
$stmt = $conn->prepare("SELECT * FROM productos WHERE id = :id");
$stmt->bindParam(':id', $product_id, PDO::PARAM_STR);
$stmt->execute();

$product = $stmt->fetch(PDO::FETCH_ASSOC);

if ($product) {
    echo json_encode(['success' => true, 'product' => $product]);
} else {
    echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
}
