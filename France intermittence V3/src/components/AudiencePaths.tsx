import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './Icons'

/**
 * Aiguillage des 2 publics dès l'accueil :
 *  - Cible 1 (prioritaire) : intermittent qui doit compléter ses 507 heures.
 *  - Cible 2 (secondaire) : personne qui souhaite le devenir.
 *
 * Chaque CTA pointe vers le formulaire unique `/ma-formation-adaptee` en
 * transmettant un paramètre `?profil=` pour qualifier le lead (lecture seule
 * côté formulaire, cf. MaFormationAdaptee + LeadData.profil).
 */
export function AudiencePaths() {
  return (
    <section className="audience-paths" id="parcours" aria-labelledby="audience-paths-title">
      <h2 className="section-title" id="audience-paths-title">
        Deux parcours, un même accompagnement
      </h2>

      <div className="audience-paths__grid">
        <article className="audience-card audience-card--primary">
          <span className="audience-card__tag">Vous êtes intermittent</span>
          <h3 className="audience-card__title">Je suis déjà intermittent du spectacle</h3>
          <p className="audience-card__text">
            Vous devez compléter vos 507 heures pour maintenir votre statut&nbsp;? Nous
            identifions la formation adaptée à votre métier. Aucune démarche administrative à
            gérer&nbsp;: selon votre situation, votre formation peut vous coûter 0&nbsp;€.
          </p>
          <Link
            to="/ma-formation-adaptee?profil=intermittent"
            className="fi-button fi-button--primary audience-card__cta"
          >
            Trouver ma formation adaptée
            <ArrowRightIcon />
          </Link>
        </article>

        <article className="audience-card audience-card--secondary">
          <span className="audience-card__tag">Vous débutez votre projet</span>
          <h3 className="audience-card__title">Je souhaite le devenir</h3>
          <p className="audience-card__text">
            Vous voulez devenir intermittent du spectacle&nbsp;? Nous vous accompagnons dans
            votre projet et trouvons une formation qui vous plaît, jusqu&apos;au bout de votre
            projet professionnel.
          </p>
          <Link
            to="/ma-formation-adaptee?profil=devenir"
            className="fi-button fi-button--secondary audience-card__cta"
          >
            Être accompagné dans mon projet
            <ArrowRightIcon />
          </Link>
        </article>
      </div>
    </section>
  )
}
