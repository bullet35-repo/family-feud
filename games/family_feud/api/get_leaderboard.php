<?php
require_once '../../../app/config/database.php';

header('Content-Type: application/json');

try {
    // First, let's check if the tables exist
    $checkTables = "SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
    ) as users_exists, 
    EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'user_points'
    ) as points_exists";
    
    $stmt = $pdo->query($checkTables);
    $tablesExist = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$tablesExist['users_exists'] || !$tablesExist['points_exists']) {
        throw new Exception('Required tables do not exist');
    }

    // Join users and user_points tables to get complete user information
    $query = "SELECT u.username, u.profile_image, COALESCE(SUM(up.points), 0) as total_points 
              FROM users u 
              LEFT JOIN user_points up ON u.id = up.user_id 
              GROUP BY u.id, u.username, u.profile_image 
              ORDER BY total_points DESC 
              LIMIT 10";
              
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($leaderboard)) {
        // If no data is found, return an empty array with a message
        echo json_encode([
            'status' => 'success',
            'message' => 'No leaderboard data available yet',
            'data' => []
        ]);
    } else {
        echo json_encode([
            'status' => 'success',
            'data' => $leaderboard
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch leaderboard data: ' . $e->getMessage()
    ]);
}
?> 
