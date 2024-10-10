<?php
session_start();
include '../connection/connection.php';

header('Content-Type: application/json');

$response = [];

try {
    if ($conn == null) {
        throw new Exception("Error de conexión");
    }

    // Obtener los datos de la solicitud GET
    $searchTerm = isset($_GET['query']) ? $_GET['query'] : '';

    if (empty($searchTerm)) {
        throw new Exception("No se proporcionó un término de búsqueda");
    }

    $stmt = $conn->prepare("SELECT id, nombre, imagen FROM productos WHERE nombre LIKE :searchTerm LIMIT 6");
    $searchTerm = '%' . $searchTerm . '%';
    $stmt->bindParam(':searchTerm', $searchTerm, PDO::PARAM_STR);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($products) {
        $response['success'] = true;
        $response['products'] = $products;
    } else {
        throw new Exception("No se encontraron productos");
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
?>