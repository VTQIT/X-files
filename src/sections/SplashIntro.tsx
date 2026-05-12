import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SplashIntroProps {
  onComplete: () => void;
}

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Particles
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#FF6B35'),
      new THREE.Color('#00D4FF'),
      new THREE.Color('#39FF14'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#FFFFFF'),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.05
      ));
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00D4FF,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = new THREE.Vector2(9999, 9999);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const px = posArray[i * 3];
        const py = posArray[i * 3 + 1];

        // Apply velocity
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Mouse repulsion
        const mouseWorld = new THREE.Vector3(mouse.x * 40, mouse.y * 30, 0);
        const dx = px - mouseWorld.x;
        const dy = py - mouseWorld.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
          const force = (1 - dist / 15) * 0.3;
          posArray[i * 3] += (dx / dist) * force;
          posArray[i * 3 + 1] += (dy / dist) * force;
        }

        // Boundary wrap
        if (posArray[i * 3] > 40) posArray[i * 3] = -40;
        if (posArray[i * 3] < -40) posArray[i * 3] = 40;
        if (posArray[i * 3 + 1] > 30) posArray[i * 3 + 1] = -30;
        if (posArray[i * 3 + 1] < -30) posArray[i * 3 + 1] = 30;
      }

      geometry.attributes.position.needsUpdate = true;

      // Update lines
      const linePositions: number[] = [];
      for (let i = 0; i < particleCount; i++) {
        let connections = 0;
        for (let j = i + 1; j < particleCount && connections < 3; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 12) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            );
            connections++;
          }
        }
      }
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

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
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [skip, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#0A0A0A' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Scan lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'rgba(0, 212, 255, 0.3)',
            top: `${20 + i * 15}%`,
            animation: `scanline 2s linear ${i * 0.4}s infinite`,
          }}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Shield logo */}
        <div className="mb-8 animate-[pulse-glow_2s_ease-in-out_infinite]">
          <img
            src="/assets/shield-logo.png"
            alt="Kapten Vault"
            className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]"
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-hero text-white tracking-tight" style={{ lineHeight: 0.9 }}>
          {'KAPTEN VAULT'.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block opacity-0"
              style={{
                animation: `fadeInUp 0.6s ease forwards ${0.5 + i * 0.03}s`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 text-lg font-light tracking-[0.5em] text-[#888] opacity-0"
          style={{ animation: 'fadeIn 0.8s ease 1.8s forwards, letterSpacing 1.5s ease 1.8s forwards' }}
        >
          Secure Everything.
        </p>

        {/* Energy pulse */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.6) 0%, transparent 70%)',
            animation: 'energyPulse 0.6s ease 1.5s forwards',
            opacity: 0,
          }}
        />
      </div>

      {/* Skip button */}
      <button
        onClick={() => setSkip(true)}
        className="absolute bottom-8 right-8 text-xs font-mono text-[#555] hover:text-white transition-colors duration-200 underline underline-offset-4 z-20"
      >
        Skip Intro
      </button>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes letterSpacing {
          from { letter-spacing: 0.5em; }
          to { letter-spacing: 0.1em; }
        }
        @keyframes energyPulse {
          0% { opacity: 0.6; transform: scale(0); }
          100% { opacity: 0; transform: scale(3); }
        }
      `}</style>
    </div>
  );
}
