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
// Contact Form
// ===================================
function initializeContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value
        };

        // Here you would typically send this to a backend
        console.log('Form submitted:', formData);

        // Show success message (you can replace this with a modal or notification)
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
// Robot Interactivo
// ===================================
function initializeRobot() {
    const container = document.getElementById('robotContainer');
    if (!container) return;

    const svg = container.querySelector('.robot-svg');
    const leftIris = container.querySelector('.eye-left .eye-iris');
    const leftPupil = container.querySelector('.eye-left .eye-pupil');
    const rightIris = container.querySelector('.eye-right .eye-iris');
    const rightPupil = container.querySelector('.eye-right .eye-pupil');

    const maxMove = 6; // Maximo movimiento en px

    // Seguimiento del mouse - los ojos siguen el cursor
    document.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calcular direccion hacia el mouse
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Normalizar y limitar el movimiento
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);

        const moveX = (deltaX / distance) * maxMove * normalizedDistance || 0;
        const moveY = (deltaY / distance) * maxMove * normalizedDistance || 0;

        // Aplicar transformacion a iris y pupilas
        const transform = `translate(${moveX}px, ${moveY}px)`;

        if (leftIris) leftIris.style.transform = transform;
        if (leftPupil) leftPupil.style.transform = transform;
        if (rightIris) rightIris.style.transform = transform;
        if (rightPupil) rightPupil.style.transform = transform;
    });

    // Click en el robot = parpadeo rapido
    container.addEventListener('click', () => {
        const eyes = container.querySelector('.robot-eyes');
        if (!eyes) return;

        // Detener animacion actual y hacer parpadeo rapido
        eyes.style.animation = 'none';
        eyes.offsetHeight; // Trigger reflow
        eyes.style.animation = 'blink 0.2s ease-in-out';

        // Restaurar animacion normal
        setTimeout(() => {
            eyes.style.animation = 'blink 4s ease-in-out infinite';
        }, 200);
    });

    // Reset suave cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', () => {
        const transform = 'translate(0px, 0px)';
        if (leftIris) {
            leftIris.style.transition = 'transform 0.3s ease';
            leftIris.style.transform = transform;
        }
        if (leftPupil) {
            leftPupil.style.transition = 'transform 0.3s ease';
            leftPupil.style.transform = transform;
        }
        if (rightIris) {
            rightIris.style.transition = 'transform 0.3s ease';
            rightIris.style.transform = transform;
        }
        if (rightPupil) {
            rightPupil.style.transition = 'transform 0.3s ease';
            rightPupil.style.transform = transform;
        }

        // Restaurar transicion rapida para seguimiento
        setTimeout(() => {
            [leftIris, leftPupil, rightIris, rightPupil].forEach(el => {
                if (el) el.style.transition = 'transform 0.1s ease-out';
            });
        }, 300);
    });
}
