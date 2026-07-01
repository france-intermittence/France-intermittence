import { Link } from 'react-router-dom'
import { fundingItems } from '../data/siteData'
import { ContactCard } from './ContactCard'
import { FundingIcon } from './Icons'

export function FundingSection() {
  return (
    <section className="funding-section" id="financement">
      <div className="funding-section__main">
        <div className="funding-section__left">
          <h2 className="section-title">Un financement plus lisible, un dossier mieux accompagné</h2>
          <div className="funding-section__list">
            {fundingItems.map((item) => (
              <article key={item.title} className="funding-section__item">
                <span className={`funding-section__item-icon funding-section__item-icon--${item.tone}`}>
                  <FundingIcon kind={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="funding-section__actions">
            <Link to="/financement" className="fi-button fi-button--primary">
              Voir le parcours de financement
            </Link>
            <Link to="/accompagnement" className="fi-button fi-button--secondary">
              Être accompagné
            </Link>
          </div>
        </div>
        <ContactCard />
      </div>
    </section>
  )
}
