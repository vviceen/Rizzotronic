<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Conexión a la base de datos
include '../../../app/connection/connection.php';

$response = ['success' => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $userId = $_POST['id'];
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $rol_id = $_POST['rol_id'];

        // Verifica si los datos están presentes
        if (!empty($userId) && !empty($nombre) && !empty($email) && !empty($rol_id)) {
            // Preparar la consulta SQL con PDO para actualizar al usuario
            $sql = "UPDATE usuarios SET nombre = :nombre, email = :email, rol_id = :rol_id WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':rol_id', $rol_id);
            $stmt->bindParam(':id', $userId);

            if ($stmt->execute()) {
                $response['success'] = true;
            } else {
                $response['debug'] = 'Error al ejecutar la consulta';
            }
        } else {
            $response['debug'] = 'Faltan datos necesarios';
        }
    } catch (Exception $e) {
        $response['debug'] = $e->getMessage();
    }
} else {
    $response['debug'] = 'Metodo no permitido';
}


header('Content-Type: application/json');
echo json_encode($response);
