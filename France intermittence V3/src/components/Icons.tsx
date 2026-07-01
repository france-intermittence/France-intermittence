type IconProps = {
  className?: string
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 18.25c1.2-3 3.28-4.5 6.5-4.5 3.25 0 5.32 1.5 6.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 12h12M13 7l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

export function MessageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="12.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 9.25 12 13l5-3.75" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M7.2 4.5h2.7l1.2 4-1.7 1.6c1.1 2.2 2.8 4 5 5.2l1.7-1.8 4 1.2v2.7c0 1-.8 1.9-1.9 1.9C10.7 19.3 4.8 13.3 4.8 6.4c0-1.1.8-1.9 2-1.9Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="5.75" width="17" height="12.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m5.8 8 6.2 4.8L18.2 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function UniverseIcon({ kind, className }: IconProps & { kind: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'technique':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="5" y="6" width="14" height="11" rx="2.5" {...common} />
          <path d="M9 19h6M8 9h8M12 6V4" {...common} />
        </svg>
      )
    case 'artistique':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 5.2c2.5 0 4.5 2 4.5 4.5 0 3.6-2 6.5-4.5 9.1-2.5-2.6-4.5-5.5-4.5-9.1 0-2.5 2-4.5 4.5-4.5Z" {...common} />
          <path d="M9.8 9.7c.6.7 1.4 1 2.2 1 .9 0 1.7-.3 2.4-1M10.1 13.3h3.8" {...common} />
        </svg>
      )
    case 'career':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="4.5" y="7" width="15" height="11.5" rx="2.25" {...common} />
          <path d="M9 7V5.5h6V7M4.5 11h15" {...common} />
        </svg>
      )
    case 'digital':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="4.5" y="5.2" width="15" height="10.5" rx="2" {...common} />
          <path d="M9.25 19h5.5M12 15.7V19" {...common} />
        </svg>
      )
    case 'wellness':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="8" r="3" {...common} />
          <path d="M6.5 18c1.3-2.8 3.2-4.2 5.5-4.2s4.2 1.4 5.5 4.2" {...common} />
        </svg>
      )
    case 'catalog':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="6.5" cy="12" r="1.2" fill="currentColor" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          <circle cx="17.5" cy="12" r="1.2" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}

export function BenefitIcon({ kind, className }: IconProps & { kind: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'people':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="9" cy="8.2" r="2.2" {...common} />
          <circle cx="15.4" cy="9.3" r="1.7" {...common} />
          <path d="M5.6 16c.8-2.1 2.2-3.1 4.1-3.1S13 13.9 13.8 16M13.6 15.8c.5-1.6 1.5-2.4 3.1-2.4 1.3 0 2.2.7 2.8 2.1" {...common} />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 4.8 18.2 7v4.4c0 3.4-2 6-6.2 7.8-4.2-1.8-6.2-4.4-6.2-7.8V7L12 4.8Z" {...common} />
          <path d="m9.4 11.8 1.8 1.9 3.5-3.8" {...common} />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 18.2 5.7 12.1a3.9 3.9 0 0 1 5.5-5.5L12 7.4l.8-.8a3.9 3.9 0 1 1 5.5 5.5Z" {...common} />
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="m8.5 12.1 2.2 2.2 4.9-5" {...common} />
        </svg>
      )
    case 'building':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4.5 19.2h15M6.5 19.2V8.8L12 5l5.5 3.8v10.4M9.2 11.2h.1M14.7 11.2h.1M9.2 14.3h.1M14.7 14.3h.1" {...common} />
        </svg>
      )
    case 'network':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="6.5" cy="12" r="2" {...common} />
          <circle cx="17.5" cy="7" r="2" {...common} />
          <circle cx="17.5" cy="17" r="2" {...common} />
          <path d="M8.5 11.3 15.3 7.7M8.5 12.7l6.8 3.6" {...common} />
        </svg>
      )
    default:
      return null
  }
}

export function StepIcon({ kind, className }: IconProps & { kind: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'search':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="4.5" {...common} />
          <path d="m14.2 14.2 4 4" {...common} />
        </svg>
      )
    case 'rights':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 4.8 18 7v4.2c0 3.2-2 5.7-6 7.4-4-1.7-6-4.2-6-7.4V7Z" {...common} />
          <path d="M9.5 11.8h5" {...common} />
        </svg>
      )
    case 'folder':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M4.7 8.2h5l1.4 1.6h8.2v7.6a2 2 0 0 1-2 2H6.7a2 2 0 0 1-2-2Z" {...common} />
          <path d="M4.7 8.2v-1a2 2 0 0 1 2-2h2.4l1.4 1.6h6.8a2 2 0 0 1 2 2v1" {...common} />
        </svg>
      )
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M12 4.8v3.1M12 16.1v3.1M19.2 12h-3.1M7.9 12H4.8M17.1 6.9l-2.2 2.2M9.1 14.9l-2.2 2.2M17.1 17.1l-2.2-2.2M9.1 9.1 6.9 6.9" {...common} />
          <circle cx="12" cy="12" r="3.2" {...common} />
        </svg>
      )
    default:
      return null
  }
}

export function FundingIcon({ kind, className }: IconProps & { kind: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'euro':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M15.8 7.1c-.9-.9-2.1-1.3-3.6-1.3-2.5 0-4.5 1.5-5.2 3.9M5.6 12h7.4M5.6 14.8H13M7 14.8c.8 2.2 2.7 3.4 5.2 3.4 1.4 0 2.7-.5 3.6-1.4" {...common} />
        </svg>
      )
    case 'document':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path d="M8 4.8h6l3 3v11.4H8a2 2 0 0 1-2-2V6.8a2 2 0 0 1 2-2Z" {...common} />
          <path d="M14 4.8v3h3M9.4 11h5.2M9.4 14.2h5.2" {...common} />
        </svg>
      )
    case 'secure':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="8" {...common} />
          <path d="m8.6 12.2 2.2 2.1 4.8-5" {...common} />
        </svg>
      )
    default:
      return null
  }
}

export function CameraIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 160 130" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--navy)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="28" y="28" width="54" height="46" rx="10" />
        <circle cx="55" cy="51" r="12" />
        <path d="M82 42 112 30v42L82 60" />
        <path d="M44 74v26M62 74v26M36 100h34" />
        <path d="M18 36h10M22 52h6" />
        <circle cx="42" cy="18" r="15" />
        <circle cx="70" cy="18" r="15" />
        <circle cx="56" cy="18" r="3" fill="var(--orange)" stroke="none" />
      </g>
      <path d="M30 66h22" stroke="var(--orange)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function MasksIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 150 110" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--navy)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 18c10 8 24 11 42 11 8 0 20-1 33-6v31c0 19-13 34-29 34-12 0-22-8-25-20-4 12-14 20-25 20-16 0-29-15-29-34V24c11 6 22 9 33 10Z" />
        <path d="M37 48c4-3 8-4 13-4 5 0 9 1 13 4M82 45c4-3 8-4 13-4 5 0 10 1 14 5" />
        <path d="M51 64c7 6 17 6 24 0" stroke="var(--orange)" />
      </g>
    </svg>
  )
}

export function MicrophoneIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 110 140" className={className} aria-hidden="true">
      <g transform="rotate(18 55 70)" fill="none" stroke="var(--navy)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="42" y="16" width="26" height="42" rx="13" />
        <path d="M55 58v17M46 75h18M55 75v28" />
        <path d="M43 25h24" stroke="var(--orange)" />
        <path d="M51 14h8" stroke="var(--orange)" />
      </g>
    </svg>
  )
}

export function ParisIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 220 110" className={className} aria-hidden="true">
      <g fill="none" stroke="var(--blue-strong)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M52 88 66 36l14 52M58 68h16M94 88V57l8-8 8 8v31M126 88V48h16v40M142 48V38M16 88h188" />
        <path d="M168 88V58h24v30M178 58V44M184 44v-8" />
        <path d="M62 36 56 24h20l-6 12" />
      </g>
      <circle cx="20" cy="20" r="5" fill="var(--orange)" />
      <path d="M194 24c8 0 12 5 12 12" fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function AdvisorIllustration({ className }: IconProps) {
  return (
    <svg viewBox="0 0 210 150" className={className} aria-hidden="true">
      <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M52 109c0-18 12-29 28-29s28 11 28 29M108 109c0-22 14-36 34-36s34 14 34 36" opacity=".74" />
        <circle cx="80" cy="62" r="14" />
        <circle cx="145" cy="57" r="16" opacity=".82" />
        <path d="M66 56c2 2 5 3 8 3s6-1 8-3M138 56c2 2 5 3 8 3 4 0 7-1 9-4" />
        <path d="M118 24h44c7 0 12 5 12 12v12c0 7-5 12-12 12h-14l-10 10 2-10h-22c-7 0-12-5-12-12V36c0-7 5-12 12-12Z" />
      </g>
      <circle cx="163" cy="38" r="5" fill="var(--orange)" />
      <path d="M128 41h20" stroke="var(--orange)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

export function HeroArt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 640 400" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="heroBg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#362314" />
          <stop offset="45%" stopColor="#1f1b25" />
          <stop offset="100%" stopColor="#4a2d17" />
        </linearGradient>
        <radialGradient id="warmGlow" cx="24%" cy="24%" r="30%">
          <stop offset="0%" stopColor="#ffb347" stopOpacity="1" />
          <stop offset="45%" stopColor="#ff8a28" stopOpacity=".75" />
          <stop offset="100%" stopColor="#ff8a28" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="400" rx="28" fill="url(#heroBg)" />
      <rect x="0" y="0" width="210" height="400" fill="rgba(255,255,255,0.06)" />
      <circle cx="170" cy="82" r="90" fill="url(#warmGlow)" />
      <rect x="338" y="108" width="195" height="190" rx="12" fill="#1e2636" stroke="rgba(255,255,255,.12)" />
      <rect x="355" y="124" width="164" height="160" rx="10" fill="#273246" />
      <rect x="322" y="150" width="18" height="120" rx="4" fill="#111827" />
      <rect x="534" y="150" width="18" height="120" rx="4" fill="#111827" />
      <rect x="403" y="78" width="85" height="52" rx="5" fill="#8e969f" />
      <rect x="411" y="85" width="69" height="40" rx="3" fill="#111827" />
      <path d="M445 130v12" stroke="#8e969f" strokeWidth="3" />
      <text x="404" y="172" fill="#f5e0ca" fontSize="32" fontWeight="600" fontFamily="Inter, sans-serif">CRÉER</text>
      <text x="384" y="210" fill="#f5e0ca" fontSize="32" fontWeight="600" fontFamily="Inter, sans-serif">APPRENDRE</text>
      <text x="394" y="248" fill="#f5e0ca" fontSize="32" fontWeight="600" fontFamily="Inter, sans-serif">ÉVOLUER</text>
      <rect x="206" y="68" width="74" height="74" rx="8" fill="#2d3748" />
      <circle cx="243" cy="105" r="26" fill="#ffa739" />
      <circle cx="243" cy="105" r="16" fill="#fff0c8" />
      <path d="M243 52v-18M243 176v-18M190 105h-18M314 105h-18" stroke="#2d3748" strokeWidth="7" strokeLinecap="round" />
      <path d="M262 76 275 63M211 127l-13 13M211 83l-12-11M263 128l12 12" stroke="#2d3748" strokeWidth="7" strokeLinecap="round" />
      <rect x="550" y="26" width="42" height="348" fill="rgba(0,0,0,.16)" />
      <rect x="593" y="40" width="16" height="322" fill="rgba(255,255,255,.1)" />
      <rect x="286" y="286" width="300" height="16" rx="8" fill="rgba(0,0,0,.35)" />
      <rect x="336" y="298" width="200" height="16" rx="8" fill="rgba(0,0,0,.18)" />
    </svg>
  )
}
