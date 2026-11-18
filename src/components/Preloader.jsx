import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem('supernova_preloader_seen');
    if (hasSeen) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('supernova_preloader_seen', 'true');
          }, 200);
          return 100;
        }
        return prev + 12;
      });
    }, 90);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLoading(false);
        sessionStorage.setItem('supernova_preloader_seen', 'true');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setIsLoading(false);
    sessionStorage.setItem('supernova_preloader_seen', 'true');
  };

  if (!isLoading) return null;

  return (
    <div className="space-preloader-backdrop">
      <div className="preloader-content-box">
        <div className="preloader-star-orbit">
          <span className="orbit-core-star">✦</span>
          <div className="orbit-ring" />
        </div>

        <h2 className="preloader-brand">SUPERNOVA</h2>
        <span className="preloader-sub">Creative Digital Studio &bull; Min Cham</span>

        <div className="preloader-progress-track">
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="preloader-footer-row">
          <span className="progress-number">{progress}%</span>
          <button
            type="button"
            className="preloader-skip-btn"
            onClick={handleSkip}
          >
            Lewati (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
