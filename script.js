// ========================================
// MOBILE MENU FUNCTIONALITY - Pure Tailwind
// ========================================
console.log('🚀 Mobile menu script loading...');

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuBackdrop = document.getElementById('menuBackdrop');
const menuContent = document.getElementById('menuContent');
const menuTitle = document.getElementById('menuTitle');
const closeHint = document.getElementById('closeHint');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const body = document.body;

console.log('📱 Menu Button:', mobileMenuBtn);
console.log('📋 Menu:', mobileMenu);
console.log('🎭 Backdrop:', menuBackdrop);
console.log('📝 Links found:', mobileNavLinks.length);

let isMenuOpen = false;

function openMenu() {
    console.log('🎬 Opening menu...');
    isMenuOpen = true;
    
    // Enable pointer events
    mobileMenu.classList.remove('pointer-events-none');
    mobileMenu.classList.add('pointer-events-auto');
    console.log('✅ Pointer events enabled');
    
    // Prevent body scroll
    body.style.overflow = 'hidden';
    
    // Animate backdrop
    menuBackdrop.classList.remove('opacity-0');
    menuBackdrop.classList.add('opacity-100');
    console.log('✅ Backdrop animated');
    
    // Animate content
    menuContent.classList.remove('translate-y-8', 'opacity-0');
    menuContent.classList.add('translate-y-0', 'opacity-100');
    
    // Animate menu title
    menuTitle.classList.remove('translate-y-4', 'opacity-0');
    menuTitle.classList.add('translate-y-0', 'opacity-100');
    
    // Animate close hint
    closeHint.classList.remove('translate-y-4', 'opacity-0');
    closeHint.classList.add('translate-y-0', 'opacity-100');
    
    // Animate navigation links
    mobileNavLinks.forEach(link => {
        link.classList.remove('translate-y-4', 'opacity-0');
        link.classList.add('translate-y-0', 'opacity-100');
    });
    console.log('✅ Links animated:', mobileNavLinks.length);
    
    // Transform hamburger to X
    line1.classList.add('rotate-45', 'translate-y-2');
    line2.classList.add('opacity-0', 'scale-0');
    line3.classList.add('-rotate-45', '-translate-y-2');
    console.log('✅ Hamburger transformed to X');
}

function closeMenu() {
    isMenuOpen = false;
    
    // Reset body scroll
    body.style.overflow = '';
    
    // Animate backdrop
    menuBackdrop.classList.remove('opacity-100');
    menuBackdrop.classList.add('opacity-0');
    
    // Animate content
    menuContent.classList.remove('translate-y-0', 'opacity-100');
    menuContent.classList.add('translate-y-8', 'opacity-0');
    
    // Animate menu title
    menuTitle.classList.remove('translate-y-0', 'opacity-100');
    menuTitle.classList.add('translate-y-4', 'opacity-0');
    
    // Animate close hint
    closeHint.classList.remove('translate-y-0', 'opacity-100');
    closeHint.classList.add('translate-y-4', 'opacity-0');
    
    // Animate navigation links
    mobileNavLinks.forEach(link => {
        link.classList.remove('translate-y-0', 'opacity-100');
        link.classList.add('translate-y-4', 'opacity-0');
    });
    
    // Transform X back to hamburger
    line1.classList.remove('rotate-45', 'translate-y-2');
    line2.classList.remove('opacity-0', 'scale-0');
    line3.classList.remove('-rotate-45', '-translate-y-2');
    
    // Wait for animation to finish before disabling pointer events
    setTimeout(() => {
        mobileMenu.classList.remove('pointer-events-auto');
        mobileMenu.classList.add('pointer-events-none');
    }, 500);
}

// Toggle menu on button click
if (mobileMenuBtn) {
    console.log('✅ Event listener attached to mobile menu button');
    mobileMenuBtn.addEventListener('click', (e) => {
        console.log('🔥 BUTTON CLICKED!', 'Menu open:', isMenuOpen);
        e.stopPropagation();
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
} else {
    console.error('❌ Mobile menu button not found!');
}

// Close menu when clicking on backdrop
if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMenu);
}

// Close menu when clicking on navigation links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

// Prevent menu from staying open on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu();
    }
});


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        nav.style.background = 'rgba(230, 240, 255, 0.15)';
        nav.style.backdropFilter = 'blur(30px) saturate(150%)';
        nav.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.1), inset 0 0 0 1px rgba(199, 210, 254, 0.3)';
        nav.style.borderBottom = '1px solid rgba(199, 210, 254, 0.4)';
        nav.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = 'none';
        nav.style.borderBottom = 'none';
    }
});


// ========================================
// SCROLL PROGRESS BAR
// ========================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});


// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================
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


// ========================================
// AURORA PARTICLES EFFECT
// ========================================
function createAuroraParticles() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'aurora-particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        const colors = [
            'rgba(16, 185, 129, 0.6)',
            'rgba(59, 130, 246, 0.6)',
            'rgba(139, 92, 246, 0.6)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(5, 150, 105, 0.6)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `position: absolute; width: ${size}px; height: ${size}px; background: ${color}; border-radius: 50%; left: ${startX}%; top: ${startY}%; opacity: ${opacity}; filter: blur(2px); pointer-events: none; z-index: 2; animation: particleFloat ${duration}s ease-in-out infinite ${delay}s;`;
        
        heroSection.appendChild(particle);
    }
    
    const style = document.createElement('style');
    const randomX1 = Math.random() * 100 - 50;
    const randomY1 = Math.random() * 100 - 50;
    const randomX2 = Math.random() * 100 - 50;
    const randomY2 = Math.random() * 100 - 50;
    const randomX3 = Math.random() * 100 - 50;
    const randomY3 = Math.random() * 100 - 50;
    
    style.textContent = `@keyframes particleFloat { 
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; } 
        25% { transform: translate(${randomX1}px, ${randomY1}px) scale(1.2); opacity: 0.6; } 
        50% { transform: translate(${randomX2}px, ${randomY2}px) scale(0.8); opacity: 0.8; } 
        75% { transform: translate(${randomX3}px, ${randomY3}px) scale(1.1); opacity: 0.5; } 
    }`;
    document.head.appendChild(style);
}

createAuroraParticles();


// ========================================
// AURORA WAVE EFFECT
// ========================================
function createAuroraWaves() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    const waveCount = 6;
    
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
        
        wave.style.cssText = `position: absolute; width: 200%; height: 200%; top: -50%; left: -50%; background: radial-gradient(ellipse 800px 400px at 50% 50%, ${colors[i % 3]} 0%, transparent 60%); filter: blur(80px); pointer-events: none; z-index: 2; mix-blend-mode: screen; animation: waveTravel ${duration}s ease-in-out infinite ${delay}s; opacity: 0;`;
        
        heroSection.appendChild(wave);
    }
    
    const style = document.createElement('style');
    style.textContent = `@keyframes waveTravel { 
        0% { transform: translate(-30%, -20%) scale(0.8); opacity: 0; } 
        10% { opacity: 0.6; } 
        50% { transform: translate(30%, 20%) scale(1.2); opacity: 0.8; } 
        90% { opacity: 0.4; } 
        100% { transform: translate(80%, 50%) scale(1); opacity: 0; } 
    }`;
    document.head.appendChild(style);
}

createAuroraWaves();


// ========================================
// ABOUT SECTION TYPEWRITER EFFECT
// ========================================
let aboutTypingStarted = false;
const aboutText1Element = document.getElementById('about-text-1');
const aboutText2Element = document.getElementById('about-text-2');

const aboutTexts = [
    {
        element: aboutText1Element,
        text: "Blending IT administration, user experience, and web development, I bring a holistic approach to technology. With hands-on experience using Microsoft Intune and managing enterprise environments, I'm pursuing a degree in Cloud & Network Engineering to build secure, scalable systems.",
        delay: 0
    },
    {
        element: aboutText2Element,
        text: "I've worked across both IT operations and software development, giving me a unique perspective on how systems and people connect. From managing endpoints in Microsoft Intune to developing full-stack applications, I focus on efficiency, automation, and clean user experiences. I'm currently expanding into cloud and network engineering to help design smarter, scalable infrastructures for the future.",
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


// ========================================
// INTERSECTION OBSERVER FOR EXPERIENCE
// ========================================
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


// ========================================
// FLUID BUTTON ANIMATIONS
// ========================================
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
        
        buttonLeft.style.transform = `translateX(${leftOffset}px)`;
        buttonRight.style.transform = `translateX(${rightOffset}px)`;
    }
    
    requestAnimationFrame(animateButtons);
}

animateButtons();


// ========================================
// THREE.JS SATURN ANIMATION
// (Keeping your existing Saturn code)
// ========================================
setTimeout(() => {
    const heroSection = document.getElementById('home');
    if (!heroSection || typeof THREE === 'undefined') {
        console.error('Missing requirements');
        return;
    }

    console.log('Starting Matrix-Optimized HD Saturn with zoom...');

    // Advanced Data Structures
    class MatrixPool {
        constructor(size) {
            this.pool = [];
            this.available = [];
            for (let i = 0; i < size; i++) {
                const matrix = new THREE.Matrix4();
                this.pool.push(matrix);
                this.available.push(matrix);
            }
        }
        acquire() {
            return this.available.pop() || new THREE.Matrix4();
        }
        release(mat) {
            this.available.push(mat);
        }
    }
    
    const matrixPool = new MatrixPool(10);
    
    class SmoothValue {
        constructor(size = 5) {
            this.buffer = new Float32Array(size);
            this.size = size;
            this.index = 0;
            this.filled = 0;
        }
        push(value) {
            this.buffer[this.index] = value;
            this.index = (this.index + 1) % this.size;
            if (this.filled < this.size) this.filled++;
        }
        get() {
            let sum = 0;
            for (let i = 0; i < this.filled; i++) sum += this.buffer[i];
            return sum / this.filled;
        }
    }
    
    const smoothX = new SmoothValue(3);
    const smoothY = new SmoothValue(3);
    const smoothZ = new SmoothValue(3);
    
    class SpatialBounds {
        constructor() {
            this.bounds = new Float32Array(6);
        }
        set(minX, maxX, minY, maxY, minZ, maxZ) {
            this.bounds[0] = minX;
            this.bounds[1] = maxX;
            this.bounds[2] = minY;
            this.bounds[3] = maxY;
            this.bounds[4] = minZ;
            this.bounds[5] = maxZ;
        }
        check(pos) {
            return {
                x: pos.x < this.bounds[0] || pos.x > this.bounds[1],
                y: pos.y < this.bounds[2] || pos.y > this.bounds[3],
                z: pos.z < this.bounds[4] || pos.z > this.bounds[5]
            };
        }
    }
    
    const spatialBounds = new SpatialBounds();

    // High-Quality Renderer
    const scene = new THREE.Scene();
    
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 400, 3500);

    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    renderer.sortObjects = false;
    heroSection.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';

    // Starfield
    const starCount = isMobile ? 2500 : 5000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 1500 + Math.random() * 1500;
        
        starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radius * Math.cos(phi);
        
        const colorVariation = 0.7 + Math.random() * 0.3;
        starColors[i3] = colorVariation;
        starColors[i3 + 1] = colorVariation;
        starColors[i3 + 2] = colorVariation;
        
        starSizes[i] = 0.5 + Math.random() * 2;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Saturn
    const saturnGeometry = new THREE.SphereGeometry(120, 64, 64);
    const saturnTexture = new THREE.TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn.jpg'
    );
    saturnTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
    const saturnMaterial = new THREE.MeshStandardMaterial({
        map: saturnTexture,
        roughness: 0.7,
        metalness: 0.3
    });
    
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    scene.add(saturn);

    // Saturn Rings
    const ringGeometry = new THREE.RingGeometry(140, 280, 128);
    const ringTexture = new THREE.TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn_ring_alpha.png'
    );
    ringTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
    const ringMaterial = new THREE.MeshStandardMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        roughness: 0.8,
        metalness: 0.2
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    
    const ringOrbitGroup = new THREE.Group();
    ringOrbitGroup.add(ring);
    ringOrbitGroup.rotation.x = Math.PI / 8;
    saturn.add(ringOrbitGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(500, 300, 400);
    scene.add(directionalLight);
    
    const rimLight = new THREE.DirectionalLight(0x4488ff, 0.6);
    rimLight.position.set(-400, 200, -300);
    scene.add(rimLight);

    // Motion variables
    const velocity = [0, 0, 0];
    const acceleration = 0.3;
    const friction = 0.94;
    const maxSpeed = 8;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let saturnRotation = 0;
    let ringRotation = 0;
    let frameCount = 0;
    
    const vFOV = camera.fov * Math.PI / 180;
    const targetCameraZ = isMobile ? 1200 : 1100;
    const targetCameraY = isMobile ? 350 : 300;
    
    const aspect = window.innerWidth / window.innerHeight;
    const height = 2 * Math.tan(vFOV / 2) * targetCameraZ;
    const width = height * aspect;
    spatialBounds.set(-width * 0.4, width * 0.4, -height * 0.35, height * 0.35, -400, 400);

    // Mouse interaction
    let interactionEnabled = false;
    setTimeout(() => {
        interactionEnabled = true;
    }, 4000);
    
    window.addEventListener('mousemove', (e) => {
        if (!interactionEnabled) return;
        targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate(currentTime) {
        requestAnimationFrame(animate);
        frameCount++;

        // Zoom animation
        if (currentTime < 4000) {
            const progress = currentTime / 4000;
            const eased = 1 - Math.pow(1 - progress, 3);
            camera.position.z = 3500 - (3500 - targetCameraZ) * eased;
            camera.position.y = 400 - (400 - targetCameraY) * eased;
        } else {
            // Mouse smoothing
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            const inputX = mouseX * 15;
            const inputY = mouseY * 15;

            velocity[0] += (inputX - saturn.position.x) * acceleration * 0.01;
            velocity[1] += (inputY - saturn.position.y) * acceleration * 0.01;

            velocity[0] *= friction;
            velocity[1] *= friction;
            velocity[2] *= friction;

            velocity[0] = Math.max(-maxSpeed, Math.min(maxSpeed, velocity[0]));
            velocity[1] = Math.max(-maxSpeed, Math.min(maxSpeed, velocity[1]));

            smoothX.push(velocity[0]);
            smoothY.push(velocity[1]);
            smoothZ.push(velocity[2]);

            saturn.position.x += smoothX.get();
            saturn.position.y += smoothY.get();
            saturn.position.z += smoothZ.get();

            const bounds = spatialBounds.check(saturn.position);
            if (bounds.x) {
                velocity[0] *= -1;
                saturn.position.x = Math.max(spatialBounds.bounds[0], Math.min(spatialBounds.bounds[1], saturn.position.x));
            }
            if (bounds.y) {
                velocity[1] *= -1;
                saturn.position.y = Math.max(spatialBounds.bounds[2], Math.min(spatialBounds.bounds[3], saturn.position.y));
            }
            if (bounds.z) {
                velocity[2] *= -1;
                saturn.position.z = Math.max(spatialBounds.bounds[4], Math.min(spatialBounds.bounds[5], saturn.position.z));
            }

            const cameraZ = targetCameraZ + saturn.position.z * 0.1;
            const cameraY = targetCameraY + saturn.position.y * 0.15;
            camera.position.x += (saturn.position.x * 0.15 - camera.position.x) * 0.05;
            camera.position.y += (cameraY - camera.position.y) * 0.05;
            camera.position.z += (cameraZ - camera.position.z) * 0.05;
        }

        saturnRotation += 0.001;
        saturn.rotation.y = saturnRotation;
        
        ringRotation += 0.002;
        ringOrbitGroup.rotation.x = ringRotation;

        camera.lookAt(saturn.position);

        if (frameCount % 4 === 0) {
            const starSizes = stars.geometry.attributes.size.array;
            const time = currentTime * 0.001;
            for (let i = 0; i < starCount; i += 2) {
                starSizes[i] = 0.5 + Math.abs(Math.sin(time + i * 0.1) * 2);
            }
            stars.geometry.attributes.size.needsUpdate = true;
        }

        renderer.render(scene, camera);
    }

    animate(performance.now());
    console.log('Matrix-optimized HD Saturn with zoom running!');

    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const nowMobile = window.innerWidth < 768;
            
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            const pixelRatio = nowMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
            renderer.setPixelRatio(pixelRatio);
            
            const aspect = window.innerWidth / window.innerHeight;
            const cameraDistance = nowMobile ? 1200 : 1100;
            const height = 2 * Math.tan(vFOV / 2) * cameraDistance;
            const width = height * aspect;
            spatialBounds.set(-width * 0.4, width * 0.4, -height * 0.35, height * 0.35, -400, 400);
        }, 150);
    });

    window.addEventListener('beforeunload', () => {
        renderer.dispose();
        saturnGeometry.dispose();
        saturnMaterial.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        starGeometry.dispose();
        starMaterial.dispose();
        saturnTexture.dispose();
        ringTexture.dispose();
    });

}, 1000);