<?php
include '../../app/connection/connection.php';
include '../../app/connection/checkPromotionExpiry.php';

try {
    $stmt = $conn->prepare("SELECT DISTINCT marca, etiqueta FROM productos");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $marca = [];
    $etiqueta = [];

    foreach ($result as $row) {
        if (!empty($row['marca'])) {
            $marca[] = $row['marca'];
        }
        if (!empty($row['etiqueta'])) {
            $etiqueta[] = $row['etiqueta'];
        }
    }

    echo json_encode(['marca' => $marca, 'etiqueta' => $etiqueta]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>