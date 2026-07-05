type IconProps = {
  className?: string
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.6" strokeWidth="1.7" {...stroke} />
      <rect x="13" y="4" width="7" height="7" rx="1.6" strokeWidth="1.7" {...stroke} />
      <rect x="4" y="13" width="7" height="7" rx="1.6" strokeWidth="1.7" {...stroke} />
      <rect x="13" y="13" width="7" height="7" rx="1.6" strokeWidth="1.7" {...stroke} />
    </svg>
  )
}

export function ChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 19.5h15" strokeWidth="1.7" {...stroke} />
      <path d="M7.5 19.5v-6M12 19.5V8M16.5 19.5v-9.5" strokeWidth="1.9" {...stroke} />
    </svg>
  )
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="9" cy="8.4" r="2.6" strokeWidth="1.6" {...stroke} />
      <path d="M4 18c.9-2.9 2.5-4.3 5-4.3s4.1 1.4 5 4.3" strokeWidth="1.6" {...stroke} />
      <circle cx="16.6" cy="9.2" r="2" strokeWidth="1.5" {...stroke} />
      <path d="M14.8 14.1c.6-.3 1.2-.5 1.9-.5 2 0 3.3 1.3 4 3.9" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}

export function ArticleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="5" y="3.6" width="14" height="16.8" rx="2" strokeWidth="1.6" {...stroke} />
      <path d="M8 8h8M8 11.6h8M8 15.2h5" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M15.7 4.8 19.2 8.3 8.9 18.6 4.9 19.1l.5-4Z" strokeWidth="1.6" {...stroke} />
      <path d="M13.9 6.6 17.4 10.1" strokeWidth="1.6" {...stroke} />
    </svg>
  )
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 7.2h14M9.5 7.2V5.4c0-.7.6-1.2 1.2-1.2h2.6c.7 0 1.2.5 1.2 1.2v1.8" strokeWidth="1.6" {...stroke} />
      <path d="M6.8 7.2 7.5 19c.1.9.8 1.6 1.7 1.6h5.6c.9 0 1.6-.7 1.7-1.6l.7-11.8" strokeWidth="1.6" {...stroke} />
      <path d="M10.3 10.6v6.4M13.7 10.6v6.4" strokeWidth="1.4" {...stroke} />
    </svg>
  )
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 5.2v13.6M5.2 12h13.6" strokeWidth="1.9" {...stroke} />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeWidth="1.9" {...stroke} />
    </svg>
  )
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M18.4 9.5A6.5 6.5 0 0 0 6.3 8.2M5.6 14.5a6.5 6.5 0 0 0 12.1 1.3" strokeWidth="1.7" {...stroke} />
      <path d="M18.6 5.6v3.9h-3.9M5.4 18.4v-3.9h3.9" strokeWidth="1.7" {...stroke} />
    </svg>
  )
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9.5 4.8H6.4a1.6 1.6 0 0 0-1.6 1.6v11.2a1.6 1.6 0 0 0 1.6 1.6h3.1" strokeWidth="1.6" {...stroke} />
      <path d="M13.6 8.4 17.6 12l-4 3.6M8.4 12h9" strokeWidth="1.7" {...stroke} />
    </svg>
  )
}

export function StarIcon({ className, filled }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="m12 4.6 2.2 4.6 5 .7-3.6 3.6.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.6 5-.7Z"
        strokeWidth="1.5"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12.2" r="7.4" strokeWidth="1.5" {...stroke} />
      <path d="M12 8v4.4l3 2" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4.2" y="5.4" width="15.6" height="14.4" rx="2" strokeWidth="1.5" {...stroke} />
      <path d="M4.2 9.4h15.6M8.3 3.6v3.2M15.7 3.6v3.2" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M11.4 4.6h4.9c.6 0 1.1.5 1.1 1.1v4.9c0 .4-.1.7-.4 1L9.6 19a1.6 1.6 0 0 1-2.3 0l-3.3-3.3a1.6 1.6 0 0 1 0-2.3l7.4-7.4c.3-.3.6-.4 1-.4Z" strokeWidth="1.5" {...stroke} />
      <circle cx="14.6" cy="9.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" strokeWidth="1.5" {...stroke} />
      <circle cx="9" cy="10" r="1.6" strokeWidth="1.4" {...stroke} />
      <path d="m5.5 17.5 4.6-4.6a1.6 1.6 0 0 1 2.2 0l1.2 1.2 2.6-2.6a1.6 1.6 0 0 1 2.2 0l2.2 2.2" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 7h15M4.5 12h15M4.5 17h15" strokeWidth="1.7" {...stroke} />
    </svg>
  )
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 16 10 10.5l3.2 3.2L19.5 7" strokeWidth="1.7" {...stroke} />
      <path d="M14.5 7h5v5" strokeWidth="1.7" {...stroke} />
    </svg>
  )
}

export function TrendDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 8 10 13.5l3.2-3.2L19.5 17" strokeWidth="1.7" {...stroke} />
      <path d="M14.5 17h5v-5" strokeWidth="1.7" {...stroke} />
    </svg>
  )
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9.5 5.5h-3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" strokeWidth="1.5" {...stroke} />
      <path d="M13.5 4.5h6v6M19.2 4.8l-8 8" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="5.3" strokeWidth="1.6" {...stroke} />
      <path d="m15.5 15.5 4 4" strokeWidth="1.6" {...stroke} />
    </svg>
  )
}

export function InboxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.5 12.5h4.2l1.3 2.1h4l1.3-2.1h4.2" strokeWidth="1.5" {...stroke} />
      <path d="M6.4 6.2h11.2l2.1 6.3v6.1a1.6 1.6 0 0 1-1.6 1.6H5.9a1.6 1.6 0 0 1-1.6-1.6v-6.1Z" strokeWidth="1.5" {...stroke} />
    </svg>
  )
}
