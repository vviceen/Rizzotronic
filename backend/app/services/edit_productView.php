<?php
include '../../app/connection/connection.php';

// Verificar si el usuario es vendedor
session_start();
if ($_SESSION['rol'] != '2') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

try {
    // Procesar el formulario
    $id = $_POST['id'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $informacion = $_POST['informacion'] ?? null;
    $precio_real = isset($_POST['precio_real']) ? floatval($_POST['precio_real']) : null;
    $precio_promocionado = isset($_POST['precio_promocionado']) ? floatval($_POST['precio_promocionado']) : null;
    $vigencia_promocion = $_POST['vigencia_promocion'] ?? null;
    $marca = $_POST['marca'] ?? null;
    $cantidad = isset($_POST['cantidad']) ? intval($_POST['cantidad']) : null;
    $etiqueta = $_POST['etiqueta'] ?? null;
    $promocionado = isset($_POST['promocionado']) ? 1 : 0;

    // Verificar que todos los campos requeridos estén presentes
    if (!$id || !$nombre || !$informacion || !$precio_real || !$cantidad || !$etiqueta || !$marca) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos.']);
        exit;
    }

    // Manejar la subida de la imagen
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == UPLOAD_ERR_OK) {
        $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Rizzotronic/frontend/src/imgProduct/";
        $imageFileType = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));
        $target_file = $target_dir . $id . '.' . $imageFileType;

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

        // Actualizar el nombre de la imagen en la base de datos
        $imagen = $id . '.' . $imageFileType;
    } else {
        // Mantener la imagen actual si no se sube una nueva
        $imagen = $_POST['imagen_actual'] ?? null;
    }

    // Actualizar el producto en la base de datos
    $stmt = $conn->prepare("UPDATE productos SET nombre = :nombre, imagen = :imagen, informacion = :informacion, precio_real = :precio_real, precio_promocionado = :precio_promocionado, vigencia_promocion = :vigencia_promocion, marca = :marca, cantidad = :cantidad, promocionado = :promocionado, etiqueta = :etiqueta WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':imagen', $imagen);
    $stmt->bindParam(':informacion', $informacion);
    $stmt->bindParam(':precio_real', $precio_real);
    $stmt->bindParam(':precio_promocionado', $precio_promocionado);
    $stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
    $stmt->bindParam(':marca', $marca);
    $stmt->bindParam(':cantidad', $cantidad);
    $stmt->bindParam(':promocionado', $promocionado);
    $stmt->bindParam(':etiqueta', $etiqueta);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto actualizado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el producto.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>