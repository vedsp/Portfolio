import gsap from 'gsap';

export const initAbout = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    }
  });

  // Masked Line-by-Line Reveal
  tl.from('.section-title', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from('.about-line-1', {
    y: '100%',
    duration: 1.5,
    ease: 'expo.out'
  }, '-=0.5')
  .from('.about-line-2', {
    y: '100%',
    duration: 1.2,
    ease: 'expo.out'
  }, '-=1.2')
  .from('.supporting-block', {
    x: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=0.8')
  .from('.focus-list li', {
    x: 10,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
  }, '-=0.6');

  // Slow Vertical Drift on Scroll
  gsap.to('.about-left', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    y: -80,
    ease: 'none'
  });

  gsap.to('.about-right', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: -40,
    ease: 'none'
  });

  // Background Shift
  gsap.to('body', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    backgroundColor: '#121212',
    ease: 'none'
  });

  return tl;
};
