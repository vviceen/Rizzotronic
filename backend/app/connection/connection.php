<?php
$servername = "localhost";  // El nombre del servidor
$username = "root";         // El nombre de usuario para acceder a la base de datos
$password = "";             // La contraseña para acceder a la base de datos
$dbname = "proyecto3ro";    // El nombre de la base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}