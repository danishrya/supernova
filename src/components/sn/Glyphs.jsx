import React from 'react';

// Small stroke glyphs matching the Figma icon slots (1.5px stroke, square-ish caps).
const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
});

export const ArrowRight = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

export const ArrowLeft = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
  </svg>
);

export const ArrowUpRight = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const ArrowDown = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
  </svg>
);

export const ChevronDown = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="m3.5 6 4.5 4.5L12.5 6" />
  </svg>
);

export const SearchGlyph = ({ size = 18 }) => (
  <svg {...base(size)}>
    <circle cx="7" cy="7" r="4.75" />
    <path d="m10.5 10.5 3.5 3.5" />
  </svg>
);

export const CheckGlyph = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="m3 8.5 3.2 3L13 4.5" />
  </svg>
);

export const CrossGlyph = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);

export const PlusGlyph = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

export const ClockGlyph = ({ size = 14 }) => (
  <svg {...base(size)}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 4.75V8l2.25 1.5" />
  </svg>
);

export const MailGlyph = ({ size = 16 }) => (
  <svg {...base(size)}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </svg>
);

export const ChatGlyph = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M3 12.5V4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v5A1.5 1.5 0 0 1 11.5 11H5.5L3 12.5Z" />
  </svg>
);

export const CameraGlyph = ({ size = 16 }) => (
  <svg {...base(size)}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="3" />
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="11.25" cy="4.75" r="0.4" fill="currentColor" />
  </svg>
);

export const NoteGlyph = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M10 2.5v7.25a2.25 2.25 0 1 1-2.25-2.25H10M10 2.5c.5 1.5 1.75 2.5 3.5 2.5" />
  </svg>
);

export const BagGlyph = ({ size = 12 }) => (
  <svg {...base(size)}>
    <path d="M3.5 5.5h9l-.75 8h-7.5l-.75-8ZM6 5.5V4.5a2 2 0 0 1 4 0v1" />
  </svg>
);

export const DownloadGlyph = ({ size = 14 }) => (
  <svg {...base(size)}>
    <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
  </svg>
);

/** Hand-drawn curved arrow (reuses the Figma-exported caveat arrow asset). */
export const HandArrow = ({ width = 64, height = 48, className = '', flip = false, rotate = 0 }) => (
  <img
    src="/figma-assets/layanan-arrow-curved.svg"
    alt=""
    aria-hidden="true"
    className={className}
    style={{
      width,
      height,
      transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${rotate}deg)`,
    }}
  />
);
