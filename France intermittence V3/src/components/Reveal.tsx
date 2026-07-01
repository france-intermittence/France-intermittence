import type { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type RevealProps = {
  children: ReactNode
  /** Décalage en cascade : 0 (défaut), 1 ou 2. */
  delay?: 0 | 1 | 2
  className?: string
}

/**
 * Enveloppe une section et la révèle en douceur à l'entrée dans le viewport.
 * S'appuie sur useScrollReveal + les classes `.fi-reveal*` (src/index.css).
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  const classes = [
    'fi-reveal',
    delay > 0 ? `fi-reveal--delay-${delay}` : '',
    isVisible ? 'fi-reveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
}
