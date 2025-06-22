/* =================================================================== */
/* --- Módulo Final: main.js (O Orquestrador Principal) --- */
/* =================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Home Service - Scripts Modulares Carregados!");

    // Inicializa componentes da Interface de Usuário (UI)
    initMobileMenu();
    initFaqAccordion();
    initHeroCarousel();
    initRadiusSlider();
    initPortfolioGallery();
    initMegaMenu();
    initSortProviders(); // <--- LINHA REATIVADA AQUI
    
    // Inicializa funcionalidades específicas de páginas
    initMultiStepSignup();
    initPaymentPage();
    initSuccessPage();

    // Inicializa as animações de rolagem
    initScrollAnimations();

    /* ============================================= */
    /* --- CORREÇÃO DE SEGURANÇA PARA ANIMAÇÕES --- */
    /* Força a visibilidade das seções se o IntersectionObserver falhar ou demorar */
    /* ============================================= */
    setTimeout(() => {
        const animatedSections = document.querySelectorAll('.animated-section');
        animatedSections.forEach(section => {
            if (!section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }, 1000); // 1 segundo de espera
});