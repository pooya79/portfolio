import { Link } from 'react-router'
import { ArrowUpRightIcon, ArrowDownIcon, PlantIcon } from '@phosphor-icons/react'
import { Reveal } from '../../components/Reveal'
import { useTheme } from '../../theme/theme'
import { blogImages } from './sceneAssets'
import styles from './ComingSoon.module.css'

export default function Blogs() {
  const { theme } = useTheme()

  return <div className={styles.page}>
    <section className={styles.garden} aria-labelledby="journal-title">
      <Reveal className={styles.copy}>
        <p className={styles.eyebrow}><PlantIcon size={22} weight="duotone" aria-hidden="true" /> Blogs · Coming soon</p>
        <h1 id="journal-title">A little quiet.<br /><span>A lot taking root.</span></h1>
        <p className={styles.intro}>No posts just yet. This little corner is growing into a home for ideas, experiments, and discoveries.</p>
        <Link className={styles.explore} to="/projects">Explore what I’m building <ArrowUpRightIcon size={21} aria-hidden="true" /></Link>
      </Reveal>
      <Reveal className={styles.window} delay={0.12}>
        <img key={theme} className={styles.scene} src={blogImages.library[theme]} width={1536} height={1024}
          alt={`An open notebook in a lush, solar-powered library overlooking a green city ${theme === 'light' ? 'in the morning sun' : 'at night'}.`}
          fetchPriority="high" />
      </Reveal>
    </section>

    <Reveal className={styles.note} delay={0.2}>
      <span className={styles.noteLabel}>Room for a first thought.</span>
      <details className={styles.details}>
        <summary>What will grow here? <ArrowDownIcon size={18} aria-hidden="true" /></summary>
        <p>Notes on AI, things I build, and the questions I meet along the way. Come back for the first story.</p>
      </details>
    </Reveal>
  </div>
}
