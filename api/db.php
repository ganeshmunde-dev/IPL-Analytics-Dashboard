<?php
$host = '127.0.0.1';
$db   = 'ipldashboard';
$user = 'root';
$pass = 'YOUR_DATABASE_PASSWORD'; // Default XAMPP password is empty
$charset = 'ipldashboard';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // Return a JSON error if connection fails so the frontend can handle it
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>
