function initMultiStepSignup() {
  const signupForm = document.querySelector('#signup-form');
  if (!signupForm) return; // só roda se estiver na página

  const steps = Array.from(signupForm.querySelectorAll('.form-step'));
  const nextButtons = signupForm.querySelectorAll('.next-step');
  const prevButtons = signupForm.querySelectorAll('.prev-step');
  const categorySelect = document.getElementById('professional-category');
  const servicesContainer = document.getElementById('services-checkbox-container');

  const servicesByCategory = {
    residencial: ['Limpeza Geral', 'Jardinagem', 'Pintura', 'Reformas Leves'],
    diarista: ['Limpeza Pesada', 'Passadoria', 'Organização de Armários'],
    eventos: ['Decoração', 'Buffet', 'Fotografia', 'Som e Iluminação'],
    automotivo: ['Troca de Óleo', 'Revisão', 'Lavagem Completa', 'Polimento'],
    saude: ['Massagem', 'Fisioterapia', 'Nutrição', 'Personal Trainer'],
    aulas: ['Matemática', 'Inglês', 'Programação', 'Música']
  };

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

  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle('active', i === index));
    currentStep = index;

    if (index === steps.length - 1) {
      populateReview();
    }
  }

  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) showStep(currentStep + 1);
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  });

  // Preenche a tela de revisão na última etapa
  function populateReview() {
    const reviewContainer = document.getElementById('review-container');
    if (!reviewContainer) return;

    const nome = document.getElementById('full-name').value.trim();
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
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Cidade:</strong> ${cidade}</p>
      <hr>
      <h4>Serviços</h4>
      <p><strong>Categoria:</strong> ${categoria}</p>
      <ul>${servicosSelecionados || "<li>Nenhum serviço selecionado.</li>"}</ul>
    `;
  }

  // Envio do formulário
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value.trim();
    const telefone = document.getElementById('phone').value.trim();
    const cidade = document.getElementById('city').value.trim();
    const categoria = categorySelect.value;
    const servicos = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => cb.value);
    const descricao_perfil = ''; // Como não tem textarea, vamos mandar vazio

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

      alert('Perfil criado com sucesso!');
      window.location.href = 'dashboard-profissional.html';
    } catch (error) {
      alert('Erro: ' + error.message);
      console.error(error);
    }
  });

  showStep(0); // começa no passo 1
}

// Inicialize a função quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  initMultiStepSignup();
});
