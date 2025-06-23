/* =================================================================== */
/* --- Módulo Final: components.js (Componentes da Interface) --- */
/* =================================================================== */

// Cada função agora tem uma "verificação de segurança" no início.
// Se ela não encontrar os elementos que precisa, ela simplesmente
// para, sem quebrar os outros scripts.

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!menuToggle || !mainNav) return; // VERIFICAÇÃO DE SEGURANÇA

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

function initFaqAccordion() {
    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) return; // VERIFICAÇÃO DE SEGURANÇA

    const faqItems = faqContainer.querySelectorAll('.faq-item');
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
    const radiusSlider = document.getElementById("radius-slider"); // Corrigido de "radius" para "radius-slider"
    const radiusValue = document.getElementById("radius-value");
    if (!radiusSlider || !radiusValue) return; // VERIFICAÇÃO DE SEGURANÇA

    radiusSlider.addEventListener("input", function() {
        radiusValue.textContent = this.value + ' km'; // Adicionado ' km' para clareza
    });
}

function initPortfolioGallery() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return; // VERIFICAÇÃO DE SEGURANÇA

    const portfolioImages = portfolioGrid.querySelectorAll('img');
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
        img.addEventListener('click', () => showImage(index));
    });

    closeBtn.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) hideLightbox();
    });
    nextBtn.addEventListener('click', () => {
        showImage((currentIndex + 1) % portfolioImages.length);
    });
    prevBtn.addEventListener('click', () => {
        showImage((currentIndex - 1 + portfolioImages.length) % portfolioImages.length);
    });
}

function initPaymentPage() {
    if (document.body.id !== 'page-payment') return; // VERIFICAÇÃO DE SEGURANÇA

    const urlParams = new URLSearchParams(window.location.search);
    let currentPlan = urlParams.get('plano') || 'basico';
    const planOptions = document.querySelectorAll('.plan-option');
    if (planOptions.length === 0) return;

    function updateSelection(selectedPlan) {
        planOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.plan === selectedPlan);
        });
    }

    planOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentPlan = option.dataset.plan;
            updateSelection(currentPlan);
        });
    });

    updateSelection(currentPlan);

    const paymentForm = document.querySelector('.payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = `cadastro-sucesso.html?status=pago&plano=${currentPlan}`;
        });
    }
}

function initSuccessPage() {
    const successBox = document.querySelector('.success-box');
    if (!successBox) return; // VERIFICAÇÃO DE SEGURANÇA

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'pago') {
        const title = document.getElementById('success-title');
        const message = document.getElementById('success-message');
        if(title) title.textContent = 'Pagamento Confirmado!';
        if(message) message.textContent = 'Seu plano foi ativado. Bem-vindo! Explore todos os benefícios e comece a receber contatos de novos clientes.';
    }
}

function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return; // VERIFICAÇÃO DE SEGURANÇA

    let currentSlide = 0;
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? 1 : 0;
        });
    }
    showSlide(currentSlide);
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

function initMegaMenu() {
    const triggers = document.querySelectorAll('[data-menu-trigger]');
    if (triggers.length === 0) return; // VERIFICAÇÃO DE SEGURANÇA

    triggers.forEach(trigger => {
        const menuId = trigger.dataset.menuTrigger;
        const menu = document.getElementById(menuId);
        if (!menu) return;

        let hideTimeout;
        const show = () => { clearTimeout(hideTimeout); menu.classList.add('is-visible'); };
        const hide = () => { menu.classList.remove('is-visible'); };
        const scheduleHide = () => { hideTimeout = setTimeout(hide, 200); };

        trigger.addEventListener('mouseenter', show);
        trigger.addEventListener('mouseleave', scheduleHide);
        menu.addEventListener('mouseenter', show);
        menu.addEventListener('mouseleave', scheduleHide);
    });
}

function initSortProviders() {
    const sortSelect = document.getElementById('sort-providers'); // Corrigido de "sort" para "sort-providers"
    const providerList = document.querySelector('.provider-list');
    if (!sortSelect || !providerList) return; // VERIFICAÇÃO DE SEGURANÇA

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        const cards = Array.from(providerList.querySelectorAll('.provider-card'));
        const firstNonCard = providerList.querySelector(':scope > :not(.provider-card)');

        cards.sort((a, b) => {
            if (sortBy === 'rating') {
                const ratingA = parseFloat(a.querySelector('.rating-number')?.textContent.replace(',', '.') || 0);
                const ratingB = parseFloat(b.querySelector('.rating-number')?.textContent.replace(',', '.') || 0);
                return ratingB - ratingA;
            } else if (sortBy === 'distance') {
                const distanceA = parseFloat(a.querySelector('.provider-distance')?.textContent.replace(',', '.') || 999);
                const distanceB = parseFloat(b.querySelector('.provider-distance')?.textContent.replace(',', '.') || 999);
                return distanceA - distanceB;
            }
            return 0;
        });
        cards.forEach(card => providerList.insertBefore(card, firstNonCard));
    });
}

// Esta função não estava no seu arquivo, mas é chamada no main.js, então adicionei uma versão segura.
function initUserDropdown() {
    const userMenuButton = document.querySelector('.user-menu-button');
    const userDropdown = document.querySelector('.user-dropdown');
    if (!userMenuButton || !userDropdown) return; // VERIFICAÇÃO DE SEGURANÇA

    userMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
}