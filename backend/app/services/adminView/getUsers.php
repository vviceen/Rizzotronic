<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
include '../../../app/connection/connection.php';

// Obtener los roles a filtrar desde la solicitud
$data = json_decode(file_get_contents("php://input"), true);
$roles = isset($data['roles']) ? $data['roles'] : [];

// Construir la consulta SQL con los filtros de roles
$sql = "SELECT id, nombre, email, rol_id FROM usuarios";
if (!empty($roles)) {
    $placeholders = implode(',', array_fill(0, count($roles), '?'));
    $sql .= " WHERE rol_id IN ($placeholders)";
}

$stmt = $conn->prepare($sql);
if (!empty($roles)) {
    foreach ($roles as $index => $role) {
        $stmt->bindValue($index + 1, $role, PDO::PARAM_INT);
    }
}
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