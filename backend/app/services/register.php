<?php
session_start();
include '../connection/connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nombre'];
$email = $data['email'];
$password = $data['password'];
$nacionalidad = $data['nacionalidad'];
$nacimiento = $data['nacimiento'];

$hashed_password = password_hash($password, PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO usuario (nombre, email, password, nacionalidad, nacimiento) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nombre, $email, $hashed_password, $nacionalidad, $nacimiento);

if ($stmt->execute()) {
    echo "Registro exitoso.";   
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
