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

// --- [CORRIGIDO] Função de Cadastro ---
// A função agora verifica se está na página de cadastro antes de executar
function initSignupPage() {
    const signupForm = document.querySelector('#signup-form');
    // Se o formulário não existir na página atual, a função para aqui.
    if (!signupForm) return;

    const urlParams = new URLSearchParams(window.location.search);
    const plano = urlParams.get('plano') || 'gratis';

    const titulos = {
        gratis: 'Crie seu Perfil Gratuito',
        basico: 'Você está a um passo do Plano Básico',
        premium: 'Excelente escolha! Finalize seu cadastro Premium'
    };
    const subtitulos = {
        gratis: 'Comece a divulgar seu trabalho hoje mesmo.',
        basico: 'Preencha seus dados e vá para o pagamento.',
        premium: 'Preencha seus dados para ter acesso a todos os benefícios.'
    };
    
    document.querySelector('#signup-title').textContent = titulos[plano];
    document.querySelector('#signup-subtitle').textContent = subtitulos[plano];

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (plano === 'gratis') {
            alert('Cadastro no plano GRATUITO realizado com sucesso!');
        } else {
            window.location.href = `pagamento.html?plano=${plano}`;
        }
    });
}

// --- [CORRIGIDO] Função de Pagamento ---
// A função agora verifica se está na página de pagamento antes de executar
function initPaymentPage() {
    // Verifica o ID no body, que só existe na página de pagamento
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
            alert('Pagamento realizado com sucesso! Seu plano está ativo.');
        });
    }
}