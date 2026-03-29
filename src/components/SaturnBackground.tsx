import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
  Requires in public/textures/:
    - texture-planet.jpg
    - texture-planet2.jpg
    - texture-planet3.jpg
    - texture-planet4.jpg (moon)
*/

const TEXTURE_PATHS = [
  '/textures/texture-planet.jpg',
  '/textures/texture-planet2.jpg',
  '/textures/texture-planet3.jpg',
];

const CYCLE_INTERVAL = 5000; // ms between transitions
const FADE_DURATION = 1500; // ms for crossfade

const SaturnBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 150, isMobile ? 1000 : 600);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'default',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    container.appendChild(renderer.domElement);

    // Space background via CSS
    container.style.backgroundImage = 'url(/textures/space-bg.jpg)';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundRepeat = 'no-repeat';

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(500, 300, 400);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x4466aa, 0.4);
    scene.add(ambientLight);

    if (!isMobile) {
      const rimLight = new THREE.PointLight(0x88bbff, 1.2, 1000);
      rimLight.position.set(-300, 100, 200);
      scene.add(rimLight);
    }

    // Preload all textures
    const textureLoader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = TEXTURE_PATHS.map((path) => {
      const tex = textureLoader.load(path);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    });

    // Ring texture
    function createRingTexture() {
      const canvas = document.createElement('canvas');
      const size = isMobile ? 128 : 256;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      const center = size / 2;

      const gradient = ctx.createRadialGradient(center, center, center * 0.47, center, center, center);
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(0.15, 'rgba(148,0,211,0.18)');
      gradient.addColorStop(0.3, 'rgba(75,0,130,0.22)');
      gradient.addColorStop(0.45, 'rgba(0,0,255,0.25)');
      gradient.addColorStop(0.55, 'rgba(0,255,0,0.25)');
      gradient.addColorStop(0.65, 'rgba(255,255,0,0.25)');
      gradient.addColorStop(0.8, 'rgba(255,127,0,0.22)');
      gradient.addColorStop(0.92, 'rgba(255,0,0,0.18)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      return texture;
    }

    // Planet — two overlapping spheres for crossfade
    const saturnSegments = isMobile ? 32 : 64;
    const saturnGeometry = new THREE.SphereGeometry(75, saturnSegments, saturnSegments);

    const materialA = new THREE.MeshStandardMaterial({
      map: textures[0],
      roughness: 0.85,
      metalness: 0.05,
      emissive: new THREE.Color(0x0a3050),
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 1,
    });

    const materialB = new THREE.MeshStandardMaterial({
      map: textures[1],
      roughness: 0.85,
      metalness: 0.05,
      emissive: new THREE.Color(0x0a3050),
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0,
    });

    const planetA = new THREE.Mesh(saturnGeometry, materialA);
    const planetB = new THREE.Mesh(saturnGeometry, materialB);

    // Parent group so both spheres rotate together
    const saturn = new THREE.Group();
    saturn.add(planetA);
    saturn.add(planetB);
    saturn.position.set(0, 0, 0);
    scene.add(saturn);

    // Rings
    const ringGeometry = new THREE.RingGeometry(95, 170, isMobile ? 32 : 64);
    const ringTexture = createRingTexture();

    const ringMaterial = new THREE.MeshBasicMaterial({
      map: ringTexture,
      alphaMap: ringTexture,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const rings = new THREE.Mesh(ringGeometry, ringMaterial);
    const ringOrbitGroup = new THREE.Group();
    ringOrbitGroup.add(rings);
    ringOrbitGroup.rotation.x = Math.PI / 2;
    saturn.add(ringOrbitGroup);

    // Moon
    const moonTexture = textureLoader.load('/textures/texture-planet4.jpg');
    moonTexture.minFilter = THREE.LinearFilter;
    moonTexture.magFilter = THREE.LinearFilter;

    const moonSegments = isMobile ? 16 : 32;
    const moonGeometry = new THREE.SphereGeometry(24, moonSegments, moonSegments);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      color: new THREE.Color(0x999999),
      roughness: 0.9,
      metalness: 0.05,
      emissive: new THREE.Color(0x0a2030),
      emissiveIntensity: 0.15,
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    const moonOrbitGroup = new THREE.Group();
    moonOrbitGroup.add(moon);
    moon.position.set(-200, 40, 80); // left, higher, closer to viewer
    moonOrbitGroup.rotation.x = 0.3;
    moonOrbitGroup.rotation.y = 0; // start in front of planet
    scene.add(moonOrbitGroup);

    // Texture cycling state
    let currentIndex = 0;
    let nextIndex = 1;
    let isFading = false;
    let fadeStart = 0;
    let frontIsMaterialA = true;

    const cycleInterval = setInterval(() => {
      if (isFading) return;
      nextIndex = (currentIndex + 1) % textures.length;

      if (frontIsMaterialA) {
        materialB.map = textures[nextIndex];
        materialB.needsUpdate = true;
      } else {
        materialA.map = textures[nextIndex];
        materialA.needsUpdate = true;
      }

      isFading = true;
      fadeStart = performance.now();
    }, CYCLE_INTERVAL);

    // Animation
    let animationId: number;
    const rotationSpeed = isMobile ? 0.6 : 1;

    function animate() {
      animationId = requestAnimationFrame(animate);

      saturn.rotation.y += 0.001 * rotationSpeed;
      ringOrbitGroup.rotation.y += 0.002 * rotationSpeed;
      moonOrbitGroup.rotation.y += 0.0008 * rotationSpeed; // slow orbit
      moon.rotation.y += 0.002 * rotationSpeed; // moon self-rotation

      // Crossfade
      if (isFading) {
        const elapsed = performance.now() - fadeStart;
        const t = Math.min(elapsed / FADE_DURATION, 1);
        const ease = t * t * (3 - 2 * t); // smoothstep

        if (frontIsMaterialA) {
          materialA.opacity = 1 - ease;
          materialB.opacity = ease;
        } else {
          materialB.opacity = 1 - ease;
          materialA.opacity = ease;
        }

        if (t >= 1) {
          isFading = false;
          currentIndex = nextIndex;
          frontIsMaterialA = !frontIsMaterialA;
        }
      }

      camera.lookAt(saturn.position);
      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(cycleInterval);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      saturnGeometry.dispose();
      materialA.dispose();
      materialB.dispose();
      textures.forEach((t) => t.dispose());
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringTexture.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      moonTexture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas" />;
};

export default SaturnBackground;