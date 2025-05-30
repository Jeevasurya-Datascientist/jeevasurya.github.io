    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            });
        }

        const navbar = document.getElementById('navbar');
        const heroSectionHeight = document.getElementById('home')?.offsetHeight || 0;
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > Math.min(50, heroSectionHeight / 2)) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        function changeLinkState() {
            if (!navbar || sections.length === 0) return;
            let index = sections.length;
            while(--index && window.scrollY + navbar.offsetHeight + 20 < sections[index].offsetTop) {}
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sections[index] ? sections[index].id : 'home'}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
        
        if (navLinks.length > 0 && sections.length > 0) {
            changeLinkState();
            window.addEventListener('scroll', changeLinkState);

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.hash !== "") {
                        e.preventDefault();
                        const hash = this.hash;
                        const targetElement = document.querySelector(hash);
                        if (targetElement && navbar) {
                           const offset = navbar.offsetHeight;
                           const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                           const offsetPosition = elementPosition - offset;
                           window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                           const navbarCollapse = document.getElementById('navbarNav');
                           if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                               new bootstrap.Collapse(navbarCollapse).hide();
                           }
                        }
                    }
                });
            });
        }
        
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        if (entry.target.classList.contains('fade-in')) { 
                            const progressBars = entry.target.querySelectorAll('.tw-progress-bar');
                            progressBars.forEach(bar => {
                                const width = bar.getAttribute('data-width');
                                if (width) bar.style.width = width;
                            });
                        }
                        // observer.unobserve(entry.target); // Optional: unobserve after first animation
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(el => observer.observe(el));
        }

        // --- IMPROVED TYPEWRITER EFFECT ---
        const typewriterTextElement = document.getElementById('typewriter-text');
        
        if (typewriterTextElement) { 
            const phrasesToType = [
                "Hi, I'm Jeeva Surya.",
                "Aspiring Data Scientist.",
                "Python Developer.",
                "Data to Actionable Insights."
            ];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            const typingSpeed = 100;
            const deletingSpeed = 50;
            const pauseBeforeDelete = 2000;
            const pauseAfterDelete = 200;
            const initialDelay = 1200; 

            function typeEffect() {
                const currentPhrase = phrasesToType[phraseIndex];
                let nextTimeoutDuration;

                if (isDeleting) {
                    typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    nextTimeoutDuration = deletingSpeed;
                } else {
                    typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    nextTimeoutDuration = typingSpeed;
                }

                if (!isDeleting && charIndex === currentPhrase.length) {
                    isDeleting = true;
                    nextTimeoutDuration = pauseBeforeDelete; 
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrasesToType.length;
                    nextTimeoutDuration = pauseAfterDelete;
                }
                
                setTimeout(typeEffect, nextTimeoutDuration);
            }
            
            if (phrasesToType.length > 0) {
                setTimeout(typeEffect, initialDelay); 
            }
        }
        // --- END IMPROVED TYPEWRITER EFFECT ---


        const certificatesData = [
            {
                title: "Data Science Foundations: Fundamentals (Completion)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/2a8e0d28508dc76b7de4777f482dd5c61666ec976179933d6139059248ed8f5d",
                tags: ["Data Science", "Fundamentals"],
                imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Data Science Foundations: Fundamentals (Exam)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/5df93c3487709d91644811b5936e0345e4b9bca63d121dc71cadfffb15bdad5c",
                tags: ["Data Science", "Fundamentals", "Exam"],
                imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Introduction to Career Skills in Data Analytics",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/cb0647b925b443c5fbb88edf65020369d1aa5b8c26fde9d71d27c0564dbe777",
                tags: ["Data Analytics", "Career Skills"],
                imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Learning Data Analytics: Part 1 (Completion)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/0a0073a450611d2ba9f1176d4fc6985f94b441da9a24e3db007f5de1eb0d0cb2s",
                tags: ["Data Analytics", "Core Skills"],
                imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Learning Data Analytics: Part 1 (Exam)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/8b3d532e3fcf30375402ac65357278c142bca0652fbbea778ca66269a8c55ae5",
                tags: ["Data Analytics", "Core Skills", "Exam"],
                imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Learning Data Analytics Part 2 (Completion)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/1f4538acdf761f574aacee5f484f0dd1a9f30b236d2c778a0fd950dbacfa3ad3?trk=share_certificate",
                tags: ["Data Analytics", "Advanced Skills"],
                imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Learning Data Analytics Part 2 (Exam)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/8b786e18d21fea2f57075e49cbcdfcd0dff3b0a1124893e365b614a8725f8b0f?trk=share_certificate",
                tags: ["Data Analytics", "Advanced Skills", "Exam"],
                imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "SQL Essential Training (Completion)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/6c746a7a1fa273282ff24eb3cdc37cb11306cf9873b295e593f7bf07d8ba6b47",
                tags: ["SQL", "Databases"],
                imageUrl: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "SQL Essential Training (Exam)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/9c4968a38e8b7619ce35e396040167b61effa605b2c443426fc277f6e2de78ba",
                tags: ["SQL", "Databases", "Exam"],
                imageUrl: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "PostgreSQL Essential Training",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/b55bb7d07a2b420b90f256f38e13b8ee1ee55b66f85ac0592034c0b8a8ce955d?trk=share_certificate",
                tags: ["SQL", "PostgreSQL", "Databases"],
                imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" 
            },
            {
                title: "Python for Data science and Machine Learning Part 1",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/caebde15f5f382c1f3bf8b0a39827cc97e69b9d5dad87c23f25609ba4a9d5ded?trk=share_certificate",
                tags: ["Python", "Data Science", "Machine Learning"],
                imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" 
            },
            {
                title: "ML for Beginners",
                issuer: "Sololearn",
                url: "https://www.sololearn.com/certificates/CC-N2TWKSUP",
                tags: ["Machine Learning", "Beginner"],
                imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Hands-on-Data-science using SQL,Tableau,Python,Spark",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/bd4601d33a80152b024007eadf19ee2074e0b0ffec68c125e2398b847690538a",
                tags: ["Data Science", "SQL", "Tableau", "Python", "Spark", "Hands-on"],
                imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Microsoft exam Certificate",
                issuer: "Microsoft (via LinkedIn Learning)",
                url: "https://www.linkedin.com/learning/certificates/14f14850a34abbaa372907c447eb199718e2667d6dfb20f2cd91afcb6f093a85?trk=share_certificate",
                tags: ["Microsoft", "Exam", "LinkedIn Learning"],
                imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "AI in Data Analysis",
                issuer: "Sololearn",
                url: "https://www.sololearn.com/certificates/CC-ZK8PISMW",
                tags: ["AI", "Data Analysis"],
                imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Improving Insights in OpenAI",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/e637f8cff0e8a5adc5ce1b89c5953e6ce56a14bc080fd01aba3b41dbb03b69d9",
                tags: ["AI", "OpenAI", "Insights"],
                imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Nano Tips for Use of Chatgpt",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/e3ba929dfd4052bc64d1b9ee66684addd3f9503e2e7100ee2d422a62b32e2eee",
                tags: ["ChatGPT", "AI", "Nano Tips"],
                imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" 
            },
            {
                title: "Interpersonal Communication (Completion)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/f7ca45d1955a9ca10ea2e3a68c441f2673b4d86f0f99ab7aa52ac8defd6e290c?trk=share_certificate",
                tags: ["Communication", "Soft Skills"],
                imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Interpersonal Communication (Exam)",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/f6760718e4849d0ec1b4c8d9a15d2831b5bf638b9b40ab6d777a6712b441ce32?trk=share_certificate",
                tags: ["Communication", "Soft Skills", "Exam"],
                imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            },
            {
                title: "Nano Tips to Enhance Your Communication",
                issuer: "LinkedIn Learning",
                url: "https://www.linkedin.com/learning/certificates/8ff974fd88654cb39d5d302eebd8b9b12afe7f7da7a580ffc8ccf6ded33b2c16?trk=share_certificate",
                tags: ["Communication", "Soft Skills", "Nano Tips"],
                imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
            }
        ];

        function updateStatsCards() {
            const certificationsCountEl = document.getElementById('certificationsCount');
            const coursesCountEl = document.getElementById('coursesCount');
            const specializationsCountEl = document.getElementById('specializationsCount');

            if (certificatesData && certificatesData.length > 0) {
                const totalCertificates = certificatesData.length;

                if (certificationsCountEl) certificationsCountEl.textContent = totalCertificates;
                if (coursesCountEl) coursesCountEl.textContent = totalCertificates; 

                let specializations = 0;
                certificatesData.forEach(cert => {
                    const titleLower = cert.title.toLowerCase();
                    if (titleLower.includes("specialization") || titleLower.includes("professional certificate")) {
                        specializations++;
                    }
                });
                if (specializationsCountEl) specializationsCountEl.textContent = specializations;
            }
        }
        
        const certificateGrid = document.getElementById('certificate-grid');
        const toggleBtn = document.getElementById('toggleCertificatesBtn');
        const toggleButtonContainer = document.getElementById('toggleButtonContainer');
        const initiallyVisibleCount = 6;
        let certificatesVisible = false;

        function displayCertificates() {
            if (!certificateGrid || !animatedElements) return; // Check for observer too
            certificateGrid.innerHTML = ''; 
            certificatesData.forEach((cert, index) => {
                const animationDelay = 0.1 + (index % 3) * 0.1; 
                const cardHTML = `
                    <div class="col-md-6 col-lg-4 certificate-item fade-in" style="animation-delay: ${animationDelay}s; ${index >= initiallyVisibleCount ? 'display: none;' : ''}">
                        <div class="certificate-card h-100">
                            <img src="${cert.imageUrl}" class="card-img-top" alt="${cert.title}">
                            <div class="card-body p-4">
                                <div>
                                    <h3 class="h5 card-title fw-semibold mb-1">${cert.title}</h3>
                                    <p class="card-text text-muted small mb-2"><em>${cert.issuer}</em></p>
                                    <div class="certificate-tags mb-3">
                                        ${cert.tags.map(tag => `<span class="skill-badge">${tag}</span>`).join('')}
                                    </div>
                                </div>
                                <a href="${cert.url}" target="_blank" class="btn btn-sm btn-outline-primary mt-auto rounded-pill">View Certificate <i class="fas fa-external-link-alt ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                `;
                certificateGrid.insertAdjacentHTML('beforeend', cardHTML);
            });

            const newAnimatedElements = certificateGrid.querySelectorAll('.fade-in');
            const observerForCerts = new IntersectionObserver((entries) => { // Create a local observer if global one is not sufficient or causes issues
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            newAnimatedElements.forEach(el => observerForCerts.observe(el));


            if (certificatesData.length <= initiallyVisibleCount) {
                if (toggleButtonContainer) toggleButtonContainer.style.display = 'none';
            } else {
                if (toggleButtonContainer) toggleButtonContainer.style.display = 'block';
                if (toggleBtn) toggleBtn.textContent = 'Show More Certificates';
                certificatesVisible = false; 
            }
        }
        
        if (toggleBtn && certificateGrid) {
            toggleBtn.addEventListener('click', () => {
                certificatesVisible = !certificatesVisible;
                const allCertificateItems = certificateGrid.querySelectorAll('.certificate-item');
                allCertificateItems.forEach((certCard, index) => {
                    if (index >= initiallyVisibleCount) {
                        certCard.style.display = certificatesVisible ? 'block' : 'none';
                    }
                });
                toggleBtn.textContent = certificatesVisible ? 'Show Less Certificates' : 'Show More Certificates';
            });
        }
        
        updateStatsCards(); 
        if (certificateGrid) displayCertificates(); 
        // --- END CERTIFICATES LOGIC ---

        // --- PROJECTS DATA AND LOGIC --
        const projectsData = [
            {
                title: "Online Voting System",
                description: "A web-based platform enabling secure and transparent online voting. Features include user registration, voter authentication, ballot creation, and automated vote tallying, built with a focus on integrity and ease of use.",
                imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", 
                tags: ["PHP", "HTML", "CSS", "JavaScript", "Bootstrap"], 
                githubUrl: "https://github.com/Jeevasurya-Datascientist/Online-Voting-System", 
                liveUrl: null
            },
            {
                title: "Airline Reservation System",
                description: "A comprehensive system for managing flight bookings. Allows users to search for flights, view availability and pricing, select seats, and make reservations. Includes an admin panel for flight and booking management.",
                imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", 
                tags: ["PHP", "HTML", "CSS", "JavaScript", "Bootstrap"],
                githubUrl: "https://github.com/Jeevasurya-Datascientist/Airline-Reservation-System", 
                liveUrl: null
            },
            {
                title: "Expense Tracker",
                description: "A user-friendly application to help individuals monitor and manage their personal finances. Users can log income and expenses, categorize transactions, view spending patterns through charts, and set budgets.",
                imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", 
                tags: ["PHP", "HTML", "CSS", "JavaScript", "Bootstrap"],
                githubUrl: "https://github.com/Jeevasurya-Datascientist/Expense-Tracker", 
                liveUrl: null
            },
            {
                title: "Employee Feedback Management System",
                description: "A platform designed to streamline the collection and analysis of employee feedback. Enables employees to submit suggestions or concerns, and allows management to track, respond to, and report on feedback trends.",
                imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", 
                tags: ["PHP", "HTML", "CSS", "JavaScript", "Bootstrap"],
                githubUrl: "https://github.com/Jeevasurya-Datascientist/Employee-feedback-management-system", 
                liveUrl: null
            }
        ];

        const projectGrid = document.getElementById('project-grid');

        function displayProjects() {
            if (!projectGrid || !animatedElements) return;
            projectGrid.innerHTML = ''; 

            if (projectsData.length === 0) {
                projectGrid.innerHTML = '<p class="text-center col-12">More projects coming soon!</p>';
                return;
            }

            projectsData.forEach((project, index) => {
                const animationDelay = 0.1 + (index % 3) * 0.15; 
                const cardHTML = `
                    <div class="col-md-6 col-lg-4 project-item fade-in" style="animation-delay: ${animationDelay}s;">
                        <div class="card h-100 project-card"> 
                            ${project.imageUrl ? `<img src="${project.imageUrl}" class="card-img-top" alt="${project.title}">` : '<div class="card-img-top-placeholder"><i class="fas fa-project-diagram fa-3x text-muted"></i></div>'}
                            <div class="card-body p-4">
                                <div> 
                                    <h3 class="h5 card-title fw-semibold mb-2">${project.title}</h3>
                                    <p class="card-text text-muted small mb-3">${project.description}</p>
                                    <div class="certificate-tags mb-3">
                                        ${project.tags.map(tag => `<span class="skill-badge">${tag}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="project-links mt-auto pt-3 border-top">
                                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary me-2 mb-1 rounded-pill"><i class="fab fa-github me-1"></i> GitHub</a>` : ''}
                                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary mb-1 rounded-pill"><i class="fas fa-external-link-alt me-1"></i> Live Demo</a>` : ''}
                                    ${!(project.githubUrl || project.liveUrl) ? `<small class="text-muted fst-italic">Links coming soon</small>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                projectGrid.insertAdjacentHTML('beforeend', cardHTML);
            });
            
            const newProjectAnimatedElements = projectGrid.querySelectorAll('.fade-in');
             const observerForProjects = new IntersectionObserver((entries) => { 
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            newProjectAnimatedElements.forEach(el => observerForProjects.observe(el));
        }
        
        if (projectGrid) displayProjects();
        // --- END PROJECTS LOGIC ---

        // --- CHART.JS SETUP ---
        const chartFont = { family: "'Inter', sans-serif", size: 11 };
        const chartLegendColor = '#4b5563'; 
        const chartGridColor = '#e5e7eb'; 
        const chartTicksColor = '#6b7280'; 

        const commonChartOptions = (showLegend = true, legendPos = 'top') => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: showLegend,
                    position: legendPos,
                    labels: { font: chartFont, color: chartLegendColor, padding:15 }
                },
                tooltip: {
                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                    titleFont: { ...chartFont, weight: 'bold' },
                    bodyFont: chartFont,
                    padding: 10,
                    cornerRadius: 6,
                    boxPadding: 3
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: chartGridColor }, ticks: { color: chartTicksColor, font: chartFont } },
                x: { grid: { display: false }, ticks: { color: chartTicksColor, font: chartFont } }
            }
        });
        
        const chartColors = [
            'rgba(59, 130, 246, 0.7)',  
            'rgba(16, 185, 129, 0.7)', 
            'rgba(245, 158, 11, 0.7)', 
            'rgba(239, 68, 68, 0.7)',  
            'rgba(139, 92, 246, 0.7)'  
        ];
        const chartBorderColors = [
            'rgb(59, 130, 246)',  
            'rgb(16, 185, 129)', 
            'rgb(245, 158, 11)', 
            'rgb(239, 68, 68)',  
            'rgb(139, 92, 246)'  
        ];


        const skillCtx = document.getElementById('skillFocusChart')?.getContext('2d');
        if (skillCtx && typeof Chart !== 'undefined') {
            new Chart(skillCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Python & Libraries', 'Machine Learning', 'Data Analysis/SQL', 'Visualization', 'Tools'],
                    datasets: [{
                        label: 'Skill Area Focus',
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: chartColors,
                        borderColor: '#fff', borderWidth: 2, hoverOffset: 8
                    }]
                },
                options: { ...commonChartOptions(true, 'bottom'), cutout: '65%' }
            });
        }

        const milestonesCtx = document.getElementById('learningMilestonesChart')?.getContext('2d');
        if (milestonesCtx && typeof Chart !== 'undefined') {
            new Chart(milestonesCtx, {
                type: 'line',
                data: {
                    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
                    datasets: [{
                        label: 'Key Learning Achievements',
                        data: [2, 4, 5, 7, 9, 10], 
                        borderColor: chartBorderColors[0],
                        backgroundColor: chartColors[0],
                        fill: true, tension: 0.4,
                        pointBackgroundColor: chartBorderColors[0], pointBorderColor: '#fff', pointHoverRadius: 7, pointRadius: 5
                    }]
                },
                options: commonChartOptions()
            });
        }

        const techStackCtx = document.getElementById('projectTechStackChart')?.getContext('2d');
        if (techStackCtx && typeof Chart !== 'undefined') {
            new Chart(techStackCtx, {
                type: 'bar',
                data: {
                    labels: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'SQL'],
                    datasets: [{
                        label: 'Library Usage in Projects',
                        data: [9, 8, 7, 7, 6, 8], 
                        backgroundColor: chartColors,
                        borderColor: chartBorderColors,
                        borderWidth: 1, borderRadius: 5
                    }]
                },
                options: { ...commonChartOptions(false), indexAxis: 'y', scales: {
                    y: { beginAtZero: true, grid: { display: false }, ticks: { color: chartTicksColor, font: chartFont } },
                    x: { grid: { color: chartGridColor }, ticks: { color: chartTicksColor, font: chartFont } }
                }}
            });
        }

        const dsExplorationCtx = document.getElementById('dsTopicExplorationChart')?.getContext('2d');
        if (dsExplorationCtx && typeof Chart !== 'undefined') {
            new Chart(dsExplorationCtx, {
                type: 'polarArea',
                data: {
                    labels: ['Statistical Analysis', 'Feature Engineering', 'Model Evaluation', 'Time Series Basics', 'NLP Fundamentals'],
                    datasets: [{
                        label: 'Time Spent on Topics (hrs)',
                        data: [60, 45, 50, 30, 40],
                        backgroundColor: chartColors,
                        borderColor: '#fff', borderWidth: 1
                    }]
                },
                options: { ...commonChartOptions(true, 'bottom'), scales: { r: { pointLabels: { font: chartFont, color: chartTicksColor }, grid: { color: chartGridColor }, ticks: { backdropColor: 'transparent', color: chartTicksColor, font: chartFont, z:1 } } } }
            });
        }
        // --- END CHART.JS ---
        
        function handleFormSubmission(formElement, messageElementId) {
            const messageDiv = document.getElementById(messageElementId);
            if (formElement && messageDiv) {
                formElement.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const formData = new FormData(formElement);
                    const action = formElement.action;
                    const submitButton = formElement.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.innerHTML;

                    let isValid = true;
                    formElement.querySelectorAll('[required]').forEach(input => {
                        if (!input.value.trim()) isValid = false;
                    });

                    if (!isValid) {
                        messageDiv.innerHTML = '<div class="alert alert-danger" role="alert">Please fill in all required fields.</div>';
                        return;
                    }
                    
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';

                    fetch(action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' }})
                    .then(response => {
                        if (response.ok) {
                            messageDiv.innerHTML = '<div class="alert alert-success" role="alert">Thank you! Your message has been sent.</div>';
                            formElement.reset();
                        } else {
                            response.json().then(data => {
                                messageDiv.innerHTML = `<div class="alert alert-danger" role="alert">${data.errors ? data.errors.map(err => err.message).join("<br>") : "Oops! There was a problem."}</div>`;
                            }).catch(() => {
                                messageDiv.innerHTML = '<div class="alert alert-danger" role="alert">Oops! An unknown error occurred.</div>';
                            });
                        }
                    }).catch(() => {
                        messageDiv.innerHTML = '<div class="alert alert-danger" role="alert">Network error. Please try again.</div>';
                    }).finally(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                        setTimeout(() => { messageDiv.innerHTML = ''; }, 7000);
                    });
                });
            }
        }

        const contactForm = document.getElementById('contactForm');
        if (contactForm) handleFormSubmission(contactForm, 'formMessage');

        const currentYearEl = document.getElementById('currentYear');
        if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

        // --- CUSTOM MOUSE CURSOR ---
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursorDot);

        const cursorRing = document.createElement('div');
        cursorRing.classList.add('cursor-ring');
        document.body.appendChild(cursorRing);

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        
        let cursorVisible = false;
        let firstMove = true;

        const updateCursorVisibility = () => {
            if (!cursorVisible && mouseX !== 0 && mouseY !== 0) {
                cursorDot.style.opacity = '1';
                cursorRing.style.opacity = '1';
                cursorVisible = true;
            }
        };
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (firstMove) {
                ringX = mouseX;
                ringY = mouseY;
                firstMove = false;
            }
            
            updateCursorVisibility();
            
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        const animateRing = () => {
            const easing = 0.18; 
            ringX += (mouseX - ringX) * easing;
            ringY += (mouseY - ringY) * easing;

            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(animateRing);
        };

        animateRing();

        const interactiveElementsList = document.querySelectorAll(
            'a, button, .btn, [role="button"], input, textarea, select, ' +
            '.navbar-brand, .nav-link, .skill-card, .certificate-card, .project-card, ' +
            '.social-icons a, #toggleCertificatesBtn, .tw-progress-bar, .form-control'
        );

        interactiveElementsList.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hovered');
                cursorDot.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hovered');
                cursorDot.classList.remove('hovered');
            });
        });

        document.addEventListener('mousedown', () => {
            cursorRing.classList.add('clicked');
        });
        document.addEventListener('mouseup', () => {
            cursorRing.classList.remove('clicked');
        });

        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget && !e.toElement) {
                if (cursorVisible) {
                    cursorDot.style.opacity = '0';
                    cursorRing.style.opacity = '0';
                    cursorVisible = false;
                    firstMove = true; 
                }
            }
        });
         // --- END CUSTOM MOUSE CURSOR ---

    });
