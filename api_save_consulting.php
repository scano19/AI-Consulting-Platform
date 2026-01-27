<?php
// api_save_consulting.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS if needed

require_once 'db_config.php';

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Get JSON Input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Sanitize & Extract Data
$business_name = htmlspecialchars($input['name'] ?? 'N/A');
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$industry = htmlspecialchars($input['industry'] ?? 'general');
$capacity = htmlspecialchars($input['capacity'] ?? '');
$revenue = htmlspecialchars($input['revenue'] ?? '');
$tools = htmlspecialchars($input['tools'] ?? '');
$priority = htmlspecialchars($input['priority'] ?? '');
$timeline = htmlspecialchars($input['timeline'] ?? '');
$budget = htmlspecialchars($input['budget'] ?? '');
$challenge = htmlspecialchars($input['challenge'] ?? '');

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Invalid Email']);
    exit;
}

// 1. SAVE TO DATABASE
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $stmt = $pdo->prepare("INSERT INTO leads (business_name, email, industry, capacity, revenue, tools, priority, timeline, budget, challenge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$business_name, $email, $industry, $capacity, $revenue, $tools, $priority, $timeline, $budget, $challenge]);

} catch (PDOException $e) {
    // Log error but attempt to send email anyway? Or die?
    // For now, return error to debug
    error_log("DB Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database Error: ' . $e->getMessage()]);
    exit;
}

// 2. SEND HTML EMAIL
$subject = "Tu Blueprint Estratégico IA - SercaIA";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: " . EMAIL_NAME . " <" . EMAIL_FROM . ">" . "\r\n";
// $headers .= "Bcc: admin@sercaia.com" . "\r\n"; // Optional: receive a copy

$message = "
<!DOCTYPE html>
<html>
<head>
<style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px; }
    .container { background-color: #fff; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
    h1 { color: #38bdf8; }
    .highlight { color: #facc15; font-weight: bold; }
    .footer { font-size: 12px; color: #888; margin-top: 30px; text-align: center; }
</style>
</head>
<body>
    <div class='container'>
        <h1>Blueprint Generado con Éxito</h1>
        <p>Hola <strong>$business_name</strong>,</p>
        <p>Gracias por utilizar el motor de consultoría SercaIA. Hemos analizado tu caso para el sector <strong>$industry</strong>.</p>
        
        <h3>Resumen de Análisis:</h3>
        <ul>
            <li><strong>Reto Principal:</strong> $challenge</li>
            <li><strong>Prioridad:</strong> $priority</li>
            <li><strong>Herramientas:</strong> $tools</li>
        </ul>

        <p>Tu informe detallado con el <strong>Cálculo de Ahorro</strong> y la <strong>Estrategia de Implementación</strong> está listo. Puedes volver a la web para verlo en detalle o responder a este correo para agendar una sesión técnica de validación.</p>

        <p><a href='https://www.sercaia.com' style='background-color: #38bdf8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;'>Volver a SercaIA</a></p>

        <div class='footer'>
            &copy; 2026 SercaIA. Inteligencia Artificial Estratégica.
        </div>
    </div>
</body>
</html>
";

$mailSent = mail($email, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Blueprint sent & Saved']);
} else {
    echo json_encode(['success' => true, 'message' => 'Saved to DB, but Email failed (Check server logs)']);
}
?>
