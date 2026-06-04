<?php
header('Content-Type: application/json');
include '../../../app/config/database.php';

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/error.log');

try {
$round = $_GET['round'] ?? 1;
    error_log("Fetching data for round: " . $round);

if ($round === 'final') {
        $stmt = $pdo->prepare("
            SELECT fq.id, fq.question, fa.answer AS text, fa.points
            FROM final_questions fq
            LEFT JOIN final_answers fa ON fq.id = fa.final_question_id
            ORDER BY fq.id ASC, fa.points DESC, fa.id ASC
        ");
    $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        error_log("Final round results: " . print_r($results, true));
        
        // Group answers by question
        $questions = [];
        foreach ($results as $row) {
            if (!isset($questions[$row['id']])) {
                $questions[$row['id']] = [
                    'id' => $row['id'],
                    'question' => $row['question'],
                    'answers' => []
                ];
            }
            if ($row['text'] !== null) {
                $questions[$row['id']]['answers'][] = [
                    'text' => $row['text'],
                    'points' => $row['points']
                ];
            }
        }
        ksort($questions);
        $questions = array_values($questions);
} else {
        $stmt = $pdo->prepare("
            SELECT q.id, q.question, a.answer AS text, a.points
            FROM questions q
            LEFT JOIN answers a ON q.id = a.question_id
            WHERE q.round = ?
            ORDER BY q.id ASC, a.points DESC, a.id ASC
        ");
    $stmt->execute([$round]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        error_log("Round {$round} results: " . print_r($results, true));
        
        // Group answers by question
        $questions = [];
        foreach ($results as $row) {
            if (!isset($questions[$row['id']])) {
                $questions[$row['id']] = [
                    'id' => $row['id'],
                    'question' => $row['question'],
                    'answers' => []
                ];
            }
            if ($row['text'] !== null) {
                $questions[$row['id']]['answers'][] = [
                    'text' => $row['text'],
                    'points' => $row['points']
                ];
            }
        }
        ksort($questions);
        $questions = array_values($questions);
    }

    error_log("Final questions array: " . print_r($questions, true));
    echo json_encode($questions);

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred']);
}
?>
