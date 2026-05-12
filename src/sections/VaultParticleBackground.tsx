import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function VaultParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || initialized.current) return;
    initialized.current = true;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    // Particle grid: 20x20x10 = 4000 particles
    const gridX = 20, gridY = 20, gridZ = 10;
    const spacing = 0.5;
    const count = gridX * gridY * gridZ;

    const positions = new Float32Array(count * 3);
    const homePositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const randomValues = new Float32Array(count);
    const sizes = new Float32Array(count);

    const colors = [
      new THREE.Color(0x1a0033), new THREE.Color(0x4d0099),
      new THREE.Color(0x001a4d), new THREE.Color(0x0066cc),
      new THREE.Color(0x004d66), new THREE.Color(0x00cccc),
      new THREE.Color(0x66004d), new THREE.Color(0xcc0099),
      new THREE.Color(0x004d1a), new THREE.Color(0x00cc66),
      new THREE.Color(0x663300), new THREE.Color(0xff6600),
    ];

    const color1s = new Float32Array(count * 3);
    const color2s = new Float32Array(count * 3);

    let idx = 0;
    for (let x = 0; x < gridX; x++) {
      for (let y = 0; y < gridY; y++) {
        for (let z = 0; z < gridZ; z++) {
          const px = (x - gridX / 2) * spacing;
          const py = (y - gridY / 2) * spacing;
          const pz = (z - gridZ / 2) * spacing;

          positions[idx * 3] = px;
          positions[idx * 3 + 1] = py;
          positions[idx * 3 + 2] = pz;

          homePositions[idx * 3] = px;
          homePositions[idx * 3 + 1] = py;
          homePositions[idx * 3 + 2] = pz;

          velocities[idx * 3] = 0;
          velocities[idx * 3 + 1] = 0;
          velocities[idx * 3 + 2] = 0;

          randomValues[idx] = Math.random();
          sizes[idx] = 1 + Math.random() * 3;

          const colorIdx = Math.floor((x / gridX) * colors.length);
          const c1 = colors[colorIdx % colors.length];
          const c2 = colors[(colorIdx + 1) % colors.length];
          color1s[idx * 3] = c1.r; color1s[idx * 3 + 1] = c1.g; color1s[idx * 3 + 2] = c1.b;
          color2s[idx * 3] = c2.r; color2s[idx * 3 + 1] = c2.g; color2s[idx * 3 + 2] = c2.b;

          idx++;
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('random', new THREE.BufferAttribute(randomValues, 1));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor1: { value: new THREE.Color(0xFF6B35) },
        uColor2: { value: new THREE.Color(0x00D4FF) },
        uOpacity: { value: 0.8 },
      },
      vertexShader: `
        attribute float random;
        attribute float size;
        varying float vRandom;
        void main() {
          vRandom = random;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uOpacity;
        varying float vRandom;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          vec3 color = mix(uColor1, uColor2, vRandom);
          float alpha = (1.0 - dist * 2.0) * uOpacity * 0.8;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    group.add(particles);

    // Mouse interaction
    const mouse = new THREE.Vector2(9999, 9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -0.5);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      // Auto rotation
      group.rotation.y += 0.0005;
      group.rotation.x += 0.0002;

      // Mouse raycast
      raycaster.setFromCamera(mouse, camera);
      const mousePoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, mousePoint);

      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const px = posArray[i * 3];
        const py = posArray[i * 3 + 1];
        const pz = posArray[i * 3 + 2];

        const hx = homePositions[i * 3];
        const hy = homePositions[i * 3 + 1];
        const hz = homePositions[i * 3 + 2];

        // Mouse repulsion
        if (mousePoint) {
          const dx = px - mousePoint.x;
          const dy = py - mousePoint.y;
          const dz = pz - mousePoint.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 3 && dist > 0.01) {
            const force = Math.max(0, 1 - dist / 3) * 0.2;
            velocities[i * 3] += (dx / dist) * force;
            velocities[i * 3 + 1] += (dy / dist) * force;
            velocities[i * 3 + 2] += (dz / dist) * force;
          }
        }

        // Spring back to home
        velocities[i * 3] += (hx - px) * 0.02;
        velocities[i * 3 + 1] += (hy - py) * 0.02;
        velocities[i * 3 + 2] += (hz - pz) * 0.02;

        // Damping
        velocities[i * 3] *= 0.9;
        velocities[i * 3 + 1] *= 0.9;
        velocities[i * 3 + 2] *= 0.9;

        // Update position
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Fade in
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 2s ease';
    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
