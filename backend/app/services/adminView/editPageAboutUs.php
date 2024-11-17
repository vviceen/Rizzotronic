<?php
include '../../../app/connection/connection.php';

header('Content-Type: application/json');

try {
    // Verificar la conexión a la base de datos
    if ($conn == null) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Obtener los datos actuales de la base de datos
    $stmt = $conn->prepare("SELECT * FROM about_us WHERE id = 1");
    $stmt->execute();
    $currentData = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$currentData) {
        throw new Exception("No se encontró la información de la página.");
    }

    // Obtener los datos del formulario
    $local_img_1 = isset($_FILES['local_img_1']['name']) && $_FILES['local_img_1']['name'] ? $_FILES['local_img_1']['name'] : $currentData['local_img_1'];
    $local_img_2 = isset($_FILES['local_img_2']['name']) && $_FILES['local_img_2']['name'] ? $_FILES['local_img_2']['name'] : $currentData['local_img_2'];
    $txt_local = isset($_POST['txt_local']) && $_POST['txt_local'] ? $_POST['txt_local'] : $currentData['txt_local'];
    $team_img_1 = isset($_FILES['team_img_1']['name']) && $_FILES['team_img_1']['name'] ? $_FILES['team_img_1']['name'] : $currentData['team_img_1'];
    $team_img_2 = isset($_FILES['team_img_2']['name']) && $_FILES['team_img_2']['name'] ? $_FILES['team_img_2']['name'] : $currentData['team_img_2'];
    $team_img_3 = isset($_FILES['team_img_3']['name']) && $_FILES['team_img_3']['name'] ? $_FILES['team_img_3']['name'] : $currentData['team_img_3'];
    $txt_team = isset($_POST['txt_team']) && $_POST['txt_team'] ? $_POST['txt_team'] : $currentData['txt_team'];
    $mision = isset($_POST['mision']) && $_POST['mision'] ? $_POST['mision'] : $currentData['mision'];
    $vision = isset($_POST['vision']) && $_POST['vision'] ? $_POST['vision'] : $currentData['vision'];
    $txt_opcional = isset($_POST['txt_opcional']) && $_POST['txt_opcional'] ? $_POST['txt_opcional'] : $currentData['txt_opcional'];

    // Directorio de subida
    $upload_dir = $_SERVER['DOCUMENT_ROOT'] . "/Rizzotronic/frontend/src/imgAboutUs/";

    // Verificar que el directorio existe
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    // Función para manejar la subida de imágenes
    function handleImageUpload($file, $upload_dir, $currentFileName) {
        if ($file['name']) {
            $imageFileType = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
            $target_file = $upload_dir . basename($file["name"]);
            $check = getimagesize($file["tmp_name"]);

            if ($check === false) {
                throw new Exception('El archivo no es una imagen.');
            }

            if (!move_uploaded_file($file["tmp_name"], $target_file)) {
                throw new Exception('Hubo un error al subir la imagen.');
            }

            return basename($file["name"]);
        }
        return $currentFileName;
    }

    // Manejar la subida de cada imagen
    $local_img_1 = handleImageUpload($_FILES['local_img_1'], $upload_dir, $currentData['local_img_1']);
    $local_img_2 = handleImageUpload($_FILES['local_img_2'], $upload_dir, $currentData['local_img_2']);
    $team_img_1 = handleImageUpload($_FILES['team_img_1'], $upload_dir, $currentData['team_img_1']);
    $team_img_2 = handleImageUpload($_FILES['team_img_2'], $upload_dir, $currentData['team_img_2']);
    $team_img_3 = handleImageUpload($_FILES['team_img_3'], $upload_dir, $currentData['team_img_3']);

    // Actualizar la información en la base de datos
    $stmt = $conn->prepare("UPDATE about_us SET local_img_1 = :local_img_1, local_img_2 = :local_img_2, txt_local = :txt_local, team_img_1 = :team_img_1, team_img_2 = :team_img_2, team_img_3 = :team_img_3, txt_team = :txt_team, mision = :mision, vision = :vision, txt_opcional = :txt_opcional WHERE id = 1");
    $stmt->bindParam(':local_img_1', $local_img_1);
    $stmt->bindParam(':local_img_2', $local_img_2);
    $stmt->bindParam(':txt_local', $txt_local);
    $stmt->bindParam(':team_img_1', $team_img_1);
    $stmt->bindParam(':team_img_2', $team_img_2);
    $stmt->bindParam(':team_img_3', $team_img_3);
    $stmt->bindParam(':txt_team', $txt_team);
    $stmt->bindParam(':mision', $mision);
    $stmt->bindParam(':vision', $vision);
    $stmt->bindParam(':txt_opcional', $txt_opcional);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Información actualizada correctamente.']);
    } else {
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success' => false, 'message' => 'Error al actualizar la información.', 'errorInfo' => $errorInfo]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
$conn = null;
?>