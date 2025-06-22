/* =================================================================== */
/* --- Módulo Final: components.js (Componentes da Interface) --- */
/* =================================================================== */

function initMobileMenu() {
   const menuToggle = document.querySelector('.mobile-menu-toggle');
   const mainNav = document.querySelector('.main-nav');
   if (menuToggle && mainNav) {
       menuToggle.addEventListener('click', function() {
           mainNav.classList.toggle('active');
           const icon = this.querySelector('i');
           if (mainNav.classList.contains('active')) {
               icon.classList.remove('fa-bars');
               icon.classList.add('fa-xmark');
           } else {
               icon.classList.remove('fa-xmark');
               icon.classList.add('fa-bars');
           }
       });
   }
}

function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq-item');
   faqItems.forEach(item => {
       const question = item.querySelector('.faq-question');
       if (question) {
           question.addEventListener('click', () => {
               faqItems.forEach(otherItem => {
                   if (otherItem !== item && otherItem.classList.contains('active')) {
                       otherItem.classList.remove('active');
                   }
               });
               item.classList.toggle('active');
           });
       }
   });
}

function initRadiusSlider() {
   const radiusSlider = document.getElementById("radius");
   const radiusValue = document.getElementById("radius-value");
   if (radiusSlider && radiusValue) {
       radiusSlider.addEventListener("input", function() {
           radiusValue.textContent = this.value;
       });
   }
}

function initPortfolioGallery() {
   const portfolioImages = document.querySelectorAll('.portfolio-grid img');
   if (portfolioImages.length === 0) return;

   const lightbox = document.createElement('div');
   lightbox.className = 'lightbox-overlay';
   lightbox.innerHTML = `
       <button class="lightbox-close" aria-label="Fechar">&times;</button>
       <button class="lightbox-prev" aria-label="Anterior">&#8249;</button>
       <div class="lightbox-content">
           <img src="" alt="Imagem do Portfólio em destaque">
       </div>
       <button class="lightbox-next" aria-label="Próximo">&#8250;</button>
   `;
   document.body.appendChild(lightbox);

   const lightboxImage = lightbox.querySelector('img');
   const closeBtn = lightbox.querySelector('.lightbox-close');
   const nextBtn = lightbox.querySelector('.lightbox-next');
   const prevBtn = lightbox.querySelector('.lightbox-prev');
   let currentIndex = 0;

   function showImage(index) {
       currentIndex = index;
       lightboxImage.src = portfolioImages[index].src;
       lightbox.classList.add('visible');
   }

   function hideLightbox() {
       lightbox.classList.remove('visible');
   }

   portfolioImages.forEach((img, index) => {
       img.addEventListener('click', () => {
           showImage(index);
       });
   });

   closeBtn.addEventListener('click', hideLightbox);
   lightbox.addEventListener('click', (e) => {
       if (e.target === lightbox) {
           hideLightbox();
       }
   });

   nextBtn.addEventListener('click', () => {
       const nextIndex = (currentIndex + 1) % portfolioImages.length;
       showImage(nextIndex);
   });

   prevBtn.addEventListener('click', () => {
       const prevIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
       showImage(prevIndex);
   });
}


function initPaymentPage() {
    // Verifica se estamos na página correta
    if (document.body.id !== 'page-payment') return;

    const urlParams = new URLSearchParams(window.location.search);
    // Pega o plano da URL ou define 'basico' como padrão
    let currentPlan = urlParams.get('plano') || 'basico'; 

    const planOptions = document.querySelectorAll('.plan-option');

    // Função para atualizar a seleção na tela
    function updateSelection(selectedPlan) {
        planOptions.forEach(option => {
            if (option.dataset.plan === selectedPlan) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        console.log(`Plano selecionado: ${selectedPlan}`);
    }

    // Adiciona o evento de clique para cada opção de plano
    planOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentPlan = option.dataset.plan; // Atualiza o plano atual
            updateSelection(currentPlan); // Atualiza a interface
        });
    });

    // Define o estado inicial assim que a página carrega
    updateSelection(currentPlan);

    // Lógica de submissão do formulário (mantida)
    const paymentForm = document.querySelector('.payment-form');
    if(paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Adicionar lógica de pagamento real aqui no futuro
            // Por enquanto, redireciona para a página de sucesso
            window.location.href = `cadastro-sucesso.html?status=pago&plano=${currentPlan}`;
        });
    }
}


// --- NOVA FUNÇÃO PARA O CADASTRO MULTI-PASSOS (VERSÃO REVOLUCIONÁRIA) ---
function initMultiStepSignup() {
    const signupForm = document.querySelector('#signup-form');
    if (!signupForm) return;

    // --- MAPEAMENTO DE SERVIÇOS ---
    const servicosPorCategoria = {
        residencial: ["Eletricista", "Encanador", "Pintor", "Montador de Móveis", "Reparos Gerais"],
        diarista: ["Faxina Padrão", "Faxina Pesada", "Limpeza Pós-obra", "Passar Roupas"],
        eventos: ["Bartender", "Garçom/Garçonete", "Segurança", "Churrasqueiro", "Recepcionista"],
        automotivo: ["Mecânica Geral", "Lava-rápido", "Estética Automotiva", "Elétrica Automotiva"],
        saude: ["Cuidador(a) de Idosos", "Personal Trainer", "Fisioterapeuta", "Técnico(a) de Enfermagem"],
        aulas: ["Reforço Escolar", "Professor(a) de Idiomas", "Professor(a) de Música", "Informática"]
    };

    // --- ELEMENTOS DO FORMULÁRIO ---
    const steps = Array.from(signupForm.querySelectorAll('.form-step'));
    const nextButtons = signupForm.querySelectorAll('.next-step');
    const prevButtons = signupForm.querySelectorAll('.prev-step');
    const progressBar = signupForm.querySelector('.progress-bar');
    const progressSteps = Array.from(progressBar.querySelectorAll('.progress-step'));
    const categorySelect = document.getElementById('professional-category');
    const servicesContainer = document.getElementById('services-checkbox-container');
    const reviewContainer = document.getElementById('review-container');

    let currentStep = 0;

    // --- LÓGICA DE VALIDAÇÃO (CORRIGIDA) ---
    // ESTA É A FUNÇÃO QUE ESTAVA FALTANDO NO SEU CÓDIGO
    const validateStep = (stepIndex) => {
        const stepDiv = steps[stepIndex];
        // Adiciona a busca por 'select' que também pode ser obrigatório
        const inputs = stepDiv.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            // Remove a borda de erro anterior para nova validação
            input.style.borderColor = '#ccc';

            // Verifica se o campo está vazio
            if (!input.value || (input.type === 'checkbox' && !input.checked)) {
                isValid = false;
                input.style.borderColor = '#e74c3c'; // Aplica borda de erro
            }
        });

        // Validação específica para o passo dos checkboxes de serviço
        if (stepIndex === 1) {
            const checkboxes = servicesContainer.querySelectorAll('input[type="checkbox"]:checked');
            if (checkboxes.length === 0) {
                isValid = false;
                servicesContainer.style.borderColor = '#e74c3c';
            } else {
                servicesContainer.style.borderColor = '#ddd';
            }
        }
        
        if (!isValid) {
            // Usando a função de notificação que já existe no seu código
            showErrorNotification('Por favor, preencha todos os campos obrigatórios.');
        }
        
        return isValid;
    };


    // --- LÓGICA DE NAVEGAÇÃO E ANIMAÇÃO ---
    const showStep = (stepIndex) => {
        const currentStepDiv = steps[currentStep];
        currentStepDiv.classList.add('exiting');
        
        setTimeout(() => {
            currentStepDiv.classList.remove('active', 'exiting');
            steps[stepIndex].classList.add('active');
            currentStep = stepIndex;
            updateProgressBar();

            if (currentStep === 3) { // Se for o passo de revisão
                populateReview();
            }
        }, 400);
    };

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // A validação agora funciona para todos os passos
            if (validateStep(currentStep) && currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    // --- LÓGICA DA BARRA DE PROGRESSO ---
    const updateProgressBar = () => {
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index <= currentStep);
        });
        const progressPercentage = (currentStep / (progressSteps.length - 1)) * 100;
        progressBar.style.setProperty('--progress-width', `${progressPercentage}%`);
    };
    
    // --- LÓGICA DE SELEÇÃO DINÂMICA DE SERVIÇOS ---
    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        servicesContainer.innerHTML = ''; // Limpa as opções anteriores
        
        if (selectedCategory && servicosPorCategoria[selectedCategory]) {
            const services = servicosPorCategoria[selectedCategory];
            services.forEach(service => {
                const div = document.createElement('div');
                const checkboxId = `service-${service.replace(/\s+/g, '-')}`;
                div.innerHTML = `
                    <input type="checkbox" id="${checkboxId}" name="servicos" value="${service}">
                    <label for="${checkboxId}">${service}</label>
                `;
                servicesContainer.appendChild(div);
            });
        } else {
            servicesContainer.innerHTML = '<p class="text-center text-muted">Selecione uma categoria acima para ver as especialidades.</p>';
        }
    });

    // --- FUNÇÃO DE NOTIFICAÇÃO (Já existe no seu código, mas mantendo aqui para referência) ---
    function showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification-error';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // --- PREENCHER A TELA DE REVISÃO ---
    const populateReview = () => {
        const nome = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('phone').value;
        const categoria = categorySelect.options[categorySelect.selectedIndex].text;
        const servicosSelecionados = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => cb.value);

        reviewContainer.innerHTML = `
            <h4>Conta e Contato</h4>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <h4>Serviços</h4>
            <p><strong>Categoria:</strong> ${categoria}</p>
            <ul>
                ${servicosSelecionados.map(s => `<li>${s}</li>`).join('')}
            </ul>
        `;
    };

    // --- LÓGICA DA SUBMISSÃO FINAL ---
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validação final antes de submeter
        if (!validateStep(3)) { // Valida o último passo (revisão)
            showErrorNotification("Parece que há um erro nos seus dados. Por favor, volte e verifique.");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const plano = urlParams.get('plano') || 'gratis';
        
        if (plano === 'gratis') {
            window.location.href = 'cadastro-sucesso.html';
        } else {
            window.location.href = `pagamento.html?plano=${plano}`;
        }
    });

    // --- INICIALIZAÇÃO ---
    const urlParams = new URLSearchParams(window.location.search);
    const plano = urlParams.get('plano') || 'gratis';
    document.querySelector('#signup-title').textContent = {
        gratis: 'Crie seu Perfil Gratuito',
        basico: 'Você está a um passo do Plano Básico',
        premium: 'Excelente escolha! Finalize seu cadastro Premium'
    }[plano];
    document.querySelector('#signup-subtitle').textContent = {
        gratis: 'Siga os passos para ter seu perfil online hoje mesmo.',
        basico: 'Complete seus dados para prosseguir para o pagamento.',
        premium: 'Complete seus dados para ter acesso total à plataforma.'
    }[plano];
}



function initSuccessPage() {
    // Verifica se estamos na página de sucesso procurando pelo elemento .success-box
    const successBox = document.querySelector('.success-box');
    if (!successBox) return;

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    // Se o status for 'pago', customiza a mensagem.
    if (status === 'pago') {
        const title = document.getElementById('success-title');
        const message = document.getElementById('success-message');

        title.textContent = 'Pagamento Confirmado!';
        message.textContent = 'Seu plano foi ativado. Bem-vindo! Explore todos os benefícios e comece a receber contatos de novos clientes.';
    }
    // Se não houver status, a página exibe a mensagem padrão para o plano gratuito.
}

function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? 1 : 0;
        });
    }

    // Mostra o primeiro slide imediatamente
    showSlide(currentSlide);

    // Troca de slide a cada 5 segundos
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}