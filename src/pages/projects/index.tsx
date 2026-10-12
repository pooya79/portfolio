import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRightIcon, BookOpenIcon, CodeIcon, GlobeHemisphereWestIcon, InfinityIcon, PlantIcon, UsersThreeIcon } from '@phosphor-icons/react'
import { Reveal } from '../../components/Reveal'
import { useTheme } from '../../theme/theme'
import { projectCollection } from './data'
import { projectImages, projectImageSources } from './sceneAssets'
import type { ProjectFilter } from './types'
import styles from './Projects.module.css'

const filters: ProjectFilter[] = ['All', 'AI', 'Research', 'Backend', 'Products']

export default function Projects() {
  const { theme } = useTheme()
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<ProjectFilter>('All')
  const [sort, setSort] = useState('featured')
  const filtered = projectCollection.filter(project => filter === 'All' || project.filters.includes(filter))
  const visible = sort === 'alphabetical' ? [...filtered].sort((a, b) => a.title.localeCompare(b.title)) : filtered
  const researchCount = projectCollection.filter(project => project.filters.includes('Research')).length

  return <div className={styles.page}>
    <section className={styles.hero} aria-labelledby="projects-title">
      <img className={styles.heroImage} src={projectImages.workshop[theme]} srcSet={projectImageSources('workshop', theme)} sizes="100vw" width={1672} height={941} alt="A lush solarpunk invention studio with a laptop, robot prototype, solar sensor, and green housing model." fetchPriority="high" />
      <div className={styles.heroWash} />
      <div className={styles.heroInner}>
        <Reveal className={styles.heroCopy}>
          <p className={styles.eyebrow}>From exploration to implementation</p>
          <h1 id="projects-title">Projects</h1>
          <p className={styles.subtitle}>AI systems, research, and products.<br className={styles.desktopBreak} /> The ideas, decisions, and code behind them.</p>
        </Reveal>
        <Reveal className={styles.principles} delay={0.15}>
          <ul>
            <li><PlantIcon size={27} weight="duotone" /><span>Build<br />Useful Technology</span></li>
            <li><UsersThreeIcon size={27} /><span>Advance<br />Open Research</span></li>
            <li><GlobeHemisphereWestIcon size={27} /><span>Create<br />Positive Real-World Impact</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
    <section className={styles.collection} aria-label="Project collection">
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter projects">
          {filters.map(category => <button key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>
            {filter === category && <motion.span className={styles.filterIndicator} layoutId="project-filter" transition={{ duration: reduced ? 0 : 0.25 }} />}
            <span>{category}</span>
          </button>)}
        </div>
        <div className={styles.collectionControls}>
          <p className={styles.count} role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
          <label className={styles.sort}>Sort by <select aria-label="Sort projects" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="alphabetical">Name A–Z</option></select></label>
        </div>
      </div>
      <div className={styles.collectionBody}>
        <div className={`${styles.projectGrid} ${visible.length === 1 ? styles.singleProject : ''}`}>
          {visible.length === 0 && <div className={styles.noProjects}><h2>No projects in this category yet.</h2><p>Explore the research in the full collection.</p><button className="button" onClick={() => setFilter('All')}>Show all projects</button></div>}
          {visible.map(project => <motion.article key={project.slug} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
            <Link to={`/projects/${project.slug}`} className={styles.projectCard}>
              <div className={`${styles.cardImage} ${project.presentation === 'app' ? styles.appImage : ''}`}>
                <img src={projectImages[project.image][theme]} srcSet={projectImageSources(project.image, theme)} sizes={visible.length === 1 ? '(max-width: 1000px) 88vw, 65vw' : '(max-width: 540px) 88vw, (max-width: 1000px) 44vw, 36vw'} width={1536} height={1024} style={{ objectPosition: project.imagePosition, transformOrigin: project.imagePosition, '--image-scale': project.imageScale ?? 1 } as CSSProperties} alt="" loading="lazy" />
                <span className={styles.projectNumber}>{String(projectCollection.indexOf(project) + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.cardCopy}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <span className={styles.cardArrow} aria-hidden="true"><ArrowUpRightIcon size={21} /></span>
                <ul className={styles.tags} aria-label="Project topics">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </Link>
          </motion.article>)}
        </div>
        <Reveal className={styles.sidebar} delay={0.2}>
          <h2>From ideas<br />to working<br />products.</h2>
          <div className={styles.shortRule} />
          <p>I connect AI research with software engineering, working through the practical details that turn a promising idea into a useful product.</p>
          <ul className={styles.stats} aria-label="Portfolio at a glance">
            <li><CodeIcon size={28} /><span>{projectCollection.length}</span><p>{projectCollection.length === 1 ? 'Project' : 'Projects'}</p></li>
            <li><BookOpenIcon size={28} /><span>{researchCount}</span><p>{researchCount === 1 ? 'Research Project' : 'Research Projects'}</p></li>
            <li><InfinityIcon size={28} /><span>∞</span><p>Ideas Ahead</p></li>
          </ul>
          <figure className={styles.quote}>
            <blockquote cite="https://www.vam.ac.uk/collections/william-morris">“Have nothing in your houses that you do not know to be useful or believe to be beautiful.”</blockquote>
            <figcaption className={styles.signature}><PlantIcon size={24} weight="duotone" aria-hidden="true" /><span>William Morris</span></figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  </div>
}
