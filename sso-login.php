<?php
/**
 * ═══════════════════════════════════════════════════
 * UNIVERSAL CENTRAL DEMO AUTHENTICATION SYSTEM (UCDAS)
 * Project SSO Adapter for IPL Analytics Hub
 * ═══════════════════════════════════════════════════
 */

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$role = trim($_GET['role'] ?? 'analyst');

$_SESSION['user_role'] = $role;
$_SESSION['user_name'] = ($role === 'viewer') ? 'Match Scout' : 'Chief Analyst';

header('Location: index.html');
exit;
