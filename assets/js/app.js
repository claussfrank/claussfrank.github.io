document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            navbar.style.transform = "translateY(-100%)"; // Oculta la barra con animación
            navbar.style.transition = "transform 0.3s ease-in-out";
        } else {
            navbar.style.transform = "translateY(0)"; // Muestra la barra nuevamente
        }
    }, { passive: true });

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if ("IntersectionObserver" in window && revealElements.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add("is-visible"));
    }
});