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

/* ── Idioma ES/EN ─────────────────────────────────────────────────────────
   La redirección automática vive inline en el <head> de las dos homes para
   que no haya parpadeo. Aquí solo: recordar la elección manual y avisar
   cuando la redirección ocurrió sola. */
document.addEventListener("DOMContentLoaded", function () {
    const altLink = document.querySelector(".lang-switch-item[data-set-lang]");
    if (!altLink) return;

    altLink.addEventListener("click", function () {
        try {
            localStorage.setItem("cf-lang", altLink.dataset.setLang);
            sessionStorage.removeItem("cf-autolang");
        } catch (e) {}
    });

    // ¿Llegamos aquí porque la home redirigió sola?
    let autoLang = null;
    try { autoLang = sessionStorage.getItem("cf-autolang"); } catch (e) {}
    if (autoLang !== document.documentElement.lang) return;
    try { sessionStorage.removeItem("cf-autolang"); } catch (e) {}

    const isEn = document.documentElement.lang === "en";
    const notice = document.createElement("div");
    notice.className = "lang-notice";
    notice.setAttribute("role", "status");
    notice.innerHTML =
        '<span>' + (isEn
            ? 'Showing English based on your browser. <a href="' + altLink.getAttribute("href") + '" data-set-lang="es">Ver en español</a>'
            : 'Te mostramos español según tu navegador. <a href="' + altLink.getAttribute("href") + '" data-set-lang="en">View in English</a>') +
        '</span>' +
        '<button type="button" aria-label="' + (isEn ? "Dismiss" : "Cerrar") + '">×</button>';

    notice.querySelector("a").addEventListener("click", function (ev) {
        try { localStorage.setItem("cf-lang", ev.currentTarget.dataset.setLang); } catch (e) {}
    });
    notice.querySelector("button").addEventListener("click", function () {
        notice.remove();
    });

    document.body.appendChild(notice);
});
