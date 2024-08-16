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
$stmt = $conn->prepare("UPDATE producto SET nombre = :nombre, precio_real = :precio_real, categoria = :categoria, precio_promocionado = :precio_promocionado, vigencia_promocion = :vigencia_promocion, descripcion = :descripcion WHERE id = :id");
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':precio_real', $precio_real);
$stmt->bindParam(':categoria', $categoria);
$stmt->bindParam(':precio_promocionado', $precio_promocionado);
$stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
$stmt->bindParam(':descripcion', $descripcion);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el producto: ' . $stmt->errorInfo()[2]]);
}
