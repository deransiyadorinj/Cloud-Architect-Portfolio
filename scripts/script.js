// ===================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Interactive Features & Animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    updateYear();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Update active link
                updateActiveLink(this);
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 26, 0.98)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.95)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
        }
        
        // Update active navigation based on scroll position
        updateActiveNavOnScroll();
    });
}

// Update active link
function updateActiveLink(clickedLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Update active navigation based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .info-item, .contact-card, .domain-badge, .highlight-card, .cert-card');
    
    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counter = document.querySelector('.count-number');
    
    if (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let hasAnimated = false;
        
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCounter();
                }
            });
        }, observerOptions);
        
        observer.observe(counter);
        
        function animateCounter() {
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(count);
                }
            }, 16);
        }
    }
}

// ===== UPDATE YEAR =====
function updateYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ===== SMOOTH SCROLL FOR SCROLL INDICATOR =====
const scrollLink = document.querySelector('.scroll-link');
if (scrollLink) {
    scrollLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ===== BUTTON RIPPLE EFFECT =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== PARALLAX EFFECT FOR HERO IMAGE =====
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-img');
    if (heroImage && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// ===== LAZY LOADING OPTIMIZATION =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello, Developer!', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Deransiya Dorin J\'s Portfolio', 'color: #ff0080; font-size: 16px;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'color: #b8c5d6; font-size: 14px;');
console.log('%c🔗 https://github.com/deransiyadorinj', 'color: #00d4ff; font-size: 14px;');

// ===== IMAGE GALLERY / LIGHTBOX =====
const galleryData = {
    proj1: [
        'assets/proj1-cover.png',
        'assets/proj1-2.png',
        'assets/proj1-3.png',
        'assets/proj1-4.png',
        'assets/proj1-5.png',
        'assets/proj1-6.png',
        'assets/proj1-7.png',
        'assets/proj1-8.png',
        'assets/proj1-9.png'
    ],
    proj2: [
        'assets/proj2-cover.png',
        'assets/proj2-2.png',
        'assets/proj2-3.png',
        'assets/proj2-4.png',
        'assets/proj2-5.png',
        'assets/proj2-6.png',
        'assets/proj2-7.png'
    ],
    proj3: [
        'assets/proj3-cover.png',
        'assets/proj3-2.png',
        'assets/proj3-3.png',
        'assets/proj3-4.png'
    ],
    certificates: [
        'assets/certificates/cert-ai-tools-chatgpt.png',
        'assets/certificates/cert-intro-genai.png',
        'assets/certificates/cert-intro-ai.png',
        'assets/certificates/cert-uiux-chatgpt.png',
        'assets/certificates/cert-cloud-computing.png',
        'assets/certificates/cert-python-essentials-1.png',
        'assets/certificates/cert-python-essentials-2.png',
        'assets/certificates/cert-networking-basics.png',
        'assets/certificates/cert-networking-devices.png',
        'assets/certificates/cert-cyber-security.png',
        'assets/certificates/cert-kali-linux.png',
        'assets/certificates/cert-data-analytics-ai.png',
        'assets/certificates/cert-agile-pm.png',
        'assets/certificates/cert-cit-hackathon.png',
        'assets/certificates/cert-fullstack-internship.png',
        'assets/certificates/cert-topper-of-class.png',
        'assets/certificates/cert-web-development.png',
        'assets/certificates/cert-intro-iot.png'
    ]
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(projectKey, startIndex) {
    currentGallery = galleryData[projectKey] || [];
    currentIndex = startIndex || 0;
    if (currentGallery.length === 0) return;
    const modal = document.getElementById('galleryModal');
    const img = document.getElementById('galleryModalImg');
    const counter = document.getElementById('galleryCounter');
    img.src = currentGallery[currentIndex];
    counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function openSingleImage(src) {
    currentGallery = [src];
    currentIndex = 0;
    const modal = document.getElementById('galleryModal');
    const img = document.getElementById('galleryModalImg');
    const counter = document.getElementById('galleryCounter');
    img.src = src;
    counter.textContent = '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    currentGallery = [];
    currentIndex = 0;
}

function closeGalleryOnBackdrop(e) {
    if (e.target === document.getElementById('galleryModal')) {
        closeGallery();
    }
}

function changeGalleryImage(direction) {
    if (currentGallery.length <= 1) return;
    currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
    const img = document.getElementById('galleryModalImg');
    const counter = document.getElementById('galleryCounter');
    img.src = currentGallery[currentIndex];
    counter.textContent = (currentIndex + 1) + ' / ' + currentGallery.length;
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('galleryModal');
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') changeGalleryImage(-1);
    if (e.key === 'ArrowRight') changeGalleryImage(1);
});

