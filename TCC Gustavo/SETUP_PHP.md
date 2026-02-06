# Setup PHP com MySQL para o TCC

## Pré-requisitos
- PHP 7.4+ instalado
- MySQL Server instalado

## Passos para configurar

### 1. Verificar se PHP está instalado
```bash
php --version
```

### 2. Verificar se MySQL está instalado
```bash
mysql --version
```

### 3. Iniciar MySQL (se necessário)
**Windows (cmd como admin):**
```bash
net start MySQL80
```

### 4. Rodar servidor PHP
Na pasta do projeto (`src`), execute:
```bash
cd src
php -S localhost:8000
```

O servidor estará disponível em: `http://localhost:8000`

### 5. Acessar a API
- **Status**: `http://localhost:8000/api.php?action=status`
- **Listar itens**: `http://localhost:8000/api.php` (GET)
- **Criar item**: `http://localhost:8000/api.php` (POST)

## Configurar credenciais MySQL

Se você usa usuário e senha diferentes, abra `src/config.php` e altere:

```php
$user = 'GNoal'; // Mude aqui
$password = '1234'; // Mude aqui
```

## Usar Node.js + Express (alternativo)

Se preferir continuar com Node.js, execute na raiz do projeto:
```bash
npm install
npm start
```

## Alternância entre Node.js e PHP

No arquivo `TCC/TCC.js`, mude a variável `API_TYPE`:
- `API_TYPE = 'node'` - para usar Node.js
- `API_TYPE = 'php'` - para usar PHP/MySQL

---

**Dúvidas?** Edite o arquivo conforme necessário!
