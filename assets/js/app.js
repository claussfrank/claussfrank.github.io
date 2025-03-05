document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            navbar.style.transform = "translateY(-100%)"; // Oculta la barra con animación
            navbar.style.transition = "transform 0.3s ease-in-out";
        } else {
            navbar.style.transform = "translateY(0)"; // Muestra la barra nuevamente
        }
    });
});