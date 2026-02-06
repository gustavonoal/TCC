const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (frontend) a partir da raiz do projeto
app.use(express.static(path.join(__dirname, '..')));

// In-memory store for demo
const items = [];
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name, value } = req.body;
  if (!name) return res.status(400).json({ error: 'Campo "name" é obrigatório' });
  const item = { id: items.length + 1, name, value: value || null, createdAt: new Date() };
  items.push(item);
  res.status(201).json(item);
});

// Rota raiz: enviar o `TCC.html` para facilitar o acesso
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'TCC.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} — frontend: /TCC.html`);
});