import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Auth3DGlobe — Interactive 3D Wireframe Globe offset to the left of the viewport
 * to match the reference design. Features mouse-reactive rotation, constellation nodes,
 * and orbiting purple/blue/emerald satellites.
 */
export const Auth3DGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const w = container.clientWidth;
    const h = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Lighting ─────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 30);
    blueLight.position.set(-2, 3, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3.5, 30);
    purpleLight.position.set(-5, -2, 4);
    scene.add(purpleLight);

    // ── Globe group ──────────────────────────────────────────────────────────
    const globe = new THREE.Group();
    // Offset globe to left side on desktop screens
    const isDesktop = w >= 768;
    globe.position.set(isDesktop ? -2.2 : 0, 0, 0);
    scene.add(globe);

    // Outer Wireframe Sphere Shell
    const sphereGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globe.add(sphereMesh);

    // Inner Glowing Core Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.4,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globe.add(coreMesh);

    // Latitude rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    for (let i = -2; i <= 2; i++) {
      const ringR = Math.sqrt(2.4 * 2.4 - (i * 0.9) * (i * 0.9));
      if (ringR <= 0) continue;
      const ringGeo = new THREE.RingGeometry(ringR - 0.02, ringR + 0.02, 64);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = i * 0.9;
      ring.rotation.x = Math.PI / 2;
      globe.add(ring);
    }

    // Glowing constellation dot nodes on globe surface
    const dotGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const dotMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x60a5fa,
      emissiveIntensity: 1,
    });

    const dotPositions = [
      [1.6, 1.1, 1.3], [-0.9, 1.7, 1.1], [1.9, -0.6, 0.9],
      [-1.3, -1.4, 1.4], [0.4, 2.0, 0.6], [-1.9, 0.5, 1.0],
      [1.0, -1.7, 1.1], [-0.6, 0.3, 2.2], [1.5, 0.7, -1.5],
      [-1.1, -0.9, -1.7], [0.7, 1.3, -1.7], [-1.6, 1.2, -1.0],
    ];

    const dots: THREE.Mesh[] = [];
    dotPositions.forEach(([x, y, z]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      globe.add(dot);
      dots.push(dot);
    });

    // Orbiting satellite nodes
    const satGeo = new THREE.OctahedronGeometry(0.15, 0);
    const satColors = [0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6, 0xef4444];
    const satellites: THREE.Mesh[] = [];

    satColors.forEach((color, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
      });
      const sat = new THREE.Mesh(satGeo, mat);
      const angle = (i / satColors.length) * Math.PI * 2;
      const radius = 3.4;
      sat.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.65,
        Math.sin(angle) * radius * 0.45
      );
      globe.add(sat);
      satellites.push(sat);
    });

    // ── Mouse & Cursor Reactivity ─────────────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      mouse.targetX = (relX / rect.width - 0.5) * 2;
      mouse.targetY = (relY / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ── Animation loop ───────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth inertia interpolation towards mouse target
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Globe rotation + dynamic cursor tilt
      globe.rotation.y += 0.004 + mouse.x * 0.006;
      globe.rotation.x = Math.sin(elapsed * 0.4) * 0.12 + mouse.y * 0.35;
      globe.rotation.z = mouse.x * 0.12;

      coreMesh.rotation.y -= 0.007;
      coreMesh.rotation.z += 0.005;

      blueLight.position.x = -2 + mouse.x * 2;
      blueLight.position.y = 3 - mouse.y * 2;

      // Pulse dots
      dots.forEach((dot, i) => {
        const scale = 1 + 0.35 * Math.sin(elapsed * 2.5 + i * 0.7);
        dot.scale.setScalar(scale);
      });

      // Orbit satellites around globe
      satellites.forEach((sat, i) => {
        const angle = elapsed * 0.45 + (i / satellites.length) * Math.PI * 2;
        const radius = 3.4 + Math.sin(elapsed + i) * 0.2;
        sat.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.65 + mouse.y * 0.3,
          Math.sin(angle) * radius * 0.45 + mouse.x * 0.3
        );
        sat.rotation.x += 0.025;
        sat.rotation.z += 0.015;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ───────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);

      const desktop = nw >= 768;
      globe.position.set(desktop ? -2.2 : 0, 0, 0);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      sphereGeo.dispose();
      sphereMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      satGeo.dispose();
      satellites.forEach((s) => (s.material as THREE.Material).dispose());

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute inset-0 no-transition pointer-events-none" />;
};
