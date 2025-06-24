/* =================================================================== */
/* --- Módulo Final: main.js (O Orquestrador Principal) --- */
/* =================================================================== */

/**
 * Verifica se o usuário está logado e atualiza a interface.
 * - Altera o link "Área do Profissional" para ir direto para o dashboard.
 */
/**
 * Verifica se o usuário está logado e atualiza a interface.
 * - Altera o link "Área do Profissional" para ir direto para o dashboard.
 * - Esconde o link se o usuário já estiver no dashboard para evitar redundância.
 */
function checkLoginStatus() {
    const isUserLoggedIn = localStorage.getItem('isProfessionalLoggedIn') === 'true';
    const dynamicLinks = document.querySelectorAll('.js-dynamic-link');

    if (isUserLoggedIn && dynamicLinks.length > 0) {
        dynamicLinks.forEach(link => {
            // Verifica se a URL da página atual já é o dashboard
            if (window.location.pathname.endsWith('dashboard-profissional.html')) {
                // Se estamos no dashboard, o link é desnecessário. Esconde ele.
                link.style.display = 'none';
            } else {
                // Se estamos em qualquer outra página, aponta o link para o dashboard.
                const newHref = link.getAttribute('href').includes('../') 
                    ? '../dashboard-profissional.html' 
                    : 'dashboard-profissional.html';
                link.href = newHref;
            }
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
    console.log("Home Service - Scripts Modulares Carregados! Aguardando para executar...");

    // TESTE DE SINCRONIA: Atrasar a execução para garantir que o DOM está 100% pronto.
    setTimeout(function() {
        console.log("Executando scripts após um pequeno atraso...");

        // Restauramos a sua versão original da função checkLoginStatus
        // para manter o código limpo, agora que já depuramos.
        checkLoginStatus();
        setupLogout();

        // Funções de inicialização de componentes
        if(typeof initMobileMenu === 'function') initMobileMenu();
        if(typeof initFaqAccordion === 'function') initFaqAccordion();
        if(typeof initHeroCarousel === 'function') initHeroCarousel();
        if(typeof initRadiusSlider === 'function') initRadiusSlider();
        if(typeof initPortfolioGallery === 'function') initPortfolioGallery();
        if(typeof initMegaMenu === 'function') initMegaMenu();
        if(typeof initSortProviders === 'function') initSortProviders(); 
        
        // Funções de inicialização de páginas específicas
        if(typeof initPaymentPage === 'function') initPaymentPage();
        if(typeof initSuccessPage === 'function') initSuccessPage();
        if(typeof initLoginPage === 'function') initLoginPage(); 

        // Inicializa as animações de rolagem
        if(typeof initScrollAnimations === 'function') initScrollAnimations();

    }, 100); // Atraso de 100 milissegundos

    // O fallback de animações pode continuar aqui fora, não há problema.
    setTimeout(() => {
        const animatedSections = document.querySelectorAll('.animated-section');
        animatedSections.forEach(section => {
            if (!section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }, 1000);
});