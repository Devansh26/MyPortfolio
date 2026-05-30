/**
 * Particles.js Configuration – AI Neural Theme
 * Cyan neural network dots on dark background
 */

'use strict';

const particlesConfig = {
  particles: {
    number: {
      value: 60,
      density: { enable: true, value_area: 900 }
    },
    color: { value: ['#00d4ff', '#7c3aed', '#ec4899'] },
    shape: {
      type: 'circle',
      stroke: { width: 0, color: '#000000' }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2.5,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 160,
      color: '#00d4ff',
      opacity: 0.12,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      grab: { distance: 180, line_linked: { opacity: 0.6 } },
      bubble: { distance: 400, size: 4, duration: 2, opacity: 0.8, speed: 3 },
      repulse: { distance: 150, duration: 0.4 },
      push: { particles_nb: 3 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
};

function initParticles() {
  const container = document.getElementById('particles-js');
  if (container && typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', particlesConfig);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticles);
} else {
  initParticles();
}