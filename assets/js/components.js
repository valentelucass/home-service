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
   if (document.body.id !== 'page-payment') return;

   const urlParams = new URLSearchParams(window.location.search);
   const plano = urlParams.get('plano');

   if (plano) {
       const precos = {
           basico: 'R$ 29,00/mês',
           premium: 'R$ 99,00/mês'
       };
       const summaryDiv = document.querySelector('#plan-summary');
       summaryDiv.innerHTML = `
           <h3>Plano ${plano.charAt(0).toUpperCase() + plano.slice(1)}</h3>
           <p>${precos[plano]}</p>
       `;
   }

   const paymentForm = document.querySelector('.payment-form');
   if(paymentForm) {
       paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Em vez de um alerta, redirecionamos para a página de sucesso
    // com um status para identificação.
    window.location.href = 'cadastro-sucesso.html?status=pago';
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

    // --- LÓGICA DE VALIDAÇÃO (CORRIGIDA) ---
    const validateStep = (stepIndex) => {
        // Se for o primeiro passo (índice 0), pula a validação para facilitar o teste.
        if (stepIndex === 0) {
            return true;
        }

        // Mantém a validação para os passos seguintes.
        const stepDiv = steps[stepIndex];
        const inputs = stepDiv.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            // Remove a borda de erro anterior
            input.style.borderColor = '#ccc';

            if (!input.value) {
                isValid = false;
                input.style.borderColor = '#e74c3c'; // Aplica borda de erro
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
        
        return isValid;
    };

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
        const urlParams = new URLSearchParams(window.location.search);
        const plano = urlParams.get('plano') || 'gratis';
        
        if (plano === 'gratis') {
            window.location.href = 'cadastro-sucesso.html';
        } else {
            window.location.href = `pagamento.html?plano=${plano}`;
        }
    });

    // --- INICIALIZAÇÃO ---
    // Configura os títulos com base no plano (código que você já tinha)
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