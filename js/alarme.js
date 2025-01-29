// Variável que armazenará o horário do alarme
        let alarmTime = null;
    
        // Função que atualiza o relógio a cada segundo
        function updateClock() {
            // Obtém a hora atual
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0'); // Obtém a hora e formata com 2 dígitos
            const minutes = now.getMinutes().toString().padStart(2, '0'); // Obtém os minutos e formata com 2 dígitos
            const seconds = now.getSeconds().toString().padStart(2, '0'); // Obtém os segundos e formata com 2 dígitos
            
            // Atualiza o conteúdo da div que exibe o relógio
            document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    
            // Verifica se a hora atual corresponde ao alarme configurado
            if (alarmTime && alarmTime === `${hours}:${minutes}`) {
                // Se for o horário do alarme, toca o som e exibe a mensagem de alerta
                const alarmSound = document.getElementById('alarmSound');
                alarmSound.play(); // Toca o som do alarme
                const message = document.getElementById('message');
                message.textContent = "⏰ ALERTA! Hora de tomar o medicamento"; // Mensagem de alerta
                message.classList.add("alarm-active"); // Aplica a classe CSS para ativar o estilo do alerta
                alarmTime = null; // Reseta o horário do alarme após tocar
            }
        }
    
        // Função para definir o alarme com base no valor do input
        function setAlarm() {
            // Obtém o valor do input do alarme
            const alarmInput = document.getElementById('alarm').value;
            if (alarmInput) {
                // Extrai apenas a hora e os minutos (primeiros 5 caracteres)
                alarmTime = alarmInput.substring(0, 5); 
                const message = document.getElementById('message');
                message.textContent = `Alarme definido para: ${alarmTime}`; // Exibe mensagem com o horário do alarme
                message.classList.remove("alarm-active"); // Remove a classe CSS caso o alarme tenha sido resetado
            }
        }
    
        // Função para cancelar o alarme
        function cancelAlarm() {
            alarmTime = null; // Reseta o horário do alarme
            const message = document.getElementById('message');
            message.textContent = "Alarme cancelado."; // Exibe mensagem de cancelamento
            message.classList.remove("alarm-active"); // Remove a classe CSS do alerta
        }
    
        // Atualiza o relógio a cada 1 segundo (1000 milissegundos)
        setInterval(updateClock, 1000);