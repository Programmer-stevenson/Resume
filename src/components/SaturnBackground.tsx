import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Smooth value buffer class for smooth movement
class SmoothValue {
  private buffer: Float32Array;
  private size: number;
  private index: number;
  private filled: number;

  constructor(size = 5) {
    this.buffer = new Float32Array(size);
    this.size = size;
    this.index = 0;
    this.filled = 0;
  }

  push(value: number) {
    this.buffer[this.index] = value;
    this.index = (this.index + 1) % this.size;
    if (this.filled < this.size) this.filled++;
  }

  get(): number {
    let sum = 0;
    for (let i = 0; i < this.filled; i++) sum += this.buffer[i];
    return sum / this.filled;
  }
}

// Spatial bounds class for bounce detection
class SpatialBounds {
  bounds: Float32Array;

  constructor() {
    this.bounds = new Float32Array(6);
  }

  set(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number) {
    this.bounds[0] = minX;
    this.bounds[1] = maxX;
    this.bounds[2] = minY;
    this.bounds[3] = maxY;
    this.bounds[4] = minZ;
    this.bounds[5] = maxZ;
  }

  check(pos: THREE.Vector3) {
    return {
      x: pos.x < this.bounds[0] || pos.x > this.bounds[1],
      y: pos.y < this.bounds[2] || pos.y > this.bounds[3],
      z: pos.z < this.bounds[4] || pos.z > this.bounds[5],
    };
  }
}

const SaturnBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    // Smooth value buffers
    const smoothX = new SmoothValue(3);
    const smoothY = new SmoothValue(3);
    const smoothZ = new SmoothValue(3);
    const spatialBounds = new SpatialBounds();

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 400, 3500);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
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

    // Optimized lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(500, 300, 400);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x4466aa, 0.35);
    scene.add(ambientLight);

    const rimLight = new THREE.PointLight(0x88bbff, 1.2, 1000);
    rimLight.position.set(-300, 100, 200);
    scene.add(rimLight);

    // Create HD Saturn texture
    function createHDTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;

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

      // Optimized bands
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

        const cloudGrad = ctx.createRadialGradient(x, y, 0, x, y, size / 2);
        cloudGrad.addColorStop(0, 'rgba(180, 230, 255, 0.4)');
        cloudGrad.addColorStop(0.5, 'rgba(120, 190, 235, 0.2)');
        cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cloudGrad;
        ctx.fillRect(x - size / 2, y - size / 4, size, size / 2);
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

    // Create Rainbow Ring texture
    function createRingTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      const gradient = ctx.createRadialGradient(128, 128, 60, 128, 128, 128);
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
      ctx.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      return texture;
    }

    // HD Saturn
    const saturnSegments = isMobile ? 48 : 64;
    const saturnGeometry = new THREE.SphereGeometry(100, saturnSegments, saturnSegments);
    const saturnTexture = createHDTexture();

    const saturnMaterial = new THREE.MeshStandardMaterial({
      map: saturnTexture,
      roughness: 0.85,
      metalness: 0.05,
      emissive: new THREE.Color(0x0a3050),
      emissiveIntensity: 0.2,
    });

    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturn.position.set(
      (Math.random() - 0.5) * 400,
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200
    );
    scene.add(saturn);

    // Rainbow Rings
    const ringGroup = new THREE.Group();
    const ringGeometry = new THREE.RingGeometry(120, 220, 64);
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
    ringGroup.add(rings);
    ringGroup.rotation.x = Math.PI / 2;

    const ringOrbitGroup = new THREE.Group();
    ringOrbitGroup.add(ringGroup);
    saturn.add(ringOrbitGroup);

    // HD Starfield with colors
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
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Physics
    const velocity = new Float32Array([2.5, 2, 1.5]);

    const aspect = window.innerWidth / window.innerHeight;
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const targetCameraZ = isMobile ? 1200 : 1100;
    const targetCameraY = isMobile ? 300 : 250;
    const height = 2 * Math.tan(vFOV / 2) * targetCameraZ;
    const width = height * aspect;

    spatialBounds.set(-width * 0.4, width * 0.4, -height * 0.35, height * 0.35, -400, 400);

    // Zoom animation
    const zoomDuration = 4000;
    const zoomStartTime = performance.now();
    let zoomComplete = false;

    // Animation loop
    let ringRotation = 0;
    let saturnRotation = 0;
    let frameCount = 0;
    let animationId: number;

    function animate(currentTime: number) {
      animationId = requestAnimationFrame(animate);
      frameCount++;

      // Zoom animation with easing
      if (!zoomComplete) {
        const zoomProgress = Math.min((currentTime - zoomStartTime) / zoomDuration, 1);
        const easeProgress = 1 - Math.pow(1 - zoomProgress, 3);

        camera.position.z = 3500 - (3500 - targetCameraZ) * easeProgress;
        camera.position.y = 400 - (400 - targetCameraY) * easeProgress;

        if (zoomProgress >= 1) {
          zoomComplete = true;
        }
      }

      // Saturn movement after zoom
      if (zoomComplete) {
        smoothX.push(saturn.position.x + velocity[0]);
        smoothY.push(saturn.position.y + velocity[1]);
        smoothZ.push(saturn.position.z + velocity[2]);

        saturn.position.x = smoothX.get();
        saturn.position.y = smoothY.get();
        saturn.position.z = smoothZ.get();

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

        // Smooth camera follow
        const cameraZ = targetCameraZ + saturn.position.z * 0.1;
        const cameraY = targetCameraY + saturn.position.y * 0.15;
        camera.position.x += (saturn.position.x * 0.15 - camera.position.x) * 0.05;
        camera.position.y += (cameraY - camera.position.y) * 0.05;
        camera.position.z += (cameraZ - camera.position.z) * 0.05;
      }

      // Rotations
      saturnRotation += 0.001;
      saturn.rotation.y = saturnRotation;

      ringRotation += 0.002;
      ringOrbitGroup.rotation.x = ringRotation;

      // Camera look at
      camera.lookAt(saturn.position);

      // Star twinkle
      if (frameCount % 4 === 0) {
        const starSizes = stars.geometry.attributes.size.array as Float32Array;
        const time = currentTime * 0.001;
        for (let i = 0; i < starCount; i += 2) {
          starSizes[i] = 0.5 + Math.abs(Math.sin(time + i * 0.1) * 2);
        }
        stars.geometry.attributes.size.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    animate(performance.now());

    // Resize handler
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const nowMobile = window.innerWidth < 768;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        const newPixelRatio = nowMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
        renderer.setPixelRatio(newPixelRatio);

        const newAspect = window.innerWidth / window.innerHeight;
        const cameraDistance = nowMobile ? 1200 : 1100;
        const newHeight = 2 * Math.tan(vFOV / 2) * cameraDistance;
        const newWidth = newHeight * newAspect;
        spatialBounds.set(-newWidth * 0.4, newWidth * 0.4, -newHeight * 0.35, newHeight * 0.35, -400, 400);
      }, 150);
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