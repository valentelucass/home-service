/* =================================================================== */
/* --- Módulo Final: main.js (O Orquestrador Principal) --- */
/* =================================================================== */

/**
 * Verifica se o usuário está logado e atualiza a interface.
 * - Altera o link "Área do Profissional" para ir direto para o dashboard.
 */
function checkLoginStatus() {
    const isUserLoggedIn = localStorage.getItem('isProfessionalLoggedIn') === 'true';
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

/**
 * Configura o botão de logout para remover os dados de login e redirecionar.
 */
function setupLogout() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            localStorage.removeItem('isProfessionalLoggedIn');
            localStorage.removeItem('userId');
            
            alert("Você foi deslogado com sucesso.");
            window.location.href = '/index.html'; // Redireciona para a página inicial
        });
    }
}

/**
 * Função principal que inicializa todos os scripts do site
 * quando a página termina de carregar.
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("Home Service - Scripts Modulares Carregados!");

    // Funções globais que rodam em todas as páginas
    checkLoginStatus();
    setupLogout();

    // Funções de inicialização de componentes (código original mantido)
    // Elas são seguras pois já verificam se os elementos existem
    if(typeof initMobileMenu === 'function') initMobileMenu();
    if(typeof initFaqAccordion === 'function') initFaqAccordion();
    if(typeof initHeroCarousel === 'function') initHeroCarousel();
    if(typeof initRadiusSlider === 'function') initRadiusSlider();
    if(typeof initPortfolioGallery === 'function') initPortfolioGallery();
    if(typeof initMegaMenu === 'function') initMegaMenu();
    if(typeof initSortProviders === 'function') initSortProviders(); 
    
    // Funções de inicialização de páginas específicas (código original mantido)
    if(typeof initPaymentPage === 'function') initPaymentPage();
    if(typeof initSuccessPage === 'function') initSuccessPage();
    if(typeof initLoginPage === 'function') initLoginPage(); 

    // Inicializa as animações de rolagem (código original mantido)
    if(typeof initScrollAnimations === 'function') initScrollAnimations();

    // Fallback de segurança para animações (código original mantido)
    setTimeout(() => {
        const animatedSections = document.querySelectorAll('.animated-section');
        animatedSections.forEach(section => {
            if (!section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }, 1000);
});