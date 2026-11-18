import React, { useEffect, useRef } from 'react';

export default function StarfieldCanvas({ meteorTrigger = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const numStars = Math.min(120, Math.floor((width * height) / 10000));
    const stars = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    // Supernova burst particles
    const bursts = [];

    // Meteors
    const meteors = [];

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000, isDown: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    // Trigger mini supernova burst on click
    const handleClick = (e) => {
      const clickX = e.clientX || (e.touches && e.touches[0]?.clientX) || width / 2;
      const clickY = e.clientY || (e.touches && e.touches[0]?.clientY) || height / 2;

      // Spawn burst particles
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        bursts.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1,
          color: i % 3 === 0 ? '#e2b764' : i % 2 === 0 ? '#4ecdc4' : '#ffffff',
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update ambient stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Move star
        s.x += s.speedX;
        s.y += s.speedY;

        // Wrap around screen
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 1 || s.alpha < s.baseAlpha * 0.4) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }

        // Slight repulsion from mouse cursor
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          s.x += (dx / dist) * force * 1.5;
          s.y += (dy / dist) * force * 1.5;
        }

        ctx.fillStyle = `rgba(238, 242, 255, ${Math.max(0.1, Math.min(1, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render & update supernova bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.fillStyle = b.color;
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Render meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(226, 183, 100, ${m.alpha})`;
        ctx.lineWidth = m.width;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 3.5, m.y - m.vy * 3.5);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Meteor shower trigger effect
  useEffect(() => {
    if (meteorTrigger > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.width;

      // Spawn meteors
      const timer = setInterval(() => {
        const x = Math.random() * w * 1.2;
        const speed = Math.random() * 12 + 10;
        const meteor = {
          x,
          y: -20,
          vx: -speed * 0.7,
          vy: speed * 0.8,
          width: Math.random() * 2 + 1,
          alpha: 1,
        };
        // Add to active window event
        window.dispatchEvent(new CustomEvent('spawn-meteor', { detail: meteor }));
      }, 150);

      setTimeout(() => clearInterval(timer), 3500);
      return () => clearInterval(timer);
    }
  }, [meteorTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="space-starfield-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
