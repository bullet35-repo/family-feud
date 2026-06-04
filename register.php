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
    <title>Register - Family Feud</title>
    <link rel="stylesheet" href="public/assets/css/style.css">
    <style>
        body.auth-page {
            min-height: 100vh;
            background:
                linear-gradient(135deg, rgba(7, 26, 61, 0.96), rgba(10, 58, 126, 0.9)),
                url("games/family_feud/assets/images/Family-Feud.jpg") center / cover no-repeat;
            color: #f8fafc;
        }
        .auth-main {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
        }
        .auth-container {
            width: min(980px, 100%);
            padding: 1rem;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(280px, 0.85fr);
            gap: 1rem;
            background: rgba(7, 26, 61, 0.94);
            border-radius: 24px;
            box-shadow: 0 34px 90px rgba(2, 6, 23, 0.55);
            border: 3px solid #ffd700;
            position: relative;
            overflow: hidden;
        }
        .auth-container::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 28%), radial-gradient(circle at bottom left, rgba(251, 191, 36, 0.14), transparent 22%);
            pointer-events: none;
        }
        .auth-content {
            position: relative;
            z-index: 1;
            padding: clamp(1.25rem, 4vw, 2rem);
        }
        .logo-banner {
            display: inline-flex;
            align-items: center;
            gap: 0.9rem;
            margin-bottom: 1.4rem;
            padding: 0.75rem 1rem;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 215, 0, 0.48);
        }
        .logo-circle {
            width: 46px;
            height: 46px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            color: #0f172a;
            font-weight: 900;
            font-size: 1.15rem;
            box-shadow: 0 8px 20px rgba(248, 113, 113, 0.25);
        }
        .auth-container h1 {
            color: #ffd700;
            margin: 0;
            font-size: clamp(2.8rem, 7vw, 4.2rem);
            line-height: 0.95;
            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }
        .auth-intro {
            color: #cbd5e1;
            margin: 1rem 0 1.5rem;
            line-height: 1.7;
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
            font-weight: 800;
            color: #e2e8f0;
        }
        .form-group input {
            padding: 0.95rem 1rem;
            border: 1px solid rgba(148, 163, 184, 0.24);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.1);
            color: #f8fafc;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .form-group input:focus {
            border-color: rgba(37, 99, 235, 0.75);
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
        }
        .auth-btn {
            background: linear-gradient(135deg, #ff6b1a, #c41220);
            color: white;
            padding: 0.95rem 1rem;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 18px 30px rgba(239, 68, 68, 0.18);
        }
        .auth-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 22px 38px rgba(239, 68, 68, 0.25);
        }
        .auth-links {
            margin-top: 1rem;
            text-align: center;
            color: #cbd5e1;
        }
        .auth-links a {
            color: #60a5fa;
            text-decoration: none;
            font-weight: 600;
        }
        .auth-links a:hover {
            text-decoration: underline;
        }
        .error-message,
        .success-message {
            border-radius: 20px;
            padding: 0.9rem 1rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        .error-message {
            background: rgba(239, 68, 68, 0.12);
            color: #fecaca;
        }
        .success-message {
            background: rgba(34, 197, 94, 0.14);
            color: #d1fae5;
        }
        .logo-subtitle {
            font-size: 0.85rem;
            color: #cbd5e1;
        }
        .auth-visual {
            position: relative;
            z-index: 1;
            min-height: 100%;
            border-radius: 18px;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            overflow: hidden;
            background:
                linear-gradient(180deg, rgba(7, 26, 61, 0.1), rgba(7, 26, 61, 0.95)),
                url("games/family_feud/assets/images/logo.png") center 20% / min(82%, 330px) auto no-repeat,
                linear-gradient(135deg, #0d4c91, #92064c);
            border: 1px solid rgba(255, 215, 0, 0.4);
        }
        .auth-visual h2 {
            color: #ffd700;
            font-size: 2rem;
            line-height: 1;
            margin-bottom: 0.7rem;
            text-shadow: 0 4px 10px rgba(0,0,0,0.35);
        }
        .auth-visual p {
            color: rgba(255,255,255,0.84);
            line-height: 1.5;
        }
        .score-strip {
            display: grid;
            gap: 0.55rem;
            margin-bottom: 1rem;
        }
        .score-strip div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.7rem 0.9rem;
            border-radius: 12px;
            background: rgba(0, 0, 0, 0.28);
            border: 1px solid rgba(255,255,255,0.1);
            font-weight: 800;
        }
        .score-strip span {
            color: #ffd700;
        }
        @media (max-width: 820px) {
            .auth-container {
                grid-template-columns: 1fr;
            }
            .auth-visual {
                min-height: 240px;
                order: -1;
            }
        }
    </style>
</head>
<body class="auth-page">
    <main class="auth-main">
        <div class="auth-container">
            <div class="auth-content">
                <div class="logo-banner">
                    <div class="logo-circle">FF</div>
                    <div>
                        <strong>Family Feud</strong>
                        <div class="logo-subtitle">Create a new player profile</div>
                    </div>
                </div>
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
        <aside class="auth-visual" aria-label="Family Feud preview">
            <div class="score-strip">
                <div><strong>New Profile</strong><span>Save</span></div>
                <div><strong>Leaderboard</strong><span>Ready</span></div>
                <div><strong>Guest Play</strong><span>Open</span></div>
            </div>
            <h2>Create Your Player Card</h2>
            <p>Register to keep your profile, points, and future Family Feud records.</p>
        </aside>
        </div>
    </main>
</body>
</html> 
