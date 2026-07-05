export type PageFaqItem = {
  question: string
  answer: string
}

type PageFaqProps = {
  eyebrow?: string
  title: string
  items: PageFaqItem[]
}

export function PageFaq({ eyebrow = 'Questions fréquentes', title, items }: PageFaqProps) {
  return (
    <section className="page-faq" aria-labelledby="page-faq-title">
      <div className="page-faq__header">
        <p className="page-faq__eyebrow">{eyebrow}</p>
        <h2 id="page-faq-title">{title}</h2>
      </div>
      <div className="page-faq__list">
        {items.map((item) => (
          <details className="page-faq__item" key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
