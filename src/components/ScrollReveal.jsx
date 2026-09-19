import { useEffect, useRef } from 'react'

export default function ScrollReveal({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal all scroll-reveal children
            const revealElements = entry.target.querySelectorAll(
              '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
            )
            revealElements.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('revealed')
              }, i * 100)
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
