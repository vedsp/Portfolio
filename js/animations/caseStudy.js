import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Flip, ScrollTrigger);

const projectData = {
  raksham: {
    title: 'RAKSHAM',
    subtitle: 'AI-POWERED PHISHING DETECTION',
    challenge: 'Detecting phishing messages and scam calls in real time across multiple languages requires high-speed AI processing and low-latency audio analysis. The challenge was to create a platform that guards users without intruding on their digital privacy.',
    solution: 'We architected a distributed AI system that uses natural language processing (NLP) to analyze text patterns and voice-biometric analysis for audio. The platform is built on a secure, scalable backend that handles thousands of concurrent detections.',
    impact: 'RAKSHAM successfully reduced fraud attempts for early beta users by 85%. It provides a critical layer of defense for non-technical users who are most vulnerable to digital scams.',
    link: 'https://raksham-omega.vercel.app/'
  },
  gitsense: {
    title: 'GITSENSE',
    subtitle: 'REPOSITORY INTELLIGENCE CLI',
    challenge: 'Developers often struggle to understand complex codebases or track contribution patterns over time. Manual Git audits are slow and often miss deep structural insights or intent-based commit patterns.',
    solution: 'GitSense extracts deep commit metadata and visualizes repository architecture through a high-performance CLI. It uses custom graph algorithms to map dependencies and contributor expertise directly from the Git history.',
    impact: 'GitSense transforms raw Git data into actionable intelligence, helping teams onboard new developers 40% faster and identify critical code hotspots before they become technical debt.',
    link: 'https://github.com/vedsp/GitSense'
  }
};

export const initCaseStudy = (lenis) => {
  const overlay = document.querySelector('#case-study-overlay');
  const scrollContainer = overlay.querySelector('.cs-scroll-container');
  const closeBtn = overlay.querySelector('.cs-close-btn');
  const sharedTarget = overlay.querySelector('.cs-shared-element-target');
  
  const titleEl = overlay.querySelector('.cs-title');
  const subtitleEl = overlay.querySelector('.cs-subtitle');
  const challengeText = overlay.querySelector('[data-label="Challenge"] .cs-text');
  const solutionText = overlay.querySelector('[data-label="Solution"] .cs-text');
  const impactText = overlay.querySelector('[data-label="Impact"] .cs-text');
  const visitBtn = overlay.querySelector('.cs-visit-btn');
  const progressBar = overlay.querySelector('.cs-progress-bar');
  const markersContainer = overlay.querySelector('.cs-section-markers');

  let activeItem = null;
  let activeElement = null; // The whole container for continuity

  const openCaseStudy = (item) => {
    const projectId = item.dataset.project;
    const data = projectData[projectId];
    if (!data) return;

    activeItem = item;
    // Target the image block for continuity (shadow, background, radius)
    activeElement = item.querySelector('.project-image-block');

    // 1. Populate Content
    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    challengeText.textContent = data.challenge;
    solutionText.textContent = data.solution;
    impactText.textContent = data.impact;
    visitBtn.href = data.link;

    // 2. Record State
    const state = Flip.getState(activeElement, { 
      props: 'borderRadius,boxShadow,backgroundColor,opacity',
      simple: true 
    });
    
    // 3. Prepare Overlay
    gsap.set(overlay, { visibility: 'visible', opacity: 1 });
    document.body.classList.add('overflow-hidden');
    
    // Smooth Lenis Stop
    gsap.to(lenis, {
      timeScale: 0,
      duration: 0.8,
      onComplete: () => lenis.stop()
    });

    // 4. Move to target
    sharedTarget.appendChild(activeElement);

    // 5. Flip Animation
    Flip.from(state, {
      duration: 1.4,
      ease: 'expo.inOut',
      onComplete: () => {
        initInternalAnimations();
      }
    });

    // 6. Entrance Animations
    gsap.fromTo('.cs-hero-text', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.6 }
    );

    createMarkers();
  };

  const closeCaseStudy = () => {
    if (!activeItem || !activeElement) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { visibility: 'hidden', opacity: 0 });
        document.body.classList.remove('overflow-hidden');
        
        lenis.start();
        gsap.to(lenis, { timeScale: 1, duration: 0.8 });

        activeItem = null;
        activeElement = null;
        
        // Kill internal triggers
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger && st.trigger.closest && st.trigger.closest('.cs-overlay')) st.kill();
        });
      }
    });

    // 1. Folding back: compress and fade
    tl.to('.cs-content-wrapper', {
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.6,
      ease: 'power2.inOut'
    });

    // 2. Reverse Flip
    const originalContainer = activeItem.querySelector('.project-image-clip');
    const state = Flip.getState(activeElement, { props: 'borderRadius,boxShadow,backgroundColor,opacity' });
    
    originalContainer.appendChild(activeElement);

    Flip.from(state, {
      duration: 1.2,
      ease: 'expo.inOut',
      absolute: true
    });
  };

  const initInternalAnimations = () => {
    // Progress Bar
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.cs-content-wrapper',
        scroller: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    // Progressive Reveals
    const sections = gsap.utils.toArray('.cs-section');
    sections.forEach((section, i) => {
      const header = section.querySelector('.cs-section-header');
      const body = section.querySelector('.cs-section-body');

      gsap.from([header, body], {
        y: 60,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          scroller: scrollContainer,
          start: 'top 85%',
        }
      });
      
      // Marker activation
      ScrollTrigger.create({
        trigger: section,
        scroller: scrollContainer,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => {
          const markers = markersContainer.querySelectorAll('.marker');
          if (self.isActive) markers[i].classList.add('active');
          else markers[i].classList.remove('active');
        }
      });
    });
  };

  const createMarkers = () => {
    markersContainer.innerHTML = '';
    const sections = overlay.querySelectorAll('.cs-section');
    sections.forEach((section, i) => {
      const marker = document.createElement('div');
      marker.className = 'marker';
      marker.innerHTML = `<span class="marker-label">${section.dataset.label}</span>`;
      markersContainer.appendChild(marker);
    });
  };

  // Triggers
  document.querySelectorAll('.project-item').forEach(item => {
    const imgBlock = item.querySelector('.project-image-block');
    if (imgBlock) {
      imgBlock.addEventListener('click', (e) => {
        e.preventDefault();
        openCaseStudy(item);
      });
    }
  });

  closeBtn.addEventListener('click', closeCaseStudy);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === scrollContainer) closeCaseStudy();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.style.visibility === 'visible') closeCaseStudy();
  });
};
