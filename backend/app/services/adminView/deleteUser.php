<?php
include '../../../app/connection/connection.php';

header('Content-Type: application/json');

try {
    // Verificar la conexión a la base de datos
    if ($conn == null) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Obtener los datos enviados en la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        throw new Exception("ID de usuario no proporcionado");
    }

    $id = $data['id'];

    // Eliminar el usuario de la base de datos
    $query = "DELETE FROM usuarios WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Usuario eliminado exitosamente']);
    } else {
        throw new Exception("Error al eliminar el usuario");
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>