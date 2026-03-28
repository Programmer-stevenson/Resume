import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
  Requires in public/textures/:
    - 2k_eris_fictional.jpg
    - space_bg.jpg  (2048x1024 equirectangular space background)
*/

const SaturnBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 8000);
    camera.position.set(0, 150, isMobile ? 1000 : 600);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'default',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

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

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(500, 300, 400);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x222244, 0.3);
    scene.add(ambientLight);

    if (!isMobile) {
      const rimLight = new THREE.PointLight(0x6688bb, 0.8, 1000);
      rimLight.position.set(-300, 100, 200);
      scene.add(rimLight);
    }

    const textureLoader = new THREE.TextureLoader();

    /* ─── Space background via CSS (no distortion) ─── */
    container.style.backgroundImage = 'url(/textures/space_bg.jpg)';
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.backgroundRepeat = 'no-repeat';

    /* ─── Star Sparkles ─── */
    const starCount = isMobile ? 300 : 600;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starPhases = new Float32Array(starCount); // random twinkle offset
    const starSpeeds = new Float32Array(starCount); // random twinkle speed
    const spread = 3000;

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * spread;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      starSizes[i] = Math.random() * 3 + 1;
      starPhases[i] = Math.random() * Math.PI * 2;
      starSpeeds[i] = 0.3 + Math.random() * 1.5;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    /* ─── Planet ─── */
    const planetTexture = textureLoader.load('/textures/2k_eris_fictional.jpg');
    planetTexture.minFilter = THREE.LinearFilter;
    planetTexture.magFilter = THREE.LinearFilter;

    const planetSegments = isMobile ? 32 : 64;
    const planetGeometry = new THREE.SphereGeometry(75, planetSegments, planetSegments);

    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
      color: new THREE.Color(0xccccdd),
      roughness: 0.6,
      metalness: 0.35,
      emissive: new THREE.Color(0x0a1530),
      emissiveIntensity: 0.25,
    });

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(0, 0, 0);
    scene.add(planet);

    /* ─── Rings ─── */
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
    planet.add(ringOrbitGroup);

    /* ─── Animation ─── */
    let animationId: number;
    const rotSpeed = isMobile ? 0.6 : 1;
    let time = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Planet rotation
      planet.rotation.y += 0.001 * rotSpeed;
      ringOrbitGroup.rotation.y += 0.002 * rotSpeed;

      // Star twinkle — update sizes each frame for sparkle effect
      const sizes = starGeometry.attributes.size as THREE.BufferAttribute;
      for (let i = 0; i < starCount; i++) {
        const twinkle = Math.sin(time * starSpeeds[i] + starPhases[i]) * 0.5 + 0.5;
        sizes.array[i] = starSizes[i] * (0.3 + twinkle * 0.7);
      }
      sizes.needsUpdate = true;

      // Gentle camera drift
      const driftX = Math.sin(time * 0.06) * 5;
      const driftY = 150 + Math.cos(time * 0.04) * 3;
      const driftZ = (isMobile ? 1000 : 600) + Math.sin(time * 0.03) * 8;
      camera.position.x = driftX;
      camera.position.y = driftY;
      camera.position.z = driftZ;

      camera.lookAt(planet.position);
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
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planetGeometry.dispose();
      planetMaterial.dispose();
      planetTexture.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringTexture.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas" />;
};

export default SaturnBackground;