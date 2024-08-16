<?php
session_start();
include '../connection/connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar que los campos no estén vacíos
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        echo "Todos los campos son requeridos.";
        exit;
    }

    // Preparar y ejecutar la consulta SQL con PDO
    $stmt = $conn->prepare("SELECT nombre, email, password, nacionalidad, nacimiento, rol FROM usuario WHERE nombre = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    // Verificar si el usuario existe y validar la contraseña
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($password == $user['password']) {
            // Almacenar datos de usuario en sesión
            $_SESSION['username'] = $user['nombre'];
            $_SESSION['rol'] = $user['rol'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['nationality'] = $user['nacionalidad'];
            $_SESSION['birth'] = $user['nacimiento'];

            echo "Login exitoso. Bienvenido, " . $user['rol'] . " " . $user['nombre'];
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "El usuario no existe.";
    }
}
