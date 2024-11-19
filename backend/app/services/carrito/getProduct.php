<?php
// getProduct.php
include('../../connection/connection.php');

// Obtener el cuerpo de la solicitud y decodificar el JSON
$input = file_get_contents('php://input');
$carrito = json_decode($input, true);

// Verificar si la decodificación fue exitosa
if (json_last_error() !== JSON_ERROR_NONE) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Error al decodificar JSON']);
    exit;
}

// Verificar si el carrito es un array
if (!is_array($carrito)) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'El carrito no es un array válido']);
    exit;
}

$productos = [];
foreach ($carrito as $item) {
    $productoId = $item['id'];
    $cantidad = $item['cantidad'];
    $sql = "SELECT id, nombre, imagen, precio_real, precio_promocionado FROM productos WHERE stock != 0 and id = :productoId";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':productoId', $productoId, PDO::PARAM_INT);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['cantidad'] = $cantidad;
            $productos[] = $row;
        }
    }
}

header('Content-Type: application/json');
echo json_encode($productos);
?>