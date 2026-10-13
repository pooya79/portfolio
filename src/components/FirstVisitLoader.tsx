import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useTheme } from '../theme/theme'
import { preloadImage, preloadInBackground } from './imagePreloading'
import { otherWebsiteImages, pageWebsiteImages } from './websiteImages'
import styles from './FirstVisitLoader.module.css'

const preview = import.meta.env.DEV && new URLSearchParams(location.search).get('loader-preview') === '1'
const minimumDuration = 1000
const cacheGracePeriod = 150

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
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const [entry] = useState(() => ({ pathname, theme }))
  const [active, setActive] = useState(true)
  const [showing, setShowing] = useState(preview)
  const [leaving, setLeaving] = useState(false)
  const [slow, setSlow] = useState(false)
  const content = useRef<HTMLDivElement>(null)
  const shownAt = useRef(0)

  function dismiss() { setLeaving(true) }

  useEffect(() => {
    if (!active || leaving) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (preview && !shownAt.current) shownAt.current = performance.now()
    // Cached images can settle without flashing an unnecessary loading screen.
    const showTimer = window.setTimeout(() => {
      if (!shownAt.current) shownAt.current = performance.now()
      setShowing(true)
    }, cacheGracePeriod)
    const slowTimer = window.setTimeout(() => setSlow(true), 3000)
    const timeout = window.setTimeout(() => { if (!preview) setLeaving(true) }, 15000)
    let cancelled = false
    let imagesReady = false
    let finished = false
    const check = () => {
      if (preview || cancelled || finished || !imagesReady || !content.current?.querySelector('[data-loading-content]')) return
      if (shownAt.current && performance.now() - shownAt.current < minimumDuration) return
      finished = true
      clearTimeout(showTimer)
      if (shownAt.current) setLeaving(true)
      else setActive(false)
    }
    const interval = window.setInterval(check, 25)
    // Match the browser's responsive selection and wait for decode. The allowlist
    // includes CSS backgrounds but deliberately excludes project showcases.
    void Promise.all(pageWebsiteImages(pathname, theme).map(source => preloadImage(source, 'high'))).then(() => {
      imagesReady = true
      check()
    })
    return () => {
      cancelled = true
      clearInterval(interval)
      clearTimeout(showTimer)
      clearTimeout(slowTimer)
      clearTimeout(timeout)
      document.body.style.overflow = previousOverflow
    }
  }, [active, leaving, pathname, theme])

  useEffect(() => {
    if (active || preview) return
    // The original entry page also needs warming if the visitor changes themes.
    return preloadInBackground(otherWebsiteImages(entry.theme === theme ? entry.pathname : '', theme))
  }, [active, entry, theme])

  useEffect(() => {
    if (!leaving) return
    const timer = window.setTimeout(() => {
      setActive(false)
      if (document.activeElement?.closest('[data-intro]')) {
        requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
      }
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350)
    return () => clearTimeout(timer)
  }, [leaving])

  return <>
    <div ref={content} inert={active} aria-hidden={active || undefined} style={{ display: 'contents', visibility: active && !showing ? 'hidden' : undefined }}>{children}</div>
    {active && showing && <div data-intro className={`${styles.overlay} ${leaving ? styles.leaving : ''}`}>
      <div className={styles.center}>
        <SolarSprout />
        <p role="status" className={styles.caption}>Growing brighter<span className={styles.period}>.</span></p>
        {slow && <button className={styles.continue} onClick={dismiss}>Enter the garden <span aria-hidden="true">↗</span></button>}
      </div>
    </div>}
  </>
}
