import { universeItems } from '../data/siteData'
import { ArrowRightIcon, UniverseIcon } from './Icons'
import { IconCard } from './IconCard'

export function UniverseCards() {
  return (
    <section className="universe-section" id="formations">
      <h2 className="section-title">Explorer les univers de formation adaptés à votre métier</h2>
      <div className="universe-section__grid">
        {universeItems.map((item) => (
          <IconCard
            key={item.title}
            icon={<UniverseIcon kind={item.icon} className="universe-section__icon" />}
            title={item.title}
            description={item.description}
            trailing={<ArrowRightIcon className="universe-section__arrow" />}
          />
        ))}
      </div>
    </section>
  )
}
