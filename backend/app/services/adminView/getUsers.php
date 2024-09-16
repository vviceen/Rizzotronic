<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../../app/connection/connection.php';

// Obtener todos los usuarios
$stmt = $conn->prepare("SELECT id, nombre, email, rol_id FROM usuarios");
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Verificar si hay usuarios
if ($users) {
    // Retornar los usuarios como JSON
    echo json_encode(['success' => true, 'users' => $users]);
} else {
    // Si no hay usuarios, retornar un mensaje de error
    echo json_encode(['success' => false, 'message' => 'No se encontraron usuarios']);
}
