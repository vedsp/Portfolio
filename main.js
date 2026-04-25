import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initHero } from './js/animations/hero.js';
import { initHeroThree } from './js/animations/heroThree.js';
import { initAbout } from './js/animations/about.js';
import { initProjects } from './js/animations/projects.js';
import { initCaseStudy } from './js/animations/caseStudy.js';
import { initSkills } from './js/animations/skills.js';
import { initContact } from './js/animations/contact.js';

gsap.registerPlugin(ScrollTrigger);

class App {
  constructor() {
    this.initLenis();
    this.initMagneticEffects();
    this.initAnimations();
    this.initSectionTransitions();
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      lerp: 0.1,
    });

    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  initMagneticEffects() {
    // Magnetic links and buttons
    const magneticElements = document.querySelectorAll('.nav-link, .logo, .social-link, .cta-button');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  initAnimations() {
    // Preloader Animation
    const preloaderTimeline = gsap.timeline();
    const loader = document.querySelector('#loader');
    const loaderText = document.querySelector('.loader-text');
    const loaderProgress = document.querySelector('.loader-progress');

    if (!loader) {
        this.startMasterTimeline();
        return;
    }

    preloaderTimeline
      .to(loaderProgress, {
        width: '100%',
        duration: 1.5,
        ease: 'power4.inOut'
      })
      .to(loaderText, {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut'
      }, '-=0.5')
      .to(loader, {
        y: '-100%',
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          this.startMasterTimeline();
        }
      }, '-=0.3');
  }

  startMasterTimeline() {
    initHero();
    initHeroThree();
    initAbout();
    initProjects();
    initCaseStudy(this.lenis);
    initSkills();
    initContact();
    
    ScrollTrigger.refresh();
  }

  initSectionTransitions() {
    // Global reveal for sections
    const scenes = gsap.utils.toArray('.scene');
    scenes.forEach((scene) => {
      gsap.from(scene, {
        scrollTrigger: {
          trigger: scene,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
        opacity: 0.5,
        ease: "none"
      });
    });
  }
}

window.addEventListener('load', () => {
  new App();
});
