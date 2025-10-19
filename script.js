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


setTimeout(() => {
    const heroSection = document.getElementById('home');
    if (!heroSection || typeof THREE === 'undefined') {
        console.error('Missing requirements');
        return;
    }

    console.log('Starting Matrix-Optimized HD Saturn...');

    // ===== ADVANCED MATRIX DATA STRUCTURES =====
    
    // Pre-allocated matrix pool to avoid GC
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
    
    // Circular buffer for smooth interpolation
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
    
    // Spatial hash for efficient bounds checking
    class SpatialBounds {
        constructor() {
            this.bounds = new Float32Array(6); // minX, maxX, minY, maxY, minZ, maxZ
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

    // ===== HIGH-QUALITY RENDERER =====
    const scene = new THREE.Scene();
    
    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, isMobile ? 300 : 250, isMobile ? 1200 : 1100);

    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Lower pixel ratio on mobile for better performance
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    renderer.domElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    
    heroSection.appendChild(renderer.domElement);

    // Optimized lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(500, 300, 400);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x4466aa, 0.35);
    scene.add(ambientLight);

    const rimLight = new THREE.PointLight(0x88bbff, 1.2, 1000);
    rimLight.position.set(-300, 100, 200);
    scene.add(rimLight);

    // ===== HD TEXTURE WITH WORKER-LIKE OPTIMIZATION =====
    function createHDTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048; // Balanced HD
        canvas.height = 1024;
        const ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: false });

        // Multi-stop gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#b8e8ff');
        gradient.addColorStop(0.15, '#6ab8e8');
        gradient.addColorStop(0.3, '#4098cc');
        gradient.addColorStop(0.5, '#2d7aa0');
        gradient.addColorStop(0.7, '#1a5f7a');
        gradient.addColorStop(0.85, '#1a1a4a');
        gradient.addColorStop(1, '#2a0a4a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Atmospheric glow
        ctx.globalAlpha = 0.3;
        const glowGradient = ctx.createRadialGradient(
            canvas.width * 0.3, canvas.height * 0.3, 0,
            canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6
        );
        glowGradient.addColorStop(0, 'rgba(200, 240, 255, 0.4)');
        glowGradient.addColorStop(0.5, 'rgba(100, 180, 230, 0.2)');
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Optimized bands - 100 for quality
        ctx.globalAlpha = 0.55;
        const colors = ['#3a8ec8', '#2d7db8', '#4a9ed8', '#1a6e9a', '#2a8eb8', '#0d5a7a'];
        for (let i = 0; i < 100; i++) {
            const y = (canvas.height / 100) * i;
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(0, y, canvas.width, 6 + Math.random() * 12);
        }
        
        // Cloud wisps
        ctx.globalAlpha = 0.35;
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 150 + Math.random() * 400;
            
            const cloudGrad = ctx.createRadialGradient(x, y, 0, x, y, size/2);
            cloudGrad.addColorStop(0, 'rgba(180, 230, 255, 0.4)');
            cloudGrad.addColorStop(0.5, 'rgba(120, 190, 235, 0.2)');
            cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = cloudGrad;
            ctx.fillRect(x - size/2, y - size/4, size, size/2);
        }
        ctx.globalCompositeOperation = 'source-over';

        // Storms
        ctx.globalAlpha = 0.6;
        for (let i = 0; i < 10; i++) {
            const sx = Math.random() * canvas.width;
            const sy = Math.random() * canvas.height;
            const ss = 60 + Math.random() * 140;
            
            const stormGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, ss);
            stormGrad.addColorStop(0, 'rgba(68, 152, 210, 0.75)');
            stormGrad.addColorStop(0.5, 'rgba(45, 120, 180, 0.5)');
            stormGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = stormGrad;
            ctx.beginPath();
            ctx.ellipse(sx, sy, ss, ss * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }

        // Efficient noise
        ctx.globalAlpha = 0.2;
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < 5000; i++) {
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            const idx = (y * canvas.width + x) * 4;
            const bright = Math.random() > 0.5;
            data[idx] = bright ? 224 : 10;
            data[idx + 1] = bright ? 240 : 15;
            data[idx + 2] = bright ? 255 : 30;
            data[idx + 3] = 51;
        }
        ctx.putImageData(imgData, 0, 0);
        
        // Highlights
        ctx.globalAlpha = 0.3;
        for (let i = 0; i < 40; i++) {
            ctx.fillStyle = 'rgba(180, 226, 255, 0.25)';
            ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 1 + Math.random() * 3);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        return texture;
    }

    // ===== HD SATURN WITH OPTIMIZED GEOMETRY =====
    // Reduce geometry complexity on mobile
    const saturnSegments = isMobile ? 48 : 64;
    const saturnGeometry = new THREE.SphereGeometry(100, saturnSegments, saturnSegments);
    const saturnTexture = createHDTexture();
    
    const saturnMaterial = new THREE.MeshStandardMaterial({
        map: saturnTexture,
        roughness: 0.85,
        metalness: 0.05,
        emissive: new THREE.Color(0x0a3050),
        emissiveIntensity: 0.2
    });

    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturn.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
    );
    scene.add(saturn);

    // ===== TRANSPARENT RAINBOW RINGS =====
    const ringGroup = new THREE.Group();
    const ringGeometry = new THREE.RingGeometry(120, 220, 64);
    
    function createRingTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: true });
        
        // Subtle rainbow gradient with slightly higher opacity for visibility
        const gradient = ctx.createRadialGradient(128, 128, 60, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(0.15, 'rgba(148,0,211,0.18)');  // Violet
        gradient.addColorStop(0.3, 'rgba(75,0,130,0.22)');     // Indigo
        gradient.addColorStop(0.45, 'rgba(0,0,255,0.25)');     // Blue
        gradient.addColorStop(0.55, 'rgba(0,255,0,0.25)');     // Green
        gradient.addColorStop(0.65, 'rgba(255,255,0,0.25)');   // Yellow
        gradient.addColorStop(0.8, 'rgba(255,127,0,0.22)');    // Orange
        gradient.addColorStop(0.92, 'rgba(255,0,0,0.18)');     // Red
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        return texture;
    }
    
    const ringTexture = createRingTexture();
    const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        alphaMap: ringTexture,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    
    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    rings.rotation.x = Math.PI / 2;
    ringGroup.add(rings);
    ringGroup.rotation.x = Math.PI / 2;
    
    const ringOrbitGroup = new THREE.Group();
    ringOrbitGroup.add(ringGroup);
    saturn.add(ringOrbitGroup);

    // ===== HD STARFIELD WITH SPATIAL INDEXING =====
    const starGeometry = new THREE.BufferGeometry();
    const starCount = isMobile ? 800 : 1500;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 2500;
        positions[i3 + 1] = (Math.random() - 0.5) * 2500;
        positions[i3 + 2] = (Math.random() - 0.5) * 2500;
        
        const colorType = Math.random();
        if (colorType < 0.08) {
            colors[i3] = 1;
            colors[i3 + 1] = 0.7;
            colors[i3 + 2] = 0.4;
        } else if (colorType < 0.11) {
            colors[i3] = 1;
            colors[i3 + 1] = 0.5;
            colors[i3 + 2] = 0.4;
        } else {
            colors[i3] = 1;
            colors[i3 + 1] = 1;
            colors[i3 + 2] = 1;
        }
        
        sizes[i] = Math.random() * 2.5 + 0.5;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // ===== MATRIX-BASED PHYSICS =====
    const velocity = new Float32Array([2.5, 2, 1.5]);
    
    const aspect = window.innerWidth / window.innerHeight;
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const cameraDistance = isMobile ? 1200 : 1100;
    const height = 2 * Math.tan(vFOV / 2) * cameraDistance;
    const width = height * aspect;
    
    spatialBounds.set(-width * 0.4, width * 0.4, -height * 0.35, height * 0.35, -400, 400);

    // ===== OPTIMIZED ANIMATION WITH MATRIX OPERATIONS =====
    let lastTime = performance.now();
    let ringRotation = 0;
    let saturnRotation = 0;
    let frameCount = 0;

    function animate(currentTime) {
        requestAnimationFrame(animate);
        
        const deltaTime = Math.min((currentTime - lastTime) / 16.67, 2); // Cap delta
        lastTime = currentTime;
        frameCount++;

        // Matrix-based position update
        smoothX.push(saturn.position.x + velocity[0]);
        smoothY.push(saturn.position.y + velocity[1]);
        smoothZ.push(saturn.position.z + velocity[2]);
        
        saturn.position.x = smoothX.get();
        saturn.position.y = smoothY.get();
        saturn.position.z = smoothZ.get();

        // Efficient bounds check
        const bounceCheck = spatialBounds.check(saturn.position);
        if (bounceCheck.x) {
            velocity[0] *= -1;
            saturn.position.x = Math.max(spatialBounds.bounds[0], Math.min(spatialBounds.bounds[1], saturn.position.x));
        }
        if (bounceCheck.y) {
            velocity[1] *= -1;
            saturn.position.y = Math.max(spatialBounds.bounds[2], Math.min(spatialBounds.bounds[3], saturn.position.y));
        }
        if (bounceCheck.z) {
            velocity[2] *= -1;
            saturn.position.z = Math.max(spatialBounds.bounds[4], Math.min(spatialBounds.bounds[5], saturn.position.z));
        }

        // Rotations
        saturnRotation += 0.001;
        saturn.rotation.y = saturnRotation;
        
        ringRotation += 0.002;
        ringOrbitGroup.rotation.x = ringRotation;

        // Smooth camera using matrix lerp
        const cameraZ = (isMobile ? 1200 : 1100) + saturn.position.z * 0.1;
        const cameraY = (isMobile ? 300 : 250) + saturn.position.y * 0.15;
        camera.position.x += (saturn.position.x * 0.15 - camera.position.x) * 0.05;
        camera.position.y += (cameraY - camera.position.y) * 0.05;
        camera.position.z += (cameraZ - camera.position.z) * 0.05;
        camera.lookAt(saturn.position);

        // Star twinkle every 4 frames
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
    console.log('Matrix-optimized HD Saturn running!');

    // Resize with bounds recalc
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const wasMobile = isMobile;
            const nowMobile = window.innerWidth < 768;
            
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Update pixel ratio if mobile state changed
            if (wasMobile !== nowMobile) {
                const pixelRatio = nowMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
                renderer.setPixelRatio(pixelRatio);
            }
            
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