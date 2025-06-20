/* =================================================================== */
/* --- Módulo Final: main.js (O Orquestrador Principal) --- */
/* =================================================================== */

document.addEventListener("DOMContentLoaded", function() {
    console.log("Home Service - Scripts Modulares Carregados!");

    // Inicializa componentes da Interface de Usuário (UI)
    initMobileMenu();
    initFaqAccordion();
    initRadiusSlider();
    initPortfolioGallery();
    
    // Inicializa funcionalidades específicas de páginas
    initSignupPage();
    initPaymentPage();

    // Inicializa as animações de rolagem
    initScrollAnimations();
});