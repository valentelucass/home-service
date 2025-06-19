/* =================================================================== */
/* --- Módulo: helpers.js (Ajudantes) --- */
/* =================================================================== */
/*
    Pense neste arquivo como a sua "caixa de ferramentas".

    OBJETIVO:
    - Conter funções pequenas, globais e independentes que podem
    ser usadas em qualquer lugar do site.
    - Elas não dependem de outros scripts para funcionar e realizam
      tarefas muito específicas.

    EXEMPLOS:
    - openWhatsApp(): Abre uma nova aba para o WhatsApp.
    - showNotification(): Mostra uma notificação na tela.

    BENEFÍCIO:
    - Manter essas funções aqui evita que a gente repita o mesmo
      código em vários lugares. É o nosso arsenal de ferramentas rápidas.
*/


/**
 * Abre uma nova aba com o WhatsApp e uma mensagem personalizada.
 * @param {string} providerName - O nome do prestador de serviço.
 */
function openWhatsApp(providerName) {
    const message = encodeURIComponent(`Olá ${providerName}! Vi seu perfil no Home Service e gostaria de contratar seus serviços.`);
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`; // Número de exemplo
    window.open(whatsappUrl, "_blank");
}

/**
 * Exibe uma notificação flutuante na tela.
 * @param {string} message - A mensagem a ser exibida.
 * @param {'info' | 'success' | 'warning' | 'error'} type - O tipo de notificação.
 */
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}