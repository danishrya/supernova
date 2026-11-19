import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { playClick } from '../utils/sound';

const wa = (text) => `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

/* =========================================================================
   SECTION 4 — KUIS SINGKAT (Figma 2001:293), now a real 3-step quiz
   ========================================================================= */
const NEEDS = [
  { id: 'presentasi', label: 'Presentasi', rec: 'Desain presentasi', link: '/layanan/desain-ppt', btn: 'Lihat paketnya' },
  { id: 'website', label: 'Website', rec: 'Pembuatan website', link: '/layanan/website', btn: 'Lihat paketnya' },
  { id: 'template', label: 'Template siap pakai', rec: 'Katalog template digital', link: '/produk-digital', btn: 'Buka katalog' },
  { id: 'belum-tau', label: 'Belum tau', rec: 'Konsultasi gratis & bedah ide', external: true, btn: 'Tanya Min Cham via WA' },
];

const WHEN = [
  { id: 'kilat', label: 'Minggu ini', note: 'Bisa pakai jalur Kilat (+50%), 2–3 hari kerja.' },
  { id: 'cepat', label: '2 minggu lagi', note: 'Aman di jalur Cepat atau Normal.' },
  { id: 'santai', label: 'Santai aja', note: 'Jalur Normal, harga dasar tanpa biaya prioritas.' },
];

const MATERIAL = [
  { id: 'lengkap', label: 'Udah lengkap', note: 'Tinggal dirapihin, prosesnya paling cepat.' },
  { id: 'setengah', label: 'Baru setengah', note: 'Gue bantu lengkapin struktur & alurnya.' },
  { id: 'kosong', label: 'Belum ada sama sekali', note: 'Mulai dari ngobrol, gue bantu susun dari nol.' },
];

const STEPS = [
  { q: 'Lo mau bikin apa?', options: NEEDS, key: 'need' },
  { q: 'Butuh kelarnya kapan?', options: WHEN, key: 'when' },
  { q: 'Bahan atau kontennya udah ada?', options: MATERIAL, key: 'material' },
];

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ need: 'presentasi', when: null, material: null });

  const need = NEEDS.find((n) => n.id === answers.need) || NEEDS[0];
  const when = WHEN.find((w) => w.id === answers.when);
  const material = MATERIAL.find((m) => m.id === answers.material);
  const done = step >= STEPS.length;
  const current = STEPS[Math.min(step, STEPS.length - 1)];

  const choose = (key, id) => {
    playClick();
    setAnswers((a) => ({ ...a, [key]: id }));
    // advance after a short beat so the selection is visible
    window.setTimeout(() => setStep((s) => Math.min(STEPS.length, s + 1)), 260);
  };

  const waText = `Halo Min Cham, gue butuh ${need.label.toLowerCase()}${when ? `, targetnya ${when.label.toLowerCase()}` : ''}${material ? `, bahannya ${material.label.toLowerCase()}` : ''}. Bisa dibantu?`;
  const progress = done ? 100 : (step / STEPS.length) * 100;

  return (
    <section className="figma-quiz-section" id="kuis" data-name="Section 04 - KUIS SINGKAT">
      <div className="figma-quiz-inner-wrapper">
        <div className="figma-quiz-top-status">
          <div className="figma-mono-tag" style={{ marginBottom: 0 }}>
            <span className="figma-tag-dot" style={{ backgroundColor: 'var(--figma-orange-light)' }} />
            <span className="figma-tag-text" style={{ color: 'var(--figma-orange-light)' }}>
              KUIS SINGKAT
            </span>
          </div>
          <span className="hq-step-pill">{done ? 'SELESAI ✓' : `LANGKAH ${step + 1}/${STEPS.length}`}</span>
        </div>

        <h2 className="figma-quiz-h2">Lo butuh yang mana?</h2>
        <p className="figma-quiz-sub">
          Pilih salah satu, biar gue bisa kasih estimasi dan arahan yang pas tanpa muter-muter.
        </p>

        <div className="figma-quiz-card-box hq-card">
          <div className="hq-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          {!done ? (
            <div className="hq-question" key={step}>
              <span className="figma-quiz-step-tag">PERTANYAAN {String(step + 1).padStart(2, '0')}:</span>
              <h3 className="figma-quiz-q-title">{current.q}</h3>
              <div className="figma-quiz-chips-wrap">
                {current.options.map((opt) => {
                  const selected = answers[current.key] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`figma-quiz-chip hq-chip ${selected ? 'is-selected' : ''}`}
                      onClick={() => choose(current.key, opt.id)}
                    >
                      {selected && <span className="figma-quiz-chip-dot" />}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="hq-summary" key="done">
              <span className="figma-quiz-step-tag">RANGKUMAN JAWABAN LO:</span>
              <ul className="hq-answers">
                <li>
                  <b>Kebutuhan</b> {need.label}
                </li>
                <li>
                  <b>Waktu</b> {when ? `${when.label} — ${when.note}` : '—'}
                </li>
                <li>
                  <b>Bahan</b> {material ? `${material.label} — ${material.note}` : '—'}
                </li>
              </ul>
            </div>
          )}

          <div className="figma-quiz-result-row">
            <div className="hq-rec" key={need.id}>
              <span className="figma-quiz-rec-label">REKOMENDASI BUAT LO:</span>
              <h4 className="figma-quiz-rec-title">{need.rec}</h4>
            </div>

            <div className="hq-actions">
              {step > 0 && (
                <button
                  type="button"
                  className="hq-back"
                  onClick={() => {
                    playClick();
                    setStep((s) => Math.max(0, s - 1));
                  }}
                >
                  ← Balik
                </button>
              )}
              {need.external || done ? (
                <a
                  href={wa(waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figma-quiz-action-btn"
                  data-magnetic
                  onClick={() => playClick()}
                >
                  <span>{done ? 'Kirim jawaban ke WA' : need.btn}</span>
                  <img src="/figma-assets/arrow-quiz.svg" alt="" width="14" height="14" />
                </a>
              ) : (
                <Link to={need.link} className="figma-quiz-action-btn" data-magnetic onClick={() => playClick()}>
                  <span>{need.btn}</span>
                  <img src="/figma-assets/arrow-quiz.svg" alt="" width="14" height="14" />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="figma-quiz-handwritten-note">
          <img src="/figma-assets/arrow-handwritten.svg" alt="" width="24" height="24" />
          <span className="figma-quiz-handwritten-text">
            {done ? 'jawaban lo langsung ke-format rapi di chat' : 'bisa langsung lanjut konsultasi gratis'}
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 5 — CARA KERJA (Figma 2001:343): progress follows scroll + hover
   ========================================================================= */
const PROCESS = [
  { t: '01 NGOBROL', d: 'Lo ceritain ide lo, bahan yang udah ada, dan deadline yang lo kejar.' },
  { t: '02 PENAWARAN', d: 'Gue kirim rincian biaya pasti [Rp XXX.000] dan jadwal pengerjaan jelas.' },
  { t: '03 DIKERJAIN', d: 'Gue kerjain dari konsep draft sampai jadi tanpa lo perlu nanya-nanya mulu.' },
  { t: '04 REVISI DAN SELESAI', d: 'Poles bareng sesuai jatah revisi sampai lo puas, serah terima file rapi.' },
];

export function ProcessSection() {
  const ref = useRef(null);
  const [scrollStep, setScrollStep] = useState(0);
  const [hoverStep, setHoverStep] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top enters the lower third, 1 when it reaches the upper third
      const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.55)));
      setScrollStep(Math.min(PROCESS.length - 1, Math.floor(p * PROCESS.length)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = hoverStep ?? scrollStep;
  const pct = (active / (PROCESS.length - 1)) * 100;

  return (
    <section className="figma-process-section" id="proses" data-name="Section 05 - CARA KERJA" ref={ref}>
      <div className="figma-section-header">
        <div className="figma-mono-tag">
          <span className="figma-tag-dot" />
          <span className="figma-tag-text">04 — CARA KERJA</span>
        </div>
        <h2 className="figma-section-h2">Alurnya.</h2>
      </div>

      <div className="figma-process-timeline-wrap" onMouseLeave={() => setHoverStep(null)}>
        <div className="figma-process-track hp-track">
          <div className="figma-process-track-active hp-track-active" style={{ width: `${pct}%` }} />
          {PROCESS.map((s, i) => (
            <button
              key={s.t}
              type="button"
              aria-label={s.t}
              className={`figma-process-dot hp-dot ${i <= active ? 'is-active' : ''} ${i === active ? 'is-current' : ''}`}
              style={{ left: `${(i / (PROCESS.length - 1)) * 100}%` }}
              onMouseEnter={() => setHoverStep(i)}
              onFocus={() => setHoverStep(i)}
              onClick={() => setHoverStep(i)}
            />
          ))}
        </div>

        <div className="figma-process-steps-grid">
          {PROCESS.map((s, i) => (
            <div
              key={s.t}
              className={`figma-step-card hp-step ${i <= active ? 'is-active' : ''} ${i === active ? 'is-current' : ''}`}
              onMouseEnter={() => setHoverStep(i)}
            >
              <span className="figma-step-num-title">{s.t}</span>
              <p className="figma-step-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   SECTION 6 — CLOSING CTA (Figma 2001:383): circle drifts with the pointer
   ========================================================================= */
export function ClosingCta() {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--cx', `${((e.clientX - r.left) / r.width - 0.5) * 60}px`);
    el.style.setProperty('--cy', `${((e.clientY - r.top) / r.height - 0.5) * 60}px`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--cx', '0px');
    el.style.setProperty('--cy', '0px');
  };

  return (
    <section
      className="figma-cta-banner-section hc-banner"
      data-name="Section 06 - MULAI SEKARANG"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div className="figma-cta-giant-dark-circle hc-circle" aria-hidden="true" />

      <div className="figma-cta-content-box hc-content">
        <div className="figma-cta-mono-tag">// MULAI SEKARANG</div>

        <h2 className="figma-cta-h2">
          Punya ide yang masih <span className="hc-scribble">berantakan?</span>
          <br />
          Bawa aja ke sini.
        </h2>

        <div className="figma-cta-actions-row">
          <a
            href={wa('Halo Min Cham, saya punya ide yang mau dibikin tampilannya jadi profesional.')}
            target="_blank"
            rel="noopener noreferrer"
            className="figma-cta-dark-btn"
            data-magnetic
            onClick={() => playClick()}
          >
            <span>Chat lewat WhatsApp</span>
            <img src="/figma-assets/arrow-right.svg" alt="" width="16" height="16" />
          </a>

          <span className="figma-cta-subtag">
            <span className="hc-live" /> RESPON CEPAT // MIN CHAM
          </span>
        </div>
      </div>
    </section>
  );
}
