<?php
session_start();
include '../connection/connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nombre'];
$email = $data['email'];
$nacionalidad = $data['nacionalidad'];
$nacimiento = $data['nacimiento'];
$password = $data['password'];

//$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// Preparar y ejecutar la consulta SQL con PDO
$stmt = $conn->prepare("INSERT INTO usuario (nombre, email, password, nacionalidad, nacimiento) VALUES (:nombre, :email, :password, :nacionalidad, :nacimiento)");
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$stmt->bindParam(':nacionalidad', $nacionalidad);
$stmt->bindParam(':nacimiento', $nacimiento);

if ($stmt->execute()) {
    $_SESSION['username'] = $nombre;
    $_SESSION['rol'] = "cliente";
    $_SESSION['email'] = $email;
    $_SESSION['nationality'] = $nacionalidad;
    $_SESSION['birth'] = $nacimiento;
    echo "Registro exitoso.";
} else {
    echo "Error: " . $stmt->errorInfo()[2];
}
