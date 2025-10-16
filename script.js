// Typewriter effect with loop
const typewriterElement = document.querySelector('.typewriter');
const text = 'Brandon Stevenson';
let isDeleting = false;
let charIndex = 0;

function typeWriter() {
    if (!isDeleting && charIndex < text.length) {
        // Typing
        typewriterElement.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 225);
    } else if (!isDeleting && charIndex === text.length) {
        // Wait 2 seconds before deleting
        isDeleting = true;
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        typewriterElement.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 150);
    } else if (isDeleting && charIndex === 0) {
        // Wait 1.5 seconds before typing again
        isDeleting = false;
        setTimeout(typeWriter, 1500);
    }
}

// Start the typewriter effect
typeWriter();

// Aurora Particles Effect
function createAuroraParticles() {
    const heroSection = document.getElementById('home');
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
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            opacity: ${opacity};
            filter: blur(2px);
            pointer-events: none;
            z-index: 2;
            animation: particleFloat ${duration}s ease-in-out infinite ${delay}s;
        `;
        
        heroSection.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                opacity: 0.6;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.8);
                opacity: 0.8;
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.1);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize aurora particles
createAuroraParticles();

// Aurora Wave Effect - creates traveling waves across the aurora
function createAuroraWaves() {
    const heroSection = document.getElementById('home');
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
        
        wave.style.cssText = `
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background: radial-gradient(ellipse 800px 400px at 50% 50%, ${colors[i]} 0%, transparent 60%);
            filter: blur(80px);
            pointer-events: none;
            z-index: 2;
            mix-blend-mode: screen;
            animation: waveTravel ${duration}s ease-in-out infinite ${delay}s;
            opacity: 0;
        `;
        
        heroSection.appendChild(wave);
    }
    
    // Add wave animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes waveTravel {
            0% {
                transform: translate(-30%, -20%) scale(0.8);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            50% {
                transform: translate(30%, 20%) scale(1.2);
                opacity: 0.8;
            }
            90% {
                opacity: 0.4;
            }
            100% {
                transform: translate(80%, 50%) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize aurora waves
createAuroraWaves();

// About section typewriter effect
let aboutTypingStarted = false;
const aboutTexts = [
    {
        element: document.getElementById('about-text-1'),
        text: "I'm a detail-oriented IT professional with a passion for building scalable infrastructure and developing innovative software solutions.",
        delay: 0
    },
    {
        element: document.getElementById('about-text-2'),
        text: "Currently pursuing my Bachelor's in Cloud & Network Engineering while working as an IT Admin, I've successfully managed over 1,500+ devices and developed AI-powered applications.",
        delay: 4500
    }
];

function typeAboutText(textObj, callback) {
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
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAboutTyping();
        }
    });
}, { threshold: 0.3 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Scroll progress bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
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
        timeLeft += 0.016; // ~60fps
        timeRight += 0.016;
        
        // Smooth sine wave for fluid motion
        const leftOffset = Math.sin(timeLeft * 1.5) * 15;
        const rightOffset = Math.sin(timeRight * 1.5 + Math.PI) * 15; // Offset by PI for opposite direction
        
        buttonLeft.style.transform = `translateX(${leftOffset}px)`;
        buttonRight.style.transform = `translateX(${rightOffset}px)`;
    }
    
    requestAnimationFrame(animateButtons);
}

// Start button animation
animateButtons();