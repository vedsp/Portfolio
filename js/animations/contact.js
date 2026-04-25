import gsap from 'gsap';

export const initContact = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  tl.from('.contact-heading', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
  })
  .to('.outlined-text', {
    opacity: 0.3,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .from('.contact-cta', {
    y: 40,
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.8')
  .from('.contact-status', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  // Enhanced Interactive Physics for Contact Button
  const btn = document.querySelector('#contact-btn');
  if (btn) {
    btn.addEventListener('mouseenter', () => {
      gsap.to('.outlined-text', {
        textShadow: '0 0 20px rgba(197, 251, 69, 0.8), 0 0 40px rgba(197, 251, 69, 0.5)',
        letterSpacing: '0.05em',
        duration: 0.6
      });
      gsap.to('.btn-circle', {
        scale: 1.2,
        backgroundColor: '#c5fb45',
        boxShadow: '0 0 30px rgba(197, 251, 69, 0.5)',
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to('.btn-text', {
        x: 15,
        color: '#fff',
        duration: 0.4
      });
      gsap.to('.btn-arrow', {
        rotate: 45,
        scale: 1.2,
        color: '#000',
        duration: 0.4
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to('.outlined-text', {
        textShadow: '0 0 10px rgba(197, 251, 69, 0.5), 0 0 25px rgba(197, 251, 69, 0.3)',
        letterSpacing: 'normal',
        duration: 0.6
      });
      gsap.to('.btn-circle', {
        scale: 1,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to('.btn-text', {
        x: 0,
        duration: 0.4
      });
      gsap.to('.btn-arrow', {
        rotate: 0,
        scale: 1,
        color: '#fff',
        duration: 0.4
      });
    });
  }

  // Vertical drift on scroll
  gsap.to('.contact-wrapper', {
    scrollTrigger: {
      trigger: '.contact',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: -50,
    ease: 'none'
  });

  return tl;
};
