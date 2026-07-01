import type { ReactNode } from 'react'

type IconCardProps = {
  icon: ReactNode
  title: string
  description: string
  trailing?: ReactNode
}

export function IconCard({ icon, title, description, trailing }: IconCardProps) {
  return (
    <article className="icon-card">
      <div className="icon-card__badge">{icon}</div>
      <div className="icon-card__body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {trailing ? <div className="icon-card__trailing">{trailing}</div> : null}
    </article>
  )
}
