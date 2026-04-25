import gsap from 'gsap';

export const initHero = () => {
  const tl = gsap.timeline();

  // Cinematic Entrance
  tl.set('.hero-title .word', { y: '120%', rotate: 2 })
    .set('.hero-description', { opacity: 0, y: 20 })
    .to('.hero-title .word', {
      y: 0,
      rotate: 0,
      duration: 1.6,
      stagger: 0.08,
      ease: 'expo.out'
    })
    .to('.hero-description', {
      opacity: 0.5, // Subtle, as requested
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1')
    .from('.parallax-layer', {
      scale: 1.2,
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      ease: 'expo.out'
    }, '-=1.2')
    .to('.hero-social-link', {
      opacity: 0.4,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out'
    }, '-=1');

  // Scroll-linked transforms for Hero
  gsap.to('.hero-title-wrapper', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 150,
    opacity: 0,
    scale: 0.95,
    ease: 'none'
  });

  // Background drift
  gsap.to('.hero-parallax-bg', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 80,
    ease: 'none'
  });

  // Mouse tilt physics (Standardized)
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    
    gsap.to('.hero-title', {
      rotateX: -y,
      rotateY: x,
      duration: 1.2,
      ease: 'power2.out'
    });
  });

  return tl;
};
