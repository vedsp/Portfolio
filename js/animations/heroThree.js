import * as THREE from 'three';
import gsap from 'gsap';

export const initHeroThree = () => {
  const canvas = document.querySelector('#hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Optimized Geometry: Subtle Wireframe Core
  const geometry = new THREE.IcosahedronGeometry(2, 1); // Low poly
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.05, // Very low ambient presence
    blending: THREE.AdditiveBlending
  });

  const core = new THREE.Mesh(geometry, material);
  scene.add(core);

  // Add subtle points for depth
  const pointsGeometry = new THREE.IcosahedronGeometry(2.1, 2);
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.015,
    transparent: true,
    opacity: 0.1,
    sizeAttenuation: true
  });

  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(points);

  // Interaction State
  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll Connection
  gsap.to(core.scale, {
    x: 1.5,
    y: 1.5,
    z: 1.5,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to(camera.position, {
    z: 3,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Animation Loop
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse lerping
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Autonomous Rotation + Mouse Reactivity
    core.rotation.y = elapsedTime * 0.1 + mouse.x * 0.2;
    core.rotation.x = elapsedTime * 0.05 + mouse.y * 0.2;

    points.rotation.y = -elapsedTime * 0.05 - mouse.x * 0.1;
    points.rotation.x = -elapsedTime * 0.02 - mouse.y * 0.1;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  tick();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};
