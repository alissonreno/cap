document.addEventListener("DOMContentLoaded", function () {
    // Animação de Fade-In para cards
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

    // Modal para notícias
    const modals = document.querySelectorAll(".modal");
    const readMoreButtons = document.querySelectorAll(".read-more");
    const closeButtons = document.querySelectorAll(".close");

    readMoreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "flex";
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            modal.style.display = "none";
        });
    });

    // Fechar modal ao clicar fora
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });

    // Carrossel de Imagens
    const carouselImages = document.querySelector(".carousel-images");
    const images = document.querySelectorAll(".carousel-images img");
    const prevButton = document.querySelector(".carousel .prev");
    const nextButton = document.querySelector(".carousel .next");
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove("active");
            if (i === index) img.classList.add("active");
        });
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage(currentIndex);
    });

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

    // Botão "Voltar ao Topo"
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

    // Dark Mode
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

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Verificar preferência do usuário ao carregar a página
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});