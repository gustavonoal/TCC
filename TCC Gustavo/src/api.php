<?php
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$action = isset($_GET['action']) ? $_GET['action'] : null;

// Status da API
if (($action === 'status' || strpos($path, '/api/status') !== false) && $method === 'GET') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'version' => '1.0.0']);
    exit();
}

// GET todos os itens
if (($action === 'items' || strpos($path, '/api/items') !== false) && $method === 'GET') {
    $result = $conn->query("SELECT id, name, value, createdAt FROM items ORDER BY createdAt DESC");
    $items = [];
    
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
    }
    
    header('Content-Type: application/json');
    echo json_encode($items);
    exit();
}

// POST novo item
if (($action === 'items' || strpos($path, '/api/items') !== false) && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['name']) || empty($data['name'])) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Campo "name" é obrigatório']);
        exit();
    }
    
    $name = $conn->real_escape_string($data['name']);
    $value = isset($data['value']) ? (int)$data['value'] : 0;
    
    if ($conn->query("INSERT INTO items (name, value) VALUES ('$name', $value)")) {
        $id = $conn->insert_id;
        http_response_code(201);
        header('Content-Type: application/json');
        echo json_encode([
            'id' => $id,
            'name' => $data['name'],
            'value' => $value,
            'createdAt' => date('Y-m-d H:i:s')
        ]);
    } else {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => $conn->error]);
    }
    exit();
}

// PUT atualizar item
if (strpos($path, '/api/items/') !== false && $method === 'PUT') {
    preg_match('/\/api\/items\/(\d+)/', $path, $matches);
    $id = isset($matches[1]) ? (int)$matches[1] : 0;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID inválido']);
        exit();
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    $name = isset($data['name']) ? $conn->real_escape_string($data['name']) : null;
    $value = isset($data['value']) ? (int)$data['value'] : null;
    
    $updates = [];
    if ($name) $updates[] = "name = '$name'";
    if ($value !== null) $updates[] = "value = $value";
    
    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['error' => 'Nenhum campo para atualizar']);
        exit();
    }
    
    $sql = "UPDATE items SET " . implode(', ', $updates) . " WHERE id = $id";
    
    if ($conn->query($sql)) {
        echo json_encode(['message' => 'Item atualizado com sucesso']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
    exit();
}

// DELETE item
if (strpos($path, '/api/items/') !== false && $method === 'DELETE') {
    preg_match('/\/api\/items\/(\d+)/', $path, $matches);
    $id = isset($matches[1]) ? (int)$matches[1] : 0;
    
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID inválido']);
        exit();
    }
    
    if ($conn->query("DELETE FROM items WHERE id = $id")) {
        echo json_encode(['message' => 'Item deletado com sucesso']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
    }
    exit();
}

// Rota não encontrada
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['error' => 'Rota não encontrada']);
?>
