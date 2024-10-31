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
$marca = $_POST['newMarca'] ?: $_POST['marca']; // Usar nueva marca si se proporciona, de lo contrario usar la existente
$cantidad = $_POST['cantidad'];
$etiqueta = $_POST['newCategory'] ?: $_POST['etiqueta']; // Usar nueva categoría si se proporciona, de lo contrario usar la existente
$promocionado = $_POST['promocionado']; 

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

// Mover el archivo subido
if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
    echo json_encode(['success' => false, 'message' => 'Hubo un error al subir la imagen.']);
    exit;
}

// Insertar los datos del producto en la base de datos usando PDO
try {
    $sql = "INSERT INTO productos (nombre, imagen, informacion, precio_real, precio_promocionado, vigencia_promocion, marca, cantidad, etiqueta, promocionado) 
            VALUES (:nombre, :imagen, :informacion, :precio_real, :precio_promocionado, :vigencia_promocion, :marca, :cantidad, :etiqueta, :promocionado)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':nombre' => $nombre,
        ':imagen' => $_FILES["imagen"]["name"],
        ':informacion' => $informacion,
        ':precio_real' => $precio_real,
        ':precio_promocionado' => $precio_promocionado,
        ':vigencia_promocion' => $vigencia_promocion,
        ':marca' => $marca,
        ':cantidad' => $cantidad,
        ':etiqueta' => $etiqueta,
        ':promocionado' => $promocionado
    ]);

    echo json_encode(['success' => true, 'message' => 'Producto agregado exitosamente.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Hubo un error al agregar el producto: ' . $e->getMessage()]);
}

$conn = null;
?>