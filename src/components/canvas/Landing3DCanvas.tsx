import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Landing3DCanvas — Immersive 3D WebGL hero scene
 *
 * Features:
 *  • Mouse-reactive rotation with smooth inertia
 *  • Scroll-driven depth parallax (camera Z shifts as page scrolls)
 *  • Orbiting constellation particles
 *  • WebGL context loss/restoration handling
 *  • Full geometry + material disposal on unmount
 */
export const Landing3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId: number;

    // ── Scene / Camera / Renderer ───────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── WebGL context loss handling ─────────────────────────────────────────
    const handleContextLoss = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frameId);
    };
    const handleContextRestore = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      animate();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLoss);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestore);

    // ── Lighting (Monochrome White & Silver) ───────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const whiteLight1 = new THREE.DirectionalLight(0xffffff, 3.0);
    whiteLight1.position.set(5, 5, 5);
    scene.add(whiteLight1);

    const whiteLight2 = new THREE.DirectionalLight(0xaaaaaa, 2.0);
    whiteLight2.position.set(-5, -3, 5);
    scene.add(whiteLight2);

    const whitePoint = new THREE.PointLight(0xffffff, 3, 25);
    whitePoint.position.set(0, 4, 3);
    scene.add(whitePoint);

    // ── Core Group ──────────────────────────────────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    // 1. Metallic silver/chrome torus ring
    const torusGeo = new THREE.TorusGeometry(2.4, 0.55, 32, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x222222,
      emissiveIntensity: 0.2,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    group.add(torusMesh);

    // 2. Inner wireframe icosahedron crystal (Monochrome White Wireframe)
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.05,
      wireframe: true,
      emissive: 0x444444,
      emissiveIntensity: 0.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Orbiting constellation nodes (Pure White)
    const nodeCount = 14;
    const nodesGroup = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
    });

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 4.0 + (Math.random() - 0.5) * 0.6;
      const node = new THREE.Mesh(sphereGeo, nodeMat);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 2
      );
      nodesGroup.add(node);
    }
    group.add(nodesGroup);

    // 4. Particle field — monochrome white dust motes
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const particlePalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xdddddd),
      new THREE.Color(0xaaaaaa),
      new THREE.Color(0x888888),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      const c = particlePalette[Math.floor(Math.random() * particlePalette.length)];
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Mouse tracking with inertia ─────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container!.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Scroll depth tracking ───────────────────────────────────────────────
    let scrollProgress = 0;
    const handleScroll = () => {
      const vh = window.innerHeight;
      scrollProgress = Math.min(1, window.scrollY / vh);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Animation loop ──────────────────────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse inertia
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Core rotation — auto + mouse + scroll parallax
      group.rotation.y += 0.005 + mouse.x * 0.008;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.1 + mouse.y * 0.25;
      group.rotation.z = mouse.x * 0.08;

      // Inner crystal counter-rotation
      innerMesh.rotation.y -= 0.008;
      innerMesh.rotation.z += 0.006;

      // Orbiting nodes
      nodesGroup.rotation.z -= 0.003;

      // Particle drift
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0004;

      // Scroll-driven camera depth — pulls back as user scrolls down
      camera.position.z = 10 - scrollProgress * 3;
      camera.position.y = scrollProgress * -1.5;

      // Dynamic lighting position following mouse
      whitePoint.position.x = mouse.x * 3;
      whitePoint.position.y = 4 - mouse.y * 2;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ──────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container || disposed) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup — full disposal ─────────────────────────────────────────────
    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      renderer.domElement.removeEventListener('webglcontextlost', handleContextLoss);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestore);

      // Dispose geometry + materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (obj.material instanceof THREE.Material) obj.material.dispose();
        }
      });

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] md:min-h-[440px]"
      style={{ touchAction: 'none' }}
    />
  );
};
