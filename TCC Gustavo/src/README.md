# TCC Gustavo — API e NPM

Este repositório contém o portfólio (frontend) e uma API de exemplo em Node.js (Express) para demonstrar integração.

## Configuração

1. Instale dependências:

```bash
npm install
```

2. Inicie em modo desenvolvimento (recarrega automaticamente):

```bash
npm run dev
```

3. Inicie em modo produção:

```bash
npm start
```

## Endpoints de exemplo

- `GET /api/status` — verifica status da API
- `GET /api/items` — lista itens em memória
- `POST /api/items` — cria um item (JSON: `{ "name": "exemplo", "value": 42 }`)

## Testar a integração

Inicie o servidor (`npm run dev` ou `npm start`) e abra o frontend servido pelo Express em:

- http://localhost:3000/  (redireciona para `TCC.html`) 
- ou http://localhost:3000/TCC.html

Clique em **Verificar API** e **Enviar Item teste** no rodapé para testar `GET /api/status` e `POST /api/items`.

> Observação: esta API é apenas para demonstração. Em produção, adicione validação, persistência e autenticação.
