<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['username'])) {
    echo json_encode([
        'username' => $_SESSION['username'],
        'rol' => $_SESSION['rol'],
        'email' => $_SESSION['email'],
        'id' => $_SESSION['id']
    ]);
} else {
    echo json_encode([]);
}
?>