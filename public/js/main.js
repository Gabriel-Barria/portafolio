// ===================================
// Main JavaScript File
// ===================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeThemeToggle();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeMiniProjects(); // Updated to use mini projects
    initializeContactForm();
    initializeBackToTop();
    initializeRobot();
    initializeMobileCollapsibles();
    initializeProjectsCarousel();
    initializeSkillsCollapsible();
});

// ===================================
// Navigation
// ===================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Theme Toggle
// ===================================
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(icon, currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Typing Effect
// ===================================
function initializeTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    const texts = [
        'Full Stack Developer',
        'Frontend Specialist',
        'Backend Engineer',
        'DevOps Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ===================================
// Scroll Animations
// ===================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressBar 2s ease-out';
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================
// Contact Form (Legacy - replaced by contact robot)
// ===================================
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return; // Form replaced by contact robot

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };
        console.log('Form submitted:', formData);
        alert('¡Mensaje enviado exitosamente! Te responderé pronto.');
        form.reset();
    });
}

// ===================================
// Back to Top Button
// ===================================
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Robots con Parpadeo Simple
// ===================================
function initializeRobot() {
    // Solo parpadeo automático, sin seguimiento ni ojos flotantes
    // Los ojos están fijos en cada robot y solo parpadean
}

// ===================================
// Mobile Collapsibles
// ===================================
function initializeMobileCollapsibles() {
    const expandBtns = document.querySelectorAll('.mobile-expand-btn');

    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const target = document.getElementById(targetId);

            if (target) {
                target.classList.toggle('expanded');
                btn.classList.toggle('expanded');

                // Cambiar texto del botón
                const span = btn.querySelector('span');
                if (span) {
                    if (btn.classList.contains('expanded')) {
                        span.textContent = 'Ver menos';
                    } else {
                        span.textContent = btn.dataset.originalText || 'Ver más';
                    }
                }
            }
        });

        // Guardar texto original
        const span = btn.querySelector('span');
        if (span) {
            btn.dataset.originalText = span.textContent;
        }
    });
}

// ===================================
// Skills Collapsible (Mobile)
// ===================================
function initializeSkillsCollapsible() {
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        const header = category.querySelector('.category-header');

        if (header) {
            header.addEventListener('click', () => {
                // Solo funciona en mobile
                if (window.innerWidth <= 768) {
                    // Cerrar otras categorías (accordion behavior)
                    skillCategories.forEach(other => {
                        if (other !== category && other.classList.contains('expanded')) {
                            other.classList.remove('expanded');
                        }
                    });

                    // Toggle actual
                    category.classList.toggle('expanded');
                }
            });
        }
    });
}

// ===================================
// Projects Carousel (Mobile)
// ===================================
function initializeProjectsCarousel() {
    const projectsGrid = document.getElementById('projectsGrid');
    const dotsContainer = document.getElementById('projectsCarouselDots');

    if (!projectsGrid || !dotsContainer) return;

    // Esperar a que los proyectos se carguen
    const observer = new MutationObserver(() => {
        const cards = projectsGrid.querySelectorAll('.project-card');
        if (cards.length > 0) {
            setupCarouselDots(cards);
            observer.disconnect();
        }
    });

    observer.observe(projectsGrid, { childList: true });

    function setupCarouselDots(cards) {
        // Crear dots
        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ir al proyecto ${index + 1}`);
            dot.addEventListener('click', () => {
                cards[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
            dotsContainer.appendChild(dot);
        });

        // Actualizar dots al hacer scroll
        let scrollTimeout;
        projectsGrid.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                updateActiveDot(cards);
            }, 100);
        }, { passive: true });
    }

    function updateActiveDot(cards) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const gridRect = projectsGrid.getBoundingClientRect();
        const gridCenter = gridRect.left + gridRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - gridCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === closestIndex);
        });
    }
}
