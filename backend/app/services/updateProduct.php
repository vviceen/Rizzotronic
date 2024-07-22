<?php
session_start();
include '../../app/connection/connection.php';

// Verificar si el usuario es vendedor
if ($_SESSION['rol'] != 'vendedor') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

// Procesar el formulario
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$precio_real = $_POST['precio_real'];
$categoria = $_POST['categoria'];
$precio_promocionado = $_POST['precio_promocionado'];
$vigencia_promocion = $_POST['vigencia_promocion'];
$descripcion = $_POST['descripcion'];

// Actualizar el producto en la base de datos
$stmt = $conn->prepare("UPDATE producto SET nombre = ?, precio_real = ?, categoria = ?, precio_promocionado = ?, vigencia_promocion = ?, descripcion = ? WHERE id = ?");
$stmt->bind_param("sdsdssi", $nombre, $precio_real, $categoria, $precio_promocionado, $vigencia_promocion, $descripcion, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el producto: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
