<?php
session_start();
require_once 'app/config/database.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['play_guest'])) {
        $_SESSION['username'] = 'Guest Player';
        $_SESSION['profile_image'] = 'default.png';
        $_SESSION['is_guest'] = true;
        unset($_SESSION['user_id']);
        header("Location: games/family_feud/familyfeud.html");
        exit();
    }

    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        $error = "Please fill in all fields";
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['profile_image'] = $user['profile_image'];
            header("Location: index.php");
            exit();
        } else {
            $error = "Invalid username or password";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Game Library</title>
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
            margin-bottom: 0.5rem;
        }
        .auth-intro {
            color: #64748b;
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
        .guest-form {
            margin-top: 1rem;
        }
        .guest-btn {
            width: 100%;
            background: white;
            color: #172554;
            padding: 0.8rem;
            border: 1px solid #cbd5e1;
            border-radius: 999px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 700;
            transition: border-color 0.3s, background 0.3s;
        }
        .guest-btn:hover {
            border-color: #172554;
            background: #f8fafc;
        }
        .auth-divider {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: #94a3b8;
            font-size: 0.85rem;
            margin: 1.25rem 0 0;
        }
        .auth-divider::before,
        .auth-divider::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #e2e8f0;
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
    </style>
</head>
<body class="auth-page">
    <main class="auth-main">
        <div class="auth-container">
            <h1>Login</h1>
            <p class="auth-intro">Sign in to keep your profile and points, or jump straight into Family Feud as a guest.</p>
            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
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
                <button type="submit" class="auth-btn">Login</button>
            </form>

            <div class="auth-divider">or</div>

            <form method="POST" class="guest-form">
                <button type="submit" name="play_guest" value="1" class="guest-btn">Play as Guest</button>
            </form>
            
            <div class="auth-links">
                <p>Don't have an account? <a href="register.php">Register here</a></p>
            </div>
        </div>
    </main>
</body>
</html> 
