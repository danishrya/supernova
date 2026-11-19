import { useEffect } from 'react';

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

  // Scroll reveal + count-up. A MutationObserver picks up elements React adds
  // later (filtered/sorted grids, accordions, new routes), not just on route change.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const supportsIO = 'IntersectionObserver' in window;
    const watched = new WeakSet();

    const reveal = (el) => {
      const step = parseInt(el.dataset.revealDelay || '0', 10);
      el.style.transitionDelay = `${step * 80}ms`;
      // An attribute, not a class: React rewrites className on re-render and
      // would wipe a class added here, hiding the element again.
      el.setAttribute('data-revealed', '');
      // Drop the stagger delay afterwards so hover transitions stay instant
      window.setTimeout(() => {
        el.style.transitionDelay = '';
      }, step * 80 + 800);
    };

    const io = supportsIO && !reduced
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target;
              if (el.hasAttribute('data-reveal') && !el.hasAttribute('data-revealed')) reveal(el);
              if (el.hasAttribute('data-count') && !el.dataset.counted) {
                el.dataset.counted = '1';
                runCount(el);
              }
              io.unobserve(el);
            });
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
        )
      : null;

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-revealed]), [data-count]:not([data-counted])').forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        if (io) {
          io.observe(el);
          return;
        }
        if (el.hasAttribute('data-reveal')) el.setAttribute('data-revealed', '');
        if (el.hasAttribute('data-count')) {
          el.dataset.counted = '1';
          runCount(el);
        }
      });
    };

    let raf = requestAnimationFrame(scan);
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      if (io) io.disconnect();
    };
  }, []);

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
