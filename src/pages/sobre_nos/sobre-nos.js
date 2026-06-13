document.addEventListener("DOMContentLoaded", () => {
    // Animação de reveal ao scroll
    const itemsToReveal = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Para a animação acontecer só uma vez
            }
        });
    }, {
        threshold: 0.15 
    });

    itemsToReveal.forEach(item => revealObserver.observe(item));


    // Contador de números para estatísticas
    const counters = document.querySelectorAll(".counter");
    const speed = 150; // Quanto menor, mais rápido o contador se move

    const startCounting = (counter) => {
        const target = +counter.getAttribute("data-target");
        const updateCount = () => {
            const current = +counter.innerText.replace('+', '');
            const increment = Math.ceil(target / speed);

            if (current < target) {
                counter.innerText = `+${current + increment}`;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = `+${target}`;
            }
        };
        updateCount();
    };

    // Observar a seção de estatísticas para iniciar contadores
    const statsSection = document.querySelector(".stats-grid");
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => startCounting(counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if(statsSection) statsObserver.observe(statsSection);


    // Efeito 3D nos cards ao passar o mouse
    const cards = document.querySelectorAll(".value-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            
            // Aplicar rotação 3D baseada na posição do mouse
            card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg) translateY(-10px)`;
        });

        card.addEventListener("mouseleave", () => {
            // Resetar transformação ao sair do card
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

});
