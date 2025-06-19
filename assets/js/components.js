/* =================================================================== */
/* --- Módulo: components.js (Componentes da Interface) --- */
/* =================================================================== */
/*
    Pense neste arquivo como o "manual de montagem" para as peças
    interativas do seu site.

    OBJETIVO:
    - Conter toda a lógica que dá vida a componentes visuais
      específicos da interface do usuário (UI).

    EXEMPLOS:
    - A lógica para fazer o menu mobile abrir e fechar.
    - O código que faz o FAQ funcionar como um acordeão (sanfona).
    - O controle do slider de distância na página de listagem.

    BENEFÍCIO:
    - Agrupar o código de componentes aqui mantém a lógica da
      interface organizada em um só lugar.
*/


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