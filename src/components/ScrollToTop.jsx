import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;

    // Links like "/#portofolio": scroll to that section once it has rendered
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      let timer;
      const seek = () => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 88;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else if (tries++ < 20) {
          timer = setTimeout(seek, 50);
        }
      };
      timer = setTimeout(seek, 30);
      return () => clearTimeout(timer);
    }

    // Disable smooth scroll temporarily so route navigation snaps instantly to top without jitter/glitch
    html.style.scrollBehavior = 'auto';
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      html.style.scrollBehavior = prevBehavior;
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
