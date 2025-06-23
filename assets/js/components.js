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






// --- VERSÃO DEFINITIVA, GLOBAL E CORRIGIDA ---
function initMultiStepSignup() {
    const signupForm = document.querySelector('#signup-form');
    if (!signupForm) return;

    // --- Mapeamento de todos os elementos ---
    const steps = Array.from(signupForm.querySelectorAll('.form-step'));
    const nextButtons = signupForm.querySelectorAll('.next-step');
    const prevButtons = signupForm.querySelectorAll('.prev-step');
    const finalSubmitButton = document.getElementById('final-submit-button'); // Nosso novo alvo
    const categorySelect = document.getElementById('professional-category');
    const servicesContainer = document.getElementById('services-checkbox-container');
    const reviewContainer = document.getElementById('review-container');

    let currentStep = 0;

    // --- Lógica para mostrar o passo correto ---
    const showStep = (stepIndex) => {
        steps.forEach((step, index) => step.classList.toggle('active', index === stepIndex));
        currentStep = stepIndex;

        if (currentStep === 3 && reviewContainer) {
            populateReview();
        }
    };

    // --- Lógica para preencher a tela de revisão (mantida) ---
    const populateReview = () => {
        const nome = document.getElementById('full-name')?.value || 'Não preenchido';
        const email = document.getElementById('email')?.value || 'Não preenchido';
        const telefone = document.getElementById('phone')?.value || 'Não preenchido';
        const categoria = categorySelect ? categorySelect.options[categorySelect.selectedIndex].text : 'Não preenchida';
        const servicosSelecionados = Array.from(document.querySelectorAll('input[name="servicos"]:checked')).map(cb => `<li>${cb.value}</li>`).join('');

        reviewContainer.innerHTML = `
            <h4>Conta e Contato</h4>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <h4>Serviços</h4>
            <p><strong>Categoria:</strong> ${categoria}</p>
            <ul>${servicosSelecionados || "<li>Nenhum serviço selecionado.</li>"}</ul>`;
    };

    // --- Lógica para os botões de avançar ---
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Futuramente, a validação de cada passo virá aqui. Por ora, focamos na navegação.
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        });
    });

    // --- Lógica para os botões de voltar ---
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    // --- Lógica do botão final (A MÁGICA ACONTECE AQUI) ---
    if (finalSubmitButton) {
        finalSubmitButton.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const plano = urlParams.get('plano') || 'gratis';

            if (plano === 'gratis') {
                window.location.href = 'cadastro-sucesso.html';
            } else {
                window.location.href = `pagamento.html?plano=${plano}`;
            }
        });
    }

    // --- Lógica para os checkboxes de serviço (RESTAURADA) ---
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

    // --- Inicialização ---
    showStep(0); // Garante que o primeiro passo seja exibido ao carregar.
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