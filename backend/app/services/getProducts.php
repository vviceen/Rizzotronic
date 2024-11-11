<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../../app/connection/connection.php';
include '../../app/connection/checkPromotionExpiry.php';

try {
    $sql = "SELECT * FROM productos";
    $result = $conn->query($sql);

    $products = [];
    if ($result) {
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $products[] = $row;
        }
    }

    $rol = isset($_SESSION['rol']) ? $_SESSION['rol'] : 'cliente';

    header('Content-Type: application/json');
    echo json_encode(['products' => $products, 'rol' => $rol]);

} catch (PDOException $e) {
    // Enviar el error como JSON
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    $conn = null;
}
