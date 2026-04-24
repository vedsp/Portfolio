import gsap from 'gsap';

export const initHero = () => {
  const tl = gsap.timeline();

  // Cinematic Entrance
  tl.set('.hero-title .word', { y: '110%', rotate: 5 })
    .set('.hero-description', { opacity: 0, y: 30 })
    .to('.hero-title .word', {
      y: 0,
      rotate: 0,
      duration: 1.8,
      stagger: 0.1,
      ease: 'expo.out'
    })
    .to('.hero-description', {
      opacity: 0.6,
      y: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=1.2')
    .from('.parallax-layer', {
      scale: 1.5,
      opacity: 0,
      duration: 2.5,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=1.5');

  // Scroll-linked transforms for Hero
  gsap.to('.hero-title', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 200,
    opacity: 0,
    scale: 0.9,
    ease: 'none'
  });

  // Background drift for hero parallax elements
  gsap.to('.hero-parallax-bg', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    ease: 'none'
  });

  // Mouse tilt physics
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to('.hero-title', {
      rotateX: -y,
      rotateY: x,
      duration: 1.5,
      ease: 'power2.out'
    });
  });

  return tl;
};
