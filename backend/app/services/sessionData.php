<?php
session_start();

$response = array();

if (isset($_SESSION['username'])) {
    $response['username'] = $_SESSION['username'];
} else {
    $response['error'] = 'No session data available';
}

echo json_encode($response);
