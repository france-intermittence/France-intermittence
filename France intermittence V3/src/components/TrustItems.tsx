import { BenefitIcon } from './Icons'

type TrustItemsProps = {
  items: Array<{ icon: string; text: string }>
  compact?: boolean
}

export function TrustItems({ items, compact = false }: TrustItemsProps) {
  return (
    <div className={`trust-items ${compact ? 'trust-items--compact' : ''}`}>
      {items.map((item) => (
        <div key={item.text} className="trust-items__item">
          <span className="trust-items__icon">
            <BenefitIcon kind={item.icon} />
          </span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  )
}
