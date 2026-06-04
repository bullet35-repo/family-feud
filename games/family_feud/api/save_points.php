<?php
session_start();
require_once '../../../app/config/database.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $points = isset($_POST['earned_points']) ? (int)$_POST['earned_points'] : 0;

    try {
        // Check if user already has points record
        $stmt = $pdo->prepare("SELECT id FROM user_points WHERE user_id = ?");
        $stmt->execute([$user_id]);
        
        if ($stmt->rowCount() > 0) {
            // Update existing points
            $stmt = $pdo->prepare("UPDATE user_points SET points = points + ? WHERE user_id = ?");
            $stmt->execute([$points, $user_id]);
        } else {
            // Insert new points record
            $stmt = $pdo->prepare("INSERT INTO user_points (user_id, points) VALUES (?, ?)");
            $stmt->execute([$user_id, $points]);
        }
        
        echo json_encode(['success' => true, 'message' => 'Points saved successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?> 
