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



// --- FUNÇÃO DE CADASTRO MULTI-PASSOS (VERSÃO GLOBALMENTE CORRIGIDA) ---
function initMultiStepSignup() {
    const signupForm = document.querySelector('#signup-form');
    if (!signupForm) return; // Sai da função se não estiver na página de cadastro.

    // --- Seleção de todos os elementos necessários ---
    const steps = Array.from(signupForm.querySelectorAll('.form-step'));
    const nextButtons = signupForm.querySelectorAll('.next-step');
    const prevButtons = signupForm.querySelectorAll('.prev-step');
    const progressBar = signupForm.querySelector('.progress-bar');
    const progressSteps = progressBar ? Array.from(progressBar.querySelectorAll('.progress-step')) : [];
    const categorySelect = document.getElementById('professional-category');
    const servicesContainer = document.getElementById('services-checkbox-container');
    const reviewContainer = document.getElementById('review-container');

    let currentStep = 0;

    // --- Função de Validação (Corrigida e Mais Robusta) ---
    const validateStep = (stepIndex) => {
        const stepDiv = steps[stepIndex];
        if (!stepDiv) return false;

        let isValid = true;
        
        // 1. Valida todos os inputs com 'required'
        const requiredInputs = stepDiv.querySelectorAll('input[required]');
        requiredInputs.forEach(input => {
            input.style.borderColor = '#ccc'; // Reseta a borda
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c'; // Marca o erro
            }
        });

        // 2. Validação específica para o Passo 2 (Categoria e Especialidades)
        if (stepIndex === 1) {
            // Valida a seleção da categoria
            categorySelect.style.borderColor = '#ccc';
            if (!categorySelect.value) {
                isValid = false;
                categorySelect.style.borderColor = '#e74c3c';
            }
            // Valida se ao menos uma especialidade foi marcada
            const checkboxes = servicesContainer.querySelectorAll('input[type="checkbox"]:checked');
            servicesContainer.style.border = '1px solid #ddd';
            if (checkboxes.length === 0) {
                isValid = false;
                servicesContainer.style.border = '2px solid #e74c3c';
            }
        }
        
        if (!isValid && typeof showNotification === 'function') {
            showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        }
        
        return isValid;
    };

    // --- Função para Mudar de Passo ---
    const showStep = (stepIndex) => {
        // Esconde todos os passos e mostra apenas o correto
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;

        // Atualiza a barra de progresso
        if(progressSteps.length > 0) {
            progressSteps.forEach((step, index) => {
                step.classList.toggle('active', index <= currentStep);
            });
            const progressPercentage = (currentStep / (progressSteps.length - 1)) * 100;
            progressBar.style.setProperty('--progress-width', `${progressPercentage}%`);
        }
        
        // Preenche a revisão se estiver no último passo
        if (currentStep === 3 && reviewContainer) {
            populateReview();
        }
    };

    // --- Event Listeners para os Botões ---
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
    
    // --- Lógica para os Checkboxes de Serviço (RESTAURADA) ---
    const servicosPorCategoria = {
        residencial: ["Eletricista", "Encanador", "Pintor", "Montador de Móveis", "Reparos Gerais"],
        diarista: ["Faxina Padrão", "Faxina Pesada", "Limpeza Pós-obra", "Passar Roupas"],
        eventos: ["Bartender", "Garçom/Garçonete", "Segurança", "Churrasqueiro", "Recepcionista"],
        automotivo: ["Mecânica Geral", "Lava-rápido", "Estética Automotiva", "Elétrica Automotiva"],
        saude: ["Cuidador(a) de Idosos", "Personal Trainer", "Fisioterapeuta", "Técnico(a) de Enfermagem"],
        aulas: ["Reforço Escolar", "Professor(a) de Idiomas", "Professor(a) de Música", "Informática"]
    };
    if (categorySelect && servicesContainer) {
        categorySelect.addEventListener('change', () => {
            const selectedCategory = categorySelect.value;
            servicesContainer.innerHTML = '';
            const services = servicosPorCategoria[selectedCategory];
            if (services) {
                services.forEach(service => {
                    const div = document.createElement('div');
                    const checkboxId = `service-${service.replace(/\s+/g, '-')}`;
                    div.innerHTML = `<input type="checkbox" id="${checkboxId}" name="servicos" value="${service}"><label for="${checkboxId}">${service}</label>`;
                    servicesContainer.appendChild(div);
                });
            } else {
                servicesContainer.innerHTML = '<p class="text-center text-muted">Selecione uma categoria para ver as especialidades.</p>';
            }
        });
    }

    // --- Lógica da Submissão Final ---
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // A submissão só acontece no último botão, então não precisamos de validação aqui.
        // O botão "Finalizar" é do tipo submit, então ele aciona este evento.
        window.location.href = 'cadastro-sucesso.html';
    });

    // Função para preencher a tela de revisão
    const populateReview = () => {
        const nome = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('phone').value;
        const categoria = categorySelect.options[categorySelect.selectedIndex].text;
        const servicosSelecionados = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => `<li>${cb.value}</li>`).join('');
        reviewContainer.innerHTML = `
            <h4>Conta e Contato</h4>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <hr>
            <h4>Serviços</h4>
            <p><strong>Categoria:</strong> ${categoria}</p>
            <ul>${servicosSelecionados || "<li>Nenhuma especialidade marcada</li>"}</ul>`;
    };

    // --- Inicialização ---
    showStep(0); // Garante que o primeiro passo sempre seja exibido ao carregar.
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


// Função para o novo Mega Menu animado
function initMegaMenu() {
    const triggers = document.querySelectorAll('[data-menu-trigger]');
    if (!triggers.length) return;

    triggers.forEach(trigger => {
        const menuId = trigger.dataset.menuTrigger;
        const menu = document.getElementById(menuId);

        if (!menu) return;

        let hideTimeout;

        trigger.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            showMenu(menu);
        });

        trigger.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                hideMenu(menu);
            }, 200);
        });

        menu.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
        });

        menu.addEventListener('mouseleave', () => {
            hideMenu(menu);
        });
    });

    function showMenu(menu) {
        // Esconde outros menus que possam estar abertos
        document.querySelectorAll('.mega-menu-wrapper.is-visible').forEach(m => {
            if (m !== menu) m.classList.remove('is-visible');
        });
        menu.classList.add('is-visible');
    }

    function hideMenu(menu) {
        menu.classList.remove('is-visible');
    }
}

// --- VERSÃO FINAL E CORRIGIDA DA FUNÇÃO DE ORDENAÇÃO ---
function initSortProviders() {
    const sortSelect = document.getElementById('sort');
    const providerList = document.querySelector('.provider-list');

    // Se não encontrar os elementos na página, não faz nada.
    if (!sortSelect || !providerList) {
        return;
    }

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        // Pega todos os cards de profissionais.
        const cards = Array.from(providerList.querySelectorAll('.provider-card'));
        
        // Identifica o primeiro elemento que NÃO é um card (como o rodapé com o botão).
        const firstNonCard = providerList.querySelector(':scope > :not(.provider-card)');

        // Ordena a lista de cards em memória.
        cards.sort((a, b) => {
            if (sortBy === 'rating') {
                const ratingA = parseFloat(a.querySelector('.rating-number').textContent.replace(',', '.'));
                const ratingB = parseFloat(b.querySelector('.rating-number').textContent.replace(',', '.'));
                return ratingB - ratingA; // Ordem decrescente
            } else if (sortBy === 'distance') {
                const distanceA = parseFloat(a.querySelector('.provider-distance').textContent.replace(',', '.'));
                const distanceB = parseFloat(b.querySelector('.provider-distance').textContent.replace(',', '.'));
                return distanceA - distanceB; // Ordem crescente
            }
            return 0;
        });

        // A MÁGICA DA CORREÇÃO:
        // Reinsere cada card ordenado, um por um, antes do primeiro elemento que não é um card.
        // Isso mantém o rodapé sempre no final, exatamente onde ele deve estar.
        cards.forEach(card => providerList.insertBefore(card, firstNonCard));
    });
}