<?php
session_start();
include '../connection/connection.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si los datos vienen en formato JSON o FormData
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    if ($contentType === "application/json") {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
    } else {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
    }
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos sonnn requeridos.']);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, nombre, email, password, rol_id FROM usuarios WHERE nombre = :username and password = :password");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($password == $user['password']) {
            $_SESSION['username'] = $user['nombre'];
            $_SESSION['rol'] = $user['rol_id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['id'] = $user['id'];
            echo json_encode([
                'success' => true,
                'nombre' => $user['nombre'],
                'email' => $user['email'],
                'rol' => $user['rol_id'],
                'id' => $user['id']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas.']);
    }
}
?>