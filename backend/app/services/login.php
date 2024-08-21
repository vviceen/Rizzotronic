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
    $stmt = $conn->prepare("SELECT nombre, email, password, rol_id FROM usuarios WHERE nombre = :username and password = :password");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    // Verificar si el usuario existe y validar la contraseña
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($password == $user['password']) {
            // Almacenar datos de usuario en sesión
            $_SESSION['username'] = $user['nombre'];
            $_SESSION['rol'] = $user['rol_id'];
            $_SESSION['email'] = $user['email'];

            echo "Login exitoso. Bienvenido, " . $user['rol_id'] . " " . $user['nombre'];
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "El usuario no existe.";
    }
}
