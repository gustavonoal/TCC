<?php
// Configuração do banco de dados
$host = 'localhost';
$user = 'root'; // Altere conforme seu MySQL
$password = ''; // Deixe em branco se não tiver senha
$database = 'tcc_gustavo';

// Criar conexão
$conn = new mysqli($host, $user, $password);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexão falhou: ' . $conn->connect_error]));
}

// Criar banco de dados se não existir
$conn->query("CREATE DATABASE IF NOT EXISTS $database");
$conn->select_db($database);

// Criar tabela de itens se não existir
$sql = "CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($sql)) {
    die(json_encode(['error' => 'Erro ao criar tabela: ' . $conn->error]));
}

// Habilitar CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
