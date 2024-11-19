<?php
include '../../app/connection/connection.php';

header('Content-Type: application/json');

try {
    // Verificar la conexión a la base de datos
    if ($conn == null) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Obtener el cuerpo de la solicitud y decodificar el JSON
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Verificar si la decodificación fue exitosa
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
    }

    // Verificar si el carrito es un array
    if (!is_array($data['carrito'])) {
        throw new Exception('El carrito no es un array válido');
    }

    // Obtener el ID del usuario desde la solicitud
    $usuario_id = $data['usuario_id'];

    // Registrar los detalles de la compra y actualizar el stock de los productos
    foreach ($data['carrito'] as $item) {
        $productoId = $item['id'];
        $cantidad = $item['cantidad'];

        // Registrar el detalle de la compra
        $stmt = $conn->prepare("INSERT INTO compra (usuario_id, producto_id, cantidad) VALUES (:usuario_id, :producto_id, :cantidad)");
        $stmt->bindParam(':usuario_id', $usuario_id);
        $stmt->bindParam(':producto_id', $productoId);
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->execute();

        // Actualizar el stock del producto
        $stmt = $conn->prepare("UPDATE productos SET stock = stock - :cantidad WHERE id = :producto_id");
        $stmt->bindParam(':cantidad', $cantidad);
        $stmt->bindParam(':producto_id', $productoId);
        $stmt->execute();
    }

    echo json_encode(['success' => true, 'message' => 'Compra completada exitosamente.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>