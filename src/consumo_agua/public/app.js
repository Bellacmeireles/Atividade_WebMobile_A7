document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const formHistorico = document.getElementById('form-historico');
    const formAlerta = document.getElementById('form-alerta');

    // Cadastro de Consumo
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (event) => {
            event.preventDefault();

            const userId = document.getElementById('userId').value;
            const amount = document.getElementById('amount').value;
            const date = document.getElementById('date').value;

            const response = await fetch('/consumption/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, amount, date }),
            });

            if (response.ok) {
                alert('Consumo registrado com sucesso!');
            } else {
                alert('Erro ao registrar consumo.');
            }
        });
    }

    // Histórico de Consumo
    if (formHistorico) {
        formHistorico.addEventListener('submit', async (event) => {
            event.preventDefault();

            const userId = document.getElementById('userId').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;

            const response = await fetch(`/consumption/history?userId=${userId}&startDate=${startDate}&endDate=${endDate}`);
            const data = await response.json();

            const tableBody = document.getElementById('historico-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear table
            data.forEach((consumption) => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = consumption.date;
                row.insertCell(1).textContent = consumption.amount;
            });
        });
    }

    // Alertas de Consumo Elevado
    if (formAlerta) {
        formAlerta.addEventListener('submit', async (event) => {
            event.preventDefault();

            const userId = document.getElementById('userId').value;

            // Enviar requisição para o backend para verificar alertas de consumo elevado
            const response = await fetch(`/consumption/alert?userId=${userId}`);
            const message = await response.text();

            document.getElementById('alerta-message').textContent = message;
        });
    }
});
