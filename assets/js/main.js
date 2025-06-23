/* =================================================================== */
/* --- Módulo Final: main.js (O Orquestrador Principal) --- */
/* =================================================================== */

// --- LÓGICA DE LOGIN SIMULADO ---
function checkLoginStatus() {
    // Em um sistema real, esta função verificaria um cookie ou token.
    // Para nosso teste, vamos usar uma variável simples.
    // Mude para 'true' para simular que o profissional está logado.
    const isUserLoggedIn = false; 

    // Seleciona TODOS os links que apontam para a página de profissionais.
    // Usamos querySelectorAll para garantir que todos os links sejam atualizados (no header, no rodapé, etc.)
    const professionalLinks = document.querySelectorAll('a[href="profissionais.html"]');

    if (isUserLoggedIn && professionalLinks.length > 0) {
        professionalLinks.forEach(link => {
            // Se estiver logado, muda o link para o dashboard
            link.href = 'dashboard-profissional.html';
        });
    }
    // Se não estiver logado, os links continuam com o href original.
}

// --- LÓGICA DE LOGOUT SIMULADO ---
function setupLogout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Em um sistema real, isso limparia o cookie/token.
            alert("Você foi deslogado. (Simulação)");
            // Redireciona para a página inicial após o logout
            window.location.href = 'index.html';
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