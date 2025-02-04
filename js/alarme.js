// Variável que armazenará o horário do alarme
let alarmTime = null;
const alarmSound = new Audio("../mp3/iphone_alarm.mp3"); // Caminho atualizado para a pasta correta

// Função que atualiza o relógio a cada segundo
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Verifica se a hora e os minutos correspondem ao alarme
    if (alarmTime && alarmTime === `${hours}:${minutes}` && seconds === "00") {
        playAlarm(); // Chama a função de reprodução
    }
}

// Função para tocar o alarme corretamente
function playAlarm() {
    alarmSound.play().catch(error => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("⚠️ O navegador bloqueou o áudio. Clique na tela antes de definir o alarme.");
    });
    const message = document.getElementById('message');
    message.textContent = "⏰ ALERTA! Hora de tomar o medicamento!";
    message.classList.add("alarm-active");
}

// Função para definir o alarme
function setAlarm() {
    const alarmInput = document.getElementById('alarm').value;
    const inputRemedy = document.getElementById('remedy').value;
    if (alarmInput) {
        alarmTime = alarmInput.substring(0, 5);
        const message = document.getElementById('message');
        message.textContent = `Nome do remédio: ${inputRemedy}\nAlarme definido para: ${alarmTime}`;
        message.style.textAlign = "center";
        message.classList.remove("alarm-active");
    }
    
}

// Função para cancelar o alarme
function cancelAlarm() {
    alarmTime = null;
    const message = document.getElementById('message');
    message.textContent = "Alarme cancelado.";
    message.classList.remove("alarm-active");
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// **Botão de teste do áudio**
/*cument.addEventListener("DOMContentLoaded", () => {
    const testButton = document.createElement("button");
    testButton.textContent = "🔊 Testar Alarme";
    testButton.style.marginTop = "20px";
    testButton.onclick = playAlarm;
    document.body.appendChild(testButton);
});
*/

// Atualiza o relógio a cada 1 segundo
setInterval(updateClock, 1000);