import { useState } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { robustPersianAsr } from '../projects/robust-persian-asr/data'
import { torobrent, productViews } from '../projects/torobrent/data'
import { projectImages, projectImageSources } from '../projects/sceneAssets'
import { Landscape } from './Landscape'
import { useTheme } from '../../theme/theme'
import styles from './Home.module.css'

const featuredProjects = [
  { project: torobrent, alt: productViews[0].alt, width: 1600, height: 900 },
  { project: robustPersianAsr, alt: 'A sculptural listening pavilion surrounded by a lush garden.', width: 1536, height: 1024 },
]

export default function Home() {
  const [paused, setPaused] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const { project, alt, width, height } = featuredProjects[featuredIndex]
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  return <section className={styles.hero} aria-labelledby="hero-title">
    <Landscape paused={paused} />
    <figure className={styles.srOnly}>
      <blockquote cite="https://www.bfi.org/challenge/2015/community-architects-network/">We are called to be architects of the future, not its victims.</blockquote>
      <figcaption>R. Buckminster Fuller — inscribed on the garden wall.</figcaption>
    </figure>
    <div className={styles.composition}>
      <motion.div className={styles.heroCopy} initial={reduced ? false : { y: 18 }} animate={{ y: 0 }} transition={{ duration: .65 }}>
        <h1 id="hero-title">Building<br /><span>brighter</span><br />tomorrows.</h1>
        <p>I’m <strong>Pouya Fallah</strong>. I build and ship AI-powered products using modern software engineering and AI-native development workflows.</p>
        <Link className={styles.explore} to="/projects">EXPLORE MY WORK <ArrowRightIcon size={25} /></Link>
      </motion.div>
      <motion.aside className={styles.featured} aria-label="Featured projects" initial={reduced ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .4 }}>
        <div className={styles.cardHeader}>
          <span>FEATURED PROJECT</span>
          <div className={styles.projectControls} role="group" aria-label="Choose featured project">
            <button aria-label="Previous featured project" onClick={() => setFeaturedIndex((featuredIndex + featuredProjects.length - 1) % featuredProjects.length)}><CaretLeftIcon size={15} /></button>
            <span aria-live="polite">{featuredIndex + 1} / {featuredProjects.length}</span>
            <button aria-label="Next featured project" onClick={() => setFeaturedIndex((featuredIndex + 1) % featuredProjects.length)}><CaretRightIcon size={15} /></button>
          </div>
        </div>
        <div className={`${styles.preview} ${project.presentation === 'app' ? styles.appPreview : ''}`}>
          <img src={projectImages[project.image][theme]} srcSet={projectImageSources(project.image, theme)} sizes="(max-width: 800px) 88vw, 392px" alt={alt} width={width} height={height} style={{ objectPosition: project.imagePosition }} />
        </div>
        <h2>{project.title}</h2>
        <p className={styles.description}>{project.description}</p>
        <ul className={styles.tags} aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <Link className={styles.projectLink} to={`/projects/${project.slug}`}>VIEW PROJECT <ArrowRightIcon size={25} /></Link>
      </motion.aside>
    </div>
    <div className={styles.sceneControls}>
      <span className={styles.sceneCaption}>A future worth building.</span>
      {!reduced && <button onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume motion in the scene' : 'Pause motion in the scene'}>{paused ? <PlayIcon size={15} /> : <PauseIcon size={15} />}<span>{paused ? 'Resume motion' : 'Pause motion'}</span></button>}
    </div>
  </section>
}
