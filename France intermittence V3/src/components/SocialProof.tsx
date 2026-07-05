import { proofStats, proofTestimonials } from '../data/socialProof'

type SocialProofProps = {
  eyebrow?: string
  title: string
}

export function SocialProof({ eyebrow = 'Ils nous font confiance', title }: SocialProofProps) {
  return (
    <section className="social-proof" aria-labelledby="social-proof-title">
      <div className="social-proof__header">
        <p className="social-proof__eyebrow">{eyebrow}</p>
        <h2 id="social-proof-title">{title}</h2>
      </div>

      <div className="social-proof__stats">
        {proofStats.map((stat) => (
          <div className="social-proof__stat" key={stat.label}>
            <span className="social-proof__stat-value">{stat.value}</span>
            <span className="social-proof__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {proofTestimonials.length > 0 && (
        <div className="social-proof__testimonials">
          {proofTestimonials.map((item) => (
            <blockquote className="social-proof__testimonial" key={item.name}>
              <p>« {item.quote} »</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      )}
    </section>
  )
}
