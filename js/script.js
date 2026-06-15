/**
 * Portfolio Website - Main JavaScript
 * @author Devansh Shah
 * @version 3.0.0 - AI Neural Theme
 */

'use strict';

/* ==========================================================================
   Configuration
   ========================================================================== */
const CONFIG = {
    endpoints: { skills: 'skills.json' },
    emailJS: {
        userId: 'user_TTDmetQLYgWCLzHTDgqxm',
        serviceId: 'contact_service',
        templateId: 'template_contact'
    },
    animation: {
        scrollReveal: {
            origin: 'bottom',
            distance: '40px',
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            reset: false
        },
        typingSpeed: 60,
        typingBackSpeed: 30,
        typingBackDelay: 1200
    },
    scroll: { threshold: 80, offset: 100 },
    typingStrings: [
        'Full Stack Systems.',
        'Cloud-Native APIs.',
        'React + Spring Boot Apps.',
        'Scalable Microservices.',
        'Payment Infrastructure.',
        'Mobile Applications.'
    ]
};

/* ==========================================================================
   Skills Data (with categories for filter)
   ========================================================================== */
const SKILLS_DATA = [
    // Frontend
    { name: 'ReactJS',      icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png', category: 'frontend' },
    { name: 'Next.js',      icon: 'https://img.icons8.com/fluency/48/000000/nextjs.png',  category: 'frontend' },
    { name: 'Angular',      icon: 'https://img.icons8.com/fluency/48/000000/angularjs.png', category: 'frontend' },
    { name: 'TypeScript',   icon: 'https://img.icons8.com/color/48/typescript.png',  category: 'frontend' },
    { name: 'JavaScript',   icon: 'https://img.icons8.com/color/48/000000/javascript--v1.png', category: 'frontend' },
    { name: 'HTML5',        icon: 'https://img.icons8.com/color/48/000000/html-5--v1.png', category: 'frontend' },
    { name: 'CSS3',         icon: 'https://img.icons8.com/color/48/000000/css3.png', category: 'frontend' },
    { name: 'MaterialUI',   icon: 'https://img.icons8.com/color/48/000000/material-ui.png', category: 'frontend' },
    { name: 'Bootstrap',    icon: 'https://img.icons8.com/color/48/000000/bootstrap.png', category: 'frontend' },

    // Backend
    { name: 'Java',         icon: 'https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png', category: 'backend' },
    { name: 'Spring Boot',  icon: 'https://img.icons8.com/?size=48&id=90519&format=png', category: 'backend' },
    { name: 'NodeJS',       icon: 'https://img.icons8.com/color/48/000000/nodejs.png', category: 'backend' },
    { name: 'NestJS',       icon: 'https://img.icons8.com/color/48/nestjs.png', category: 'backend' },
    { name: 'Laravel',      icon: 'https://img.icons8.com/fluency/48/laravel.png', category: 'backend' },
    { name: 'Python',       icon: 'https://img.icons8.com/color/48/000000/python--v1.png', category: 'backend' },
    { name: 'PHP',          icon: 'https://img.icons8.com/offices/48/000000/php-logo.png', category: 'backend' },
    { name: 'REST API',     icon: 'https://img.icons8.com/?size=48&id=21895&format=png', category: 'backend' },
    { name: 'GraphQL',      icon: 'https://img.icons8.com/color/48/graphql.png', category: 'backend' },

    // Cloud & DevOps
    { name: 'AWS',          icon: 'https://img.icons8.com/color/48/amazon-web-services.png', category: 'cloud' },
    { name: 'Docker',       icon: 'https://img.icons8.com/color/48/docker.png', category: 'cloud' },
    { name: 'Redis',        icon: 'https://img.icons8.com/?size=48&id=pHS3eRpynIRQ&format=png', category: 'cloud' },
    { name: 'Kubernetes',   icon: 'https://img.icons8.com/color/48/kubernetes.png', category: 'cloud' },
    { name: 'Git',          icon: 'https://img.icons8.com/color/48/000000/git.png', category: 'cloud' },
    { name: 'GitHub',       icon: 'https://img.icons8.com/glyph-neue/48/ffffff/github.png', category: 'cloud' },

    // Mobile
    { name: 'Flutter',      icon: 'https://img.icons8.com/color/48/flutter.png', category: 'mobile' },
    { name: 'React Native', icon: 'https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png', category: 'mobile' },

    // Database
    { name: 'MySQL',        icon: 'https://img.icons8.com/fluency/48/000000/mysql.png', category: 'database' },
    { name: 'MongoDB',      icon: 'https://img.icons8.com/?size=48&id=bosfpvRzNOG8&format=png', category: 'database' },
    { name: 'PostgreSQL',   icon: 'https://img.icons8.com/color/48/postgreesql.png', category: 'database' },

    // Languages
    { name: 'C++',          icon: 'https://img.icons8.com/color/48/000000/c-plus-plus-logo.png', category: 'language' },
    { name: 'C#',           icon: 'https://img.icons8.com/color/48/000000/c-sharp-logo.png', category: 'language' },

    // Tools
    { name: 'Postman',      icon: 'https://img.icons8.com/?size=48&id=EPbEfEa7o8CB&format=png', category: 'tools' },
    { name: 'SonarQube',    icon: 'https://img.icons8.com/?size=48&id=oROcPah5ues6&format=png', category: 'tools' },
    { name: 'Jira',         icon: 'https://img.icons8.com/color/48/jira.png', category: 'tools' },

    // AI & ML
    { name: 'OpenAI',         icon: 'https://cdn.simpleicons.org/openai/00d4ff',        category: 'ai' },
    { name: 'Claude AI',      icon: 'https://cdn.simpleicons.org/anthropic/00d4ff',     category: 'ai' },
    { name: 'LangChain',      icon: 'https://cdn.simpleicons.org/langchain/00d4ff',     category: 'ai' },
    { name: 'Hugging Face',   icon: 'https://cdn.simpleicons.org/huggingface/ffbd59',   category: 'ai' },
    { name: 'TensorFlow',     icon: 'https://img.icons8.com/color/48/tensorflow.png',   category: 'ai' },
    { name: 'PyTorch',        icon: 'https://cdn.simpleicons.org/pytorch/ee4c2c',       category: 'ai' },
    { name: 'GitHub Copilot', icon: 'https://cdn.simpleicons.org/githubcopilot/ffffff', category: 'ai' },
    { name: 'Ollama',         icon: 'https://cdn.simpleicons.org/ollama/ffffff',         category: 'ai' },
    { name: 'scikit-learn',   icon: 'https://cdn.simpleicons.org/scikitlearn/f7931e',   category: 'ai' },
    { name: 'Pinecone',       icon: 'https://cdn.simpleicons.org/pinecone/00d4ff',      category: 'ai' },
    { name: 'LlamaIndex',     icon: 'https://cdn.simpleicons.org/llamaindex/7c3aed',    category: 'ai' },
    { name: 'RAG / Vector DB',icon: 'https://img.icons8.com/color/48/database.png',     category: 'ai' },
];

/* ==========================================================================
   Utility Functions
   ========================================================================== */
const Utils = {
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => { clearTimeout(timeout); func(...args); };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

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

    $(selector, context = document) {
        return context.querySelector(selector);
    },

    $$(selector, context = document) {
        return [...context.querySelectorAll(selector)];
    }
};

/* ==========================================================================
   Navigation Module
   ========================================================================== */
const Navigation = {
    elements: { menuToggle: null, navbar: null, navLinks: null, sections: null, header: null },

    init() {
        this.elements.menuToggle = Utils.$('#menu-toggle');
        this.elements.navbar = Utils.$('.navbar');
        this.elements.navLinks = Utils.$$('.nav-link');
        this.elements.sections = Utils.$$('section[id]');
        this.elements.header = Utils.$('.header');

        this.elements.menuToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 80));
    },

    toggleMobileMenu() {
        const icon = this.elements.menuToggle?.querySelector('i');
        icon?.classList.toggle('fa-bars');
        icon?.classList.toggle('fa-times');
        this.elements.navbar?.classList.toggle('active');
        const isExpanded = this.elements.navbar?.classList.contains('active');
        this.elements.menuToggle?.setAttribute('aria-expanded', String(isExpanded));
    },

    closeMobileMenu() {
        const icon = this.elements.menuToggle?.querySelector('i');
        icon?.classList.remove('fa-times');
        icon?.classList.add('fa-bars');
        this.elements.navbar?.classList.remove('active');
        this.elements.menuToggle?.setAttribute('aria-expanded', 'false');
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

        // Header scroll class
        if (scrollY > 20) {
            this.elements.header?.classList.add('scrolled');
        } else {
            this.elements.header?.classList.remove('scrolled');
        }

        // Close mobile menu on scroll
        this.closeMobileMenu();

        // Active nav link
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
   Skills Module with Filter
   ========================================================================== */
const Skills = {
    container: null,
    filterBtns: null,
    currentFilter: 'all',

    init() {
        this.container = Utils.$('#skillsContainer');
        this.filterBtns = Utils.$$('.skills__filter-btn');
        if (this.container) {
            this.render(SKILLS_DATA);
            this.bindFilterEvents();
        }
    },

    bindFilterEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = filter;
                const filtered = filter === 'all' ? SKILLS_DATA : SKILLS_DATA.filter(s => s.category === filter);
                this.render(filtered);
            });
        });
    },

    render(skills) {
        const html = skills.map(skill => `
            <div class="skills__item" role="listitem" data-category="${skill.category}">
                <img src="${skill.icon}" alt="${skill.name}" loading="lazy" width="48" height="48">
                <span>${skill.name}</span>
            </div>
        `).join('');
        this.container.innerHTML = html;

        // Re-init tilt for skill items
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(Utils.$$('.skills__item'), { max: 10, speed: 300, glare: true, 'max-glare': 0.1 });
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
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },

    initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(CONFIG.emailJS.userId);
        }
    },

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateForm()) return;

        const submitBtn = this.form.querySelector('#submit-btn');
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending…</span>';
        submitBtn.disabled = true;

        try {
            if (typeof emailjs !== 'undefined') {
                await emailjs.sendForm(CONFIG.emailJS.serviceId, CONFIG.emailJS.templateId, this.form);
            }
            this.showToast('Message sent successfully! I\'ll get back to you soon. 🚀', 'success');
            this.form.reset();
        } catch (err) {
            console.error('Form submission failed:', err);
            this.showToast('Failed to send. Please email me directly at devansh981226@gmail.com', 'error');
        } finally {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }
    },

    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        const emailField = this.form.querySelector('[type="email"]');
        if (emailField?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
        }
        return isValid;
    },

    showToast(message, type) {
        // Remove existing toast
        Utils.$('.toast')?.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        toast.style.cssText = `
            position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(100px);
            background:${type === 'success' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)'};
            color:white; padding:1.4rem 2.4rem; border-radius:50px; font-size:1.4rem; font-weight:600;
            display:flex; align-items:center; gap:1rem; z-index:99999;
            backdrop-filter:blur(20px); box-shadow:0 20px 60px rgba(0,0,0,0.4);
            transition:transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-family:Inter,sans-serif; max-width:90vw;
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    }
};

/* ==========================================================================
   Typing Animation
   ========================================================================== */
const TypingAnimation = {
    init() {
        const el = Utils.$('.typing-text');
        if (el && typeof Typed !== 'undefined') {
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
   Tilt Effect
   ========================================================================== */
const TiltEffect = {
    init() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(Utils.$$('.tilt'), { max: 12, speed: 400, glare: false });
        }
    }
};

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
const ScrollRevealAnimations = {
    init() {
        if (typeof ScrollReveal === 'undefined') return;
        const sr = ScrollReveal(CONFIG.animation.scrollReveal);

        sr.reveal('.hero__greeting', { delay: 100 });
        sr.reveal('.hero__content h1', { delay: 200 });
        sr.reveal('.hero__tagline', { delay: 300 });
        sr.reveal('.hero__desc', { delay: 350 });
        sr.reveal('.hero__actions', { delay: 400 });
        sr.reveal('.hero__stats', { delay: 450 });
        sr.reveal('.social-links', { delay: 500 });
        sr.reveal('.hero__image', { origin: 'right', delay: 300 });

        sr.reveal('.otw-banner', { delay: 200 });

        sr.reveal('.about__image', { origin: 'left', delay: 200 });
        sr.reveal('.about__role', { delay: 200 });
        sr.reveal('.about__name', { delay: 250 });
        sr.reveal('.about__bio', { delay: 300 });
        sr.reveal('.about__badges', { delay: 350 });
        sr.reveal('.about__info', { delay: 400 });
        sr.reveal('.about__cta', { delay: 450 });

        sr.reveal('.skills__filter', { delay: 200 });
        sr.reveal('.skills__item', { interval: 50 });

        sr.reveal('.education__card', { interval: 150 });

        sr.reveal('.project-card', { interval: 120 });

        sr.reveal('.timeline__item', { interval: 200 });

        sr.reveal('.contact__info-card', { interval: 100 });
        sr.reveal('.contact__form', { origin: 'right', delay: 200 });
    }
};

/* ==========================================================================
   Page Visibility
   ========================================================================== */
const PageVisibility = {
    originalTitle: 'Devansh Shah | Full Stack Developer – Open to Work',
    awayTitle: '👋 Come back! I\'m Open to Work!',

    init() {
        document.addEventListener('visibilitychange', () => {
            document.title = document.visibilityState === 'visible'
                ? this.originalTitle
                : this.awayTitle;
        });
    }
};

/* ==========================================================================
   Counter Animation for Stats
   ========================================================================== */
const CounterAnimation = {
    init() {
        const stats = Utils.$$('.hero__stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }
};

/* ==========================================================================
   Application Initialization
   ========================================================================== */
const App = {
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bootstrap());
        } else {
            this.bootstrap();
        }
    },

    bootstrap() {
        Navigation.init();
        ScrollToTop.init();
        Skills.init();
        ContactForm.init();
        TypingAnimation.init();
        TiltEffect.init();
        ScrollRevealAnimations.init();
        PageVisibility.init();
        CounterAnimation.init();
        this.initResumeRequest();

        console.log('%c⚡ Devansh Shah – Portfolio v3.0 Initialized', 'color:#00d4ff; font-size:14px; font-weight:bold;');
        console.log('%c🚀 Open to Work – Available Worldwide', 'color:#10b981; font-size:12px;');
    },

    initResumeRequest() {
        const btn = Utils.$('#request-resume-btn');
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = Utils.$('#contact');
            const messageField = Utils.$('#message');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            if (messageField && !messageField.value.trim()) {
                setTimeout(() => {
                    messageField.value = "Hi Devansh,\n\nI'd love to receive your resume. I'm hiring for [Role] at [Company].\n\nLooking forward to connecting!";
                    messageField.focus();
                    messageField.setSelectionRange(0, 0);
                }, 700);
            }
        });
    }
};

App.init();