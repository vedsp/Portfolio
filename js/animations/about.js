import gsap from 'gsap';

export const initAbout = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%', // Slightly later reveal
      toggleActions: 'play none none reverse'
    }
  });

  // Masked Line-by-Line Reveal (Standardized)
  tl.from('.section-title', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out'
  })
  .from('.about-line-1', {
    y: '100%',
    duration: 1.4,
    ease: 'expo.out'
  }, '-=0.8')
  .from('.about-line-2', {
    y: '100%',
    duration: 1.2,
    ease: 'expo.out'
  }, '-=1.1')
  .from('.supporting-block', {
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'expo.out'
  }, '-=0.9')
  .from('.focus-list li', {
    x: 10,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: 'power3.out'
  }, '-=0.7');

  // Slow Vertical Drift (Tightened)
  gsap.to('.about-left', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: -60,
    ease: 'none'
  });

  gsap.to('.about-right', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8
    },
    y: -30,
    ease: 'none'
  });

  return tl;
};
