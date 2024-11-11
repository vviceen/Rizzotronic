<?php
include 'connection.php'; 
//este archivo sirve para controlar la fecha de vencimiento de las promociones de cada producto

function checkPromotionExpiry($conn) {
    try {
        $stmt = $conn->prepare("UPDATE productos SET precio_promocionado = NULL, vigencia_promocion = NULL WHERE vigencia_promocion < CURDATE()");
        $stmt->execute();
    } catch (PDOException $e) {
        error_log("Error al verificar las promociones vencidas: " . $e->getMessage());
    }
}

// Llamar a la función para verificar las promociones vencidas
checkPromotionExpiry($conn);
?>