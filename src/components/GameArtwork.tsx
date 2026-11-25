import React, { useState } from 'react';

interface GameArtworkProps {
  gameId: string;
  imageSrc?: string;
  accentHex: string;
  secondaryHex: string;
  title: string;
  className?: string;
}

export const GameArtwork: React.FC<GameArtworkProps> = ({
  gameId,
  imageSrc,
  accentHex,
  secondaryHex,
  title,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const renderEmblem = () => {
    switch (gameId) {
      case 'mobile-legends':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <defs>
              <linearGradient id="ml-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={secondaryHex} />
                <stop offset="100%" stopColor={accentHex} />
              </linearGradient>
            </defs>
            <polygon points="60,10 98,32 98,74 60,110 22,74 22,32" fill="none" stroke="url(#ml-grad)" strokeWidth="3.5" />
            <polygon points="60,22 86,38 86,69 60,96 34,69 34,38" fill={accentHex} fillOpacity="0.22" stroke="#F8FAFC" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d="M60 28 L72 60 L60 88 L48 60 Z" fill="url(#ml-grad)" />
            <path d="M44 52 L60 44 L76 52 L60 64 Z" fill="#F8FAFC" fillOpacity="0.9" />
          </svg>
        );
      case 'free-fire':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <defs>
              <linearGradient id="ff-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={accentHex} />
                <stop offset="100%" stopColor={secondaryHex} />
              </linearGradient>
            </defs>
            <path d="M60 14 C78 36 92 54 88 78 C85 96 72 106 60 106 C48 106 35 96 32 78 C28 54 42 36 60 14 Z" fill={accentHex} fillOpacity="0.25" stroke="url(#ff-grad)" strokeWidth="3" />
            <path d="M60 32 C70 48 76 62 72 78 C69 88 64 94 60 94 C56 94 51 88 48 78 C44 62 50 48 60 32 Z" fill="url(#ff-grad)" />
            <polygon points="60,52 68,70 60,84 52,70" fill="#0B0F17" />
          </svg>
        );
      case 'valorant':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <rect x="20" y="20" width="80" height="80" rx="14" fill={accentHex} fillOpacity="0.16" stroke={accentHex} strokeWidth="2.5" />
            <path d="M28 36 L58 84 H42 L28 60 Z" fill={secondaryHex} />
            <path d="M92 36 L68 74 H54 L78 36 Z" fill="#F8FAFC" />
          </svg>
        );
      case 'pubg-mobile':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <rect x="18" y="34" width="84" height="52" rx="8" fill={accentHex} fillOpacity="0.18" stroke={secondaryHex} strokeWidth="3" />
            <circle cx="60" cy="60" r="16" fill="none" stroke="#F8FAFC" strokeWidth="2.5" />
            <line x1="60" y1="36" x2="60" y2="48" stroke={secondaryHex} strokeWidth="2.5" />
            <line x1="60" y1="72" x2="60" y2="84" stroke={secondaryHex} strokeWidth="2.5" />
            <line x1="36" y1="60" x2="48" y2="60" stroke={secondaryHex} strokeWidth="2.5" />
            <line x1="72" y1="60" x2="84" y2="60" stroke={secondaryHex} strokeWidth="2.5" />
            <circle cx="60" cy="60" r="4" fill={secondaryHex} />
          </svg>
        );
      case 'genshin-impact':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <circle cx="60" cy="60" r="38" fill={accentHex} fillOpacity="0.15" stroke={secondaryHex} strokeOpacity="0.6" strokeWidth="2" />
            <path d="M60 16 L68 52 L104 60 L68 68 L60 104 L52 68 L16 60 L52 52 Z" fill={secondaryHex} />
            <circle cx="60" cy="60" r="10" fill="#0B0F17" stroke="#F8FAFC" strokeWidth="2" />
          </svg>
        );
      case 'honor-of-kings':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <polygon points="60,16 96,42 82,96 38,96 24,42" fill={accentHex} fillOpacity="0.2" stroke={secondaryHex} strokeWidth="3" />
            <path d="M36 52 L48 34 L60 48 L72 34 L84 52 L76 80 H44 Z" fill={secondaryHex} fillOpacity="0.9" />
            <circle cx="60" cy="64" r="7" fill="#0B0F17" />
          </svg>
        );
      case 'cod-mobile':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <polygon points="60,18 96,38 96,82 60,102 24,82 24,38" fill={accentHex} fillOpacity="0.2" stroke={secondaryHex} strokeWidth="2.5" />
            <path d="M40 44 H80 L72 60 L80 76 H40 L48 60 Z" fill="none" stroke="#F8FAFC" strokeWidth="3" />
            <circle cx="60" cy="60" r="6" fill={secondaryHex} />
          </svg>
        );
      case 'roblox':
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <g transform="rotate(-14 60 60)">
              <rect x="26" y="26" width="68" height="68" rx="10" fill={accentHex} fillOpacity="0.28" stroke={secondaryHex} strokeWidth="4" />
              <rect x="49" y="49" width="22" height="22" rx="3" fill="#0B0F17" stroke="#F8FAFC" strokeWidth="2.5" />
            </g>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 120 120" className="w-20 h-20 drop-shadow-lg" aria-hidden="true">
            <circle cx="60" cy="60" r="36" fill={accentHex} fillOpacity="0.22" stroke={secondaryHex} strokeWidth="3" />
            <circle cx="72" cy="48" r="10" fill="none" stroke="#F8FAFC" strokeWidth="3" />
            <line x1="34" y1="68" x2="64" y2="52" stroke={secondaryHex} strokeWidth="5" strokeLinecap="round" />
            <circle cx="46" cy="76" r="8" fill="#F8FAFC" />
          </svg>
        );
    }
  };

  if (imageSrc && !imgError) {
    const isWideLogo = gameId === 'valorant' || gameId === 'roblox';
    return (
      <div className={`relative overflow-hidden bg-[#090C14] flex items-center justify-center ${className}`}>
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${accentHex}, transparent 75%)`,
          }}
        />
        {!isWideLogo && (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover scale-110 blur-xl opacity-35"
          />
        )}
        <img
          src={imageSrc}
          alt={`Cover game ${title}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className={`relative z-10 h-full w-full object-contain transition-transform duration-200 group-hover:scale-105 ${
            isWideLogo ? 'p-6' : 'p-2'
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-[#111622] to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-[#0D111A] ${className}`}
      role="img"
      aria-label={`Artwork ${title}`}
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accentHex}, transparent 72%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 group-hover:scale-105">
        {renderEmblem()}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111622] to-transparent" />
    </div>
  );
};

