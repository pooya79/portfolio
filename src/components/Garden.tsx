import { useState, type CSSProperties } from 'react'
import { PlantIcon, SunIcon, MoonStarsIcon, DropIcon, ArrowCounterClockwiseIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useTheme } from '../theme/theme'
import styles from './Garden.module.css'

export function Garden() {
  const [growth, setGrowth] = useState(45)
  const { theme } = useTheme()
  const reduced = useReducedMotion()
  const SkyIcon = theme === 'dark' ? MoonStarsIcon : SunIcon
  return <section className={styles.garden} aria-labelledby="garden-heading">
    <div className={styles.header}><h2 id="garden-heading">Room to grow</h2><SkyIcon size={24} weight="duotone" /></div>
    <p>A tiny garden. A little interaction.</p>
    <div className={styles.bed} aria-hidden="true">
      {[0, 1, 2].map((plant) => <motion.div key={plant} className={styles.plant} style={{ '--plant': plant } as CSSProperties}
        animate={{ scale: 0.5 + growth / 145 + plant * 0.08 }} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 130, damping: 15 }}>
        <PlantIcon size={90} weight="duotone" />
      </motion.div>)}
      <span className={styles.ground} />
    </div>
    <div className={styles.controls}>
      <div className={styles.rangeLabel}><label htmlFor="growth">Growth</label><span>{growth < 35 ? 'Seedling' : growth < 75 ? 'Taking root' : 'In full bloom'}</span></div>
      <input id="growth" type="range" min="0" max="100" value={growth} onChange={event => setGrowth(Number(event.target.value))} />
      <div className={styles.actions}><button onClick={() => setGrowth(value => Math.min(100, value + 20))} disabled={growth === 100}><DropIcon size={15} />{growth === 100 ? 'All grown up' : 'A little water'}</button><button className={styles.reset} onClick={() => setGrowth(0)} aria-label="Reset garden"><ArrowCounterClockwiseIcon size={17} /></button></div>
    </div>
  </section>
}
