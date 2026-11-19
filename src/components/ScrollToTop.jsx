import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable smooth scroll temporarily so route navigation snaps instantly to top without jitter/glitch
    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    const timer = setTimeout(() => {
      html.style.scrollBehavior = prevBehavior;
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
