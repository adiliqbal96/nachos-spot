<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$name = $input['navn'] ?? $_POST['navn'] ?? '';
$email = $input['email'] ?? $_POST['email'] ?? '';
$event = $input['event'] ?? $_POST['event'] ?? '';
$guests = $input['guests'] ?? $_POST['guests'] ?? '';
$date = $input['dato'] ?? $_POST['dato'] ?? '';
$message_body = $input['message'] ?? $_POST['message'] ?? '';

if(empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Navn og e-mail er påkrævet."]);
    exit();
}

$to = "Nachosspott@gmail.com";
$subject = "Ny Booking Forespørgsel fra " . htmlspecialchars($name);

$body = "Du har modtaget en ny booking forespørgsel gennem din Nachos Spot hjemmeside:\n\n";
$body .= "--------------------------------------------------------\n";
$body .= "Navn:             " . strip_tags($name) . "\n";
$body .= "E-mail:           " . strip_tags($email) . "\n";
$body .= "Event Type:       " . strip_tags($event) . "\n";
$body .= "Antal gæster:     " . strip_tags($guests) . "\n";
$body .= "Dato / Lokation:  " . strip_tags($date) . "\n";
$body .= "--------------------------------------------------------\n";
$body .= "Fritekst Besked:\n" . strip_tags($message_body) . "\n";

$serverName = isset($_SERVER['SERVER_NAME']) && $_SERVER['SERVER_NAME'] !== '' ? $_SERVER['SERVER_NAME'] : 'nachosspot.dk';

$headers = "From: noreply@" . $serverName . "\r\n";
$headers .= "Reply-To: " . strip_tags($email) . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if(mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["success" => true]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Serverfejl. E-mail kunne ikke afsendes."]);
}
?>
