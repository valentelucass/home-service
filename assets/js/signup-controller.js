/* =================================================================== */
/* --- Módulo Final: signup-controller.js (Versão Definitiva) --- */
/* =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const signupForm = document.querySelector('#signup-form');
    if (!signupForm) return; 

    // --- SELEÇÃO CORRETA DOS ELEMENTOS ---
    const formSteps = Array.from(signupForm.querySelectorAll('.form-step'));
    const nextButtons = signupForm.querySelectorAll('.next-step');
    const prevButtons = signupForm.querySelectorAll('.prev-step');
    
    // Alvo corrigido: Agora miramos na barra que criamos.
    const progressBar = document.querySelector('.progress-bar-animated'); 
    
    // Alvo corrigido: Os passos agora estão dentro de .progress-steps
    const progressSteps = document.querySelectorAll('.progress-steps .progress-step'); 
    
    const categorySelect = document.getElementById('professional-category');
    const servicesContainer = document.getElementById('services-checkbox-container');
    
    let currentStepIndex = 0;
    
    function updateUI(stepIndex) {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });

        if (progressBar && progressSteps.length > 0) {
            const totalSteps = formSteps.length;
            const progressPercentage = stepIndex > 0 ? (stepIndex / (totalSteps - 1)) * 100 : 0;
            
            // A MÁGICA FINAL:
            // O JavaScript agora altera a largura da barra correta.
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

    // --- LÓGICA DOS BOTÕES (Sem alterações, já estava correta) ---
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

    // --- CÓDIGO RESTANTE (Não precisa de alteração) ---
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
        const payload = { nome, email, senha, descricao_perfil: '', telefone, cidade, categoria, servicos };
        try {
            const response = await fetch('http://localhost:3000/api/profissionais', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error((await response.json()).message || 'Erro ao criar perfil');
            window.location.href = 'cadastro-sucesso.html';
        } catch (error) {
            alert('Erro: ' + error.message);
            console.error(error);
        }
    });

    updateUI(0);
});