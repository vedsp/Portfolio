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

    // ── Image clip-path reveal (curtain wipe) ──
    if (clip) {
      gsap.to(clip, {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'power4.inOut',
        duration: 1.8,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // ── Progressive Zoom Out (Start at 1.0, Zoom OUT only) ──
    if (img) {
      // Starting at 1.0 ensures we never "zoom in" beyond the image's original size
      // Scaling down to 0.65/0.7 creates the "fully zoom out" feel as you scroll
      const finalScale = item.dataset.project === 'gitsense' ? 0.6 : 0.7;

      gsap.fromTo(img, 
        { scale: 1.0, opacity: 1 },
        {
          scale: finalScale,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom', // Start scaling as soon as it enters
            end: 'bottom top',   // End scaling as it leaves
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
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // ── Project Drift (Subtle) ──
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -50,
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
          gsap.fromTo(line, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 });
        });
      }, 500);
    }
  }

  tick();
}
