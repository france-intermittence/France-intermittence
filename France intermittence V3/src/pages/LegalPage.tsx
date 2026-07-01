type LegalPageProps = {
  title: string
  intro: string
  sections: ReadonlyArray<{ title: string; body: ReadonlyArray<string> }>
}

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main className="legal-page">
      <div className="legal-page__header">
        <p className="legal-page__eyebrow">Informations utiles</p>
        <h1 className="legal-page__title">{title}</h1>
        <p className="legal-page__intro">{intro}</p>
      </div>

      <div className="legal-page__sections">
        {sections.map((section) => (
          <section key={section.title} className="legal-page__section">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
