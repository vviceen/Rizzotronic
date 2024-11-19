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
    // Obtener la ID del producto desde la solicitud
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'] ?? null;

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'ID de producto no proporcionada.']);
        exit;
    }

    // Actualizar el stock del producto a 0 en la base de datos
    $stmt = $conn->prepare("UPDATE productos SET stock = 0 WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto marcado como fuera de servicio exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el producto.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>