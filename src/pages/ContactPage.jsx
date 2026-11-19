import React, { useEffect, useRef, useState } from 'react';
import { STUDIO_CONFIG } from '../config/studioConfig';
import { ArrowLeft, ArrowRight, ChatGlyph, CameraGlyph, NoteGlyph, MailGlyph, CheckGlyph } from '../components/sn/Glyphs';
import { playClick } from '../utils/sound';

// Layout & copy from Figma frame 2001:2650 (Kontak). Contact values come from studioConfig.
const NEEDS = ['Presentasi', 'Website', 'Template', 'Lainnya'];
const BUDGETS = ['< Rp 1 jt', 'Rp 1–3 jt', 'Rp 3–7 jt', '> Rp 7 jt', 'Belum tau'];
const TIMELINES = ['Minggu ini', '2 minggu lagi', 'Bulan depan', 'Santai'];

const STEP_LABELS = ['KEBUTUHAN UTAMA', 'BUDGET & WAKTU', 'CEK & KIRIM'];

const FAQS = [
  {
    q: 'Kalau ide gue masih mentah banget gimana?',
    a: 'Santai, justru itu kerjaan gue. Ceritain aja poin-poin kasarnya lewat voice note atau coretan di kertas, nanti gue bantu strukturin alurnya jadi rapi. Lo nggak perlu siapin dokumen spesifikasi tebal dulu.',
  },
  {
    q: 'Bisa ketemuan langsung (offline)?',
    a: 'Bisa, selama jadwal dan lokasinya memungkinkan. Tapi sebagian besar proyek jalan lancar lewat video call dan chat, jadi lo nggak perlu repot keluar rumah.',
  },
  {
    q: 'Gimana skema pembayaran dan DP?',
    a: 'Umumnya DP 50% di awal buat ngunci slot, sisanya dilunasi setelah file final disetujui. Untuk proyek besar bisa dibagi per termin sesuai milestone.',
  },
];

function needFromType(type = '') {
  const t = type.toLowerCase();
  if (t.includes('web')) return 'Website';
  if (t.includes('presentasi') || t.includes('ppt')) return 'Presentasi';
  if (t.includes('template') || t.includes('produk')) return 'Template';
  return 'Presentasi';
}

export default function ContactPage({ initialBrief = '', initialType = '' }) {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState(() => needFromType(initialType));
  const [story, setStory] = useState(initialBrief);
  const [contact, setContact] = useState('');
  const [budget, setBudget] = useState('Belum tau');
  const [timeline, setTimeline] = useState('Santai');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ text: 'Klik “SALIN” buat nyimpen kontak ke clipboard', ok: false });
  const [openFaq, setOpenFaq] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (initialBrief) setStory(initialBrief);
  }, [initialBrief]);

  const channels = [
    {
      key: 'wa',
      label: 'WHATSAPP',
      value: STUDIO_CONFIG.phone,
      copy: STUDIO_CONFIG.phone,
      href: `https://wa.me/${STUDIO_CONFIG.whatsappNumber}`,
      icon: <ChatGlyph size={16} />,
      toast: 'Nomor WhatsApp disalin ke clipboard ✓',
    },
    {
      key: 'ig',
      label: 'INSTAGRAM',
      value: STUDIO_CONFIG.instagram,
      copy: STUDIO_CONFIG.instagram,
      href: `https://instagram.com/${STUDIO_CONFIG.instagram.replace('@', '')}`,
      icon: <CameraGlyph size={16} />,
      toast: 'Username Instagram disalin ✓',
    },
    {
      key: 'tt',
      label: 'TIKTOK',
      value: STUDIO_CONFIG.tiktok,
      copy: STUDIO_CONFIG.tiktok,
      href: `https://www.tiktok.com/${STUDIO_CONFIG.tiktok}`,
      icon: <NoteGlyph size={16} />,
      toast: 'Username TikTok disalin ✓',
    },
    {
      key: 'mail',
      label: 'EMAIL',
      value: STUDIO_CONFIG.email,
      copy: STUDIO_CONFIG.email,
      href: `mailto:${STUDIO_CONFIG.email}`,
      icon: <MailGlyph size={16} />,
      toast: 'Alamat email disalin ✓',
    },
  ];

  const copy = async (ch) => {
    playClick();
    try {
      await navigator.clipboard.writeText(ch.copy);
      setToast({ text: ch.toast, ok: true, key: Date.now() });
    } catch {
      setToast({ text: `Gagal menyalin, catat manual: ${ch.copy}`, ok: false, key: Date.now() });
    }
  };

  const goNext = () => {
    playClick();
    if (step === 0) {
      const c = contact.trim();
      const looksValid = /@.+\./.test(c) || c.replace(/\D/g, '').length >= 9;
      if (!looksValid) {
        setError('Isi nomor WhatsApp atau email yang valid dulu ya, biar gue bisa bales.');
        return;
      }
    }
    setError('');
    setStep((s) => Math.min(2, s + 1));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const goBack = () => {
    playClick();
    setError('');
    setStep((s) => Math.max(0, s - 1));
  };

  const message = [
    `Halo Min Cham${name ? `, gue ${name}` : ''}.`,
    `Kebutuhan: ${need}`,
    story.trim() ? `Cerita singkat: ${story.trim()}` : null,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    `Kontak gue: ${contact.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');

  const sendUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="sn-page kt-page" data-name="Supernova Studio — Kontak">
      {/* Availability ribbon */}
      <div className="kt-ribbon">
        <div className="sn-container kt-ribbon__inner">
          <span className="kt-ribbon__status">
            <span className="sn-dot sn-dot--green sn-dot--pulse" />
            STATUS STUDIO: 2 SLOT TERSEDIA BULAN INI
          </span>
          <span className="kt-ribbon__meta">
            JAM RESPON: {STUDIO_CONFIG.operatingHours.toUpperCase()}
            <span aria-hidden="true">•</span>
            INDONESIA
          </span>
        </div>
      </div>

      {/* Hero + form + channels */}
      <section className="kt-main">
        <div className="sn-container">
          <div className="kt-index" data-reveal>
            <span>01 // KONTAK</span>
            <i aria-hidden="true" />
          </div>

          <div className="kt-grid">
            <div className="kt-left">
              <div className="kt-hero" data-reveal>
                <h1 className="sn-display kt-hero__title">Ngobrol dulu.</h1>
                <p className="sn-body sn-body--lg">
                  Ceritain ide lo, target audiens, dan batas waktu yang lo incer. Nggak perlu brief formal
                  yang kaku.
                </p>
              </div>

              <div className="sn-card kt-form" ref={formRef} data-reveal data-reveal-delay="1">
                <div className="kt-progress">
                  <div className="kt-progress__dots" aria-hidden="true">
                    {STEP_LABELS.map((_, i) => (
                      <span key={i} className={i <= step ? 'is-on' : ''} />
                    ))}
                  </div>
                  <span className="sn-mono">
                    LANGKAH {step + 1} DARI 3: {STEP_LABELS[step]}
                  </span>
                </div>

                <div className="kt-form__body" key={step}>
                  {step === 0 && (
                    <>
                      <fieldset className="kt-q">
                        <legend className="sn-display kt-q__title">Lo butuh apa?</legend>
                        <div className="kt-chips">
                          {NEEDS.map((n) => (
                            <button
                              key={n}
                              type="button"
                              aria-pressed={need === n}
                              className={`kt-chip${need === n ? ' is-active' : ''}`}
                              onClick={() => {
                                playClick();
                                setNeed(n);
                              }}
                            >
                              {need === n && <span className="kt-chip__dot" />}
                              {n}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <label className="kt-field">
                        <span className="kt-field__label">
                          <span>CERITAIN SINGKAT (OPSIONAL)</span>
                          <span className="kt-field__hint">{story.length > 0 ? `${story.length}/500` : 'BEBAS AJA'}</span>
                        </span>
                        <textarea
                          rows={4}
                          maxLength={500}
                          value={story}
                          onChange={(e) => setStory(e.target.value)}
                          placeholder="Contoh: Mau bikin deck 15 slide buat pitching ke investor awal bulan depan..."
                        />
                      </label>

                      <label className="kt-field">
                        <span className="kt-field__label">
                          <span>NOMOR WHATSAPP ATAU EMAIL LO</span>
                        </span>
                        <span className={`kt-input${error ? ' has-error' : ''}`}>
                          <input
                            type="text"
                            inputMode="email"
                            value={contact}
                            onChange={(e) => {
                              setContact(e.target.value);
                              if (error) setError('');
                            }}
                            placeholder="0812-xxxx-xxxx atau nama@email.com"
                            aria-invalid={!!error}
                          />
                          <ChatGlyph size={15} />
                        </span>
                        {error && <span className="kt-error">{error}</span>}
                      </label>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <fieldset className="kt-q">
                        <legend className="sn-display kt-q__title">Kira-kira budget-nya?</legend>
                        <div className="kt-chips">
                          {BUDGETS.map((b) => (
                            <button
                              key={b}
                              type="button"
                              aria-pressed={budget === b}
                              className={`kt-chip${budget === b ? ' is-active' : ''}`}
                              onClick={() => {
                                playClick();
                                setBudget(b);
                              }}
                            >
                              {budget === b && <span className="kt-chip__dot" />}
                              {b}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset className="kt-q">
                        <legend className="sn-display kt-q__title">Butuh kelar kapan?</legend>
                        <div className="kt-chips">
                          {TIMELINES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={timeline === t}
                              className={`kt-chip${timeline === t ? ' is-active' : ''}`}
                              onClick={() => {
                                playClick();
                                setTimeline(t);
                              }}
                            >
                              {timeline === t && <span className="kt-chip__dot" />}
                              {t}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <label className="kt-field">
                        <span className="kt-field__label">
                          <span>NAMA PANGGILAN (OPSIONAL)</span>
                        </span>
                        <span className="kt-input">
                          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Biar gue tau manggil siapa" />
                        </span>
                      </label>
                    </>
                  )}

                  {step === 2 && (
                    <div className="kt-review">
                      <span className="sn-display kt-q__title">Udah pas? Tinggal kirim.</span>
                      <pre className="kt-review__msg">{message}</pre>
                      <p className="kt-review__hint">
                        Tombol di bawah bakal buka WhatsApp dengan pesan ini, lo masih bisa edit sebelum kirim.
                      </p>
                    </div>
                  )}

                  <div className="kt-actions">
                    {step > 0 && (
                      <button type="button" className="kt-back" onClick={goBack}>
                        <ArrowLeft size={13} /> Balik
                      </button>
                    )}
                    {step < 2 ? (
                      <button type="button" className="sn-btn sn-btn--primary sn-btn--lg" data-magnetic onClick={goNext}>
                        Lanjut ke langkah {step + 2} <ArrowRight size={13} />
                      </button>
                    ) : (
                      <a
                        href={sendUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sn-btn sn-btn--primary sn-btn--lg"
                        data-magnetic
                        onClick={playClick}
                      >
                        Kirim lewat WhatsApp <ArrowRight size={13} />
                      </a>
                    )}
                    <span className="kt-sla">Respon paling lambat 1x24 jam di hari kerja.</span>
                  </div>

                  {step === 0 && (
                    <div className="kt-callout">
                      <img src="/figma-assets/arrow-caveat.svg" alt="" aria-hidden="true" />
                      <span className="sn-caveat">bisa langsung kirim bahan mentah juga</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="kt-right">
              <div className="kt-direct" data-reveal="right">
                <span className="sn-mono">SALURAN LANGSUNG // RESPON CEPAT</span>
                <h2 className="sn-display kt-direct__title">Lebih suka ngobrol langsung?</h2>
                <p className="sn-body">
                  Bebas pilih channel yang paling nyaman buat lo. Mau tanya-tanya estimasi budget atau sekadar
                  nyapa dulu, pintu studio selalu terbuka.
                </p>
              </div>

              <ul className="kt-channels">
                {channels.map((ch, i) => (
                  <li key={ch.key} className="sn-card kt-channel" data-reveal="right" data-reveal-delay={i + 1} data-spotlight>
                    <a href={ch.href} target="_blank" rel="noopener noreferrer" className="kt-channel__link">
                      <span className="kt-channel__icon">{ch.icon}</span>
                      <span className="kt-channel__text">
                        <span className="sn-mono">{ch.label}</span>
                        <strong>{ch.value}</strong>
                      </span>
                    </a>
                    <button type="button" className="kt-copy" onClick={() => copy(ch)}>
                      SALIN
                    </button>
                  </li>
                ))}
              </ul>

              <div className={`kt-toast${toast.ok ? ' is-ok' : ''}`} key={toast.key} role="status" aria-live="polite">
                <span className="kt-toast__msg">
                  <span className={`sn-dot${toast.ok ? ' sn-dot--green' : ''}`} />
                  {toast.text}
                </span>
                <span className="kt-toast__state">{toast.ok ? <CheckGlyph size={11} /> : 'READY'}</span>
              </div>

              <div className="kt-location">
                <span>⌖ BASECAMP: {STUDIO_CONFIG.location.toUpperCase()}</span>
                <span className="kt-location__tz">UTC+7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="kt-faq">
        <div className="sn-container">
          <div className="kt-faq__head" data-reveal>
            <span className="sn-mono" style={{ color: 'var(--sn-orange)' }}>
              02 // PERTANYAAN SEPUTAR KONTAK
            </span>
            <h2 className="sn-display kt-faq__title">Sebelum lo kirim pesan.</h2>
            <p className="sn-body">
              Beberapa hal lumrah yang sering ditanyakan sebelum kita mulai kolaborasi pertama kali.
            </p>
          </div>
          <div className="kt-accordion">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`kt-acc${open ? ' is-open' : ''}`} data-reveal data-reveal-delay={i}>
                  <button
                    type="button"
                    className="kt-acc__btn"
                    aria-expanded={open}
                    onClick={() => {
                      playClick();
                      setOpenFaq(open ? -1 : i);
                    }}
                  >
                    <span className="sn-display kt-acc__q">{f.q}</span>
                    <span className="kt-acc__icon" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>
                  <div className="kt-acc__panel">
                    <div>
                      <p className="sn-body">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
