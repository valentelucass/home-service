document.addEventListener("DOMContentLoaded", function() {

    console.log("Home Service - Scripts Corretos Carregados!");

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

    // --- FUNCIONALIDADE: Lógica de Navegação das Categorias ---
    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", function() {
            const category = this.getAttribute("data-category");
            navigateToCategory(category);
        });
    });

    // ==================================================================
    // [NOVA FUNCIONALIDADE] - LÓGICA DA PÁGINA DE LISTAGEM
    // Este código verifica se estamos na página de listagem e a atualiza.
    // ==================================================================
    if (document.body.id === 'page-listing') {
        const urlParams = new URLSearchParams(window.location.search);
        const categoria = urlParams.get('categoria'); // Pega o valor do parâmetro 'categoria' da URL

        if (categoria) {
            const tituloPagina = document.querySelector('.listing-title h1');
            
            // Mapeia o valor da categoria para um título amigável
            const titulos = {
                'residencial': 'Serviços Residenciais',
                'diarista': 'Diaristas',
                'eventos': 'Serviços para Eventos',
                'automotivo': 'Serviços Automotivos',
                'saude': 'Saúde e Bem-estar',
                'professor': 'Professores Particulares'
            };

            // Atualiza o título da página e da aba do navegador dinamicamente
            if (tituloPagina && titulos[categoria]) {
                tituloPagina.textContent = titulos[categoria];
                document.title = `${titulos[categoria]} - Home Service`;
            }

            // No futuro, aqui carregaremos os profissionais da 'categoria' específica
            console.log(`Página de listagem carregada para a categoria: ${categoria}`);
        }
    }


    // --- Outras funcionalidades existentes ---
    const radiusSlider = document.getElementById("radius");
    const radiusValue = document.getElementById("radius-value");
    if (radiusSlider && radiusValue) {
        radiusSlider.addEventListener("input", function() {
            radiusValue.textContent = this.value;
        });
    }

    const allCards = document.querySelectorAll(".category-card, .provider-card, .plan-card, .product-card");
    allCards.forEach(card => {
        card.addEventListener("mouseenter", function() { this.style.transform = "translateY(-5px)"; this.style.transition = "transform 0.3s ease"; });
        card.addEventListener("mouseleave", function() { this.style.transform = "translateY(0)"; });
    });

    const internalLinks = document.querySelectorAll("a[href^='#']");
    internalLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) { targetElement.scrollIntoView({ behavior: "smooth" }); }
        });
    });
});


// --- FUNÇÕES AUXILIARES GLOBAIS ---

// ==================================================================
// [FUNÇÃO ATUALIZADA]
// Redireciona para a PÁGINA ÚNICA de listagem com o parâmetro correto.
// ==================================================================
function navigateToCategory(category) {
    if (category) {
        showNotification(`Redirecionando para a categoria ${category}...`, "info");
        const url = `paginas-de-listagem/listagem.html?categoria=${category}`;
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    } else {
        showNotification("Categoria não especificada.", "error");
    }
}


function openWhatsApp(providerName) {
    const message = encodeURIComponent(`Olá ${providerName}! Vi seu perfil no Home Service e gostaria de contratar seus serviços.`);
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, "_blank");
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