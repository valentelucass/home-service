/* =================================================================== */
/* --- Módulo Final: main.js (O Orquestrador Principal) --- */
/* =================================================================== */

// --- VERSÃO DEFINITIVA E CORRIGIDA DA LÓGICA DE LOGIN/LOGOUT ---

function checkLoginStatus() {
    const isUserLoggedIn = localStorage.getItem('isProfessionalLoggedIn') === 'true';

    // ANTES: Procurava todos os links que apontavam para profissionais.html
    // AGORA: Procura apenas os links que marcamos com a classe .js-dynamic-link
    const dynamicLinks = document.querySelectorAll('.js-dynamic-link');

    if (isUserLoggedIn && dynamicLinks.length > 0) {
        dynamicLinks.forEach(link => {
            // A lógica de redirecionamento que já funciona
            const newHref = link.getAttribute('href').includes('../') 
                ? '../dashboard-profissional.html' 
                : 'dashboard-profissional.html';
            link.href = newHref;
        });
    }
}

function setupLogout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Executando logout...");
            // Remove a chave do localStorage, efetivamente "deslogando" o usuário.
            localStorage.removeItem('isProfessionalLoggedIn');
            alert("Você foi deslogado.");
            // Redireciona para a página inicial, que está na raiz.
            window.location.href = window.location.origin + '/index.html';
        });
    }
}


// --- O Orquestrador Principal que Roda Quando a Página Carrega ---
document.addEventListener("DOMContentLoaded", function() {
    console.log("Home Service - Scripts Modulares Carregados!");

    // --- Novas funções para verificar login e configurar logout ---
    checkLoginStatus();
    setupLogout();

    // Inicializa componentes da Interface de Usuário (UI)
    initMobileMenu();
    initFaqAccordion();
    initHeroCarousel();
    initRadiusSlider();
    initPortfolioGallery();
    initMegaMenu();
    initSortProviders(); 
    
    // Inicializa funcionalidades específicas de páginas
    initPaymentPage();
    initSuccessPage();
    initLoginPage(); // <--- LINHA ADICIONADA CONFORME SOLICITADO

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