document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's just a "#" link (like the brand) or a real section link
            if (this.getAttribute('href').length > 1 && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Align top of section to top of viewport
                });
            }
        });
    });

    // --- Active Nav Link Highlighting ---
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        let currentSectionId = '';
        const scrollY = window.pageYOffset; // More compatible than scrollY

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for sticky nav
            const sectionHeight = section.offsetHeight; // Use offsetHeight

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Special case for reaching the bottom
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
             const lastSection = sections[sections.length - 1];
             if (lastSection) currentSectionId = lastSection.getAttribute('id');
        }


        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active class from all
             // Check if the link's href matches the current section ID
            const href = link.getAttribute('href');
            if (href && href.length > 1 && href.slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Initial call and listener
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);


    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Background Chart.js Implementation ---
    const ctx = document.getElementById('backgroundChart')?.getContext('2d'); // Optional chaining
    if (ctx) {
        const backgroundChart = new Chart(ctx, {
            type: 'line', // Line chart is often more subtle for background
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], // More points for smoother look
                datasets: [{
                    label: 'Activity',
                    data: Array.from({ length: 15 }, () => Math.random() * 20 + 5), // Random data
                    borderColor: 'rgba(6, 182, 212, 0.3)', // Subtle cyan border #06b6d4
                    backgroundColor: 'rgba(6, 182, 212, 0.05)', // Very subtle fill
                    borderWidth: 1.5,
                    pointRadius: 0, // No points
                    tension: 0.4, // Smoother curve
                    fill: true
                },
                { // Add another dataset for more visual interest
                    label: 'Growth',
                     data: Array.from({ length: 15 }, () => Math.random() * 15 + 10), // Different random data
                    borderColor: 'rgba(59, 130, 246, 0.2)', // Subtle blue border #3b82f6
                    backgroundColor: 'rgba(59, 130, 246, 0.03)',
                    borderWidth: 1,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 3000, // Slower animation
                    easing: 'linear'
                },
                scales: {
                    x: { display: false }, // Hide axes
                    y: { display: false }
                },
                plugins: {
                    legend: { display: false }, // Hide legend
                    tooltip: { enabled: false } // Disable tooltips
                },
                elements: {
                    line: {
                        borderJoinStyle: 'round' // Smoother line joins
                    }
                }
            }
        });
    } else {
        console.warn("Background chart canvas not found.");
    }

}); // End DOMContentLoaded
