<?php
include '../../app/connection/connection.php';

// Verificar si el usuario es vendedor
session_start();
if ($_SESSION['rol'] != '2') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

// Procesar el formulario
$nombre = $_POST['nombre'] ?? null;
$informacion = $_POST['informacion'] ?? null;
$precio_real = $_POST['precio_real'] ?? null;
$precio_promocionado = $_POST['precio_promocionado'] ?? null;
$vigencia_promocion = $_POST['vigencia_promocion'] ?? null;
$marca = $_POST['newMarca'] ?: $_POST['marca']; // Usar nueva marca si se proporciona, de lo contrario usar la existente
$cantidad = $_POST['cantidad'] ?? null;
$etiqueta = $_POST['newCategory'] ?: $_POST['etiqueta']; // Usar nueva categoría si se proporciona, de lo contrario usar la existente
$promocionado = isset($_POST['promocionado']) ? 1 : 0;

// Verificar que todos los campos requeridos estén presentes
if (!$nombre || !$informacion || !$precio_real || !$cantidad || !$etiqueta) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos.']);
    exit;
}

// Manejar la subida de la imagen
$target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Rizzotronic/frontend/src/imgProduct/";
$target_file = $target_dir . basename($_FILES["imagen"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verificar que el directorio existe
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Verificar si el archivo es una imagen real
$check = getimagesize($_FILES["imagen"]["tmp_name"]);
if ($check === false) {
    echo json_encode(['success' => false, 'message' => 'El archivo no es una imagen.']);
    exit;
}

// Verificar si el archivo ya existe
if (file_exists($target_file)) {
    echo json_encode(['success' => false, 'message' => 'El archivo ya existe.']);
    exit;
}

// Verificar el tamaño del archivo
if ($_FILES["imagen"]["size"] > 500000) {
    echo json_encode(['success' => false, 'message' => 'El archivo es demasiado grande.']);
    exit;
}

// Permitir ciertos formatos de archivo
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo json_encode(['success' => false, 'message' => 'Solo se permiten archivos JPG, JPEG, PNG y GIF.']);
    exit;
}

// Intentar subir el archivo
if (!move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
    echo json_encode(['success' => false, 'message' => 'Hubo un error al subir tu archivo.']);
    exit;
}

// Insertar el producto en la base de datos
try {
    $stmt = $conn->prepare("INSERT INTO productos (nombre, imagen, informacion, precio_real, precio_promocionado, vigencia_promocion, marca, cantidad, promocionado, etiqueta) VALUES (:nombre, :imagen, :informacion, :precio_real, :precio_promocionado, :vigencia_promocion, :marca, :cantidad, :promocionado, :etiqueta)");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':imagen', $target_file);
    $stmt->bindParam(':informacion', $informacion);
    $stmt->bindParam(':precio_real', $precio_real);
    $stmt->bindParam(':precio_promocionado', $precio_promocionado);
    $stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
    $stmt->bindParam(':marca', $marca);
    $stmt->bindParam(':cantidad', $cantidad);
    $stmt->bindParam(':promocionado', $promocionado);
    $stmt->bindParam(':etiqueta', $etiqueta);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto agregado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar el producto.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
$conn = null;
?>