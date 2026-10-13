import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, BuildingsIcon, CalendarBlankIcon, DatabaseIcon, GithubLogoIcon, StackIcon, UserIcon, type Icon } from '@phosphor-icons/react'
import { Reveal } from './Reveal'
import { useTheme } from '../theme/theme'
import styles from './AppProjectShowcase.module.css'

type Highlight = { icon: Icon; title: string; description: string }
type AppScreen = { id: string; label: string; src: string | { light: string; dark: string }; thumbnail?: string; alt: string; caption: string; width: number; height: number }
export type AppProjectContent = {
  title: string
  subtitle: string
  summary: string
  year: number
  role: string
  heroBackground?: { light: string; dark: string }
  repository?: string
  organization?: { name: string; url: string }
  technologies: string[]
  screens: AppScreen[]
  visualKind?: 'screenshot' | 'diagram'
  challenge: ReactNode
  features: Highlight[]
  architecture: {
    nodes: { icon: Icon; label: string }[]
    storage: string
    jobs: string
    note: string
  }
  delivery: Highlight[]
  deliveryTitle?: string
  status?: { title: string; description: string }
}

// App projects use a compact visual overview; research keeps its detailed case-study pages.
export function AppProjectShowcase({ project, children }: { project: AppProjectContent; children?: ReactNode }) {
  const { theme } = useTheme()
  const [screenId, setScreenId] = useState(project.screens[0].id)
  const screen = project.screens.find(item => item.id === screenId)!
  const screenSrc = typeof screen.src === 'string' ? screen.src : screen.src[theme]

  return <article className={styles.page}>
    <div className={styles.hero}>
      {project.heroBackground && <div className={styles.heroBackdrop} aria-hidden="true"><img src={project.heroBackground[theme]} alt="" width={1536} height={1024} fetchPriority="high" /></div>}
      <Reveal className={styles.introduction}>
        <Link className={styles.back} to="/projects"><ArrowLeftIcon size={16} /> Back to projects</Link>
        <h1>{project.title}</h1>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.summary}>{project.summary}</p>
        {project.repository ? <a className={styles.primary} href={project.repository} target="_blank" rel="noreferrer"><GithubLogoIcon size={20} /> View on GitHub <ArrowUpRightIcon size={16} /></a>
          : project.organization && <a className={styles.primary} href={project.organization.url} target="_blank" rel="noreferrer"><BuildingsIcon size={20} /> Built for {project.organization.name} <ArrowUpRightIcon size={16} /></a>}
      </Reveal>

      <Reveal className={styles.gallery} delay={0.08}>
        <figure className={styles.preview} id="app-preview">
          <a className={styles.screenshotLink} key={screen.id} href={screenSrc} target="_blank" rel="noreferrer" aria-label={`Enlarge ${screen.label.toLowerCase()} ${project.visualKind ?? 'screenshot'} (opens in a new tab)`}>
            <img src={screenSrc} alt={screen.alt} width={screen.width} height={screen.height} fetchPriority="high" />
          </a>
          <figcaption><span aria-live="polite">{screen.caption}</span><a href={screenSrc} target="_blank" rel="noreferrer">Enlarge <ArrowUpRightIcon size={13} /></a></figcaption>
        </figure>
        {project.screens.length > 1 && <div className={styles.screenPicker} style={{ gridTemplateColumns: `repeat(${project.screens.length}, minmax(0, 1fr))` }} role="group" aria-label={project.visualKind === 'diagram' ? 'Architecture diagrams' : 'Application screenshots'}>
          {project.screens.map(item => <button key={item.id} aria-pressed={screen.id === item.id} aria-controls="app-preview" onClick={() => setScreenId(item.id)}>
            <img src={item.thumbnail ?? (typeof item.src === 'string' ? item.src : item.src[theme])} alt="" width={item.width} height={item.height} />
            <span>{item.label}</span>
          </button>)}
        </div>}
      </Reveal>

      <Reveal className={styles.facts} delay={0.15}>
        <div className={styles.year}><div className={styles.factHeading}><CalendarBlankIcon size={23} /><h2>Year</h2></div><p>{project.year}</p></div>
        <div className={styles.factHeading}><UserIcon size={23} /><h2>My role</h2></div>
        <p>{project.role}</p>
        <div className={styles.factHeading}><StackIcon size={23} /><h2>Tech stack</h2></div>
        <ul className={styles.technologies}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      </Reveal>
    </div>

    {project.status && <Reveal className={styles.status}>
      <h2>{project.status.title}</h2>
      <p>{project.status.description}</p>
    </Reveal>}

    <div className={styles.overview}>
      <Reveal className={styles.challenge}>
        <h2>The challenge</h2>
        <div>{project.challenge}</div>
      </Reveal>
      <Reveal className={styles.features} delay={0.04}>
        <h2>Key features</h2>
        <ul className={styles.highlights}>{project.features.map(({ icon: FeatureIcon, title, description }) => <li key={title}>
          <span className={styles.iconTile}><FeatureIcon size={23} weight="duotone" aria-hidden="true" /></span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </li>)}</ul>
      </Reveal>
      <Reveal className={styles.architecture} delay={0.08}>
        <h2>Architecture</h2>
        <div className={styles.flow}>
          {project.architecture.nodes.map(({ icon: NodeIcon, label }, index) => <div className={styles.flowStep} key={label}>
            {index > 0 && <ArrowRightIcon size={17} aria-hidden="true" className={styles.arrow} />}
            <div className={styles.node}><NodeIcon size={28} weight="duotone" aria-hidden="true" /><span>{label}</span></div>
          </div>)}
        </div>
        <div className={styles.storage}><DatabaseIcon size={21} aria-hidden="true" /><span>{project.architecture.storage}<small>{project.architecture.jobs}</small></span></div>
        <p className={styles.architectureNote}>{project.architecture.note}</p>
      </Reveal>
      <Reveal className={styles.delivery} delay={0.12}>
        <h2>{project.deliveryTitle ?? 'Delivered'}</h2>
        <ul className={styles.highlights}>{project.delivery.map(({ icon: DeliveryIcon, title, description }) => <li key={title}>
          <span className={styles.iconTile}><DeliveryIcon size={23} weight="duotone" aria-hidden="true" /></span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </li>)}</ul>
      </Reveal>
    </div>
    {children}
  </article>
}
