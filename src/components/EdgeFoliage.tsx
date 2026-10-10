import leavesLight from '../assets/images/generated/edge-foliage-light.webp'
import leavesDark from '../assets/images/generated/edge-foliage-dark.webp'
import { useTheme } from '../theme/theme'
import styles from './EdgeFoliage.module.css'

export function EdgeFoliage() {
  const { theme } = useTheme()
  const source = theme === 'light' ? leavesLight : leavesDark

  return <div className={styles.foliage} aria-hidden="true">
    <div className={styles.left}><img src={source} alt="" decoding="async" /></div>
    <div className={styles.right}><img src={source} alt="" decoding="async" /></div>
  </div>
}
