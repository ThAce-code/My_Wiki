'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    particlesJS: any;
  }
}

export default function ParticlesInit() {
  useEffect(() => {
    const initParticles = () => {
      if (typeof window !== 'undefined' && window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 50 },
            color: { value: '#b084ff' },
            shape: { type: 'circle' },
            opacity: {
              value: 0.4,
              random: true
            },
            size: {
              value: 3,
              random: true
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none',
              out_mode: 'out'
            },
            line_linked: {
              enable: true,
              distance: 120,
              color: '#b084ff',
              opacity: 0.2,
              width: 1
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
          },
          retina_detect: true
        });
      }
    };

    // 延迟初始化，确保库已加载
    const timer = setTimeout(initParticles, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}