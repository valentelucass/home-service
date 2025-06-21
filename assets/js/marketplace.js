document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO CONTADOR REGRESSIVO PARA OFERTAS ---
    const timers = document.querySelectorAll('.deal-timer');

    timers.forEach(timer => {
        const endDate = new Date(timer.dataset.endDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance < 0) {
                clearInterval(interval);
                timer.querySelector('span').textContent = 'Expirada!';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timer.querySelector('span').textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    });
});