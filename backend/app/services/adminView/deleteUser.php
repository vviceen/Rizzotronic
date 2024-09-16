<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../../app/connection/connection.php';


//Obtener el ID del producto a eliminar
$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['id'];

// Eliminar el producto de la base de datos
$stmt = $conn->prepare("DELETE FROM usuarios WHERE id = :id");
$stmt->bindParam(':id', $userId, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar el usuario: ' . $stmt->errorInfo()[2]]);
}
