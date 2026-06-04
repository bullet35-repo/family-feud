<?php
session_start();
header('Content-Type: application/json');

$response = [
    'username' => isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest User',
    'profile_image' => isset($_SESSION['profile_image']) ? $_SESSION['profile_image'] : 'default.png'
];

echo json_encode($response);
?> 
