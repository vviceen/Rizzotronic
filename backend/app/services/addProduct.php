<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../app/connection/connection.php';

// Verificar si el usuario es vendedor
if ($_SESSION['rol'] != '3') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

// Procesar el formulario
$nombre = $_POST['nombre'];
$informacion = $_POST['informacion'];
$modelo = $_POST['modelo'];
$precio_real = $_POST['precio_real'];
$precio_promocionado = $_POST['precio_promocionado'] ?? null;
$vigencia_promocion = $_POST['vigencia_promocion'] ?? null;
$descripcion = $_POST['descripcion'];
$marca = $_POST['marca'] ?? null;
$usuario_id = $_SESSION['username']; // Asumimos que el ID del usuario está en la sesión

// Manejar la subida de la imagen
$target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Rizzotronic/frontend/src/imgProduct/";
$target_file = $target_dir . basename($_FILES["imagen"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verificar que el directorio existe
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Mover el archivo subido a la carpeta de destino
if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
    echo json_encode(['success' => false, 'message' => 'Hubo un error al subir tu archivo.']);
    exit;
}

// Guardar la ruta relativa en la base de datos
$relative_path = "../../../frontend/src/imgProduct/" . basename($_FILES["imagen"]["name"]);

// Insertar el producto en la base de datos
$stmt = $conn->prepare("INSERT INTO productos (nombre, imagen, informacion, modelo, precio_real, precio_promocionado, vigencia_promocion, descripcion, marca, usuario_id) VALUES (:nombre, :imagen, :informacion, :modelo, :precio_real, :precio_promocionado, :vigencia_promocion, :descripcion, :marca, :usuario_id)");
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':imagen', $relative_path);
$stmt->bindParam(':informacion', $informacion);
$stmt->bindParam(':modelo', $modelo);
$stmt->bindParam(':precio_real', $precio_real);
$stmt->bindParam(':precio_promocionado', $precio_promocionado);
$stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
$stmt->bindParam(':descripcion', $descripcion);
$stmt->bindParam(':marca', $marca);
$stmt->bindParam(':usuario_id', $usuario_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al insertar el producto: ' . $stmt->errorInfo()[2]]);
}