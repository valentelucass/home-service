function initMultiStepSignup() {
    // 1. Seleciona todos os elementos necessários do DOM
    const signupForm = document.querySelector('#signup-form');
    if (!signupForm) return;

    const steps = Array.from(signupForm.querySelectorAll('.form-step'));
    const nextButtons = signupForm.querySelectorAll('.next-step');
    const prevButtons = signupForm.querySelectorAll('.prev-step');
    const categorySelect = document.getElementById('professional-category');
    const servicesContainer = document.getElementById('services-checkbox-container');
    
    // 2. Objeto com os serviços de cada categoria
    const servicesByCategory = {
        residencial: ['Limpeza Geral', 'Jardinagem', 'Pintura', 'Reformas Leves'],
        diarista: ['Limpeza Pesada', 'Passadoria', 'Organização de Armários'],
        eventos: ['Decoração', 'Buffet', 'Fotografia', 'Som e Iluminação'],
        automotivo: ['Troca de Óleo', 'Revisão', 'Lavagem Completa', 'Polimento'],
        saude: ['Massagem', 'Fisioterapia', 'Nutrição', 'Personal Trainer'],
        aulas: ['Matemática', 'Inglês', 'Programação', 'Música']
    };
    
    // 3. Lógica para criar os checkboxes dinamicamente
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
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'servicos';
            checkbox.value = service;
            checkbox.id = `servico-${cat}-${i}`;
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = service;
            div.appendChild(checkbox);
            div.appendChild(label);
            servicesContainer.appendChild(div);
        });
    });
    
    // 4. Lógica para controlar a troca de etapas
    let currentStep = 0;

    function showStep(stepIndex) {
        // Mostra o formulário da etapa correta
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;

        // CHAMA A FUNÇÃO SEPARADA PARA ATUALIZAR A ANIMAÇÃO
        // A mágica acontece aqui: a lógica complexa da animação agora vive em outro arquivo.
        if (typeof updateSignupProgress === 'function') {
            updateSignupProgress(stepIndex, steps.length);
        }

        // Se for a última etapa, preenche a tela de revisão
        if (currentStep === steps.length - 1) {
            populateReview();
        }
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    // 5. Lógica para preencher a tela de revisão
    function populateReview() {
        const reviewContainer = document.getElementById('review-container');
        if (!reviewContainer) return;
        const nome = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('phone').value.trim();
        const cidade = document.getElementById('city').value.trim();
        const categoria = categorySelect.options[categorySelect.selectedIndex].text;
        const servicosSelecionados = Array
            .from(document.querySelectorAll('input[name="servicos"]:checked'))
            .map(cb => `<li>${cb.value}</li>`)
            .join('');
        reviewContainer.innerHTML = `
            <h4>Conta e Contato</h4>
            <p><strong>Nome:</strong> ${nome || 'Não informado'}</p>
            <p><strong>Email:</strong> ${email || 'Não informado'}</p>
            <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
            <p><strong>Cidade:</strong> ${cidade || 'Não informada'}</p>
            <hr>
            <h4>Serviços</h4>
            <p><strong>Categoria:</strong> ${categoria}</p>
            <ul>${servicosSelecionados || "<li>Nenhum serviço selecionado.</li>"}</ul>
        `;
    }

    // 6. Lógica de envio final do formulário
    signupForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        const nome = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value.trim();
        const telefone = document.getElementById('phone').value.trim();
        const cidade = document.getElementById('city').value.trim();
        const categoria = categorySelect.value;
        const servicos = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => cb.value);
        const descricao_perfil = '';
        if (!nome || !email || !senha || !telefone || !cidade || !categoria) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }
        const payload = { nome, email, senha, descricao_perfil, telefone, cidade, categoria, servicos };
        try {
            const response = await fetch('http://localhost:3000/api/profissionais', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao criar perfil');
            }
            window.location.href = 'cadastro-sucesso.html';
        } catch (error) {
            alert('Erro: ' + error.message);
            console.error(error);
        }
    });

    // Inicia o formulário na primeira etapa
    showStep(0);
}


