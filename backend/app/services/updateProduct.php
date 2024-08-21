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
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$precio_real = $_POST['precio_real'];
$precio_promocionado = $_POST['precio_promocionado'] ?? null;
$vigencia_promocion = $_POST['vigencia_promocion'] ?? null;
$descripcion = $_POST['descripcion'];
$marca = $_POST['marca'] ?? null;

// Verificar si hay una nueva imagen cargada
$relative_path = null;
if (!empty($_FILES["imagen"]["name"])) {
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
}

// Actualizar el producto en la base de datos
if ($relative_path) {
    // Si hay una nueva imagen, también se actualiza
    $stmt = $conn->prepare("UPDATE productos SET nombre = :nombre, imagen = :imagen, precio_real = :precio_real, precio_promocionado = :precio_promocionado, vigencia_promocion = :vigencia_promocion, descripcion = :descripcion, marca = :marca WHERE id = :id");
    $stmt->bindParam(':imagen', $relative_path);
} else {
    // Si no hay nueva imagen, se omite la columna `imagen`
    $stmt = $conn->prepare("UPDATE productos SET nombre = :nombre, precio_real = :precio_real, precio_promocionado = :precio_promocionado, vigencia_promocion = :vigencia_promocion, descripcion = :descripcion, marca = :marca WHERE id = :id");
}

$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':precio_real', $precio_real);
$stmt->bindParam(':precio_promocionado', $precio_promocionado);
$stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
$stmt->bindParam(':descripcion', $descripcion);
$stmt->bindParam(':marca', $marca);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el producto: ' . $stmt->errorInfo()[2]]);
}

