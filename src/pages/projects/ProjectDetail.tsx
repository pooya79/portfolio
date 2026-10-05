import { Link, useParams } from 'react-router'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { BotanicalArt } from '../../components/BotanicalArt'
import { projects } from './data'
import styles from '../../components/Content.module.css'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  if (!project) return <div className="empty-state"><h1>This project hasn’t taken root yet.</h1><Link to="/projects" className="text-link">Browse projects</Link></div>
  return <article className={styles.detail}>
    <Link className="text-link" to="/projects"><ArrowLeftIcon size={16} />Back to projects</Link>
    <header className={styles.heading}><p className={styles.meta}>{project.category} / Sample project</p><h1>{project.title}</h1><p>{project.description}</p></header>
    <div className={styles.detailArt}><BotanicalArt motif={project.motif} /></div>
    <div className={styles.prose}><p className={styles.introduction}>{project.introduction}</p>{project.details.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
  </article>
}
