let clickCount = 0;
function incrementClickCount() {
    clickCount += 1;
}
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Altere entre 'node' ou 'php' conforme necessário
const API_TYPE = 'php'; // 'node' para Node.js, 'php' para PHP
const API_BASE = API_TYPE === 'php' 
    ? 'http://localhost/TCC%20Gustavo-20260126T161641Z-3-001/TCC%20Gustavo/TCC%20Gustavo-20260116T163411Z-1-001-20260119T163122Z-1-001/TCC%20Gustavo/TCC%20Gustavo/src/api.php'
    : 'http://localhost:3000/api';

async function checkApiStatus() {
    const el = document.getElementById('api-status');
    if (!el) return;
    el.textContent = 'Buscando...';
    try {
        const url = `${API_BASE}?action=status`;
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const apiName = API_TYPE === 'php' ? 'PHP/MySQL' : 'Node.js';
        el.textContent = `API: ${data.status} (v${data.version}) - ${apiName}`;
    } catch (err) {
        el.textContent = 'API indisponível';
        console.error('Erro ao verificar API:', err);
    }
}

async function sendTestItem() {
    try {
        const res = await fetch(`${API_BASE}?action=items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Teste do frontend', value: clickCount })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Item criado: ' + JSON.stringify(data));
        } else {
            alert('Erro: ' + (data.error || JSON.stringify(data)));
        }
    } catch (err) {
        alert('Falha ao enviar item');
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => incrementClickCount());
    });
    const cards = document.querySelectorAll('.projeto-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
    });
    const btnDemos = document.querySelectorAll('.btn-demo'); 
    
    btnDemos.forEach(btnDemo => {
        btnDemo.addEventListener('click', function(event) {
            if (btnDemo.getAttribute('href') === '#') {
                event.preventDefault();
                alert('O link de demonstração ainda não está disponível. Atualize o HTML com o link do projeto.');
                return;
            }

            incrementClickCount();
        });
    });

    const btnCheck = document.getElementById('btn-check-api');
    if (btnCheck) btnCheck.addEventListener('click', checkApiStatus);

    const btnSend = document.getElementById('btn-send-item');
    if (btnSend) btnSend.addEventListener('click', sendTestItem);
});

function validarFormulario(form) {
    const inputs = Array.from(form.querySelectorAll('input, textarea'));
    for (const input of inputs) {
        if (input.required && !input.value.trim()) {
            return false;
        }
    }
    return true;
}