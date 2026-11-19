import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global interaction layer.
 * Pages opt in with data attributes instead of wiring hooks per component:
 *   data-reveal            → fade/slide in when scrolled into view
 *   data-reveal-delay="2"  → stagger step (x 80ms)
 *   data-tilt              → subtle 3D tilt following the pointer
 *   data-magnetic          → element drifts toward the pointer
 *   data-spotlight         → radial glow follows the pointer (uses --mx/--my)
 *   data-count="1234"      → number counts up once visible (data-count-prefix / -suffix / -decimals)
 */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function formatCount(value, decimals) {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function runCount(el) {
  const target = parseFloat(el.dataset.count);
  if (Number.isNaN(target)) return;
  const decimals = parseInt(el.dataset.countDecimals || '0', 10);
  const prefix = el.dataset.countPrefix || '';
  const suffix = el.dataset.countSuffix || '';
  const render = (v) => {
    el.textContent = `${prefix}${formatCount(v, decimals)}${suffix}`;
  };
  if (prefersReducedMotion()) {
    render(target);
    return;
  }
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    render(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function InteractionLayer() {
  const location = useLocation();

  // Scroll reveal + count-up, re-scanned on every route change
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let observer;
    const scan = () => {
      const revealEls = document.querySelectorAll('[data-reveal]:not(.is-revealed)');
      const countEls = document.querySelectorAll('[data-count]:not([data-counted])');
      if (reduced || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('is-revealed'));
        countEls.forEach((el) => {
          el.dataset.counted = '1';
          runCount(el);
        });
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.hasAttribute('data-reveal')) {
              const step = parseInt(el.dataset.revealDelay || '0', 10);
              el.style.transitionDelay = `${step * 80}ms`;
              el.classList.add('is-revealed');
            }
            if (el.hasAttribute('data-count') && !el.dataset.counted) {
              el.dataset.counted = '1';
              runCount(el);
            }
            observer.unobserve(el);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
      );
      revealEls.forEach((el) => observer.observe(el));
      countEls.forEach((el) => observer.observe(el));
    };
    // Wait one frame so the new route has rendered
    const raf = requestAnimationFrame(scan);
    return () => {
      cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, [location.pathname]);

  // Pointer-driven effects via event delegation (one listener for the whole app)
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return undefined;

    let activeTilt = null;
    let activeMagnet = null;

    const resetTilt = (el) => {
      el.style.transform = '';
    };
    const resetMagnet = (el) => {
      el.style.transform = '';
    };

    const onMove = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      const spot = target.closest('[data-spotlight]');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
        spot.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const tilt = target.closest('[data-tilt]');
      if (activeTilt && activeTilt !== tilt) resetTilt(activeTilt);
      activeTilt = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const max = parseFloat(tilt.dataset.tilt || '6') || 6;
        tilt.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
      }

      const magnet = target.closest('[data-magnetic]');
      if (activeMagnet && activeMagnet !== magnet) resetMagnet(activeMagnet);
      activeMagnet = magnet;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.28).toFixed(1)}px)`;
      }
    };

    const onLeaveWindow = () => {
      if (activeTilt) resetTilt(activeTilt);
      if (activeMagnet) resetMagnet(activeMagnet);
      activeTilt = null;
      activeMagnet = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeaveWindow);
    window.addEventListener('blur', onLeaveWindow);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeaveWindow);
      window.removeEventListener('blur', onLeaveWindow);
    };
  }, []);

  return null;
}
