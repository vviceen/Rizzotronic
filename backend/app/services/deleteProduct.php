<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../app/connection/connection.php';

//Verificar si el usuario es vendedor
if ($_SESSION['rol'] != '2') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

//Obtener el ID del producto a eliminar
$data = json_decode(file_get_contents("php://input"), true);
$productId = $data['id'];

// Eliminar el producto de la base de datos
$stmt = $conn->prepare("DELETE FROM productos WHERE id = :id");
$stmt->bindParam(':id', $productId, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el producto: ' . $stmt->errorInfo()[2]]);
}
