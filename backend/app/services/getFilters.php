<?php
include '../../app/connection/connection.php';

try {
    $stmt = $conn->prepare("SELECT DISTINCT marca, etiqueta FROM productos");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $marcas = [];
    $etiquetas = [];

    foreach ($result as $row) {
        if (!empty($row['marca'])) {
            $marcas[] = $row['marca'];
        }
        if (!empty($row['etiqueta'])) {
            $etiquetas[] = $row['etiqueta'];
        }
    }

    echo json_encode(['marcas' => $marcas, 'etiquetas' => $etiquetas]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>