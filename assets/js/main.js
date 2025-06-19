/* =================================================================== */
/* --- Módulo: main.js (O Orquestrador Principal) --- */
/* =================================================================== */
/*
    Pense neste arquivo como o "maestro" ou o "gerente de projeto".

    OBJETIVO:
    - Este é o cérebro do nosso JavaScript. Sua única e mais
      importante tarefa é **inicializar** todos os outros módulos na
      ordem correta, depois que a página HTML estiver completamente
      carregada (evento DOMContentLoaded).

    COMO FUNCIONA:
    - Ele chama as funções de inicialização que estão nos outros
      arquivos, como initMobileMenu(), initScrollAnimations(), etc.

    BENEFÍCIO:
    - Ter um único ponto de entrada torna o nosso código previsível
      e fácil de depurar. Se algo não funciona, o primeiro lugar para
      olhar é aqui, para ver se está sendo inicializado.
*/


document.addEventListener("DOMContentLoaded", function() {
    console.log("Home Service - Scripts Modulares Carregados!");

    // Inicializa os componentes de UI
    initMobileMenu();
    initFaqAccordion();
    initRadiusSlider();

    // Inicializa as animações de rolagem
    initScrollAnimations();
    
    // Futuramente, outras inicializações de lógicas de página
    // podem vir aqui.
});