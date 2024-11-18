document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    // Pegando os dados do formulário
    const userId = document.getElementById('user-id').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
  
    // Enviando os dados para o backend
    const response = await fetch('http://localhost:3000/consumption/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        amount,
        date,
      }),
    });
  
    if (response.ok) {
      console.log('Consumo registrado com sucesso');
    } else {
      const errorData = await response.json();
      console.log('Erro ao registrar consumo:', errorData);
    }
  });
  