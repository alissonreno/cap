document.addEventListener("DOMContentLoaded", function () {
    // Configurações iniciais
    initAnimations();
    initCarousel();
    initDarkMode();
});

// Função para inicializar as animações
function initAnimations() {
    // Animação de Fade-In para cards de notícias
    gsap.from(".news-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".news-container",
            start: "top 80%",
        },
    });
}

// Função para inicializar o carrossel de imagens
function initCarousel() {
    const carouselImages = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const prevButton = document.querySelector(".carousel .prev");
    const nextButton = document.querySelector(".carousel .next");
    let currentIndex = 0;

    // Função para mostrar a imagem atual
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) img.classList.add("active");
        });
    }

    // Evento para o botão "Anterior"
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

    // Evento para o botão "Próximo"
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex);
    });

    // Suporte para touch em dispositivos móveis
    let isDragging = false, startX, startScrollLeft;

    carouselImages.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = carouselImages.scrollLeft;
    });

    carouselImages.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - startX;
        carouselImages.scrollLeft = startScrollLeft - x;
    });

    carouselImages.addEventListener("mouseup", () => {
        isDragging = false;
    });

    carouselImages.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // Inicializa o carrossel com a primeira imagem ativa
    showImage(currentIndex);
}

// Função para inicializar o Dark Mode
function initDarkMode() {
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "🌙";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.top = "20px";
    darkModeToggle.style.right = "20px";
    darkModeToggle.style.padding = "10px";
    darkModeToggle.style.backgroundColor = "#C8102E";
    darkModeToggle.style.color = "#FFFFFF";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.borderRadius = "5px";
    darkModeToggle.style.cursor = "pointer";
    document.body.appendChild(darkModeToggle);

    // Verifica a preferência do usuário no localStorage
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Evento para alternar o Dark Mode
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
}

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector("input").value;
    alert(`Obrigado por assinar nossa newsletter com o e-mail: ${email}`);
    this.reset();
});