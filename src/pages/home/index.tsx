import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { projects } from '../projects/data'
import { Landscape } from './Landscape'
import { useTheme } from '../../theme/theme'
import { landscapeAssets } from './sceneAssets'
import styles from './Home.module.css'

const featured = [
  { project: projects.find(project => project.slug === 'robust-speech-recognition')!, tags: ['AI', 'Speech', 'Scalability'] },
  { project: projects.find(project => project.slug === 'living-web')!, tags: ['React', 'Design', 'Motion'] },
  { project: projects.find(project => project.slug === 'daylight-study')!, tags: ['Light', 'Color', 'Experiment'] },
]

export default function Home() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const { theme } = useTheme()
  const { project, tags } = featured[index]
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
          <div className={styles.carouselControls}>
            <span className={styles.count}>{String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</span>
            <button aria-label="Previous featured project" onClick={() => setIndex((index + featured.length - 1) % featured.length)}><CaretLeftIcon size={18} /></button>
            <button aria-label="Next featured project" onClick={() => setIndex((index + 1) % featured.length)}><CaretRightIcon size={18} /></button>
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={project.slug} initial={reduced ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : .18 }}>
            <div className={styles.preview}>
              <img src={landscapeAssets[theme]} alt="" width={1672} height={941} className={styles[`preview${index}`]} />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <h2>{project.title}</h2>
              <p className={styles.description}>{project.description}</p>
              <ul className={styles.tags} aria-label="Project topics">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <Link className={styles.projectLink} to={`/projects/${project.slug}`}>VIEW PROJECT <ArrowRightIcon size={25} /></Link>
          </motion.div>
        </AnimatePresence>
      </motion.aside>
    </div>
    <div className={styles.sceneControls}>
      <span className={styles.sceneCaption}>A future worth building.</span>
      {!reduced && <button onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume motion in the scene' : 'Pause motion in the scene'}>{paused ? <PlayIcon size={15} /> : <PauseIcon size={15} />}<span>{paused ? 'Resume motion' : 'Pause motion'}</span></button>}
    </div>
  </section>
}
