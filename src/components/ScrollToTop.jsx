import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Disable smooth scroll temporarily so route navigation snaps instantly to top without jitter/glitch
    const html = document.documentElement;
    const body = document.body;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    html.scrollTop = 0;
    body.scrollTop = 0;
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      html.style.scrollBehavior = prevBehavior;
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
