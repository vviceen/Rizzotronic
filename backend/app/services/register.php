<?php
session_start();
include '../connection/connection.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$nombre = $data['nombre'];
$email = $data['email'];
$password = $data['password'];
//$hashed_password = password_hash($password, PASSWORD_BCRYPT);
//por default los usuarios tienen el rol de cliente (3)
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (:nombre, :email, :password, 3)");
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$response = array();
if ($stmt->execute()) {
    $_SESSION['username'] = $nombre;
    $_SESSION['rol'] = "cliente";
    $_SESSION['email'] = $email;
    $response['status'] = 'success';
    $response['message'] = 'Registro exitoso.';
    $response['data'] = [
        'email' => $email,
        'password' => $password
    ];
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error: ' . $stmt->errorInfo()[2];
}
echo json_encode($response);
?>