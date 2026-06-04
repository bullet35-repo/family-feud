<?php
session_start();
require_once 'app/config/database.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if (empty($username) || empty($password) || empty($confirm_password)) {
        $error = "Please fill in all fields";
    } elseif ($password !== $confirm_password) {
        $error = "Passwords do not match";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters long";
    } else {
        // Check if username already exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetchColumn() > 0) {
            $error = "Username already exists";
        } else {
            // Create new user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
            
            try {
                $stmt->execute([$username, $hashed_password]);
                $success = "Registration successful! You can now login.";
            } catch(PDOException $e) {
                $error = "Registration failed. Please try again.";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Game Library</title>
    <link rel="stylesheet" href="public/assets/css/style.css">
    <style>
        body.auth-page {
            min-height: 100vh;
            background: #f8fafc;
        }
        .auth-main {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
        }
        .auth-container {
            width: min(440px, 100%);
            max-width: 440px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
        }
        .auth-container h1 {
            color: #172554;
            margin-bottom: 1.5rem;
        }
        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .form-group label {
            font-weight: 500;
            color: #2c3e50;
        }
        .form-group input {
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }
        .auth-btn {
            background: #c1121f;
            color: white;
            padding: 0.8rem;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 700;
            transition: background 0.3s;
        }
        .auth-btn:hover {
            background: #a30f1a;
        }
        .auth-links {
            margin-top: 1rem;
            text-align: center;
        }
        .auth-links a {
            color: #3498db;
            text-decoration: none;
        }
        .auth-links a:hover {
            text-decoration: underline;
        }
        .error-message {
            color: #e74c3c;
            text-align: center;
            margin-bottom: 1rem;
        }
        .success-message {
            color: #27ae60;
            text-align: center;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body class="auth-page">
    <main class="auth-main">
        <div class="auth-container">
            <h1>Register</h1>
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            <?php if ($success): ?>
                <div class="success-message"><?php echo $success; ?></div>
            <?php endif; ?>
            
            <form method="POST" class="auth-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" required>
                </div>
                <button type="submit" class="auth-btn">Register</button>
            </form>
            
            <div class="auth-links">
                <p>Already have an account? <a href="login.php">Login here</a></p>
            </div>
        </div>
    </main>
</body>
</html> 
