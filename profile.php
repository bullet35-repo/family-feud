<?php
session_start();
require_once 'app/config/database.php';

// Debug information
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Debug POST data
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    error_log("POST data: " . print_r($_POST, true));
}

$error = '';
$success = '';

// Get user information
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

// Handle profile update
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['update_profile'])) {
        $new_username = trim($_POST['username']);
        $current_password = $_POST['current_password'];
        $new_password = $_POST['new_password'];
        $confirm_password = $_POST['confirm_password'];

        // Verify current password
        if (!password_verify($current_password, $user['password'])) {
            $error = "Current password is incorrect";
        } else {
            // Check if new username is different and already exists
            if ($new_username !== $user['username']) {
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = ? AND id != ?");
                $stmt->execute([$new_username, $_SESSION['user_id']]);
                if ($stmt->fetchColumn() > 0) {
                    $error = "Username already exists";
                }
            }

            if (empty($error)) {
                try {
                    if (!empty($new_password)) {
                        // Update username and password
                        if ($new_password !== $confirm_password) {
                            $error = "New passwords do not match";
                        } elseif (strlen($new_password) < 6) {
                            $error = "New password must be at least 6 characters long";
                        } else {
                            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
                            $stmt = $pdo->prepare("UPDATE users SET username = ?, password = ? WHERE id = ?");
                            $stmt->execute([$new_username, $hashed_password, $_SESSION['user_id']]);
                        }
                    } else {
                        // Update only username
                        $stmt = $pdo->prepare("UPDATE users SET username = ? WHERE id = ?");
                        $stmt->execute([$new_username, $_SESSION['user_id']]);
                    }

                    if (empty($error)) {
                        $_SESSION['username'] = $new_username;
                        $success = "Profile updated successfully";
                        // Refresh user data
                        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
                        $stmt->execute([$_SESSION['user_id']]);
                        $user = $stmt->fetch();
                    }
                } catch(PDOException $e) {
                    $error = "Update failed. Please try again.";
                }
            }
        }
    }

    // Handle profile image upload
    if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
        $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
        $max_size = 5 * 1024 * 1024; // 5MB

        if (!in_array($_FILES['profile_image']['type'], $allowed_types)) {
            $error = "Only JPG, PNG, and GIF images are allowed";
        } elseif ($_FILES['profile_image']['size'] > $max_size) {
            $error = "Image size must be less than 5MB";
        } else {
            $file_extension = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
            $new_filename = 'profile_' . $_SESSION['user_id'] . '_' . time() . '.' . $file_extension;
            $upload_path = 'public/assets/images/profiles/' . $new_filename;

            if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $upload_path)) {
                // Delete old profile image if it's not the default
                if ($user['profile_image'] !== 'default.png') {
                    $old_image_path = 'public/assets/images/profiles/' . $user['profile_image'];
                    if (file_exists($old_image_path)) {
                        unlink($old_image_path);
                    }
                }

                // Update database with new image filename
                $stmt = $pdo->prepare("UPDATE users SET profile_image = ? WHERE id = ?");
                $stmt->execute([$new_filename, $_SESSION['user_id']]);
                
                // Update session with new profile image
                $_SESSION['profile_image'] = $new_filename;
                
                $success = "Profile image updated successfully";
                // Refresh user data
                $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
                $stmt->execute([$_SESSION['user_id']]);
                $user = $stmt->fetch();
            } else {
                $error = "Failed to upload image. Please try again.";
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
    <title>Profile - Game Library</title>
    <link rel="stylesheet" href="public/assets/css/style.css">
    <style>
        .profile-container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        .profile-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .profile-image-container {
            text-align: center;
            margin-bottom: 2rem;
        }
        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #2c3e50;
            margin-bottom: 1rem;
        }
        .profile-image-form {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid #eee;
        }
        .profile-info {
            margin-bottom: 2rem;
        }
        .profile-info p {
            margin: 0.5rem 0;
            color: #666;
        }
        .profile-info strong {
            color: #2c3e50;
        }
        .profile-form {
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
        .update-btn {
            background: #2c3e50;
            color: white;
            padding: 0.8rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;
        }
        .update-btn:hover {
            background: #34495e;
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
        .image-upload-btn {
            background: #3498db;
            color: white;
            padding: 0.8rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;
            display: inline-block;
        }
        .image-upload-btn:hover {
            background: #2980b9;
        }
        .image-upload-input {
            display: none;
        }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">Game Library</div>
            <ul class="nav-links">
                <li><a href="index.php">Home</a></li>
                <li><a href="index.php#games">Games</a></li>
                <li><a href="index.php#about">About</a></li>
                <li><a href="profile.php">Profile</a></li>
                <li><a href="logout.php" class="logout-btn">Logout</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="profile-container">
            <div class="profile-header">
                <h1>Profile</h1>
            </div>

            <?php if ($error): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            <?php if ($success): ?>
                <div class="success-message"><?php echo $success; ?></div>
            <?php endif; ?>

            <div class="profile-image-container">
                <img src="public/assets/images/profiles/<?php echo htmlspecialchars($user['profile_image']); ?>" 
                     alt="Profile Image" 
                     class="profile-image"
                     onerror="this.src='public/assets/images/profiles/default.png'">
                
                <form method="POST" enctype="multipart/form-data" class="profile-image-form">
                    <input type="file" 
                           name="profile_image" 
                           id="profile_image" 
                           class="image-upload-input" 
                           accept="image/*"
                           onchange="this.form.submit()">
                    <label for="profile_image" class="image-upload-btn">Change Profile Picture</label>
                </form>
            </div>

            <div class="profile-info">
                <p><strong>Username:</strong> <?php echo htmlspecialchars($user['username']); ?></p>
                <p><strong>Member since:</strong> <?php echo date('F j, Y', strtotime($user['created_at'])); ?></p>
            </div>

            <form method="POST" class="profile-form">
                <h2>Update Profile</h2>
                <div class="form-group">
                    <label for="username">New Username</label>
                    <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
                </div>
                <div class="form-group">
                    <label for="current_password">Current Password</label>
                    <input type="password" id="current_password" name="current_password" required>
                </div>
                <div class="form-group">
                    <label for="new_password">New Password (leave blank to keep current)</label>
                    <input type="password" id="new_password" name="new_password">
                </div>
                <div class="form-group">
                    <label for="confirm_password">Confirm New Password</label>
                    <input type="password" id="confirm_password" name="confirm_password">
                </div>
                <button type="submit" name="update_profile" class="update-btn">Update Profile</button>
            </form>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 Game Library. All rights reserved.</p>
    </footer>
</body>
</html> 
