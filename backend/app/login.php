<?php
session_start();
include './connection/connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar que los campos no estén vacíos
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo "Todos los campos son requeridos.";
        exit;
    }

    // Preparar y ejecutar la consulta SQL
    $stmt = $conn->prepare("SELECT username, password, rol FROM usuario WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Verificar si el usuario existe y validar la contraseña
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($db_username, $db_password, $db_rol);
        $stmt->fetch();

        if ($password == $db_password) {
            // Almacenar datos de usuario en sesión
            $_SESSION['username'] = $db_username;
            $_SESSION['rol'] = $db_rol;

            echo "Login exitoso. Bienvenido, " . $db_rol . " " . $db_username;
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "El usuario no existe.";
    }

    $stmt->close();
    $conn->close();
}