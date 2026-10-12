import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './FirstVisitLoader.module.css'

const storageKey = 'portfolio-intro-seen-v1'
const preview = import.meta.env.DEV && new URLSearchParams(location.search).get('loader-preview') === '1'

function needsIntroduction() {
  if (preview) return true
  try { return localStorage.getItem(storageKey) !== 'true' } catch { return true }
}

/** A tiny, resolution-independent solar sculpture. No image request is needed. */
function SolarSprout() {
  return <svg className={styles.sprout} viewBox="0 0 120 132" fill="none" aria-hidden="true">
    <ellipse className={styles.water} cx="60" cy="115" rx="29" ry="3" />
    <ellipse className={styles.ripple} cx="60" cy="115" rx="17" ry="2" />
    <g className={styles.plant}>
      <path className={styles.stem} d="M60 112V53Q60 45 64 39" />
      <g className={styles.leftLeaf}>
        <path className={styles.leaf} d="M59 80C35 79 24 64 25 43C47 43 61 57 59 80Z" />
        <path className={styles.cells} d="M28 47L57 77M27 56L38 56L38 69M33 65L47 65L47 76M43 47L43 62L58 62" />
        <path className={styles.edge} d="M25 43C47 43 61 57 59 80" />
      </g>
      <g className={styles.rightLeaf}>
        <path className={styles.leaf} d="M61 62C60 37 73 23 96 20C96 44 83 61 61 62Z" />
        <path className={styles.cells} d="M64 58L92 25M65 46L78 46L78 57M73 33L86 33L86 49M64 53L72 53L72 35" />
        <path className={styles.edge} d="M61 62C60 37 73 23 96 20" />
      </g>
      <path className={styles.energy} d="M60 109V79" pathLength="1" />
      <circle className={styles.seed} cx="60" cy="112" r="2.4" />
    </g>
  </svg>
}

export function FirstVisitLoader({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(needsIntroduction)
  const [leaving, setLeaving] = useState(false)
  const [slow, setSlow] = useState(false)
  const content = useRef<HTMLDivElement>(null)

  function dismiss() { setLeaving(true) }

  useEffect(() => {
    if (!active || leaving) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const slowTimer = window.setTimeout(() => setSlow(true), 3000)
    const timeout = window.setTimeout(() => { if (!preview) setLeaving(true) }, 8000)
    // Track the actual responsive image selected by the browser, including decode.
    const decoded = new Map<HTMLImageElement, { src: string; ready: boolean }>()
    let cancelled = false
    let readyPasses = 0
    const check = () => {
      if (preview || !content.current?.querySelector('[data-loading-content]')) return
      const images = [...content.current.querySelectorAll('img')].filter(img => {
        const rect = img.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0
      })
      const ready = images.map(img => {
        if (!img.complete) return false
        if (!img.naturalWidth) return true // Broken images must never block entry.
        const src = img.currentSrc || img.src
        let entry = decoded.get(img)
        if (entry?.src !== src) {
          entry = { src, ready: false }
          decoded.set(img, entry)
          const current = entry
          img.decode().catch(() => {}).then(() => { if (!cancelled) current.ready = true })
        }
        return entry.ready
      }).every(Boolean)
      // Recheck after layout settles; there is no minimum animation duration.
      readyPasses = ready ? readyPasses + 1 : 0
      if (readyPasses >= 2) setLeaving(true)
    }
    const interval = window.setInterval(check, 100)
    check()
    return () => {
      cancelled = true
      clearInterval(interval)
      clearTimeout(slowTimer)
      clearTimeout(timeout)
      document.body.style.overflow = previousOverflow
    }
  }, [active, leaving])

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => {
      setActive(false)
      if (!preview) {
        try { localStorage.setItem(storageKey, 'true') } catch { /* Storage is optional. */ }
      }
      if (document.activeElement?.closest('[data-intro]')) {
        requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
      }
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350)
    return () => clearTimeout(timer)
  }, [leaving])

  return <>
    <div ref={content} inert={active} aria-hidden={active || undefined} style={{ display: 'contents' }}>{children}</div>
    {active && <div data-intro className={`${styles.overlay} ${leaving ? styles.leaving : ''}`}>
      <div className={styles.center}>
        <SolarSprout />
        <p role="status" className={styles.caption}>Growing brighter<span className={styles.period}>.</span></p>
        {(slow || preview) && <button className={styles.continue} onClick={dismiss}>Enter the garden <span aria-hidden="true">↗</span></button>}
      </div>
    </div>}
  </>
}
