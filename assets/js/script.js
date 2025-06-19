// Arquivo: assets/js/script.js (Versão Final e Corrigida)

document.addEventListener("DOMContentLoaded", function() {

    console.log("Home Service - Scripts Integrados Carregados!");

    // --- FUNCIONALIDADE: Controle do Menu Mobile ---
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

    // --- FUNCIONALIDADE: Slider de Raio (página de busca) ---
    const radiusSlider = document.getElementById("radius");
    const radiusValue = document.getElementById("radius-value");

    if (radiusSlider && radiusValue) {
        radiusSlider.addEventListener("input", function() {
            radiusValue.textContent = this.value;
        });
    }

    // --- FUNCIONALIDADE: Lógica de Navegação das Categorias ---
    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", function(event) {
            if (event.target.tagName === 'A' || event.target.closest('.sub-items')) {
                return;
            }
            const category = this.getAttribute("data-category");
            navigateToCategory(category);
        });
    });

    // --- FUNCIONALIDADE: Filtro inicial por sub-item (se vier na URL) ---
    const urlParams = new URLSearchParams(window.location.search);
    const subItem = urlParams.get('sub');
    if (subItem) {
        filterProvidersBySubItem(subItem);
    }

    // --- FUNCIONALIDADE: Efeitos Visuais (Hover nos cards) ---
    const allCards = document.querySelectorAll(".category-card, .provider-card, .plan-card, .product-card");
    allCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-5px)";
            this.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

    // --- FUNCIONALIDADE: Animação de Rolagem Suave para links internos ---
    const internalLinks = document.querySelectorAll("a[href^='#']");
    internalLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
});


// --- FUNÇÕES AUXILIARES GLOBAIS ---

// =============================================
// FUNÇÃO CORRIGIDA
// =============================================
function navigateToCategory(category) {
    // Objeto com os caminhos corretos, incluindo a subpasta
    const categoryPages = {
        "residencial": "paginas-de-listagem/providers-residencial.html",
        "diarista": "paginas-de-listagem/providers-diarista.html",
        "saude": "paginas-de-listagem/providers-saude.html",
        "automotivo": "paginas-de-listagem/providers-automotivo.html",
        "eventos": "paginas-de-listagem/providers-eventos.html",
        "professor": "paginas-de-listagem/providers-professor.html"
    };

    const page = categoryPages[category];
    if (page) {
        showNotification(`Redirecionando para a categoria ${category}...`, "info");
        setTimeout(() => {
            // Navegação real ativada
            window.location.href = page;
        }, 1000);
    } else {
        console.error(`Página para a categoria "${category}" não definida.`);
        // Futuramente, podemos criar a página providers-residencial.html, etc.
        showNotification(`Página para a categoria "${category}" ainda em construção.`, "warning");
    }
}

function openWhatsApp(providerName) {
    const message = encodeURIComponent(`Olá ${providerName}! Vi seu perfil no Home Service e gostaria de contratar seus serviços.`);
    // IMPORTANTE: Este número de telefone é um exemplo, troque pelo do profissional quando tiver o dado.
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, "_blank");
}

function filterByRating(minRating) {
    // Lógica a ser implementada na página de listagem
    console.log(`Filtrando por avaliação mínima: ${minRating}`);
}

function getProviderRating(providerElement) {
    // Lógica a ser implementada na página de listagem
}

function filterProvidersBySubItem(subItem) {
    // Lógica a ser implementada na página de listagem
}

function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll("[required]");
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add("error");
            isValid = false;
        } else {
            field.classList.remove("error");
        }
    });
    return isValid;
}

function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function handleContactSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("contact-form");
    if (validateForm(form)) {
        showNotification("Mensagem enviada com sucesso!", "success");
        form.reset();
    } else {
        showNotification("Por favor, preencha todos os campos obrigatórios.", "warning");
    }
}