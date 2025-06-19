/* =================================================================== */
/* --- Módulo: animations.js (Animações) --- */
/* =================================================================== */
/*
    Pense neste arquivo como o "coreógrafo" do seu site.

    OBJETIVO:
    - A única responsabilidade dele é controlar as animações que
      acontecem conforme o usuário rola a página.

    COMO FUNCIONA:
    - Ele usa a "IntersectionObserver API" para "observar" as seções
      da página e adicionar uma classe `.visible` quando elas aparecem
      na tela, o que dispara a animação definida no CSS.

    BENEFÍCIO:
    - Isolar o código de animação aqui facilita a manutenção e a
      criação de novos efeitos visuais no futuro.
*/


function initScrollAnimations() {
    const animatedSections = document.querySelectorAll('.animated-section');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // A animação começa quando 10% do elemento está visível
        });

        animatedSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback para navegadores antigos que não suportam IntersectionObserver
        animatedSections.forEach(section => {
            section.classList.add('visible');
        });
    }
}