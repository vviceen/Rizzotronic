<?php
include '../../app/connection/connection.php';
include '../../app/connection/checkPromotionExpiry.php';

// Verificar si el usuario es vendedor
session_start();
if ($_SESSION['rol'] != '2') {
    echo json_encode(['success' => false, 'message' => 'No tienes permiso para realizar esta acción.']);
    exit;
}

try {
    // Procesar el formulario
    $nombre = $_POST['nombre'] ?? null;
    $informacion = $_POST['informacion'] ?? null;
    $precio_real = isset($_POST['precio_real']) ? floatval($_POST['precio_real']) : null;
    $precio_promocionado = isset($_POST['precio_promocionado']) ? floatval($_POST['precio_promocionado']) : null;
    $vigencia_promocion = $_POST['vigencia_promocion'] ?? null;
    $marca = $_POST['marca'] ?? null;
    $newMarca = $_POST['newMarca'] ?? null;
    $stock = isset($_POST['stock']) ? intval($_POST['stock']) : null;
    $etiqueta = $_POST['etiqueta'] ?? null;
    $newCategory = $_POST['newCategory'] ?? null;
    $promocionado = isset($_POST['promocionado']) ? 1 : 0;

    // Usar nueva marca si se proporciona, de lo contrario usar la existente
    if ($newMarca) {
        $marca = $newMarca;
    }

    // Usar nueva categoría si se proporciona, de lo contrario usar la existente
    if ($newCategory) {
        $etiqueta = $newCategory;
    }

    // Crear una variable Producto para depuración
    $producto = [
        'nombre' => $nombre,
        'imagen' => isset($_FILES["imagen"]) ? $_FILES["imagen"]["name"] : null,
        'informacion' => $informacion,
        'precio_real' => $precio_real,
        'precio_promocionado' => $precio_promocionado,
        'vigencia_promocion' => $vigencia_promocion,
        'marca' => $marca,
        'stock' => $stock,
        'promocionado' => $promocionado,
        'etiqueta' => $etiqueta
    ];

    // Verificar que todos los campos requeridos estén presentes
    if (!$nombre || !$informacion || !$precio_real || !$stock || !$etiqueta || !$marca) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos.', 'producto' => $producto]);
        exit;
    }

    // Obtener el ID del último producto
    $stmt = $conn->query("SELECT MAX(id) AS max_id FROM productos");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $new_id = $result['max_id'] + 1;

    // Manejar la subida de la imagen
    $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/Rizzotronic/frontend/src/imgProduct/";
    $imageFileType = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));
    $target_file = $target_dir . $new_id . '.' . $imageFileType;
    $image_name = $new_id . '.' . $imageFileType; // Generar un nombre único para la imagen

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
    $stmt = $conn->prepare("INSERT INTO productos (nombre, imagen, informacion, precio_real, precio_promocionado, vigencia_promocion, marca, stock, promocionado, etiqueta) VALUES (:nombre, :imagen, :informacion, :precio_real, :precio_promocionado, :vigencia_promocion, :marca, :stock, :promocionado, :etiqueta)");
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':imagen', $image_name); // Solo el nombre de la imagen
    $stmt->bindParam(':informacion', $informacion);
    $stmt->bindParam(':precio_real', $precio_real);
    $stmt->bindParam(':precio_promocionado', $precio_promocionado);
    $stmt->bindParam(':vigencia_promocion', $vigencia_promocion);
    $stmt->bindParam(':marca', $marca);
    $stmt->bindParam(':stock', $stock);
    $stmt->bindParam(':promocionado', $promocionado);
    $stmt->bindParam(':etiqueta', $etiqueta);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto agregado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar el producto.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>