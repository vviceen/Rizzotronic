<?php
session_start();

$response = array();

if (isset($_SESSION['username'])) {
    $response['username'] = $_SESSION['username'];
    $response['rol'] = $_SESSION['rol'];
    $response['email'] = $_SESSION['email'];
    $response['nationality'] = $_SESSION['nationality'];
    $response['birth'] = $_SESSION['birth'];
} else {
    $response['error'] = 'No session data available';
}

echo json_encode($response);
