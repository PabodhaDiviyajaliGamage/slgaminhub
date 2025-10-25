<?php
session_start(); // Start session

$conn = new mysqli("localhost", "root", "", "slgaminghub");

// Check DB connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['login'])) {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Secure SQL query
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if email exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id, $hashedPassword);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashedPassword)) {
            // Save user session
            $_SESSION['user_id'] = $user_id;
            $_SESSION['email'] = $email;

            // Redirect to homepage
            header("Location: index.php");
            exit();
        } else {
            echo "<script>alert('⚠️ Invalid Password!'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('⚠️ Email not found!'); window.location.href='login.html';</script>";
    }

    $stmt->close();
}

$conn->close();
?>