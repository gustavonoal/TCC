const CORRECT_PASSWORD = 'GNoal';
let sessionActive = false;
let sessionStartTime = null;
let changesCount = 0;

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const clockLogin = document.getElementById('clockLogin');
    if (clockLogin) {
        clockLogin.textContent = timeString;
    }

    const clockDashboard = document.getElementById('clockDashboard');
    if (clockDashboard) {
        clockDashboard.textContent = timeString;
    }

    const dateDisplay = document.getElementById('dateDisplay');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('pt-BR', options);
        dateDisplay.textContent = dateString;
    }
}

function updateUptime() {
    if (!sessionStartTime) return;

    const now = new Date();
    const elapsed = Math.floor((now - sessionStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    let uptimeString = '';
    if (hours > 0) uptimeString += `${hours}h `;
    if (minutes > 0) uptimeString += `${minutes}m `;
    uptimeString += `${seconds}s`;

    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        uptimeElement.textContent = uptimeString;
    }
}

function handleLogin(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    const errorDiv = document.getElementById('loginError');

    if (password === CORRECT_PASSWORD) {
        sessionActive = true;
        sessionStartTime = new Date();
        changesCount = 0;

        passwordInput.value = '';
        errorDiv.classList.remove('show');

        window.location.href = '../TCC/TCC.html';
    } else {
        errorDiv.textContent = '❌ Senha incorreta!';
        errorDiv.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function logout() {
    sessionActive = false;
    sessionStartTime = null;

    document.getElementById('loginContainer').classList.add('active');
    document.getElementById('dashboardContainer').classList.remove('active');

    document.getElementById('valueFrom').textContent = 'Inativo';
    document.getElementById('valueTo').textContent = 'Inativo';
    document.getElementById('outputFrom').classList.remove('active');
    document.getElementById('outputFrom').classList.add('inactive');
    document.getElementById('outputTo').classList.remove('active');
    document.getElementById('outputTo').classList.add('inactive');
    document.getElementById('statusFrom').textContent = '●';
    document.getElementById('statusTo').textContent = '●';
    document.getElementById('changes').textContent = '0';
    document.getElementById('password').focus();

    addHistoryItem('Usuário desconectado');
}


function setOutputFrom(status) {
    const outputDiv = document.getElementById('outputFrom');
    const valueSpan = document.getElementById('valueFrom');
    const statusIndicator = document.getElementById('statusFrom');

    valueSpan.textContent = status;
    changesCount++;

    if (status === 'Ativo') {
        outputDiv.classList.add('active');
        outputDiv.classList.remove('inactive');
        statusIndicator.textContent = '●';
    } else {
        outputDiv.classList.remove('active');
        outputDiv.classList.add('inactive');
        statusIndicator.textContent = '●';
    }

    updateChangesCount();
    addHistoryItem(`Saída (De) alterada para: ${status}`);
}

function setOutputTo(status) {
    const outputDiv = document.getElementById('outputTo');
    const valueSpan = document.getElementById('valueTo');
    const statusIndicator = document.getElementById('statusTo');

    valueSpan.textContent = status;
    changesCount++;

    if (status === 'Ativo') {
        outputDiv.classList.add('active');
        outputDiv.classList.remove('inactive');
        statusIndicator.textContent = '●';
    } else {
        outputDiv.classList.remove('active');
        outputDiv.classList.add('inactive');
        statusIndicator.textContent = '●';
    }

    updateChangesCount();
    addHistoryItem(`Entrada (Para) alterada para: ${status}`);
}

function updateChangesCount() {
    const changesElement = document.getElementById('changes');
    if (changesElement) {
        changesElement.textContent = changesCount;
    }
}

function updateGeneralStatus() {
    const valueFrom = document.getElementById('valueFrom').textContent;
    const valueTo = document.getElementById('valueTo').textContent;
    const generalStatus = document.getElementById('generalStatus');

    if (valueFrom === 'Ativo' || valueTo === 'Ativo') {
        generalStatus.textContent = 'Ativo';
        generalStatus.style.color = '#27ae60';
    } else {
        generalStatus.textContent = 'Inativo';
        generalStatus.style.color = '#e74c3c';
    }
}

function addHistoryItem(text) {
    const historyList = document.getElementById('historyList');
    const now = new Date();
    const timeString = String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = `[${timeString}] ${text}`;

    historyList.insertBefore(historyItem, historyList.firstChild);

    while (historyList.children.length > 50) {
        historyList.removeChild(historyList.lastChild);
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    updateClock();
    setInterval(updateClock, 100);

    setInterval(updateUptime, 1000);

    setInterval(updateGeneralStatus, 1000);

    document.getElementById('password').focus();
});
