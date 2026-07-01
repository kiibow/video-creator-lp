import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}

export function useCounter(target, duration = 2000, enabled = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }

    requestAnimationFrame(animate)
  }, [enabled, target, duration])

  return count
}
