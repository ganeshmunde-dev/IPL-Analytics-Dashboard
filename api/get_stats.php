<?php
header('Content-Type: application/json');

$host = '127.0.0.1';
$db   = 'ipl_analytics';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    $stmt = $pdo->query('SELECT * FROM season_stats LIMIT 1');
    $stats = $stmt->fetch();
    
    if (!$stats) {
        throw new Exception("No stats found");
    }
    echo json_encode($stats);
} catch (Exception $e) {
    // Fallback data for demonstration if DB is not imported yet
    echo json_encode([
        'total_matches' => 74,
        'total_overs' => 2900.5,
        'total_balls' => 17405,
        'total_runs' => 24500,
        'total_wickets' => 850,
        'total_fours' => 2100,
        'total_sixes' => 1150,
        'total_singles' => 7500,
        'total_doubles' => 1800,
        'total_triples' => 50,
        'total_dot_balls' => 6000,
        'total_extras' => 1200,
        'total_wides' => 600,
        'total_no_balls' => 100,
        'total_byes' => 200,
        'total_leg_byes' => 250,
        'total_overthrow_runs' => 50
    ]);
}
?>
