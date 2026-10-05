import { LeafIcon, PlantIcon, SunIcon, MoonStarsIcon, WindIcon } from '@phosphor-icons/react'
import { useTheme } from '../theme/theme'
import styles from './BotanicalArt.module.css'

export function BotanicalArt({ motif = 'leaf', compact = false }: { motif?: 'leaf' | 'sun'; compact?: boolean }) {
  const { theme } = useTheme()
  const NightOrDay = theme === 'dark' ? MoonStarsIcon : SunIcon
  return (
    <div className={`${styles.art} ${compact ? styles.compact : ''} ${motif === 'sun' ? styles.sunStudy : ''}`} aria-hidden="true">
      <div className={styles.orbit} />
      <div className={styles.horizon} />
      <NightOrDay className={styles.sun} weight="duotone" />
      <div className={styles.arch}><div className={styles.archLine} /><PlantIcon weight="duotone" className={styles.plant} /></div>
      <LeafIcon className={styles.leafLeft} weight="duotone" />
      <LeafIcon className={styles.leafRight} weight="duotone" />
      <WindIcon className={styles.wind} weight="light" />
    </div>
  )
}
