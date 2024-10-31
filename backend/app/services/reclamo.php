<?php
session_start();
include '../connection/connection.php';
header('Content-Type: application/json');
$response = array();

try {
    if ($conn == null) {
        throw new Exception("Error de conexión");
    }

    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        throw new Exception("Datos inválidos");
    }

    $email = $data['email'];
    $mensaje = $data['mensaje'];

    $stmt = $conn->prepare("INSERT INTO reclamos (emailCliente, mensaje_reclamo) VALUES (:emailCliente, :mensaje_reclamo)");
    $stmt->bindParam(':emailCliente', $email);
    $stmt->bindParam(':mensaje_reclamo', $mensaje);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Reclamo enviado exitosamente.";
    } else {
        throw new Exception("Error: " . $stmt->errorInfo()[2]);
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['error'] = $e->getMessage();
}

echo json_encode($response);
?>