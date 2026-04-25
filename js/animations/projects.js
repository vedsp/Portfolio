import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initProjects = () => {
  const items = document.querySelectorAll('.project-item');
  if (!items.length) return;

  items.forEach((item) => {
    const clip       = item.querySelector('.project-image-clip');
    const img        = item.querySelector('.project-full-img, .terminal-preview');
    const indexLabel = item.querySelector('.project-index-label');
    const heading    = item.querySelector('.project-heading');
    const subheading = item.querySelector('.project-subheading');
    const desc       = item.querySelector('.project-desc');
    const pills      = item.querySelector('.project-pill-row');
    const cta        = item.querySelector('.project-cta');

    // ── Image clip-path reveal (Standardized) ──
    if (clip) {
      gsap.to(clip, {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'expo.inOut',
        duration: 1.8,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // ── Progressive Zoom Out (Enhanced) ──
    if (img) {
      const finalScale = item.dataset.project === 'gitsense' ? 0.65 : 0.75;
      gsap.fromTo(img, 
        { scale: 1.1, opacity: 1 },
        {
          scale: finalScale,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // ── Progressive Text Reveal ──
    const textElements = [indexLabel, heading, subheading, desc, pills, cta].filter(el => el !== null);
    
    gsap.to(textElements, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // ── 3D Tilt Interaction (GSAP) ──
    const inner = item.querySelector('.project-item-inner');
    if (inner) {
      item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Main container tilt
        gsap.to(inner, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.8,
          ease: 'power2.out',
          transformPerspective: 1000
        });

        // Layered Parallax (Fake Depth)
        if (indexLabel) gsap.to(indexLabel, { x: x * 20, y: y * 20, duration: 1, ease: 'power2.out' });
        if (heading) gsap.to(heading, { x: x * 15, y: y * 15, duration: 1, ease: 'power2.out' });
        if (pills) gsap.to(pills, { x: x * 10, y: y * 10, duration: 1, ease: 'power2.out' });
        if (img) gsap.to(img, { x: -x * 30, y: -y * 30, duration: 1.2, ease: 'power2.out' });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to([inner, indexLabel, heading, pills, img], {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    }

    // ── Project Drift (Subtle) ──
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -40,
      ease: 'none'
    });

    // ── GitSense Terminal Typing ──
    if (item.dataset.project === 'gitsense') {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        once: true,
        onEnter: () => typeTerminal(item),
      });
    }
  });
};

function typeTerminal(item) {
  const typingText  = item.querySelector('.typing-text');
  const hiddenLines = item.querySelectorAll('.terminal-hidden');
  if (!typingText || typingText.dataset.typed) return;

  typingText.dataset.typed = 'true';
  typingText.textContent = '';

  const text = 'git-sense analyze .';
  let i = 0;

  function tick() {
    if (i < text.length) {
      typingText.textContent += text[i++];
      setTimeout(tick, 55);
    } else {
      setTimeout(() => {
        hiddenLines.forEach((line) => {
          line.style.display = 'block';
          gsap.fromTo(line, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' });
        });
      }, 500);
    }
  }

  tick();
}
