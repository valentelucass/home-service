/* =================================================================== */
/* --- Módulo: signup-controller.js (Com Validação de E-mail) --- */
/* =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const plano = urlParams.get('plano');
    
    const signupForm = document.querySelector('#signup-form');
    if (!signupForm) return;

    // --- SELEÇÃO DE ELEMENTOS ---
    const formSteps = Array.from(signupForm.querySelectorAll('.form-step'));
    const nextButtons = signupForm.querySelectorAll('.next-step');
    const prevButtons = signupForm.querySelectorAll('.prev-step');
    const progressBar = document.querySelector('.progress-bar-animated'); 
    const progressSteps = document.querySelectorAll('.progress-steps .progress-step');
    const categorySelect = document.getElementById('professional-category');
    const servicesContainer = document.getElementById('services-checkbox-container');
    
    // Elementos para a nova validação de e-mail
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const firstNextButton = formSteps[0].querySelector('.next-step');

    let currentStepIndex = 0;
    
    // --- FUNÇÕES ---

    function updateUI(stepIndex) {
        // ... (código da função updateUI que já tínhamos, sem alterações)
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        if (progressBar && progressSteps.length > 0) {
            const totalSteps = formSteps.length;
            const progressPercentage = stepIndex > 0 ? (stepIndex / (totalSteps - 1)) * 100 : 0;
            progressBar.style.width = `${progressPercentage}%`;

            progressSteps.forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index < stepIndex) {
                    step.classList.add('completed');
                } else if (index === stepIndex) {
                    step.classList.add('active');
                }
            });
        }
        
        currentStepIndex = stepIndex;

        if (currentStepIndex === formSteps.length - 1) {
            populateReview();
        }
    }

    // ---> NOVA FUNÇÃO PARA VERIFICAR O E-MAIL
    async function checkEmailExists() {
        const email = emailInput.value.trim();
        
        // Só verifica se o e-mail parece válido
        if (email.length < 5 || !email.includes('@')) {
            emailError.textContent = '';
            firstNextButton.disabled = false;
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/check-email?email=${encodeURIComponent(email)}`);
            const data = await response.json();

            if (data.exists) {
                emailError.textContent = 'Este e-mail já está em uso. Tente outro.';
                firstNextButton.disabled = true; // Desabilita o botão
                firstNextButton.style.opacity = '0.5';
            } else {
                emailError.textContent = '';
                firstNextButton.disabled = false; // Habilita o botão
                firstNextButton.style.opacity = '1';
            }
        } catch (error) {
            console.error("Erro ao verificar e-mail:", error);
            emailError.textContent = 'Não foi possível verificar o e-mail no momento.';
            firstNextButton.disabled = true; // Segurança: bloqueia se não puder verificar
            firstNextButton.style.opacity = '0.5';
        }
    }

    // --- EVENT LISTENERS ---

    // Adiciona o evento para disparar a verificação quando o usuário sai do campo de e-mail
    emailInput.addEventListener('blur', checkEmailExists);

    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStepIndex < formSteps.length - 1) {
                updateUI(currentStepIndex + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStepIndex > 0) {
                updateUI(currentStepIndex - 1);
            }
        });
    });

    // --- (Resto do código para Lógica de Especialidades, Revisão e Envio continua igual) ---
    // ... cole o restante do seu signup-controller.js aqui ...
    const servicesByCategory = {
        residencial: ['Limpeza Geral', 'Jardinagem', 'Pintura', 'Reformas Leves'],
        diarista: ['Limpeza Pesada', 'Passadoria', 'Organização de Armários'],
        eventos: ['Decoração', 'Buffet', 'Fotografia', 'Som e Iluminação'],
        automotivo: ['Troca de Óleo', 'Revisão', 'Lavagem Completa', 'Polimento'],
        saude: ['Massagem', 'Fisioterapia', 'Nutrição', 'Personal Trainer'],
        aulas: ['Matemática', 'Inglês', 'Programação', 'Música']
    };
    
    if (categorySelect && servicesContainer) {
        categorySelect.addEventListener('change', () => {
            const cat = categorySelect.value;
            servicesContainer.innerHTML = '';
            if (!servicesByCategory[cat]) {
                servicesContainer.innerHTML = '<p class="text-center text-muted">Selecione uma categoria para ver as especialidades.</p>';
                return;
            }
            servicesByCategory[cat].forEach((service, i) => {
                const div = document.createElement('div');
                div.className = 'checkbox-item';
                div.innerHTML = `<input type="checkbox" id="servico-${cat}-${i}" name="servicos" value="${service}"><label for="servico-${cat}-${i}">${service}</label>`;
                servicesContainer.appendChild(div);
            });
        });
    }

    function populateReview() {
        const reviewContainer = document.getElementById('review-container');
        if (!reviewContainer) return;
        const nome = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('phone').value.trim();
        const cidade = document.getElementById('city').value.trim();
        const categoria = categorySelect.options[categorySelect.selectedIndex].text;
        const servicosSelecionados = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => `<li>${cb.value}</li>`).join('');
        reviewContainer.innerHTML = `
            <h4>Conta e Contato</h4><p><strong>Nome:</strong> ${nome||'Não informado'}</p><p><strong>Email:</strong> ${email||'Não informado'}</p><p><strong>Telefone:</strong> ${telefone||'Não informado'}</p><p><strong>Cidade:</strong> ${cidade||'Não informada'}</p><hr>
            <h4>Serviços</h4><p><strong>Categoria:</strong> ${categoria}</p><ul>${servicosSelecionados||"<li>Nenhum serviço selecionado.</li>"}</ul>`;
    }

    signupForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        const nome = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value.trim();
        const telefone = document.getElementById('phone').value.trim();
        const cidade = document.getElementById('city').value.trim();
        const categoria = categorySelect.value;
        const servicos = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => cb.value);
        if (!nome || !email || !senha || !telefone || !cidade || !categoria) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }
        const payload = { nome, email, senha, telefone, cidade, categoria, servicos };
        try {
            const response = await fetch('http://localhost:3000/api/profissionais', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
    throw new Error((await response.json()).message || 'Erro ao criar perfil');
}

        // --- LÓGICA DE REDIRECIONAMENTO CORRIGIDA ---
        if (plano === 'basico' || plano === 'premium') {
            // Redireciona para pagamento, passando o plano para a próxima página
            window.location.href = `pagamento.html?plano=${plano}`;
        } else {
            // Redireciona para a página de sucesso para o plano gratuito
            window.location.href = 'cadastro-sucesso.html';
        }
        } catch (error) {
            alert('Erro: ' + error.message);
            console.error(error);
        }
    });

    updateUI(0);
});
