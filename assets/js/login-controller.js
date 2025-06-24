document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    const errorContainer = document.getElementById('login-error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorContainer.textContent = ''; // Limpa erros antigos

        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, senha: senha })
            });

            const data = await response.json();

            if (!response.ok) {
                // Se a API retornar erro (ex: 401 Unauthorized), lança um erro com a mensagem dela
                throw new Error(data.message || 'Erro desconhecido ao tentar fazer login.');
            }

            // Se o login for bem-sucedido:
            alert('Login realizado com sucesso!');
            
            // 1. Guarda o estado de "logado" no navegador
            localStorage.setItem('isProfessionalLoggedIn', 'true');
            localStorage.setItem('userId', data.usuario.id); // Guarda o ID do usuário também
            
            // 2. Redireciona para a página principal, como solicitado
            window.location.href = 'index.html';

        } catch (error) {
            // Exibe a mensagem de erro vinda do backend ou uma mensagem padrão
            errorContainer.textContent = error.message;
        }
    });
});
