import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowRight, CheckGlyph, ClockGlyph } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

// Calculator model from Figma frame 2001:2260 (Harga dan Estimasi).
// Website 6 halaman = Rp 1.500.000 in the design → Rp 250.000 per halaman.
const SERVICES = [
  { key: 'presentasi', label: 'Presentasi', unit: 'Slide', perPage: 100000, name: 'Desain Presentasi' },
  { key: 'website', label: 'Website', unit: 'Halaman', perPage: 250000, name: 'Website Kustom' },
  { key: 'produk', label: 'Produk custom', unit: 'Aset', perPage: 180000, name: 'Produk Digital Custom' },
];

const ADDONS = [
  { key: 'extra', label: 'Halaman tambahan', desc: 'Slot buffer untuk konten ekstensi mendadak', price: 150000, per: '/hal' },
  { key: 'anim', label: 'Animasi interaktif', desc: 'Micro-interaction kustom, smooth scroll, reveal transisi', price: 450000 },
  { key: 'copy', label: 'Tulis ulang teks', desc: 'Penyuntingan copy agar tajam, padat, dan persuasif', price: 300000 },
  { key: 'domain', label: 'Domain dan hosting', desc: 'Setup domain .com / .id & server cloud 12 bulan pertama', price: 500000, per: '/thn', summary: 'Domain & Hosting (1 th)' },
  { key: 'seo', label: 'SEO dasar', desc: 'Meta tags, sitemap, indexing Google Search Console', price: 250000 },
];

const SPEEDS = [
  { key: 'normal', label: 'Normal', desc: 'Estimasi standar 7–10 hari kerja', foot: 'Harga Dasar', mult: 0, days: '7-10' },
  { key: 'cepat', label: 'Cepat (+25%)', desc: 'Estimasi 4–5 hari kerja', foot: 'Fast Priority', mult: 0.25, days: '4-5' },
  { key: 'kilat', label: 'Kilat (+50%)', desc: 'Estimasi 2–3 hari kerja', foot: 'Urgent Solo Sprint', mult: 0.5, days: '2-3' },
];

const INCLUDED = [
  ['Revisi minor 2-3x sampai sreg', 'Iterasi santai dan solutif di Figma atau staging link tanpa debat kaku.'],
  ['File master lengkap (Figma / Web / Source)', 'Hak milik 100% jadi punya lo. Komponen tertata, token rapi, dan siap diteruskan.'],
  ['Panduan pengelolaan mandiri via video', 'Screen record santai 5-10 menit nunjukin cara ganti teks, gambar, & update sendiri.'],
  ['Dukungan teknis 14 hari pasca serah terima', 'Ada typo atau tombol geser setelah go-live? Tetap dibantu beresin sampai aman.'],
  ['Koneksi langsung WhatsApp tombol CTA', 'Langsung integrasi link klik-chat WhatsApp dengan template pesan pre-filled siap kirim.'],
  ['Struktur rapi & responsif di semua layar', 'Tampil presisi di smartphone Android/iOS, tablet, sampai monitor ultrawide 4K.'],
];

const rp = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`;
const round100k = (n) => Math.round(n / 100000) * 100000;

/** Smoothly tween a number toward its target whenever it changes. */
function useTween(target, duration = 450) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      fromRef.current = target;
      setValue(target);
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      fromRef.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function PricingPage() {
  const [service, setService] = useState('website');
  const [pages, setPages] = useState(6);
  const [addons, setAddons] = useState({ anim: true, domain: true });
  const [speed, setSpeed] = useState('cepat');
  const [copied, setCopied] = useState(false);

  const svc = SERVICES.find((s) => s.key === service);
  const spd = SPEEDS.find((s) => s.key === speed);

  const calc = useMemo(() => {
    const base = svc.perPage * pages;
    const lines = [{ label: `${svc.name} (${pages} ${svc.unit}):`, value: base }];
    let addTotal = 0;
    ADDONS.forEach((a) => {
      if (!addons[a.key]) return;
      addTotal += a.price;
      lines.push({ label: `• ${a.summary || a.label}:`, value: a.price, sub: true });
    });
    const subtotal = base + addTotal;
    const rush = subtotal * spd.mult;
    if (rush > 0) lines.push({ label: `• Opsi ${spd.label}:`, value: rush });
    const total = subtotal + rush;
    return { lines, total, low: round100k(total * 0.95), high: round100k(total * 1.2) };
  }, [svc, pages, addons, spd]);

  const low = useTween(calc.low);
  const high = useTween(calc.high);

  const summaryText = useMemo(() => {
    const rows = calc.lines.map((l) => `${l.label.replace('• ', '- ')} ${rp(l.value)}`).join('\n');
    return `Halo Min Cham, ini estimasi dari kalkulator Supernova:\n\n${rows}\n\nEstimasi: ${rp(calc.low)} – ${rp(calc.high)}\nWaktu: ± ${spd.days} hari kerja\n\nBisa dibahas lebih lanjut?`;
  }, [calc, spd]);

  const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(summaryText)}`;

  const copySummary = async () => {
    playClick();
    try {
      await navigator.clipboard.writeText(summaryText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = summaryText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const pct = ((pages - 1) / 14) * 100;

  return (
    <div className="sn-page hg-page" data-name="Supernova Studio — Harga dan Estimasi">
      {/* Paper calculator */}
      <section className="hg-paper">
        <div className="sn-container">
          <header className="hg-head">
            <div className="hg-head__copy" data-reveal>
              <span className="hg-kicker">01 // KALKULATOR BIAYA</span>
              <h1 className="sn-display hg-head__title">Hitung estimasi biayanya.</h1>
              <p className="hg-head__lead">
                Pilih kebutuhan lo di bawah. Rincian dan perkiraan waktu pengerjaan bakal langsung kehitung
                otomatis.
              </p>
            </div>
            <div className="hg-head__note" data-reveal="right" data-reveal-delay="2">
              <img src="/figma-assets/arrow-caveat.svg" alt="" aria-hidden="true" />
              <span className="sn-caveat">
                transparan dari awal,
                <br />
                nggak ada biaya kaget
              </span>
            </div>
          </header>

          <div className="hg-grid">
            <div className="hg-steps">
              {/* 01 */}
              <div className="hg-step" data-reveal>
                <div className="hg-step__head">
                  <span>LANGKAH 01 — JENIS LAYANAN</span>
                  <span className="hg-accent">Tunggal</span>
                </div>
                <div className="hg-seg" role="radiogroup" aria-label="Jenis layanan" style={{ '--i': SERVICES.indexOf(svc) }}>
                  <span className="hg-seg__thumb" aria-hidden="true" />
                  {SERVICES.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      role="radio"
                      aria-checked={service === s.key}
                      className={service === s.key ? 'is-active' : ''}
                      onClick={() => {
                        playClick();
                        setService(s.key);
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 02 */}
              <div className="hg-step" data-reveal>
                <div className="hg-step__head">
                  <span>LANGKAH 02 — SKALA PROYEK</span>
                  <span className="hg-mono-muted">1 s/d 15 {svc.unit}</span>
                </div>
                <div className="hg-range" style={{ '--pct': `${pct}%` }}>
                  <span className="hg-range__bubble">
                    {pages} {svc.unit.toLowerCase()}
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    aria-label={`Jumlah ${svc.unit.toLowerCase()}`}
                  />
                  <div className="hg-range__scale">
                    <span>01 Hal (Minimal)</span>
                    <span>08 Hal</span>
                    <span>15 Hal (Kompleks)</span>
                  </div>
                </div>
              </div>

              {/* 03 */}
              <div className="hg-step" data-reveal>
                <div className="hg-step__head">
                  <span>LANGKAH 03 — ADD-ON TAMBAHAN</span>
                  <span className="hg-mono-muted">Opsional Sesuai Scope</span>
                </div>
                <div className="hg-addons">
                  {ADDONS.map((a) => {
                    const on = !!addons[a.key];
                    return (
                      <label key={a.key} className={`hg-addon${on ? ' is-on' : ''}`}>
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => {
                            playClick();
                            setAddons((prev) => ({ ...prev, [a.key]: !prev[a.key] }));
                          }}
                        />
                        <span className="hg-check" aria-hidden="true">
                          <CheckGlyph size={12} />
                        </span>
                        <span className="hg-addon__text">
                          <strong>{a.label}</strong>
                          <small>{a.desc}</small>
                        </span>
                        <span className="hg-addon__price">
                          +{rp(a.price)}
                          {a.per && <small>{a.per}</small>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 04 */}
              <div className="hg-step" data-reveal>
                <div className="hg-step__head">
                  <span>LANGKAH 04 — KECEPATAN PENGERJAAN</span>
                  <span className="hg-mono-muted">Pilih Prioritas Timeline</span>
                </div>
                <div className="hg-speeds" role="radiogroup" aria-label="Kecepatan pengerjaan">
                  {SPEEDS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      role="radio"
                      aria-checked={speed === s.key}
                      className={`hg-speed${speed === s.key ? ' is-active' : ''}`}
                      onClick={() => {
                        playClick();
                        setSpeed(s.key);
                      }}
                    >
                      <span className="hg-speed__top">
                        <strong>{s.label}</strong>
                        <span className="hg-radio" aria-hidden="true" />
                      </span>
                      <span className="hg-speed__desc">{s.desc}</span>
                      <span className="hg-speed__foot">{s.foot}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky summary */}
            <aside className="hg-summary-wrap">
              <div className="hg-summary" data-reveal="right">
                <div className="hg-summary__head">
                  <span className="hg-summary__label">
                    <span className="sn-dot" /> RINGKASAN BIAYA PROYEK
                  </span>
                  <span>REV 2026.04</span>
                </div>
                <h3 className="sn-display hg-summary__title">Estimasi lo</h3>
                <div className="hg-summary__price">
                  <span className="hg-summary__range" aria-live="polite">
                    {rp(low)} – {rp(high)}
                  </span>
                  <small>Subtotal fleksibel berbasis kompleksitas layout &amp; aset visual</small>
                </div>
                <hr />
                <ul className="hg-summary__lines">
                  {calc.lines.map((l) => (
                    <li key={l.label} className={l.sub ? 'is-sub' : ''}>
                      <span>{l.label}</span>
                      <strong>{rp(l.value)}</strong>
                    </li>
                  ))}
                </ul>
                <hr />
                <div className="hg-summary__time">
                  <ClockGlyph size={14} />
                  <span key={spd.days}>Estimasi ± {spd.days} hari kerja</span>
                </div>
                <p className="hg-summary__disclaimer">
                  Ini perkiraan, harga final setelah ngobrol dan cek brief asli lo.
                </p>
                <div className="hg-summary__actions">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sn-btn sn-btn--primary sn-btn--lg"
                    data-magnetic
                    onClick={playClick}
                  >
                    Kirim estimasi ke WhatsApp <ArrowRight size={13} />
                  </a>
                  <button type="button" className={`hg-copy${copied ? ' is-copied' : ''}`} onClick={copySummary}>
                    {copied ? <CheckGlyph size={14} /> : <span aria-hidden="true">⧉</span>}
                    {copied ? 'Ringkasan tersalin!' : 'Salin ringkasan'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Included in all packages */}
      <section className="hg-included">
        <div className="sn-container">
          <div className="hg-included__head" data-reveal>
            <span className="hg-kicker">STANDAR PRODUKSI SUPERNOVA</span>
            <h2 className="sn-display hg-included__title">Yang termasuk di semua paket</h2>
            <p>
              Nggak ada istilah beli kucing dalam karung. Setiap proyek dikerjakan dengan standar siap rilis
              langsung ke publik.
            </p>
          </div>
          <div className="hg-included__grid">
            {INCLUDED.map(([title, desc], i) => (
              <div key={title} className="hg-inc" data-reveal data-reveal-delay={i % 3} data-tilt="4">
                <span className="hg-inc__dot" aria-hidden="true" />
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation banner */}
      <section className="hg-consult">
        <div className="sn-container">
          <div className="sn-card hg-consult__box" data-reveal="scale" data-spotlight>
            <div className="hg-consult__copy">
              <span className="sn-mono">
                <span className="sn-dot sn-dot--green sn-dot--pulse" style={{ width: 10, height: 10 }} /> SLOT
                TERBUKA BULAN INI — SOLO PRACTICE
              </span>
              <h3 className="sn-display hg-consult__title">Punya skala atau kebutuhan di luar opsi di atas?</h3>
              <p className="sn-body">
                Tinggal colek di WhatsApp atau DM Instagram. Ceritain apa yang mau dibikin, nanti gue buatkan
                proposal ringkas plus timeline realistis dalam 1x24 jam.
              </p>
            </div>
            <div className="hg-consult__actions">
              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent('Halo Min Cham, mau ngobrol santai soal proyek di luar opsi kalkulator.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sn-btn sn-btn--primary sn-btn--md"
                data-magnetic
                onClick={playClick}
              >
                Ngobrol Santai Dulu <ArrowRight size={12} />
              </a>
              <Link to="/kontak" className="sn-btn sn-btn--ghost sn-btn--md" onClick={playClick}>
                Form Kontak
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
