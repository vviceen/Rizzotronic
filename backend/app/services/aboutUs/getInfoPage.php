<?php

include '../../../app/connection/connection.php';

header('Content-Type: application/json');

try {
    // Verificar la conexión a la base de datos
    if ($conn == null) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Ejecutar la consulta
    $stmt = $conn->prepare("SELECT * FROM about_us WHERE id = 1");
    $stmt->execute();
    $aboutUs = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($aboutUs) {
        echo json_encode(['success' => true, 'data' => $aboutUs]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No se encontró la información de la página.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>