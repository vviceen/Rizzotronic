<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
include '../../app/connection/connection.php';

// Verificar si el usuario es vendedor
if ($_SESSION['rol'] != '2') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

// Procesar el formulario
$nombre = $_POST['nombre'];
$informacion = $_POST['informacion'];
$precio_real = $_POST['precio_real'];
$precio_promocionado = $_POST['precio_promocionado'] ?? null;
$vigencia_promocion = $_POST['vigencia_promocion'] ?? null;
$descripcion = $_POST['descripcion'];
$marca = $_POST['marca'] ?? null;
$cantidad = $_POST['cantidad'];
$usuario_id = $_SESSION['username']; // Asumimos que el ID del usuario está en la sesión

// Manejar la subida de la imagen
$target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Rizzotronic/frontend/src/imgProduct/";
$target_file = $target_dir . basename($_FILES["imagen"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verificar que el directorio existe
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Verificar el formato de la imagen
$allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
if (!in_array($imageFileType, $allowedFormats)) {
    echo json_encode(['success' => false, 'message' => 'Solo se permiten archivos JPG, JPEG, PNG y GIF.']);
    exit;
}

// Verificar el tamaño de la imagen
if ($_FILES["imagen"]["size"] > 500000) {
    echo json_encode(['success' => false, 'message' => 'El archivo es demasiado grande.']);
    exit;
}

// Mover el archivo subido a la carpeta de destino
if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
    echo json_encode(['success' => false, 'message' => 'Error al subir la imagen.']);
    exit;
}

try {
    // Insertar el producto en la base de datos
    $sql = "INSERT INTO productos (nombre, imagen, informacion, precio_real, precio_promocionado, vigencia_promocion, descripcion, marca, cantidad) VALUES (:nombre, :imagen, :informacion, :precio_real, :precio_promocionado, :vigencia_promocion, :descripcion, :marca, :cantidad)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':imagen', $_FILES["imagen"]["name"]);
    $stmt->bindParam(':informacion', $informacion);
    $stmt->bindParam(':precio_real', $precio_real);
    $stmt->bindParam(':precio_promocionado', $precio_promocionado);
    $stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':marca', $marca);
    $stmt->bindParam(':cantidad', $cantidad);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
?>