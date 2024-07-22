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

// Procesar el formulario
$nombre = $_POST['nombre'];
$precio_real = $_POST['precio_real'];
$categoria = $_POST['categoria'];
$precio_promocionado = $_POST['precio_promocionado'];
$vigencia_promocion = $_POST['vigencia_promocion'];
$descripcion = $_POST['descripcion'];

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
$stmt = $conn->prepare("INSERT INTO producto (nombre, imagen, precio_real, categoria, precio_promocionado, vigencia_promocion, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssdsdss", $nombre, $relative_path, $precio_real, $categoria, $precio_promocionado, $vigencia_promocion, $descripcion);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al insertar el producto: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
