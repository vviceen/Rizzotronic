<?php
session_start();

$response = array();

if (isset($_SESSION['username'])) {
    $response['username'] = $_SESSION['username'];
    $response['rol'] = $_SESSION['rol'];
    $response['email'] = $_SESSION['email'];
} else {
    $response['error'] = 'No session data available';
}

echo json_encode($response);    
