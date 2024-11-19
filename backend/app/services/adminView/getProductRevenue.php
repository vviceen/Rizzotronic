<?php
include '../../../app/connection/connection.php';

header('Content-Type: application/json');

try {
    // Verificar la conexión a la base de datos
    if ($conn == null) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Obtener los datos de la tabla compra y productos, agrupados por mes
    $query = "
        SELECT p.nombre, SUM(c.cantidad * p.precio_real) AS total_revenue, DATE_FORMAT(c.fecha, '%Y-%m') AS mes
        FROM compra c
        JOIN productos p ON c.producto_id = p.id
        GROUP BY p.nombre, mes
        ORDER BY mes ASC
    ";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'data' => $result]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>