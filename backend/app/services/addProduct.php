<?php
session_start();

// Verificar si el usuario es vendedor
if ($_SESSION['rol'] == 'vendedor') {
  echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
  exit;
}

// Incluir el archivo de conexión
require_once 'Rizzotronic/backend/app/connection/connection.php';

// Procesar el formulario
$nombre = $_POST['nombre'];
$precio_real = $_POST['precio_real'];
$categoria = $_POST['categoria'];
$precio_promocionado = $_POST['precio_promocionado'];
$vigencia_promocion = $_POST['vigencia_promocion'];
$descripcion = $_POST['descripcion'];

// Manejar la subida de la imagen
$target_dir = "/Rizzotronic/frontend/src/imgProduct";
$target_file = $target_dir . basename($_FILES["imagen"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Mover el archivo subido a la carpeta de destino
if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
  echo json_encode(['success' => false, 'message' => 'Hubo un error al subir tu archivo.']);
  exit;
}

// Insertar el producto en la base de datos
$sql = "INSERT INTO producto (nombre, imagen, precio_real, categoria, precio_promocionado, vigencia_promocion, descripcion) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssdsdss", $nombre, $target_file, $precio_real, $categoria, $precio_promocionado, $vigencia_promocion, $descripcion);

if ($stmt->execute()) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Error al insertar el producto: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
