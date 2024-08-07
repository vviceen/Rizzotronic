<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../app/connection/connection.php';

// Verificar si el usuario es vendedor
if ($_SESSION['rol'] != 'vendedor') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

// Obtener el ID del producto a eliminar
$data = json_decode(file_get_contents("php://input"), true);
$productId = $data['id'];

// Eliminar el producto de la base de datos
$stmt = $conn->prepare("DELETE FROM producto WHERE id = ?");
$stmt->bind_param("i", $productId);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el producto: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
