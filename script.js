// Hamburger Menu Functionality
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const body = document.body;

function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    body.classList.add('menu-open');
}

function closeMenuFunc() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenuFunc();
        } else {
            openMenu();
        }
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', closeMenuFunc);
}

// Close menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenuFunc();
    });
});

// Close menu when clicking outside
if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenuFunc();
        }
    });
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMenuFunc();
    }
});

// ============================================
// Typewriter Effect - Alternating Text Loop
// ============================================
// This creates a typing and deleting animation that cycles between multiple texts
const typewriterElement = document.querySelector('.typewriter');

// Array of texts to cycle through
const texts = ['Brandon Stevenson', 'Tech Professional'];

// Current text index (which text in the array we're displaying)
let textIndex = 0;

// Whether we're currently deleting or typing
let isDeleting = false;

// Current character position in the text
let charIndex = 0;

/**
 * Main typewriter animation function
 * Handles typing, deleting, and switching between texts
 */
function typeWriter() {
    // Get the current text we should be displaying
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        // TYPING MODE: Add one character at a time
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 225); // Typing speed: 225ms per character
        
    } else if (!isDeleting && charIndex === currentText.length) {
        // PAUSE MODE: Finished typing, wait before deleting
        isDeleting = true;
        setTimeout(typeWriter, 2000); // Wait 2 seconds before deleting
        
    } else if (isDeleting && charIndex > 0) {
        // DELETING MODE: Remove one character at a time
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 150); // Deleting speed: 150ms per character (faster than typing)
        
    } else if (isDeleting && charIndex === 0) {
        // SWITCH MODE: Finished deleting, move to next text
        isDeleting = false;
        
        // Move to next text in array, loop back to start when reaching the end
        textIndex = (textIndex + 1) % texts.length;
        
        setTimeout(typeWriter, 1500); // Wait 1.5 seconds before typing next text
    }
}

// Initialize the typewriter effect when page loads
if (typewriterElement) {
    typeWriter();
}

// Aurora Particles Effect
function createAuroraParticles() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'aurora-particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        // Random color from aurora palette
        const colors = [
            'rgba(16, 185, 129, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(139, 92, 246, 0.6)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(5, 150, 105, 0.6)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = 'position: absolute; width: ' + size + 'px; height: ' + size + 'px; background: ' + color + '; border-radius: 50%; left: ' + startX + '%; top: ' + startY + '%; opacity: ' + opacity + '; filter: blur(2px); pointer-events: none; z-index: 2; animation: particleFloat ' + duration + 's ease-in-out infinite ' + delay + 's;';
        
        heroSection.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    const randomX1 = Math.random() * 100 - 50;
    const randomY1 = Math.random() * 100 - 50;
    const randomX2 = Math.random() * 100 - 50;
    const randomY2 = Math.random() * 100 - 50;
    const randomX3 = Math.random() * 100 - 50;
    const randomY3 = Math.random() * 100 - 50;
    
    style.textContent = '@keyframes particleFloat { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; } 25% { transform: translate(' + randomX1 + 'px, ' + randomY1 + 'px) scale(1.2); opacity: 0.6; } 50% { transform: translate(' + randomX2 + 'px, ' + randomY2 + 'px) scale(0.8); opacity: 0.8; } 75% { transform: translate(' + randomX3 + 'px, ' + randomY3 + 'px) scale(1.1); opacity: 0.5; } }';
    document.head.appendChild(style);
}

// Initialize aurora particles
createAuroraParticles();

// Aurora Wave Effect - creates traveling waves across the aurora
function createAuroraWaves() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const waveCount = 3;
    
    for (let i = 0; i < waveCount; i++) {
        const wave = document.createElement('div');
        wave.className = 'aurora-wave';
        
        const duration = 15 + (i * 3);
        const delay = i * 5;
        const colors = [
            'rgba(16, 185, 129, 0.15)',
            'rgba(59, 130, 246, 0.15)',
            'rgba(139, 92, 246, 0.15)'
        ];
        
        wave.style.cssText = 'position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; background: radial-gradient(ellipse 800px 400px at 50% 50%, ' + colors[i] + ' 0%, transparent 60%); filter: blur(80px); pointer-events: none; z-index: 2; mix-blend-mode: screen; animation: waveTravel ' + duration + 's ease-in-out infinite ' + delay + 's; opacity: 0;';
        
        heroSection.appendChild(wave);
    }
    
    // Add wave animation
    const style = document.createElement('style');
    style.textContent = '@keyframes waveTravel { 0% { transform: translate(-30%, -20%) scale(0.8); opacity: 0; } 10% { opacity: 0.6; } 50% { transform: translate(30%, 20%) scale(1.2); opacity: 0.8; } 90% { opacity: 0.4; } 100% { transform: translate(80%, 50%) scale(1); opacity: 0; } }';
    document.head.appendChild(style);
}

// Initialize aurora waves
createAuroraWaves();

// About section typewriter effect
let aboutTypingStarted = false;
const aboutText1Element = document.getElementById('about-text-1');
const aboutText2Element = document.getElementById('about-text-2');

const aboutTexts = [
    {
        element: aboutText1Element,
        text: "I'm a detail-oriented IT professional with a passion for building scalable infrastructure and developing innovative software solutions.",
        delay: 0
    },
    {
        element: aboutText2Element,
        text: "Currently pursuing my Bachelor's in Cloud & Network Engineering while working as an IT Admin, I've successfully managed over 1,500+ devices and developed AI-powered applications.",
        delay: 4500
    }
];

function typeAboutText(textObj, callback) {
    if (!textObj.element) return;
    
    let charIndex = 0;
    textObj.element.textContent = '';
    textObj.element.classList.add('typing');
    
    function type() {
        if (charIndex < textObj.text.length) {
            textObj.element.textContent += textObj.text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 35);
        } else if (callback) {
            callback();
        }
    }
    
    setTimeout(type, textObj.delay);
}

function startAboutTyping() {
    if (!aboutTypingStarted) {
        aboutTypingStarted = true;
        typeAboutText(aboutTexts[0], () => {
            typeAboutText(aboutTexts[1]);
        });
    }
}

// Observe about section
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAboutTyping();
            }
        });
    }, { threshold: 0.3 });
    
    aboutObserver.observe(aboutSection);
}

// Scroll progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Intersection Observer for experience items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-item').forEach(item => {
    observer.observe(item);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fluid button animations
const buttonLeft = document.querySelector('.button-float-left');
const buttonRight = document.querySelector('.button-float-right');
let timeLeft = 0;
let timeRight = 0;

function animateButtons() {
    if (buttonLeft && buttonRight) {
        timeLeft += 0.016;
        timeRight += 0.016;
        
        const leftOffset = Math.sin(timeLeft * 1.5) * 15;
        const rightOffset = Math.sin(timeRight * 1.5 + Math.PI) * 15;
        
        buttonLeft.style.transform = 'translateX(' + leftOffset + 'px)';
        buttonRight.style.transform = 'translateX(' + rightOffset + 'px)';
    }
    
    requestAnimationFrame(animateButtons);
}

// Start button animation
animateButtons();