import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Animated starfield background (twinkling stars + shooting stars).
 * Saturn planet and nebula clouds removed. Sizes itself to its PARENT element, so drop it
 * inside any `position: relative` container with `absolute inset-0`.
 */
const StarfieldBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Size to the container, not the window.
    const getSize = () => ({
      w: container.clientWidth || window.innerWidth,
      h: container.clientHeight || window.innerHeight,
    });

    // ==================== SCENE SETUP ====================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0520, 0.00015);

    let { w, h } = getSize();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10000);
    camera.position.set(0, 0, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Constant gentle drift (no scroll hijacking — that fights page scroll).
    const speed = 1.0;

    // ==================== NEBULA COLOR PALETTE ====================
    const nebulaColors: Record<string, THREE.Color> = {
      deepPurple: new THREE.Color(0x1a0a2e),
      darkViolet: new THREE.Color(0x2d1b4e),
      richPurple: new THREE.Color(0x3d2c5e),
      deepBlue: new THREE.Color(0x1a3d5a),
      tealBlue: new THREE.Color(0x1a4d5a),
      darkTeal: new THREE.Color(0x0f3d4a),
      blueGreen: new THREE.Color(0x0d4d4a),
      darkCyan: new THREE.Color(0x0a3d3d),
      mintGreen: new THREE.Color(0x66e6b3),
      lightPink: new THREE.Color(0xffbfd6),
      rosePink: new THREE.Color(0xf299bf),
      softMint: new THREE.Color(0x80ffcc),
    };
    const colorKeys = Object.keys(nebulaColors);

    // ==================== POINTY STAR SYSTEM ====================
    function createPointyStars() {
      const starCount = 12000;
      const geometry = new THREE.BufferGeometry();

      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const speeds = new Float32Array(starCount);
      const phases = new Float32Array(starCount);
      const spikes = new Float32Array(starCount);
      const animModes = new Float32Array(starCount);

      const starColors = [
        new THREE.Color(0.61, 0.77, 1.0),
        new THREE.Color(0.85, 0.91, 1.0),
        new THREE.Color(1.0, 0.98, 0.86),
        new THREE.Color(1.0, 0.91, 0.72),
        new THREE.Color(1.0, 0.76, 0.53),
      ];

      for (let i = 0; i < starCount; i++) {
        let radius;
        if (Math.random() < 0.9) {
          radius = 800 + Math.random() * 1800;
        } else {
          radius = Math.random() * 600;
        }

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = -Math.random() * 3000 - 500;

        const colorIndex = Math.floor(Math.pow(Math.random(), 2) * starColors.length);
        const starColor = starColors[colorIndex];
        colors[i * 3] = starColor.r;
        colors[i * 3 + 1] = starColor.g;
        colors[i * 3 + 2] = starColor.b;

        const magnitude = Math.random();
        sizes[i] = Math.pow(magnitude, 0.5) * 3 + 0.8;
        speeds[i] = 50 + Math.random() * 150;
        phases[i] = Math.random() * Math.PI * 2;
        spikes[i] = 4 + Math.floor(Math.random() * 3);

        const modeRand = Math.random();
        if (modeRand < 0.4) animModes[i] = 0.0;
        else if (modeRand < 0.7) animModes[i] = 1.0;
        else animModes[i] = 2.0;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
      geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
      geometry.setAttribute('spikes', new THREE.BufferAttribute(spikes, 1));
      geometry.setAttribute('animMode', new THREE.BufferAttribute(animModes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          attribute float speed;
          attribute float phase;
          attribute float spikes;
          attribute float animMode;

          varying vec3 vColor;
          varying float vPhase;
          varying float vSpikes;
          varying float vIntensity;

          uniform float time;

          void main() {
            vColor = color;
            vPhase = phase;
            vSpikes = spikes;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float depth = -mvPosition.z;

            float animation = 1.0;
            if (animMode < 0.5) {
              float twinkle = sin(time * 3.0 + phase) * 0.5 + 0.5;
              twinkle = pow(twinkle, 2.0);
              animation = 0.6 + twinkle * 0.4;
            } else if (animMode < 1.5) {
              float pulse = sin(time * 0.8 + phase) * 0.5 + 0.5;
              pulse = smoothstep(0.0, 1.0, pulse);
              animation = 0.7 + pulse * 0.3;
            } else {
              animation = 0.85 + sin(time * 0.2 + phase) * 0.05;
            }

            vIntensity = animation;

            float perspectiveSize = size * (1200.0 / depth);
            perspectiveSize = min(perspectiveSize, size * 3.0);
            gl_PointSize = perspectiveSize * vIntensity;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vPhase;
          varying float vSpikes;
          varying float vIntensity;

          float starShape(vec2 uv, float spikes) {
            float angle = atan(uv.y, uv.x);
            float radius = length(uv);

            float spike = abs(cos(angle * spikes * 0.5));
            spike = pow(spike, 2.0);

            float core = exp(-radius * 15.0);
            float rays = exp(-radius * 6.0) * spike;
            float crossSpike = max(
              exp(-abs(uv.x) * 25.0) * exp(-abs(uv.y) * 4.0),
              exp(-abs(uv.y) * 25.0) * exp(-abs(uv.x) * 4.0)
            );
            float glow = exp(-radius * 3.5) * 0.4;

            return core + rays * 0.8 + crossSpike * 0.5 + glow;
          }

          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float star = starShape(center, vSpikes);

            if (star < 0.01) discard;

            vec3 finalColor = vColor * star * vIntensity;
            float coreBrightness = exp(-length(center) * 18.0);
            finalColor += vec3(1.0, 0.98, 0.95) * coreBrightness * 0.6;

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
      });

      const starField = new THREE.Points(geometry, material);
      scene.add(starField);

      return { starField, material, speeds };
    }

    // ==================== SHOOTING STARS TOWARDS USER ====================
    class ShootingStarTowardsUser {
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      active = false;
      position = new THREE.Vector3();
      direction = new THREE.Vector3();
      speed = 20;
      life = 1.0;
      trailLength = 50;
      baseColor: THREE.Color;
      trail: THREE.Line;
      head: THREE.Mesh;
      trailPositions: THREE.Vector3[] = [];

      constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        this.scene = scene;
        this.camera = camera;

        const trailGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.trailLength * 3);
        trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        this.baseColor = nebulaColors[colorKey].clone();

        const trailMaterial = new THREE.ShaderMaterial({
          uniforms: { color: { value: this.baseColor }, opacity: { value: 1.0 } },
          vertexShader: `
            varying float vAlpha;
            void main() {
              vAlpha = 1.0 - (float(gl_VertexID) / 50.0);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            uniform float opacity;
            varying float vAlpha;
            void main() {
              gl_FragColor = vec4(color, vAlpha * opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        this.trail = new THREE.Line(trailGeometry, trailMaterial);
        this.trail.visible = false;
        scene.add(this.trail);

        const headGeometry = new THREE.SphereGeometry(2, 8, 8);
        const headMaterial = new THREE.MeshBasicMaterial({
          color: this.baseColor,
          transparent: true,
          opacity: 1.0,
        });
        this.head = new THREE.Mesh(headGeometry, headMaterial);
        this.head.visible = false;
        scene.add(this.head);
      }

      trigger() {
        this.active = true;
        this.life = 1.0;
        this.trailPositions = [];
        this.trail.visible = true;
        this.head.visible = true;

        const angle = Math.random() * Math.PI * 2;
        const distanceFromCenter = 800 + Math.random() * 400;
        const zOffset = -1000 - Math.random() * 500;

        this.position = new THREE.Vector3(
          Math.cos(angle) * distanceFromCenter,
          Math.sin(angle) * distanceFromCenter,
          zOffset
        );

        const targetX = (Math.random() - 0.5) * 300;
        const targetY = (Math.random() - 0.5) * 300;
        const targetZ = this.camera.position.z + (Math.random() - 0.5) * 200;

        this.direction = new THREE.Vector3(targetX, targetY, targetZ)
          .sub(this.position)
          .normalize();

        this.speed = 18 + Math.random() * 14;

        const newColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        this.baseColor = nebulaColors[newColorKey].clone();
        (this.trail.material as THREE.ShaderMaterial).uniforms.color.value = this.baseColor;
        (this.head.material as THREE.MeshBasicMaterial).color = this.baseColor;
      }

      update(delta: number) {
        if (!this.active) return;

        this.position.add(this.direction.clone().multiplyScalar(this.speed * delta * 60));
        this.head.position.copy(this.position);

        this.trailPositions.unshift(this.position.clone());
        if (this.trailPositions.length > this.trailLength) this.trailPositions.pop();

        const positions = (this.trail.geometry.attributes.position as THREE.BufferAttribute)
          .array as Float32Array;
        for (let i = 0; i < this.trailPositions.length; i++) {
          const pos = this.trailPositions[i];
          positions[i * 3] = pos.x;
          positions[i * 3 + 1] = pos.y;
          positions[i * 3 + 2] = pos.z;
        }
        for (let i = this.trailPositions.length; i < this.trailLength; i++) {
          const lastPos = this.trailPositions[this.trailPositions.length - 1] || this.position;
          positions[i * 3] = lastPos.x;
          positions[i * 3 + 1] = lastPos.y;
          positions[i * 3 + 2] = lastPos.z;
        }
        this.trail.geometry.attributes.position.needsUpdate = true;

        this.life -= delta * 0.3;
        (this.trail.material as THREE.ShaderMaterial).uniforms.opacity.value = Math.max(0, this.life);
        (this.head.material as THREE.MeshBasicMaterial).opacity = Math.max(0, this.life);

        const distToCamera = this.position.distanceTo(this.camera.position);
        if (distToCamera < 150 || this.life <= 0 || this.position.z > 300) {
          this.active = false;
          this.trail.visible = false;
          this.head.visible = false;
        }
      }

      dispose() {
        this.scene.remove(this.trail);
        this.scene.remove(this.head);
        this.trail.geometry.dispose();
        (this.trail.material as THREE.Material).dispose();
        this.head.geometry.dispose();
        (this.head.material as THREE.Material).dispose();
      }
    }

    // ==================== CREATE SCENE ====================
    const { starField, material: starMaterial, speeds } = createPointyStars();
    const shootingStars = Array.from(
      { length: 50 },
      () => new ShootingStarTowardsUser(scene, camera)
    );

    // ==================== ANIMATION LOOP ====================
    let time = 0;
    let shootingStarTimer = 0;
    const clock = new THREE.Clock();

    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      time += delta;

      starMaterial.uniforms.time.value = time;

      const positions = starField.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 2] += speeds[i] * delta * speed;

        if (positions[i * 3 + 2] > 200) {
          let radius;
          if (Math.random() < 0.9) radius = 800 + Math.random() * 1800;
          else radius = Math.random() * 600;

          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);

          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = -3000 - Math.random() * 500;
        }
      }
      starField.geometry.attributes.position.needsUpdate = true;

      shootingStarTimer += delta;
      if (shootingStarTimer > 0.8 && Math.random() < 0.08) {
        const inactive = shootingStars.find((s) => !s.active);
        if (inactive) {
          inactive.trigger();
          shootingStarTimer = 0;
        }
      }
      shootingStars.forEach((star) => star.update(delta));

      renderer.render(scene, camera);
    }

    animate();

    // Resize to the CONTAINER, not the window.
    const handleResize = () => {
      const next = getSize();
      w = next.w;
      h = next.h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ==================== CLEANUP ====================
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
      shootingStars.forEach((s) => s.dispose());

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
          else (mesh.material as THREE.Material).dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
};

export default StarfieldBackground;