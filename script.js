document.addEventListener("DOMContentLoaded", () => {
    // Remove loading spinner
    const spinner = document.getElementById("loading-spinner");
    if (spinner) {
        spinner.style.opacity = 0;
        setTimeout(() => spinner.remove(), 500);
    }

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .scale-up');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach(el => observer.observe(el));

    // Chart background setup (optional if used)
    if (typeof Chart !== "undefined" && document.getElementById("backgroundChart")) {
        const ctx = document.getElementById("backgroundChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: Array.from({ length: 20 }, (_, i) => i),
                datasets: [{
                    label: "Background Data",
                    data: Array.from({ length: 20 }, () => Math.random() * 100),
                    borderColor: "#06b6d4",
                    borderWidth: 1,
                    fill: false,
                    tension: 0.4,
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } },
                animation: { duration: 0 }
            }
        });
    }
});
