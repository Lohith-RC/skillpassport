import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Auth3DGlobe — Interactive wireframe globe with orbiting nodes.
 * Renders behind auth forms with mouse-follow rotation.
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
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const blueLight = new THREE.PointLight(0x2563eb, 3, 20);
    blueLight.position.set(3, 3, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 2.5, 20);
    purpleLight.position.set(-4, -2, 4);
    scene.add(purpleLight);

    // ── Globe group ──────────────────────────────────────────────────────────
    const globe = new THREE.Group();
    scene.add(globe);

    // Wireframe sphere shell
    const sphereGeo = new THREE.SphereGeometry(2.2, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globe.add(sphereMesh);

    // Latitude rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    for (let i = -2; i <= 2; i++) {
      const ringR = Math.sqrt(2.2 * 2.2 - (i * 0.8) * (i * 0.8));
      if (ringR <= 0) continue;
      const ringGeo = new THREE.RingGeometry(ringR - 0.02, ringR + 0.02, 64);
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = i * 0.8;
      ring.rotation.x = Math.PI / 2;
      globe.add(ring);
    }

    // Glowing dot nodes on globe surface
    const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const dotMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
    });

    const dotPositions = [
      [1.5, 1.0, 1.2], [-0.8, 1.6, 1.0], [1.8, -0.5, 0.8],
      [-1.2, -1.3, 1.3], [0.3, 1.9, 0.5], [-1.8, 0.4, 0.9],
      [0.9, -1.6, 1.0], [-0.5, 0.2, 2.1], [1.4, 0.6, -1.4],
      [-1.0, -0.8, -1.6], [0.6, 1.2, -1.6], [-1.5, 1.1, -0.9],
    ];

    const dots: THREE.Mesh[] = [];
    dotPositions.forEach(([x, y, z]) => {
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      globe.add(dot);
      dots.push(dot);
    });

    // Orbiting satellite nodes (5 platform roles)
    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satColors = [0x2563eb, 0x10b981, 0xf59e0b, 0x8b5cf6, 0xef4444];
    const satellites: THREE.Mesh[] = [];

    satColors.forEach((color, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2,
      });
      const sat = new THREE.Mesh(satGeo, mat);
      const angle = (i / satColors.length) * Math.PI * 2;
      const radius = 3.2;
      sat.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.6,
        Math.sin(angle) * radius * 0.4
      );
      globe.add(sat);
      satellites.push(sat);
    });

    // ── Mouse interaction ────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Animation loop ───────────────────────────────────────────────────────
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow rotation + mouse follow
      globe.rotation.y += 0.003;
      globe.rotation.x += 0.001;
      globe.rotation.y += (mouse.x * 0.3 - globe.rotation.y) * 0.01;
      globe.rotation.x += (-mouse.y * 0.2 - globe.rotation.x) * 0.01;

      // Pulse dots
      dots.forEach((dot, i) => {
        const scale = 1 + 0.3 * Math.sin(elapsed * 2 + i * 0.7);
        dot.scale.setScalar(scale);
      });

      // Orbit satellites
      satellites.forEach((sat, i) => {
        const angle = elapsed * 0.4 + (i / satellites.length) * Math.PI * 2;
        const radius = 3.2;
        sat.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.6,
          Math.sin(angle) * radius * 0.4
        );
        sat.rotation.x += 0.02;
        sat.rotation.z += 0.01;
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
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      // Dispose geometries & materials
      sphereGeo.dispose();
      sphereMat.dispose();
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

  return <div ref={containerRef} className="w-full h-full absolute inset-0 no-transition" />;
};
