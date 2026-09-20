import { useEffect, useRef } from 'react'

export default function ScrollReveal({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const revealElements = entry.target.querySelectorAll(
            '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-pop'
          )

          if (entry.isIntersecting) {
            // Reveal with staggered delay each time element enters viewport
            revealElements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed')
              }, i * 90)
            })
          } else {
            // Reset state when out of view so animation repeats every time
            revealElements.forEach((el) => {
              el.classList.remove('revealed')
            })
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
