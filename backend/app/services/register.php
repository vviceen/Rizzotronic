<?php
session_start();
include '../connection/connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nombre'];
$email = $data['email'];
$nacionalidad = $data['nacionalidad'];
$nacimiento = $data['nacimiento'];

//$hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);

$stmt = $conn->prepare("INSERT INTO usuario (nombre, email, password, nacionalidad, nacimiento) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nombre, $email, $data['password'], $nacionalidad, $nacimiento);

if ($stmt->execute()) {
    $_SESSION['username'] = $nombre;
    $_SESSION['rol'] = "cliente";
    $_SESSION['email'] = $email;
    $_SESSION['nationality'] = $nacionalidad;
    $_SESSION['birth'] = $nacimiento;
    echo "Registro exitoso.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
