/**
 * Portfolio Website - Main JavaScript
 * @author Devansh Shah
 * @version 2.0.0
 * 
 * Refactored with:
 * - ES6+ syntax
 * - Modular architecture
 * - Clean code principles
 * - Improved performance
 * - Better error handling
 */

'use strict';

/* ==========================================================================
   Configuration
   ========================================================================== */
const CONFIG = {
    // API endpoints
    endpoints: {
        skills: 'skills.json'  // skills.json is in root folder
    },

    // EmailJS configuration
    emailJS: {
        userId: 'user_TTDmetQLYgWCLzHTDgqxm',
        serviceId: 'contact_service',
        templateId: 'template_contact'
    },

    // Animation settings
    animation: {
        scrollReveal: {
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        },
        typingSpeed: 50,
        typingBackSpeed: 25,
        typingBackDelay: 500
    },

    // Scroll settings
    scroll: {
        threshold: 60,
        offset: 200
    },

    // Typing text options
    typingStrings: [
        'Full Stack Development',
        'Backend Development',
        'Web Designing',
        'Frontend Development',
        'Web Development'
    ]
};

/* ==========================================================================
   Utility Functions
   ========================================================================== */
const Utils = {
    /**
     * Debounce function to limit execution rate
     */
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function for scroll events
     */
    throttle(func, limit = 100) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Safe query selector with error handling
     */
    $(selector, context = document) {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    },

    /**
     * Safe query selector all
     */
    $$(selector, context = document) {
        return [...context.querySelectorAll(selector)];
    },

    /**
     * Fetch JSON with error handling
     */
    async fetchJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch ${url}:`, error);
            return null;
        }
    }
};

/* ==========================================================================
   Navigation Module
   ========================================================================== */
const Navigation = {
    elements: {
        menuToggle: null,
        navbar: null,
        navLinks: null,
        sections: null
    },

    init() {
        this.cacheElements();
        this.bindEvents();
    },

    cacheElements() {
        this.elements.menuToggle = Utils.$('#menu-toggle');
        this.elements.navbar = Utils.$('.navbar');
        this.elements.navLinks = Utils.$$('.nav-link');
        this.elements.sections = Utils.$$('section[id]');
    },

    bindEvents() {
        // Mobile menu toggle
        this.elements.menuToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Smooth scrolling for nav links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll spy
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));
    },

    toggleMobileMenu() {
        const icon = this.elements.menuToggle?.querySelector('i');
        icon?.classList.toggle('fa-bars');
        icon?.classList.toggle('fa-times');
        this.elements.navbar?.classList.toggle('active');
    },

    closeMobileMenu() {
        const icon = this.elements.menuToggle?.querySelector('i');
        icon?.classList.remove('fa-times');
        icon?.classList.add('fa-bars');
        this.elements.navbar?.classList.remove('active');
    },

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = Utils.$(targetId);

        if (targetSection) {
            this.closeMobileMenu();
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    },

    handleScroll() {
        const scrollY = window.scrollY;

        // Close mobile menu on scroll
        this.closeMobileMenu();

        // Update active nav link based on scroll position
        this.elements.sections.forEach(section => {
            const sectionTop = section.offsetTop - CONFIG.scroll.offset;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* ==========================================================================
   Scroll to Top Module
   ========================================================================== */
const ScrollToTop = {
    element: null,

    init() {
        this.element = Utils.$('#scroll-top');
        if (this.element) {
            window.addEventListener('scroll', Utils.throttle(() => this.toggle(), 100));
        }
    },

    toggle() {
        if (window.scrollY > CONFIG.scroll.threshold) {
            this.element.classList.add('active');
        } else {
            this.element.classList.remove('active');
        }
    }
};

/* ==========================================================================
   Skills Module
   ========================================================================== */
const Skills = {
    container: null,

    // Skills data embedded to avoid CORS issues with file:// protocol
    data: [
        { name: "ReactJS", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" },
        { name: "NodeJS", icon: "https://img.icons8.com/color/48/000000/nodejs.png" },
        { name: "NestJS", icon: "https://img.icons8.com/color/48/nestjs.png" },
        { name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png" },
        { name: "Spring Boot", icon: "https://img.icons8.com/?size=48&id=90519&format=png" },
        { name: "NextJS", icon: "https://img.icons8.com/fluency/48/000000/nextjs.png" },
        { name: "Angular", icon: "https://img.icons8.com/fluency/48/000000/angularjs.png" },
        { name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png" },
        { name: "AWS", icon: "https://img.icons8.com/color/48/amazon-web-services.png" },
        { name: "MySQL", icon: "https://img.icons8.com/fluency/48/000000/mysql.png" },
        { name: "MongoDB", icon: "https://img.icons8.com/?size=48&id=bosfpvRzNOG8&format=png" },
        { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png" },
        { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png" },
        { name: "PHP", icon: "https://img.icons8.com/offices/48/000000/php-logo.png" },
        { name: "Rest API", icon: "https://img.icons8.com/?size=48&id=21895&format=png" },
        { name: "MaterialUI", icon: "https://img.icons8.com/color/48/000000/material-ui.png" },
        { name: "Bootstrap", icon: "https://img.icons8.com/color/48/000000/bootstrap.png" },
        { name: "C", icon: "https://img.icons8.com/?size=48&id=40670&format=png" },
        { name: "C++", icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png" },
        { name: "C#", icon: "https://img.icons8.com/color/48/000000/c-sharp-logo.png" },
        { name: "JSON", icon: "https://img.icons8.com/color/48/000000/json.png" },
        { name: "jQuery", icon: "https://img.icons8.com/ios-filled/48/1169ae/jquery.png" },
        { name: "Git", icon: "https://img.icons8.com/color/48/000000/git.png" },
        { name: "GitHub", icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png" },
        { name: "Postman", icon: "https://img.icons8.com/?size=48&id=EPbEfEa7o8CB&format=png" }
    ],

    init() {
        this.container = Utils.$('#skillsContainer');
        if (this.container) {
            this.render(this.data);
        }
    },

    render(skills) {
        const html = skills.map(skill => `
            <div class="skills__item" role="listitem">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy">
                <span>${skill.name}</span>
            </div>
        `).join('');

        this.container.innerHTML = html;
    }
};

/* ==========================================================================
   Projects Module (Static - projects are inline in HTML)
   ========================================================================== */
const Projects = {
    init() {
        // Projects are now static in HTML, just initialize animations
        this.initScrollReveal();
    },

    initScrollReveal() {
        if (typeof ScrollReveal !== 'undefined') {
            ScrollReveal().reveal('.project-card', {
                ...CONFIG.animation.scrollReveal,
                interval: 200
            });
        }
    }
};

/* ==========================================================================
   Contact Form Module
   ========================================================================== */
const ContactForm = {
    form: null,

    init() {
        this.form = Utils.$('#contact-form');
        if (this.form) {
            this.initEmailJS();
            this.bindEvents();
        }
    },

    initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(CONFIG.emailJS.userId);
        }
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        try {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            if (typeof emailjs !== 'undefined') {
                await emailjs.sendForm(
                    CONFIG.emailJS.serviceId,
                    CONFIG.emailJS.templateId,
                    this.form
                );
            }

            this.showMessage('Form submitted successfully!', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Form submission failed:', error);
            this.showMessage('Form submission failed. Please try again.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    },

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        // Validate email format
        const emailField = this.form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
        }

        return isValid;
    },

    showMessage(message, type) {
        // Using native alert for simplicity - could be replaced with custom modal
        alert(message);
    }
};

/* ==========================================================================
   Typing Animation Module
   ========================================================================== */
const TypingAnimation = {
    init() {
        const element = Utils.$('.typing-text');
        if (element && typeof Typed !== 'undefined') {
            new Typed('.typing-text', {
                strings: CONFIG.typingStrings,
                loop: true,
                typeSpeed: CONFIG.animation.typingSpeed,
                backSpeed: CONFIG.animation.typingBackSpeed,
                backDelay: CONFIG.animation.typingBackDelay
            });
        }
    }
};

/* ==========================================================================
   Tilt Effect Module
   ========================================================================== */
const TiltEffect = {
    init() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(Utils.$$('.tilt'), { max: 15 });
        }
    }
};

/* ==========================================================================
   Scroll Reveal Module
   ========================================================================== */
const ScrollRevealAnimations = {
    init() {
        if (typeof ScrollReveal === 'undefined') return;

        const sr = ScrollReveal(CONFIG.animation.scrollReveal);

        // Hero section
        sr.reveal('.hero__content h1', { delay: 200 });
        sr.reveal('.hero__content .hero__tagline', { delay: 200 });
        sr.reveal('.hero__content .btn', { delay: 200 });
        sr.reveal('.hero__image', { delay: 400 });
        sr.reveal('.social-link', { interval: 200 });

        // About section
        sr.reveal('.about__name', { delay: 200 });
        sr.reveal('.about__role', { delay: 200 });
        sr.reveal('.about__bio', { delay: 200 });
        sr.reveal('.about__info', { delay: 200 });
        sr.reveal('.about__cta', { delay: 200 });

        // Skills section
        sr.reveal('.skills__container', { interval: 200 });
        sr.reveal('.skills__item', { delay: 400, interval: 100 });

        // Education section
        sr.reveal('.education__card', { interval: 200 });

        // Experience section
        sr.reveal('.timeline', { delay: 400 });
        sr.reveal('.timeline__item', { interval: 400 });

        // Contact section
        sr.reveal('.contact__container', { delay: 400 });
        sr.reveal('.form-group', { delay: 400 });
    }
};

/* ==========================================================================
   Page Visibility Module
   ========================================================================== */
const PageVisibility = {
    originalTitle: 'Portfolio | Devansh Shah',
    awayTitle: 'Come Back To Portfolio',
    favicon: null,

    init() {
        this.favicon = Utils.$('#favicon');
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    },

    handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            document.title = this.originalTitle;
            this.favicon?.setAttribute('href', 'assets/images/favicon.png');
        } else {
            document.title = this.awayTitle;
            this.favicon?.setAttribute('href', 'img/favhand.png');
        }
    }
};

/* ==========================================================================
   Application Initialization
   ========================================================================== */
const App = {
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }
    },

    bootstrap() {
        // Initialize all modules
        Navigation.init();
        ScrollToTop.init();
        Skills.init();
        Projects.init();
        ContactForm.init();
        TypingAnimation.init();
        TiltEffect.init();
        ScrollRevealAnimations.init();
        PageVisibility.init();

        console.log('Portfolio initialized successfully');
    }
};

// Start the application
App.init();