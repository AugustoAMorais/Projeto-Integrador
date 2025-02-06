// Variável que armazenará os alarmes ativos
let alarmList = [];
const alarmSound = new Audio("../mp3/iphone_alarm.mp3"); // Caminho correto do áudio

// Função que atualiza o relógio a cada segundo
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Verifica se há alarmes ativos e se algum bate com o horário atual
    alarmList.forEach(alarm => {
        if (alarm.horario === `${hours}:${minutes}` && seconds === "00") {
            playAlarm(alarm.nome_remedio);
        }
    });
}

// Função para tocar o alarme corretamente
function playAlarm(remedio) {
    alarmSound.play().catch(error => {
        console.error("Erro ao reproduzir o áudio:", error);
        alert("⚠️ O navegador bloqueou o áudio. Clique na tela antes de definir o alarme.");
    });

    // Criando um alerta visual
    const message = document.getElementById('alarmList');
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alarm-active");
    alertDiv.textContent = `⏰ ALERTA! Hora de tomar o medicamento: ${remedio}`;
    
    message.appendChild(alertDiv);

    // Remover o alerta após 10 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 10000);
}

// Função para definir o alarme e salvar no banco de dados
function setAlarm() {
    const alarmInput = document.getElementById("alarm").value;
    const inputRemedy = document.getElementById("remedy").value;
    const diasSemana = "1234567"; // Pode ser ajustado para dias específicos
    const somAlarme = "default.mp3"; // Som do alarme padrão

    if (alarmInput && inputRemedy) {
        fetch("http://localhost:3000/salvar-alarme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                horario: alarmInput,
                dias_semana: diasSemana,
                nome_remedio: inputRemedy,
                som_alarme: somAlarme
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                exibirAlarmes(); // Atualiza a lista de alarmes
            } else {
                alert("Erro ao salvar: " + data.message);
            }
        });
    } else {
        alert("Preencha todos os campos!");
    }
}

// Função para listar os alarmes salvos
function exibirAlarmes() {
    fetch("http://localhost:3000/listar-alarmes", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(alarmes => {
        alarmList = alarmes; // Atualiza a lista de alarmes ativos
        const alarmListDiv = document.getElementById("alarmList");
        alarmListDiv.innerHTML = ""; // Limpa a lista antes de atualizar

        alarmes.forEach(alarme => {
            const alarmeDiv = document.createElement("div");
            alarmeDiv.classList.add("alarm-item");
            alarmeDiv.innerHTML = `
                <p><strong>${alarme.nome_remedio}</strong> - ${alarme.horario} - Dias: ${alarme.dias_semana}</p>
                <button class="delete-btn" onclick="removerAlarme('${alarme.id}')">Remover</button>
            `;
            alarmListDiv.appendChild(alarmeDiv);
        });
    });
}

// Função para remover um alarme
function removerAlarme(id) {
    fetch(`http://localhost:3000/deletar-alarme/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            exibirAlarmes(); // Atualiza a lista após remover
        } else {
            alert("Erro ao remover: " + data.message);
        }
    });
}

// Função para cancelar todos os alarmes
function cancelAlarm() {
    alarmList = [];
    document.getElementById("alarmList").innerHTML = "Nenhum alarme ativo.";
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// **Botão de teste do áudio**
/*document.addEventListener("DOMContentLoaded", () => {
    const testButton = document.createElement("button");
    testButton.textContent = "🔊 Testar Alarme";
    testButton.classList.add("test-button");
    testButton.onclick = playAlarm;
    document.body.appendChild(testButton);
});*/

// Atualiza o relógio a cada 1 segundo
setInterval(updateClock, 1000);
