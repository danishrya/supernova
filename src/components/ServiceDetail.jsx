import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowRight, CheckGlyph, PlusGlyph } from './sn/Glyphs';
import { playClick } from '../utils/sound';

export const waLink = (text) => `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;

/* ---------- Hero visuals ---------- */

const DECK = [
  { tag: '01 / COVER', title: 'Agrotech: Modernizing Rural Harvest Logistics', kind: 'cover' },
  { tag: '04 / MASALAH', title: '42% nilai panen tergerus pengepul', kind: 'big' },
  { tag: '09 / TRAKSI', title: '18.400 ton gabah terkirim', kind: 'chart' },
  { tag: '12 / ASK', title: 'Seed round Rp 4,2 M', kind: 'ask' },
];

/** Fan of slides — click (or press the button) to deal the next slide to the front. */
export function DeckFan() {
  const [top, setTop] = useState(0);
  const order = DECK.map((_, i) => (top + i) % DECK.length);
  return (
    <div className="sd-fan" onClick={() => { playClick(); setTop((t) => (t + 1) % DECK.length); }} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setTop((t) => (t + 1) % DECK.length); } }}
      aria-label="Ganti slide berikutnya">
      {order.map((idx, pos) => {
        const s = DECK[idx];
        return (
          <div key={s.tag} className={`sd-fan__slide sd-fan__slide--${s.kind}`} style={{ '--pos': pos, zIndex: DECK.length - pos }}>
            <span className="sd-fan__tag">{s.tag}</span>
            {s.kind === 'chart' && (
              <span className="sd-fan__chart" aria-hidden="true">
                {[30, 42, 55, 68, 86].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
              </span>
            )}
            {s.kind === 'big' && <span className="sd-fan__big">42%</span>}
            {s.kind === 'cover' && <span className="sd-fan__orb" aria-hidden="true" />}
            <span className="sd-fan__title">{s.title}</span>
          </div>
        );
      })}
      <span className="sd-fan__hint">klik buat ganti slide</span>
    </div>
  );
}

/** Device mockup with Desktop / HP toggle and a load-in shimmer. */
export function DevicePreview() {
  const [device, setDevice] = useState('desktop');
  return (
    <div className="sd-device-wrap">
      <div className="sd-device-toggle" role="tablist" aria-label="Pratinjau perangkat">
        {['desktop', 'hp'].map((d) => (
          <button key={d} type="button" role="tab" aria-selected={device === d} className={device === d ? 'is-active' : ''}
            onClick={() => { playClick(); setDevice(d); }}>
            {d === 'desktop' ? 'Desktop' : 'HP'}
          </button>
        ))}
      </div>
      <div className={`sd-device sd-device--${device}`}>
        <div className="sd-device__bar">
          <span className="sd-device__lights"><i /><i /><i /></span>
          <span className="sd-device__url">kopisusutetangga.id</span>
        </div>
        <div className="sd-device__page" key={device}>
          <div className="sd-device__hero">
            <span className="sd-device__kicker">KOPI LOKAL · SEJAK 2019</span>
            <span className="sd-device__title">Kopi susu yang bikin balik lagi.</span>
            <span className="sd-device__btn">Pesan via WhatsApp →</span>
          </div>
          <div className="sd-device__grid">
            {['Kopi Susu', 'Aren Latte', 'Es Coklat'].map((n, i) => (
              <span key={n} style={{ '--i': i }}><i />{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Interactive sections ---------- */

/** Big before/after comparison with a draggable handle. */
export function CompareSlider({ before, after }) {
  const [pos, setPos] = useState(50);
  const Side = ({ data, cls }) => (
    <div className={`sd-compare__side ${cls}`}>
      <span className="sd-compare__label">{data.label}</span>
      <h3 className="sd-compare__headline">{data.headline}</h3>
      <ul>{data.points.map((p) => <li key={p}>{p}</li>)}</ul>
      <span className="sd-compare__badge">{data.badge}</span>
    </div>
  );
  return (
    <div className="sd-compare" style={{ '--pos': `${pos}%` }}>
      <Side data={before} cls="sd-compare__before" />
      <Side data={after} cls="sd-compare__after" />
      <div className="sd-compare__handle" aria-hidden="true"><span>◀ ▶</span></div>
      <input type="range" min="4" max="96" value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Geser untuk membandingkan sebelum dan sesudah" />
    </div>
  );
}

/** Loading race that runs once when scrolled into view. */
export function SpeedRace() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setRun(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`sd-race${run ? ' is-running' : ''}`} ref={ref}>
      <div className="sd-race__row">
        <span className="sd-race__name">Website template berat</span>
        <span className="sd-race__track"><i className="sd-race__bar sd-race__bar--slow" /></span>
        <span className="sd-race__time">± 4,8 dtk</span>
      </div>
      <div className="sd-race__row sd-race__row--fast">
        <span className="sd-race__name">Website Supernova</span>
        <span className="sd-race__track"><i className="sd-race__bar sd-race__bar--fast" /></span>
        <span className="sd-race__time">&lt; 0,4 dtk</span>
      </div>
      <button type="button" className="sd-race__replay" onClick={() => { playClick(); setRun(false); requestAnimationFrame(() => requestAnimationFrame(() => setRun(true))); }}>
        ↻ Ulangi balapan
      </button>
    </div>
  );
}

/* ---------- Page shell ---------- */

export default function ServiceDetail({ data }) {
  const [openDeliv, setOpenDeliv] = useState(0);
  const [pickedPkg, setPickedPkg] = useState(data.featuredPackage ?? 0);

  return (
    <div className="sn-page sd-page" data-name={`Supernova Studio — ${data.crumb}`}>
      {/* Hero */}
      <section className="sn-container sd-hero">
        <div className="sd-hero__copy">
          <nav className="cs-crumb" aria-label="Breadcrumb" data-reveal>
            <Link to="/layanan">LAYANAN</Link>
            <span aria-hidden="true">/</span>
            <span className="cs-crumb__current">{data.crumb.toUpperCase()}</span>
          </nav>
          <span className="sn-overline" data-reveal><span className="sn-dot" /> {data.overline}</span>
          <h1 className="sn-display sd-hero__title" data-reveal data-reveal-delay="1">
            {data.title} <span className="sd-hero__accent">{data.titleAccent}</span>
          </h1>
          <p className="sn-body sn-body--lg sd-hero__lead" data-reveal data-reveal-delay="2">{data.lead}</p>
          <div className="sd-hero__ctas" data-reveal data-reveal-delay="3">
            <a href={waLink(data.waText)} target="_blank" rel="noopener noreferrer" className="sn-btn sn-btn--primary sn-btn--lg" data-magnetic onClick={playClick}>
              {data.primaryCta} <ArrowRight size={13} />
            </a>
            <Link to="/harga" className="sn-link-underline" onClick={playClick}>Hitung estimasi biaya</Link>
          </div>
          <div className="sd-hero__facts" data-reveal data-reveal-delay="4">
            {data.facts.map((f) => (
              <span key={f.label} className="sd-fact"><b>{f.value}</b>{f.label}</span>
            ))}
          </div>
        </div>
        <div className="sd-hero__visual" data-reveal="right" data-reveal-delay="2">{data.heroVisual}</div>
      </section>

      {/* Proof section (compare slider / speed race) */}
      <section className="sd-proof">
        <div className="sn-container">
          <div className="sd-section-head" data-reveal>
            <span className="sn-mono sn-mono--12">{data.proof.kicker}</span>
            <h2 className="sn-display sd-section-title">{data.proof.title}</h2>
            <p className="sn-body">{data.proof.desc}</p>
          </div>
          <div data-reveal="scale">{data.proof.content}</div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="sn-container sd-deliv">
        <div className="sd-section-head" data-reveal>
          <span className="sn-mono sn-mono--12">DELIVERABLES</span>
          <h2 className="sn-display sd-section-title">{data.delivTitle}</h2>
        </div>
        <div className="sd-deliv__list">
          {data.deliverables.map((d, i) => {
            const open = openDeliv === i;
            return (
              <div key={d.title} className={`sd-deliv__row${open ? ' is-open' : ''}`} data-reveal data-reveal-delay={i % 3}>
                <button type="button" className="sd-deliv__btn" aria-expanded={open}
                  onClick={() => { playClick(); setOpenDeliv(open ? -1 : i); }} onMouseEnter={() => setOpenDeliv(i)}>
                  <span className="sd-deliv__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sn-display sd-deliv__title">{d.title}</span>
                  <span className="sd-deliv__icon" aria-hidden="true"><PlusGlyph size={14} /></span>
                </button>
                <div className="sd-deliv__panel"><div><p className="sn-body">{d.desc}</p></div></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Packages */}
      <section className="sd-pkgs">
        <div className="sn-container">
          <div className="sd-section-head" data-reveal>
            <span className="sn-mono sn-mono--12">{data.pkgKicker}</span>
            <h2 className="sn-display sd-section-title">{data.pkgTitle}</h2>
          </div>
          <div className="sd-pkgs__grid" style={{ '--cols': data.packages.length }}>
            {data.packages.map((p, i) => {
              const picked = pickedPkg === i;
              return (
                <article key={p.name} className={`sn-card sd-pkg${picked ? ' is-picked' : ''}`} onMouseEnter={() => setPickedPkg(i)}
                  data-tilt="4" data-spotlight data-reveal data-reveal-delay={i}>
                  <div className="sd-pkg__top">
                    <span className="sn-mono">{data.pkgLabel} {String(i + 1).padStart(2, '0')}</span>
                    {i === (data.featuredPackage ?? -1) && <span className="sn-pill-tag sn-pill-tag--warm">PALING SERING</span>}
                  </div>
                  <h3 className="sn-display sd-pkg__name">{p.name}</h3>
                  <div className="sd-pkg__meta">
                    {p.slides && <span>{p.slides}</span>}
                    <span>{p.time}</span>
                  </div>
                  <p className="sd-pkg__ideal"><b>Cocok buat:</b> {p.ideal}</p>
                  <ul className="sd-pkg__list">
                    {p.highlights.map((h, k) => (
                      <li key={h} style={{ '--k': k }}><CheckGlyph size={12} /> {h}</li>
                    ))}
                  </ul>
                  <a href={waLink(`Halo Min Cham, gue tertarik paket "${p.name}". Bisa diskusi?`)} target="_blank" rel="noopener noreferrer"
                    className={`sn-btn ${picked ? 'sn-btn--primary' : 'sn-btn--ghost'} sn-btn--md sd-pkg__cta`} onClick={playClick}>
                    Konsultasi paket ini <ArrowRight size={12} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sn-cta-band">
        <div className="sn-container">
          <div className="sn-cta-band__box" data-reveal="scale" data-spotlight>
            <div className="sn-cta-band__copy">
              <span className="sn-cta-band__eyebrow"><span className="sn-dot" style={{ width: 10, height: 10 }} /><span className="sn-mono sn-mono--12">{data.cta.kicker}</span></span>
              <h2 className="sn-display sn-cta-band__title">{data.cta.title}</h2>
              <p className="sn-body sn-body--lg">{data.cta.desc}</p>
            </div>
            <a href={waLink(data.waText)} target="_blank" rel="noopener noreferrer" className="sn-btn sn-btn--primary sn-btn--lg" data-magnetic onClick={playClick}>
              {data.cta.button} <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
