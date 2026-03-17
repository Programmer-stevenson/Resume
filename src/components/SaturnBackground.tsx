import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

    // Create Saturn texture
    function createSaturnTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = isMobile ? 1024 : 2048;
      canvas.height = isMobile ? 512 : 1024;
      const ctx = canvas.getContext('2d')!;

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

      ctx.globalAlpha = 0.55;
      const colors = ['#3a8ec8', '#2d7db8', '#4a9ed8', '#1a6e9a', '#2a8eb8', '#0d5a7a'];
      const bandCount = isMobile ? 40 : 100;
      for (let i = 0; i < bandCount; i++) {
        const y = (canvas.height / bandCount) * i;
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(0, y, canvas.width, 6 + Math.random() * 12);
      }

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

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    }

    // Create Ring texture
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

    // Saturn
    const saturnSegments = isMobile ? 32 : 64;
    const saturnGeometry = new THREE.SphereGeometry(75, saturnSegments, saturnSegments);
    const saturnTexture = createSaturnTexture();

    const saturnMaterial = new THREE.MeshStandardMaterial({
      map: saturnTexture,
      roughness: 0.85,
      metalness: 0.05,
      emissive: new THREE.Color(0x0a3050),
      emissiveIntensity: 0.2,
    });

    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
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
    rings.rotation.x = Math.PI / 2;
    
    // Orbit group — ring stays horizontal (flat)
    const ringOrbitGroup = new THREE.Group();
    ringOrbitGroup.add(rings);
    ringOrbitGroup.rotation.x = Math.PI / 2; // Perfectly horizontal
    saturn.add(ringOrbitGroup);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = isMobile ? 300 : 1200;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2000;
      positions[i3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i3 + 2] = (Math.random() - 0.5) * 2000;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: isMobile ? 1.5 : 2,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation
    let animationId: number;
    const shouldRotate = !isMobile;

    function animate() {
      animationId = requestAnimationFrame(animate);

      if (shouldRotate) {
        saturn.rotation.y += 0.001;
        ringOrbitGroup.rotation.y += 0.002; // Spin ring around Y axis to stay flat
        stars.rotation.y += 0.0001;
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
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      saturnGeometry.dispose();
      saturnMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      saturnTexture.dispose();
      ringTexture.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas" />;
};

export default SaturnBackground;