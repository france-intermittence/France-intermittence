import { useRef, useState, type ReactNode } from 'react'
import { TrendDownIcon, TrendUpIcon } from './AdminIcons'
import type { DayBucket } from '../services/adminInsights'

function niceCeiling(value: number): number {
  if (value <= 5) return 5
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const normalized = value / magnitude
  const niceNormalized = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10
  return niceNormalized * magnitude
}

function formatDayLabel(date: Date, long = false) {
  return new Intl.DateTimeFormat('fr-FR', long ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: '2-digit', month: 'short' }).format(date)
}

export function LeadsTrendChart({
  data,
  unitLabel = 'lead',
  ariaLabel,
}: {
  data: DayBucket[]
  unitLabel?: string
  ariaLabel?: string
}) {
  const width = 600
  const height = 220
  const paddingLeft = 30
  const paddingRight = 10
  const paddingTop = 16
  const paddingBottom = 26
  const innerWidth = width - paddingLeft - paddingRight
  const innerHeight = height - paddingTop - paddingBottom

  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  const maxRaw = Math.max(1, ...data.map((point) => point.count))
  const niceMax = niceCeiling(maxRaw)
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : 0

  const points = data.map((point, index) => ({
    ...point,
    x: paddingLeft + stepX * index,
    y: paddingTop + innerHeight - (point.count / niceMax) * innerHeight,
  }))

  const linePath = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ')
  const baseline = paddingTop + innerHeight
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${baseline} L${points[0].x.toFixed(1)},${baseline} Z`

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    const x = ratio * width
    let nearest = 0
    let nearestDistance = Infinity
    points.forEach((point, index) => {
      const distance = Math.abs(point.x - x)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearest = index
      }
    })
    setHoverIndex(nearest)
  }

  const ticks = [0, 0.5, 1].map((fraction) => Math.round(niceMax * fraction))
  const labelEvery = Math.ceil(points.length / 5)
  const hovered = hoverIndex !== null ? points[hoverIndex] : null
  const last = points[points.length - 1]

  return (
    <div className="admin-chart">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="admin-chart__svg"
        role="img"
        aria-label={ariaLabel ?? `Évolution du nombre de ${unitLabel}s sur les 14 derniers jours`}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverIndex(null)}
      >
        {ticks.map((tick) => {
          const y = paddingTop + innerHeight - (tick / niceMax) * innerHeight
          return (
            <g key={tick}>
              <line x1={paddingLeft} x2={width - paddingRight} y1={y} y2={y} className="admin-chart__grid" />
              <text x={paddingLeft - 8} y={y + 3} className="admin-chart__axis-label" textAnchor="end">
                {tick}
              </text>
            </g>
          )
        })}

        {points.map((point, index) =>
          index % labelEvery === 0 || index === points.length - 1 ? (
            <text key={`x-${point.date.toISOString()}`} x={point.x} y={height - 8} className="admin-chart__axis-label" textAnchor="middle">
              {formatDayLabel(point.date)}
            </text>
          ) : null,
        )}

        <path d={areaPath} className="admin-chart__area" />
        <path d={linePath} className="admin-chart__line" />

        {hovered && <line x1={hovered.x} x2={hovered.x} y1={paddingTop} y2={baseline} className="admin-chart__crosshair" />}

        <circle cx={last.x} cy={last.y} r="4.5" className="admin-chart__marker" />
        {hovered && hoverIndex !== points.length - 1 && (
          <circle cx={hovered.x} cy={hovered.y} r="4.5" className="admin-chart__marker admin-chart__marker--hover" />
        )}
      </svg>

      {hovered && (
        <div className="admin-chart__tooltip" style={{ left: `${(hovered.x / width) * 100}%`, top: `${(hovered.y / height) * 100}%` }}>
          <strong>
            {hovered.count} {unitLabel}{hovered.count > 1 ? 's' : ''}
          </strong>
          <span>{formatDayLabel(hovered.date, true)}</span>
        </div>
      )}

      <table className="sr-only">
        <caption>Nombre de {unitLabel}s par jour, 14 derniers jours</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>{unitLabel === 'lead' ? 'Leads' : `${unitLabel.charAt(0).toUpperCase()}${unitLabel.slice(1)}s`}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.date.toISOString()}>
              <td>{formatDayLabel(point.date, true)}</td>
              <td>{point.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BarRankingList({ items, emptyLabel }: { items: { label: string; count: number }[]; emptyLabel: string }) {
  const max = Math.max(1, ...items.map((item) => item.count))

  if (items.length === 0) {
    return <p className="admin-empty">{emptyLabel}</p>
  }

  return (
    <div className="admin-barlist" role="img" aria-label="Répartition des leads par domaine">
      {items.map((item) => (
        <div key={item.label} className="admin-barlist__row">
          <span className="admin-barlist__label">{item.label}</span>
          <div className="admin-barlist__track">
            <div className="admin-barlist__fill" style={{ width: `${Math.max(6, (item.count / max) * 100)}%` }} />
          </div>
          <span className="admin-barlist__value">{item.count}</span>
        </div>
      ))}
    </div>
  )
}

type StatusSegment = { key: string; label: string; value: number; tone: 'good' | 'warning' | 'neutral' }

export function StatusStackBar({ segments }: { segments: StatusSegment[] }) {
  const total = Math.max(1, segments.reduce((sum, segment) => sum + segment.value, 0))
  const visible = segments.filter((segment) => segment.value > 0)
  const [hoverKey, setHoverKey] = useState<string | null>(null)

  if (visible.length === 0) {
    return <p className="admin-empty">Aucun article pour le moment.</p>
  }

  return (
    <div className="admin-stackbar">
      <div className="admin-stackbar__track" role="img" aria-label="Répartition des articles par statut">
        {visible.map((segment) => (
          <button
            key={segment.key}
            type="button"
            className={`admin-stackbar__segment is-${segment.tone} ${hoverKey === segment.key ? 'is-hovered' : ''}`}
            style={{ width: `${(segment.value / total) * 100}%` }}
            onPointerEnter={() => setHoverKey(segment.key)}
            onPointerLeave={() => setHoverKey(null)}
            onFocus={() => setHoverKey(segment.key)}
            onBlur={() => setHoverKey(null)}
          >
            {(segment.value / total) * 100 >= 14 ? <span>{segment.value}</span> : null}
          </button>
        ))}
      </div>
      <ul className="admin-stackbar__legend">
        {visible.map((segment) => (
          <li key={segment.key} className={hoverKey === segment.key ? 'is-hovered' : ''}>
            <span className={`admin-stackbar__dot is-${segment.tone}`} aria-hidden="true" />
            {segment.label} <strong>{segment.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function StatTile({
  icon,
  label,
  value,
  deltaPct,
  deltaLabel,
  positiveIsGood = true,
}: {
  icon: ReactNode
  label: string
  value: string | number
  deltaPct?: number
  deltaLabel?: string
  positiveIsGood?: boolean
}) {
  const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct)
  const isPositive = (deltaPct ?? 0) >= 0
  const isGood = positiveIsGood ? isPositive : !isPositive

  return (
    <article className="admin-stat-tile">
      <span className="admin-stat-tile__icon">{icon}</span>
      <div className="admin-stat-tile__body">
        <span className="admin-stat-tile__value">{value}</span>
        <p className="admin-stat-tile__label">{label}</p>
        {hasDelta && (
          <span className={`admin-stat-tile__delta ${isGood ? 'is-good' : 'is-bad'}`}>
            {isPositive ? <TrendUpIcon /> : <TrendDownIcon />}
            {Math.abs(deltaPct as number)}% {deltaLabel}
          </span>
        )}
      </div>
    </article>
  )
}
