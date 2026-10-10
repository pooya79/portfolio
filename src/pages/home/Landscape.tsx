import { useRef, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useTheme } from '../../theme/theme'
import { foregroundAssets, heroLandscapeAssets } from './sceneAssets'
import styles from './Home.module.css'
import { SceneImage } from './SceneImage'

export function Landscape({ paused }: { paused: boolean }) {
  const { theme } = useTheme()
  const reduced = useReducedMotion()
  const still = paused || !!reduced
  const root = useRef<HTMLDivElement>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 35, damping: 22 })
  const y = useSpring(pointerY, { stiffness: 35, damping: 22 })
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const distantX = useTransform(x, value => value * -4)
  const distantY = useTransform([y, scrollYProgress], ([pointer, scroll]) => Number(pointer) * -3 + Number(scroll) * 32)
  const nearX = useTransform(x, value => value * -14)
  const nearY = useTransform([y, scrollYProgress], ([pointer, scroll]) => Number(pointer) * -8 + Number(scroll) * 9)

  function move(event: PointerEvent<HTMLDivElement>) {
    if (still || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - .5)
    pointerY.set((event.clientY - rect.top) / rect.height - .5)
  }
  function reset() { pointerX.set(0); pointerY.set(0) }

  return <div ref={root} className={`${styles.landscape} ${still ? styles.still : ''}`} onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
    <motion.div className={styles.farLayer} style={{ x: still ? 0 : distantX, y: still ? 0 : distantY }}>
      <SceneImage src={heroLandscapeAssets[theme]} paused={paused} reduced={!!reduced} />
    </motion.div>
    <div className={styles.readability} />
    <motion.div className={styles.nearLayer} style={{ x: still ? 0 : nearX, y: still ? 0 : nearY }}>
      <SceneImage src={foregroundAssets[theme]} foreground paused={paused} reduced={!!reduced} />
    </motion.div>
    <div className={styles.motes}>{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</div>
  </div>
}
