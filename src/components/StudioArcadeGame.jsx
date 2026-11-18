import React, { useState, useEffect, useRef } from 'react';
import { playJump, playScore, playHit, playClick } from '../utils/sound';
import { IconArrowRight, IconWhatsApp } from './Icons';
import { useSiteContent } from '../context/ContentContext';

export default function StudioArcadeGame() {
  const { contactInfo } = useSiteContent();
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('supernova_arcade_best') || '0', 10);
    } catch (e) {
      return 0;
    }
  });

  const stateRef = useRef({
    gameState: 'idle',
    score: 0,
    speed: 5.5,
    player: { x: 50, y: 140, w: 32, h: 32, vy: 0, isGrounded: true, frame: 0 },
    obstacles: [],
    items: [],
    particles: [],
    spawnTimer: 0,
    itemTimer: 0,
    gravity: 0.72,
    jumpForce: -13.5,
    groundY: 150,
  });

  const animFrameRef = useRef(null);

  // Sync ref with React state for event handlers
  useEffect(() => {
    stateRef.current.gameState = gameState;
  }, [gameState]);

  const jump = () => {
    const s = stateRef.current;
    if (s.gameState === 'idle') {
      startGame();
      return;
    }
    if (s.gameState === 'gameover') {
      startGame();
      return;
    }
    if (s.player.isGrounded) {
      s.player.vy = s.jumpForce;
      s.player.isGrounded = false;
      playJump();
    }
  };

  const startGame = () => {
    playClick();
    const s = stateRef.current;
    s.gameState = 'playing';
    s.score = 0;
    s.speed = 5.5;
    s.player = { x: 50, y: 140, w: 32, h: 32, vy: 0, isGrounded: true, frame: 0 };
    s.obstacles = [];
    s.items = [];
    s.particles = [];
    s.spawnTimer = 40;
    s.itemTimer = 90;
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        // Prevent scroll when game is active or focused
        if (document.activeElement && document.activeElement.closest('.arcade-game-container')) {
          e.preventDefault();
        }
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 800);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
      stateRef.current.groundY = height - 50;
    };
    window.addEventListener('resize', handleResize);
    stateRef.current.groundY = height - 50;

    const OBSTACLE_LABELS = [
      'Revisi #99',
      'Deadline H-1',
      'Format Pecah',
      'Font Hilang',
      'Brief Ganti',
    ];

    const ITEM_LABELS = ['Master .PPTX', 'Vector .AI', 'Client Deal ✓', 'Kopi ☕'];

    const loop = () => {
      const s = stateRef.current;
      const groundY = s.groundY;

      // Clear Canvas
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(0, 0, width, height);

      // Grid background effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Ground
      ctx.strokeStyle = '#dfbe76';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 32);
      ctx.lineTo(width, groundY + 32);
      ctx.stroke();

      // Ground pattern
      ctx.fillStyle = 'rgba(223, 190, 118, 0.12)';
      ctx.fillRect(0, groundY + 33, width, height - (groundY + 33));

      if (s.gameState === 'playing') {
        s.score += 1;
        if (s.score % 5 === 0) {
          setScore(s.score);
        }
        if (s.score > highScore) {
          setHighScore(s.score);
          try {
            localStorage.setItem('supernova_arcade_best', s.score.toString());
          } catch (e) {}
        }

        // Slowly increase difficulty speed
        s.speed = Math.min(11, 5.5 + s.score * 0.004);

        // Update Player Physics
        s.player.vy += s.gravity;
        s.player.y += s.player.vy;
        if (s.player.y >= groundY) {
          s.player.y = groundY;
          s.player.vy = 0;
          s.player.isGrounded = true;
        }

        // Spawn Obstacles
        s.spawnTimer -= 1;
        if (s.spawnTimer <= 0) {
          const label = OBSTACLE_LABELS[Math.floor(Math.random() * OBSTACLE_LABELS.length)];
          const obsW = 68;
          const obsH = 28;
          s.obstacles.push({
            x: width + 20,
            y: groundY + (32 - obsH),
            w: obsW,
            h: obsH,
            label,
          });
          s.spawnTimer = Math.max(45, Math.floor(80 - s.speed * 3) + Math.floor(Math.random() * 30));
        }

        // Spawn Collectible Items
        s.itemTimer -= 1;
        if (s.itemTimer <= 0) {
          const itemText = ITEM_LABELS[Math.floor(Math.random() * ITEM_LABELS.length)];
          s.items.push({
            x: width + 20,
            y: groundY - 35 - Math.random() * 25,
            w: 24,
            h: 24,
            text: itemText,
          });
          s.itemTimer = 140 + Math.floor(Math.random() * 80);
        }

        // Update & check Obstacles
        for (let i = s.obstacles.length - 1; i >= 0; i--) {
          const obs = s.obstacles[i];
          obs.x -= s.speed;

          // Collision Check
          const p = s.player;
          if (
            p.x + p.w - 6 > obs.x &&
            p.x + 6 < obs.x + obs.w &&
            p.y + p.h > obs.y + 4
          ) {
            // CRASH / GAME OVER
            playHit();
            s.gameState = 'gameover';
            setGameState('gameover');
            // spawn crash particles
            for (let k = 0; k < 18; k++) {
              s.particles.push({
                x: p.x + 16,
                y: p.y + 16,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                color: '#ef4444',
                life: 30,
              });
            }
            break;
          }

          if (obs.x + obs.w < -50) {
            s.obstacles.splice(i, 1);
          }
        }

        // Update & check Items
        for (let i = s.items.length - 1; i >= 0; i--) {
          const itm = s.items[i];
          itm.x -= s.speed;

          // Pickup check
          const p = s.player;
          if (
            p.x + p.w > itm.x &&
            p.x < itm.x + 40 &&
            Math.abs(p.y - itm.y) < 36
          ) {
            playScore();
            s.score += 75; // bonus points!
            setScore(s.score);
            // Spawn gold sparkles
            for (let k = 0; k < 12; k++) {
              s.particles.push({
                x: itm.x,
                y: itm.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: '#dfbe76',
                life: 25,
              });
            }
            s.items.splice(i, 1);
            continue;
          }

          if (itm.x < -60) {
            s.items.splice(i, 1);
          }
        }
      }

      // Draw Collectibles
      s.items.forEach((itm) => {
        ctx.fillStyle = 'rgba(223, 190, 118, 0.2)';
        ctx.strokeStyle = '#dfbe76';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(itm.x, itm.y, 82, 22, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(itm.text, itm.x + 41, itm.y + 14);
      });

      // Draw Obstacles (Bug / Revision obstacles)
      s.obstacles.forEach((obs) => {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fca5a5';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(obs.label, obs.x + obs.w / 2, obs.y + 17);
      });

      // Update & Draw Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const pt = s.particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 1;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        if (pt.life <= 0) s.particles.splice(i, 1);
      }

      // Draw Player (Supernova Creative Rocket / Cursor)
      const p = s.player;
      ctx.save();
      ctx.translate(p.x + 16, p.y + 16);
      if (!p.isGrounded) {
        ctx.rotate(-0.2); // upward tilt
      }
      // Rocket / Star body
      ctx.fillStyle = '#dfbe76';
      ctx.beginPath();
      ctx.roundRect(-14, -14, 28, 28, 8);
      ctx.fill();

      // Inner Star Icon
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', 0, 1);

      // Rocket flame if in air
      if (!p.isGrounded) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(-10, 14);
        ctx.lineTo(-4, 24);
        ctx.lineTo(2, 14);
        ctx.fill();
      }
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [highScore]);

  const waUrl = `https://wa.me/${contactInfo?.whatsappClean || '6285714521584'}?text=${encodeURIComponent(
    `Halo Supernova Studio! Saya baru saja mencoba mini-game di website Anda (Skor saya: ${score}). Mau tanya-tanya untuk konsultasi proyek desain & digital kami.`
  )}`;

  return (
    <section className="section arcade-section" id="arcade">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: 28 }}>
          <div className="arcade-header-tag">
            <span className="arcade-sticker-pill">INTERACTIVE BREAK</span>
            <span className="live-status-dot" />
          </div>
          <h2 className="section-title">
            Istirahat Sejenak: <span className="highlight-text">Ship It Past The Bugs!</span>
          </h2>
          <p className="section-subtitle">
            Lompat melewati revisi dadakan &amp; deadline mepet. Kumpulkan master file dan bawa proyek ke garis finish!
          </p>
        </div>

        {/* Arcade Console Frame */}
        <div
          className="arcade-game-container"
          tabIndex={0}
          role="application"
          aria-label="Supernova Ship It Game. Tekan Spasi atau Tap layar untuk melompat."
          onClick={jump}
        >
          {/* Top Scorebar */}
          <div className="arcade-scorebar">
            <div className="arcade-controls-tip">
              <span className="kbd-pill">SPACE</span>
              <span className="kbd-pill">TAP</span>
              <span>untuk Lompat</span>
            </div>
            <div className="arcade-scores">
              <span className="score-label">
                BEST: <strong className="score-val">{String(highScore).padStart(5, '0')}</strong>
              </span>
              <span className="score-label">
                SCORE: <strong className="score-val current">{String(score).padStart(5, '0')}</strong>
              </span>
            </div>
          </div>

          {/* Canvas Viewport */}
          <canvas ref={canvasRef} className="arcade-canvas" />

          {/* Overlay: Idle State */}
          {gameState === 'idle' && (
            <div className="arcade-overlay">
              <div className="arcade-modal-card">
                <span className="arcade-badge">✦ MINI-GAME STUDIO</span>
                <h3 className="arcade-modal-title">Supernova: Ready to Ship?</h3>
                <p className="arcade-modal-desc">
                  Hindari rintangan revisi dan deadline mepet. Tekan tombol di bawah atau spasi untuk mulai!
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg arcade-start-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    startGame();
                  }}
                >
                  <span>Mulai Main (Start)</span>
                  <IconArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Overlay: Game Over State */}
          {gameState === 'gameover' && (
            <div className="arcade-overlay">
              <div className="arcade-modal-card gameover-card">
                <span className="arcade-badge error-badge">GAME OVER</span>
                <h3 className="arcade-modal-title">Kena Revisi Dadakan! 😅</h3>
                <p className="arcade-modal-score">
                  Skor Anda: <strong>{score}</strong> • Rekor Terbaik: <strong>{highScore}</strong>
                </p>
                <p className="arcade-modal-subtext">
                  Di dunia nyata, Anda tidak perlu pusing mikirin revisi &amp; deadline mepet. Serahkan seluruh urusan Slide PPT, Branding, dan Website ke Supernova Studio!
                </p>
                <div className="arcade-cta-row">
                  <button
                    type="button"
                    className="btn btn-secondary arcade-retry-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                  >
                    <span>Coba Lagi ↺</span>
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconWhatsApp size={16} />
                    <span>Konsultasi Proyek Asli</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
