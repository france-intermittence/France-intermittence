import { useEffect, useRef, useState } from 'react'

type UseScrollRevealOptions = {
  /** Décalage de déclenchement (ex. '0px 0px -10% 0px' pour révéler un peu avant). */
  rootMargin?: string
  /** Part de l'élément visible avant déclenchement (0 → 1). */
  threshold?: number
  /** Ne révéler qu'une seule fois (par défaut true). */
  once?: boolean
}

/**
 * Hook de "reveal au scroll" basé sur IntersectionObserver.
 *
 * Retourne une ref à poser sur la section et un booléen `isVisible`.
 * Combiné aux classes `.fi-reveal` / `.fi-reveal--visible` (voir src/index.css),
 * la section apparaît en douceur (fade + léger translateY) à l'entrée dans le viewport.
 *
 * Le respect de `prefers-reduced-motion` est géré côté CSS : si l'utilisateur
 * désactive les animations, l'élément reste pleinement visible sans transition.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {},
) {
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.15, once = true } = options
  const ref = useRef<T | null>(null)
  // Garde-fou : si IntersectionObserver est indisponible, on affiche directement.
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold, once])

  return { ref, isVisible }
}
