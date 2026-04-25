import gsap from 'gsap';

export const initSkills = () => {
  const container = document.querySelector('.skills-interactive-orbit');
  const orbitItems = document.querySelectorAll('.orbit-item');
  const centerName = document.querySelector('.active-skill-name');
  const centerDesc = document.querySelector('.active-skill-description');
  const centerGlow = document.querySelector('.center-glow-effect');

  if (!container || orbitItems.length === 0) return;

  const totalItems = orbitItems.length;
  const calculateRadius = () => {
    if (window.innerWidth > 1024) return 380;
    if (window.innerWidth > 768) return 280;
    if (window.innerWidth > 480) return 180;
    return 140; // Small phones
  };
  let radius = calculateRadius();
  let activeIndex = -1; // Start with -1 to trigger initial set
  
  // Interaction State
  const state = {
    rotation: 0,
    isHovering: false,
  };

  // Initial setup
  orbitItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      state.isHovering = true;
      const baseAngle = (index / totalItems) * Math.PI * 2;
      const target = Math.PI / 2 - baseAngle;
      
      let diff = (target - state.rotation) % (Math.PI * 2);
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;
      
      gsap.to(state, {
        rotation: state.rotation + diff,
        duration: 1.2,
        ease: 'power3.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      state.isHovering = false;
    });
  });

  function updateItem(item, index, rotation) {
    const baseAngle = (index / totalItems) * Math.PI * 2;
    const currentAngle = baseAngle + rotation;

    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = Math.sin(currentAngle) * radius * 0.1;

    const time = Date.now() * 0.002;
    const floatX = Math.sin(time + index) * 8;
    const floatY = Math.cos(time * 0.8 + index) * 8;

    const normalizedZ = (z + radius) / (2 * radius);
    const scale = 0.4 + (normalizedZ * 0.7);
    const opacity = 0.2 + (normalizedZ * 0.8);
    const blur = (1 - normalizedZ) * 8;

    gsap.set(item, {
      x: x + floatX,
      y: y + floatY,
      z: z,
      scale,
      opacity,
      filter: `blur(${blur}px)`,
      zIndex: Math.round(normalizedZ * 100),
      pointerEvents: normalizedZ > 0.3 ? 'auto' : 'none'
    });

    return normalizedZ;
  }

  function updateOrbit() {
    let maxZ = -1;
    let closestIndex = activeIndex;

    orbitItems.forEach((item, index) => {
      const z = updateItem(item, index, state.rotation);
      if (z > maxZ) {
        maxZ = z;
        closestIndex = index;
      }
    });

    // Automatically update text if the item in front changes
    if (closestIndex !== activeIndex) {
      setActiveSkill(closestIndex);
    }
  }

  const setActiveSkill = (index) => {
    activeIndex = index;
    const item = orbitItems[index];
    const name = item.getAttribute('data-skill');
    const desc = item.getAttribute('data-desc');

    orbitItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Text Transition with overwrite to prevent flickering
    gsap.killTweensOf([centerName, centerDesc]);
    
    const tl = gsap.timeline();
    tl.to([centerName, centerDesc], {
      y: 15,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        centerName.textContent = name;
        centerDesc.textContent = desc;
        gsap.set([centerName, centerDesc], { y: -15 });
      }
    })
    .to([centerName, centerDesc], {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'expo.out'
    });

    gsap.fromTo(centerGlow, 
      { opacity: 0, scale: 0.8 },
      { opacity: 0.8, scale: 1.2, duration: 0.6, ease: 'expo.out', overwrite: true }
    );
  };

  // Animation Loop
  const loop = () => {
    if (!state.isHovering) {
      state.rotation += 0.003;
    }
    updateOrbit();
    requestAnimationFrame(loop);
  };

  loop();

  window.addEventListener('resize', () => {
    radius = calculateRadius();
  });
};
